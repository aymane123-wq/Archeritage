import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3001';
const OUT = path.resolve('artifacts/content-navigation');

const shots = [
  ['home-desktop', '/', { width: 1440, height: 900 }],
  ['home-mobile', '/', { width: 390, height: 844 }],
  ['cabinet-desktop', '/cabinet', { width: 1440, height: 900 }],
  ['cabinet-mobile', '/cabinet', { width: 390, height: 844 }],
  ['expertises-desktop', '/expertises', { width: 1440, height: 900 }],
  ['expertise-detail-desktop', '/expertises/valorisation-fonciere', { width: 1440, height: 900 }],
  ['missions-desktop', '/missions', { width: 1440, height: 900 }],
  ['methode-desktop', '/methode', { width: 1440, height: 900 }],
  ['references-desktop', '/references', { width: 1440, height: 900 }],
  ['journal-desktop', '/journal', { width: 1440, height: 900 }],
  ['contact-desktop', '/contact', { width: 1440, height: 900 }],
  ['header-1440', '/', { width: 1440, height: 200, clipHeader: true }],
  ['header-1180', '/', { width: 1180, height: 200, clipHeader: true }],
  ['header-1100', '/', { width: 1100, height: 200, clipHeader: true }],
  ['header-1024', '/', { width: 1024, height: 200, clipHeader: true }],
  ['footer-desktop', '/', { width: 1440, height: 900, footer: true }],
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const [name, route, options] of shots) {
    const page = await browser.newPage({ viewport: { width: options.width, height: options.height === 200 ? 900 : options.height } });
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 60_000 });
    await page.waitForTimeout(500);

    if (options.footer) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(400);
      const footer = page.locator('footer.site-footer');
      await footer.screenshot({ path: path.join(OUT, `${name}.png`) });
    } else if (options.clipHeader) {
      const header = page.locator('header.site-header, .site-header').first();
      await header.screenshot({ path: path.join(OUT, `${name}.png`) });
    } else if (name === 'home-mobile') {
      // open mobile menu
      await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: false });
      const trigger = page.locator('.mobile-nav-trigger');
      if (await trigger.isVisible()) {
        await trigger.click();
        await page.waitForTimeout(600);
        await page.screenshot({ path: path.join(OUT, 'mobile-menu.png'), fullPage: false });
      }
    } else {
      await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: false });
    }

    // honeypot visibility check on contact
    if (route === '/contact') {
      const visible = await page.evaluate(() => {
        const pot = document.querySelector('.honeypot');
        if (!pot) return { present: false };
        const style = getComputedStyle(pot);
        const rect = pot.getBoundingClientRect();
        return {
          present: true,
          width: rect.width,
          height: rect.height,
          clip: style.clip,
          text: pot.textContent?.trim().slice(0, 40) || '',
          inTabOrder: [...document.querySelectorAll('input,button,select,textarea,a[href]')].some((el) => el.id === 'website' && el.tabIndex >= 0 && getComputedStyle(el).visibility !== 'hidden'),
        };
      });
      console.log('honeypot', JSON.stringify(visible));
    }

    await page.close();
    console.log('shot', name);
  }

  // Link audit
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  const nav = await page.evaluate(() => {
    const desktop = [...document.querySelectorAll('.desktop-nav a')].map((a) => ({ text: a.textContent?.trim(), href: a.getAttribute('href'), active: a.classList.contains('is-active') }));
    const footer = [...document.querySelectorAll('.site-footer nav a')].map((a) => ({ text: a.textContent?.replace(/\s+/g, ' ').trim(), href: a.getAttribute('href') }));
    return { desktop, footer };
  });
  console.log('nav', JSON.stringify(nav, null, 2));
  await page.close();
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
