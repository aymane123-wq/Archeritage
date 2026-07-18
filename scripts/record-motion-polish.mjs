import { chromium, devices } from 'playwright';
import { mkdir, rename, readdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.MOTION_BASE_URL ?? 'http://localhost:3000';
const OUT = path.resolve('artifacts/motion-polish');

async function settle(page, ms = 400) {
  await page.waitForTimeout(ms);
}

async function record(label, options, run) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...options,
    recordVideo: {
      dir: OUT,
      size: { width: options.viewport.width, height: options.viewport.height },
    },
  });
  const page = await context.newPage();
  await run(page);
  const video = page.video();
  await context.close();
  if (video) {
    const raw = await video.path();
    await rename(raw, path.join(OUT, `${label}.webm`));
    console.log(`saved ${label}.webm`);
  }
  await browser.close();
}

await mkdir(OUT, { recursive: true });

await record('01-home-load-scroll', { viewport: { width: 1440, height: 900 } }, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await settle(page, 1800);
  await page.mouse.wheel(0, 900);
  await settle(page, 900);
  await page.mouse.wheel(0, 1100);
  await settle(page, 1200);
});

await record('02-home-pillars-references', { viewport: { width: 1440, height: 900 } }, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await settle(page, 800);
  await page.locator('.home-pillars-section').scrollIntoViewIfNeeded();
  await settle(page, 1400);
  await page.locator('.home-references-section').scrollIntoViewIfNeeded();
  await settle(page, 1600);
});

await record('03-methode-cycle', { viewport: { width: 1440, height: 900 } }, async (page) => {
  await page.goto(`${BASE}/methode`, { waitUntil: 'networkidle' });
  await settle(page, 900);
  await page.locator('.method-timeline').scrollIntoViewIfNeeded();
  await settle(page, 1000);
  await page.mouse.wheel(0, 500);
  await settle(page, 1200);
});

await record('04-mobile-menu', { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } }, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await settle(page, 1200);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.querySelector('.site-header')?.classList.remove('site-header--hidden');
  });
  await settle(page, 300);
  await page.locator('.mobile-nav-trigger > button').first().evaluate((el) => el.click());
  await page.waitForSelector('#mobile-navigation', { state: 'attached', timeout: 5000 });
  await settle(page, 1000);
  await page.locator('#mobile-navigation [aria-label="Fermer le menu"]').evaluate((el) => el.click());
  await settle(page, 700);
});

await record('05-mobile-home-scroll', { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } }, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await settle(page, 1500);
  for (let i = 0; i < 5; i += 1) {
    await page.mouse.wheel(0, 650);
    await settle(page, 700);
  }
});

const files = (await readdir(OUT)).filter((f) => f.endsWith('.webm')).sort();
console.log('artifacts:', files.join(', '));
