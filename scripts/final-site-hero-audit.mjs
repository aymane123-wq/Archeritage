import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CDP_PORT = Number(process.env.ARCHERITAGE_CDP_PORT || 9333);
const BASE_URL = process.env.ARCHERITAGE_BASE_URL || 'http://localhost:3013';
const OUTPUT_DIR = path.resolve('artifacts/final-site-audit');
const viewports = [{ width: 390, height: 844 }, { width: 1440, height: 900 }];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class CdpClient {
  constructor(url) {
    this.url = url;
    this.counter = 0;
    this.pending = new Map();
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data);
      if (!payload.id || !this.pending.has(payload.id)) return;
      const pending = this.pending.get(payload.id);
      this.pending.delete(payload.id);
      if (payload.error) pending.reject(new Error(`${pending.method}: ${payload.error.message}`));
      else pending.resolve(payload.result);
    });
  }

  send(method, params = {}) {
    const id = ++this.counter;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket.close();
  }
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Runtime evaluation failed');
  return result.result.value;
}

async function navigate(client) {
  await client.send('Page.navigate', { url: `${BASE_URL}/` });
  await delay(1900);
  await evaluate(client, `document.querySelector('button[aria-label="Mettre le diaporama en pause"]')?.click()`);
  await delay(250);
}

async function capture(client) {
  const result = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
  return Buffer.from(result.data, 'base64');
}

async function whitePixelScore(buffer, rect) {
  const metadata = await sharp(buffer).metadata();
  const left = Math.max(0, Math.floor(rect.x));
  const top = Math.max(0, Math.floor(rect.y));
  const width = Math.max(1, Math.min(Math.ceil(rect.width), (metadata.width ?? 1) - left));
  const height = Math.max(1, Math.min(Math.ceil(rect.height), (metadata.height ?? 1) - top));
  const { data, info } = await sharp(buffer).extract({ left, top, width, height }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let score = 0;
  for (let offset = 0; offset < data.length; offset += info.channels) {
    if (data[offset] > 225 && data[offset + 1] > 225 && data[offset + 2] > 225) score += 1;
  }
  return score;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const targets = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
  const target = targets.find((entry) => entry.type === 'page');
  if (!target) throw new Error('No Chrome page target found');
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  await Promise.all([client.send('Page.enable'), client.send('Runtime.enable')]);

  const results = [];
  for (const viewport of viewports) {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.width < 600,
      screenWidth: viewport.width,
      screenHeight: viewport.height,
    });
    const viewportKey = `${viewport.width}x${viewport.height}`;

    for (let slide = 1; slide <= 5; slide += 1) {
      await navigate(client);
      for (let step = 1; step < slide; step += 1) {
        await evaluate(client, `document.querySelector('button[aria-label="Image suivante"]')?.click()`);
        await delay(1450);
      }

      const state = await evaluate(client, `(() => {
        const link = document.querySelector('.home-hero__actions .button--primary');
        const rect = link.getBoundingClientRect();
        const active = [...document.querySelectorAll('[data-slide]')].find((element) => element.getAttribute('aria-hidden') === 'false');
        return {
          counter: document.querySelector('.hero-counter span')?.textContent ?? null,
          ctaText: link.innerText,
          ctaOpacity: getComputedStyle(link).opacity,
          ctaVisibility: getComputedStyle(link).visibility,
          ctaRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          image: active?.querySelector('img')?.currentSrc ?? null,
        };
      })()`);

      const attempts = [];
      for (let attempt = 1; attempt <= 5; attempt += 1) {
        const buffer = await capture(client);
        const score = await whitePixelScore(buffer, state.ctaRect);
        attempts.push({ attempt, score, buffer });
        await delay(180);
      }
      attempts.sort((left, right) => right.score - left.score);
      const selected = attempts[0];
      const slideKey = String(slide).padStart(2, '0');
      await writeFile(path.join(OUTPUT_DIR, `home-slide-${slideKey}-${viewportKey}.png`), selected.buffer);
      results.push({ viewport: viewportKey, slide: slideKey, ...state, selectedAttempt: selected.attempt, whitePixelScore: selected.score, attemptScores: attempts.map(({ attempt, score }) => ({ attempt, score })) });
    }
  }

  await writeFile(path.join(OUTPUT_DIR, 'hero-diagnostics.json'), JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
  client.close();
  process.stdout.write(`Captured ${results.length} validated hero states in ${OUTPUT_DIR}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
