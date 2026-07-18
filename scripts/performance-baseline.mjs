import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3001';
const PHASE = process.env.PERF_PHASE ?? 'baseline';
const OUTPUT_DIR = path.resolve('artifacts', 'performance', PHASE);

const routes = [
  ['home', '/'],
  ['cabinet', '/cabinet'],
  ['expertises', '/expertises'],
  ['expertise-foncier', '/expertises/valorisation-fonciere'],
  ['missions', '/missions'],
  ['methode', '/methode'],
  ['references', '/references'],
  ['reference-tinmel', '/references/tinmel'],
  ['journal', '/journal'],
  ['contact', '/contact'],
];

const viewports = [
  { width: 390, height: 844, label: 'mobile' },
  { width: 1440, height: 900, label: 'desktop' },
];

async function collect(page) {
  return page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paints = Object.fromEntries(
      performance.getEntriesByType('paint').map((entry) => [entry.name, Math.round(entry.startTime)]),
    );
    const resources = performance.getEntriesByType('resource');
    const images = resources.filter((entry) =>
      entry.initiatorType === 'img'
      || /\.(?:avif|webp|jpe?g|png|gif|svg)(?:\?|$)/i.test(entry.name)
      || entry.name.includes('/_next/image'),
    );
    const scripts = resources.filter((entry) =>
      entry.initiatorType === 'script' || /\.js(?:\?|$)/i.test(entry.name),
    );
    const css = resources.filter((entry) =>
      entry.initiatorType === 'link' || /\.css(?:\?|$)/i.test(entry.name),
    );
    const sum = (list) => Math.round(list.reduce((total, entry) => total + (entry.transferSize || 0), 0));
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    const lcp = lcpEntries.at(-1);
    const cls = performance.getEntriesByType('layout-shift')
      .filter((entry) => !entry.hadRecentInput)
      .reduce((total, entry) => total + entry.value, 0);
    return {
      url: location.href,
      documentTitle: document.title,
      fcp: paints['first-contentful-paint'] ?? null,
      lcp: lcp ? Math.round(lcp.startTime) : null,
      lcpUrl: lcp?.url || null,
      cls: Number(cls.toFixed(4)),
      domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      loadEvent: nav ? Math.round(nav.loadEventEnd) : null,
      transfer: {
        total: sum(resources),
        images: sum(images),
        scripts: sum(scripts),
        css: sum(css),
      },
      counts: {
        resources: resources.length,
        images: images.length,
        scripts: scripts.length,
        css: css.length,
      },
      topImages: images
        .map((entry) => ({
          url: entry.name.replace(location.origin, ''),
          transferKB: Math.round((entry.transferSize || 0) / 1024),
          decodedKB: Math.round((entry.decodedBodySize || 0) / 1024),
        }))
        .sort((a, b) => b.transferKB - a.transferKB)
        .slice(0, 12),
      heroImageCount: document.querySelectorAll('.home-hero__images img').length,
      heroCompleteImages: [...document.querySelectorAll('.home-hero__images img')].filter((image) => image.complete && image.naturalWidth > 0).length,
    };
  });
}

async function openMeasuredPage(browser, viewport, url) {
  const page = await browser.newPage({ viewport });
  await page.addInitScript(() => {
    try {
      new PerformanceObserver(() => {}).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(() => {}).observe({ type: 'layout-shift', buffered: true });
    } catch {
      // Older engines may lack some entry types.
    }
  });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(1200);
  return page;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const results = [];

  for (const viewport of viewports) {
    for (const [name, route] of routes) {
      const page = await openMeasuredPage(browser, viewport, `${BASE_URL}${route}`);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += Math.max(700, innerHeight)) {
          scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        scrollTo(0, 0);
      });
      await page.waitForTimeout(400);
      const metrics = await collect(page);
      results.push({
        phase: PHASE,
        route: name,
        path: route,
        viewport: `${viewport.width}x${viewport.height}`,
        ...metrics,
      });
      await page.close();
      process.stdout.write(`Measured ${name} @ ${viewport.width}x${viewport.height}\n`);
    }
  }

  // Focused homepage first-load image check before scroll.
  const firstLoad = await openMeasuredPage(browser, { width: 1440, height: 900 }, `${BASE_URL}/`);
  await firstLoad.waitForTimeout(200);
  const homepageFirstPaint = await firstLoad.evaluate(() => {
    const images = performance.getEntriesByType('resource').filter((entry) =>
      entry.initiatorType === 'img'
      || entry.name.includes('/_next/image')
      || /\.(?:avif|webp|jpe?g|png)(?:\?|$)/i.test(entry.name),
    );
    return {
      imageRequests: images.length,
      imageTransferKB: Math.round(images.reduce((total, entry) => total + (entry.transferSize || 0), 0) / 1024),
      images: images.map((entry) => ({
        url: entry.name.replace(location.origin, ''),
        transferKB: Math.round((entry.transferSize || 0) / 1024),
      })),
      heroImgNodes: document.querySelectorAll('.home-hero__images img').length,
      heroLoaded: [...document.querySelectorAll('.home-hero__images img')].filter((image) => image.complete && image.naturalWidth > 0).map((image) => image.currentSrc.replace(location.origin, '')),
      lcp: (() => {
        const entry = performance.getEntriesByType('largest-contentful-paint').at(-1);
        return entry ? Math.round(entry.startTime) : null;
      })(),
    };
  });
  results.push({ phase: PHASE, route: 'home-first-paint', path: '/', viewport: '1440x900', ...homepageFirstPaint });
  await firstLoad.close();

  await writeFile(path.join(OUTPUT_DIR, 'metrics.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    phase: PHASE,
    results,
  }, null, 2));
  await browser.close();
  process.stdout.write(`Wrote ${path.join(OUTPUT_DIR, 'metrics.json')}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
