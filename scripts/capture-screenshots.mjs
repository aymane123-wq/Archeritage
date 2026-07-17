import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.BASE_URL ?? 'http://localhost:3002';
const outDir = join(process.cwd(), 'screenshots', 'validation');

const shots = [
  { name: 'homepage-1440x900', url: '/', width: 1440, height: 900 },
  { name: 'homepage-1024x768', url: '/', width: 1024, height: 768 },
  { name: 'homepage-390x844', url: '/', width: 390, height: 844 },
  { name: 'references-index-1440x900', url: '/references', width: 1440, height: 900 },
  { name: 'reference-tinmel-1440x900', url: '/references/tinmel', width: 1440, height: 900 },
  { name: 'reference-tinmel-390x844', url: '/references/tinmel', width: 390, height: 844 },
  { name: 'reference-safi-1440x900', url: '/references/safi', width: 1440, height: 900 },
  { name: 'footer-desktop-1440x900', url: '/', width: 1440, height: 900, footer: true },
  { name: 'footer-mobile-390x844', url: '/', width: 390, height: 844, footer: true },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

for (const shot of shots) {
  await page.setViewportSize({ width: shot.width, height: shot.height });
  await page.goto(`${baseUrl}${shot.url}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  if (shot.footer) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const footer = page.locator('.site-footer');
    await footer.screenshot({ path: join(outDir, `${shot.name}.png`) });
  } else {
    await page.screenshot({ path: join(outDir, `${shot.name}.png`), fullPage: shot.height >= 844 && shot.width <= 390 });
  }

  console.log(`Saved ${shot.name}.png`);
}

await browser.close();
