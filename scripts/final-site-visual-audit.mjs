import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const CDP_PORT = Number(process.env.ARCHERITAGE_CDP_PORT || 9333);
const BASE_URL = process.env.ARCHERITAGE_BASE_URL || 'http://localhost:3013';
const OUTPUT_DIR = path.resolve('artifacts/final-site-audit');

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

const routes = [
  { name: 'home', url: '/' },
  { name: 'cabinet', url: '/cabinet' },
  { name: 'expertises', url: '/expertises' },
  { name: 'missions', url: '/missions' },
  { name: 'methode', url: '/methode' },
  { name: 'references', url: '/references' },
  { name: 'journal', url: '/journal' },
  { name: 'article-foncier', url: '/journal/valorisation-fonciere-diagnostic-prealable' },
  { name: 'article-tinmel', url: '/journal/tinmel-116-jours-retard' },
  { name: 'article-reconversion', url: '/journal/restauration-rehabilitation-reconversion' },
  { name: 'contact', url: '/contact' },
  { name: 'mentions-legales', url: '/mentions-legales' },
  { name: 'confidentialite', url: '/confidentialite' },
  { name: 'not-found', url: '/route-audit-inexistante' },
];

const captureViewportKeys = new Set(['390x844', '768x1024', '1440x900']);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class CdpClient {
  constructor(url) {
    this.url = url;
    this.counter = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data);
      if (payload.id) {
        const pending = this.pending.get(payload.id);
        if (!pending) return;
        this.pending.delete(payload.id);
        if (payload.error) pending.reject(new Error(`${pending.method}: ${payload.error.message}`));
        else pending.resolve(payload.result);
        return;
      }
      const listeners = this.listeners.get(payload.method) || [];
      for (const listener of listeners) listener(payload.params);
    });
  }

  send(method, params = {}) {
    const id = ++this.counter;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) || [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
    return () => this.listeners.set(method, (this.listeners.get(method) || []).filter((entry) => entry !== listener));
  }

  waitFor(method, timeout = 15000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        off();
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeout);
      const off = this.on(method, (params) => {
        clearTimeout(timer);
        off();
        resolve(params);
      });
    });
  }

  close() {
    this.socket.close();
  }
}

async function getTarget() {
  const response = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
  if (!response.ok) throw new Error(`CDP target list failed: ${response.status}`);
  const targets = await response.json();
  const target = targets.find((entry) => entry.type === 'page');
  if (!target) throw new Error('No Chrome page target found');
  return target;
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Runtime evaluation failed');
  return result.result.value;
}

async function navigate(client, url) {
  const loaded = client.waitFor('Page.loadEventFired');
  await client.send('Page.navigate', { url: `${BASE_URL}${url}` });
  await loaded;
  await evaluate(client, 'document.fonts && document.fonts.ready ? document.fonts.ready.then(() => true) : true');
  await delay(1100);
}

async function primePage(client) {
  await evaluate(client, `(async () => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const height = Math.max(document.body.scrollHeight, root.scrollHeight);
    for (let top = 0; top < height; top += Math.max(520, Math.floor(window.innerHeight * 0.72))) {
      window.scrollTo(0, top);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, height);
    await new Promise((resolve) => setTimeout(resolve, 280));
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 320));
    root.style.scrollBehavior = previousBehavior;
    return true;
  })()`);
}

async function setViewport(client, viewport) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width < 600,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
  await client.send('Emulation.setTouchEmulationEnabled', {
    enabled: viewport.width < 600,
    maxTouchPoints: viewport.width < 600 ? 5 : 1,
  });
}

async function collectDiagnostics(client) {
  return evaluate(client, `(() => {
    const selectorFor = (element) => {
      if (element.id) return '#' + CSS.escape(element.id);
      const classes = [...element.classList].slice(0, 3).map((name) => '.' + CSS.escape(name)).join('');
      return element.tagName.toLowerCase() + classes;
    };
    const overflow = [...document.querySelectorAll('body *')].filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
    }).slice(0, 20).map((element) => {
      const rect = element.getBoundingClientRect();
      return { selector: selectorFor(element), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
    });
    const brokenImages = [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src);
    const headings = [...document.querySelectorAll('h1')].map((heading) => heading.textContent.trim());
    const unlabeledButtons = [...document.querySelectorAll('button')].filter((button) => !button.textContent.trim() && !button.getAttribute('aria-label') && !button.getAttribute('title')).map(selectorFor);
    const unlabeledInputs = [...document.querySelectorAll('input:not([type="hidden"]), select, textarea')].filter((field) => {
      const labels = field.labels ? [...field.labels] : [];
      return !labels.length && !field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby');
    }).map(selectorFor);
    return {
      title: document.title,
      pathname: location.pathname,
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      overflow,
      brokenImages,
      h1Count: headings.length,
      headings,
      unlabeledButtons,
      unlabeledInputs,
      visiblePlaceholders: [...document.querySelectorAll('body *')].filter((element) => element.children.length === 0 && /\\[(?:à|a) compléter\\]|lorem ipsum|placeholder/i.test(element.textContent || '')).slice(0, 20).map((element) => element.textContent.trim()),
    };
  })()`);
}

async function capture(client, filename, fullPage = true) {
  let params = { format: 'png', fromSurface: true, captureBeyondViewport: fullPage };
  if (fullPage) {
    const metrics = await client.send('Page.getLayoutMetrics');
    const { width, height } = metrics.cssContentSize || metrics.contentSize;
    params = { ...params, clip: { x: 0, y: 0, width: Math.ceil(width), height: Math.ceil(height), scale: 1 } };
  }
  const { data } = await client.send('Page.captureScreenshot', params);
  await writeFile(path.join(OUTPUT_DIR, filename), Buffer.from(data, 'base64'));
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const target = await getTarget();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  await Promise.all([
    client.send('Page.enable'),
    client.send('Runtime.enable'),
    client.send('Log.enable'),
    client.send('Network.enable'),
  ]);

  const diagnostics = [];
  const specialChecks = {};
  let activeConsole = [];
  let activeNetworkFailures = [];
  client.on('Runtime.consoleAPICalled', (event) => {
    if (['error', 'warning'].includes(event.type)) activeConsole.push({ type: event.type, text: event.args.map((arg) => arg.value || arg.description || '').join(' ') });
  });
  client.on('Runtime.exceptionThrown', (event) => activeConsole.push({ type: 'exception', text: event.exceptionDetails?.text || 'Runtime exception' }));
  client.on('Log.entryAdded', (event) => {
    if (['error', 'warning'].includes(event.entry.level)) activeConsole.push({ type: event.entry.level, text: event.entry.text });
  });
  client.on('Network.loadingFailed', (event) => {
    if (!event.canceled) activeNetworkFailures.push({ errorText: event.errorText, type: event.type });
  });

  for (const viewport of viewports) {
    await setViewport(client, viewport);
    const viewportKey = `${viewport.width}x${viewport.height}`;
    for (const route of routes) {
      activeConsole = [];
      activeNetworkFailures = [];
      await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
      await navigate(client, route.url);
      await primePage(client);
      const result = await collectDiagnostics(client);
      diagnostics.push({ route: route.url, routeName: route.name, viewport: viewportKey, ...result, console: [...activeConsole], networkFailures: [...activeNetworkFailures] });
      const shouldCapture = captureViewportKeys.has(viewportKey) || route.name === 'home';
      if (shouldCapture) await capture(client, `${route.name}-${viewportKey}.png`);
    }
  }

  await setViewport(client, { width: 390, height: 844 });
  await navigate(client, '/');
  await primePage(client);
  await evaluate(client, `(() => { const button = document.querySelector('button[aria-label="Ouvrir le menu"]'); if (!button) return false; button.click(); return true; })()`);
  await delay(650);
  specialChecks.mobileMenuOpen = await evaluate(client, `(() => {
    const panel = document.querySelector('#mobile-navigation');
    const style = panel ? getComputedStyle(panel) : null;
    return {
      exists: Boolean(panel),
      opacity: style?.opacity ?? null,
      overflowY: style?.overflowY ?? null,
      activeLabel: document.activeElement?.getAttribute('aria-label') ?? null,
      bodyOverflow: document.body.style.overflow,
    };
  })()`);
  await capture(client, 'mobile-navigation-390x844.png', false);
  await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Tab', code: 'Tab', modifiers: 8 });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', modifiers: 8 });
  await delay(80);
  specialChecks.mobileMenuShiftTab = await evaluate(client, `({ text: document.activeElement?.textContent?.trim() ?? null, label: document.activeElement?.getAttribute('aria-label') ?? null })`);
  await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Tab', code: 'Tab', modifiers: 8 });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', modifiers: 8 });
  await delay(80);
  specialChecks.mobileMenuFocusWrap = await evaluate(client, `({ text: document.activeElement?.textContent?.trim() ?? null, href: document.activeElement?.getAttribute('href') ?? null })`);
  await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape' });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await delay(100);
  specialChecks.mobileMenuEscape = await evaluate(client, `({ closed: !document.querySelector('#mobile-navigation'), activeLabel: document.activeElement?.getAttribute('aria-label') ?? null, bodyOverflow: document.body.style.overflow })`);

  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await navigate(client, '/');
  await evaluate(client, `(() => { const button = document.querySelector('button[aria-label="Ouvrir le menu"]'); if (!button) return false; button.click(); return true; })()`);
  await delay(120);
  specialChecks.reducedMotionMenu = await evaluate(client, `(() => {
    const panel = document.querySelector('#mobile-navigation');
    const style = panel ? getComputedStyle(panel) : null;
    const rect = panel?.getBoundingClientRect();
    return { exists: Boolean(panel), opacity: style?.opacity ?? null, width: rect?.width ?? 0, height: rect?.height ?? 0, activeLabel: document.activeElement?.getAttribute('aria-label') ?? null };
  })()`);
  await capture(client, 'mobile-navigation-reduced-390x844.png', false);
  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });

  await setViewport(client, { width: 1024, height: 768 });
  await navigate(client, '/');
  await evaluate(client, `(() => { const button = document.querySelector('button[aria-label="Ouvrir le menu"]'); if (!button) return false; button.click(); return true; })()`);
  await delay(650);
  specialChecks.laptopMenu = await evaluate(client, `(() => {
    const panel = document.querySelector('#mobile-navigation');
    const cta = panel?.querySelector('a[href="/contact"]');
    return { exists: Boolean(panel), clientHeight: panel?.clientHeight ?? 0, scrollHeight: panel?.scrollHeight ?? 0, ctaBottom: cta?.getBoundingClientRect().bottom ?? null };
  })()`);
  await capture(client, 'mobile-navigation-1024x768.png', false);

  await setViewport(client, { width: 1440, height: 900 });
  await navigate(client, '/');
  await primePage(client);
  await evaluate(client, 'window.scrollTo(0, 950); new Promise((resolve) => setTimeout(resolve, 500))');
  await capture(client, 'header-scrolled-1440x900.png', false);

  await setViewport(client, { width: 390, height: 844 });
  await navigate(client, '/contact');
  await primePage(client);
  await evaluate(client, `(() => { const button = document.querySelector('button[type="submit"]'); if (!button) return false; button.click(); return true; })()`);
  await delay(350);
  specialChecks.contactValidation = await evaluate(client, `(() => {
    const skip = document.querySelector('.skip-link');
    return {
      errorCount: document.querySelectorAll('.contact-form small[role="alert"]').length,
      activeId: document.activeElement?.id ?? null,
      skipFocused: document.activeElement === skip,
      skipTransform: skip ? getComputedStyle(skip).transform : null,
    };
  })()`);
  await capture(client, 'contact-validation-390x844.png');

  await setViewport(client, { width: 1440, height: 900 });
  await client.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await navigate(client, '/');
  await primePage(client);
  const reducedMotion = await collectDiagnostics(client);
  await capture(client, 'home-reduced-motion-1440x900.png', false);

  await writeFile(path.join(OUTPUT_DIR, 'diagnostics.json'), JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl: BASE_URL, diagnostics, reducedMotion, specialChecks }, null, 2));
  client.close();
  process.stdout.write(`Audited ${diagnostics.length} route/viewport combinations and wrote artifacts to ${OUTPUT_DIR}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
