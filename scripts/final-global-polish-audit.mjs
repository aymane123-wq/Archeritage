import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const PHASE = process.env.AUDIT_PHASE ?? 'before';
const OUTPUT_DIR = path.resolve('artifacts', 'final-global-polish', PHASE);

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
  ['home', '/'],
  ['cabinet', '/cabinet'],
  ['expertises', '/expertises'],
  ['expertise-foncier', '/expertises/valorisation-fonciere'],
  ['expertise-architecture', '/expertises/architecture-projets-envergure'],
  ['expertise-patrimoine', '/expertises/valorisation-patrimoine'],
  ['missions', '/missions'],
  ['methode', '/methode'],
  ['references', '/references'],
  ['reference-tinmel', '/references/tinmel'],
  ['reference-tiznit', '/references/tiznit'],
  ['reference-cervantes', '/references/cervantes'],
  ['reference-safi', '/references/safi'],
  ['journal', '/journal'],
  ['contact', '/contact'],
  ['mentions-legales', '/mentions-legales'],
  ['confidentialite', '/confidentialite'],
  ['not-found', '/route-inexistante-audit'],
];

const screenshotWidths = new Set([390, 768, 1440]);
const requiredAfterScreenshots = new Set([
  'home-390x844',
  'home-768x1024',
  'home-1440x900',
  'cabinet-1440x900',
  'expertises-1440x900',
  'expertise-foncier-1440x900',
  'missions-1440x900',
  'methode-1440x900',
  'references-1440x900',
  'reference-tinmel-1440x900',
  'journal-1440x900',
  'contact-1440x900',
]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function primePage(page) {
  await page.evaluate(async () => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const step = Math.max(760, Math.floor(window.innerHeight * 1.15));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 12));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 60));
    root.style.scrollBehavior = previous;
  });
}

async function collectDiagnostics(page) {
  return page.evaluate(() => {
    const selectorFor = (element) => {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const classes = [...element.classList]
        .slice(0, 3)
        .map((name) => `.${CSS.escape(name)}`)
        .join('');
      return `${element.tagName.toLowerCase()}${classes}`;
    };
    const viewportWidth = document.documentElement.clientWidth;
    const overflow = [...document.querySelectorAll('body *')]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.right > viewportWidth + 1 || rect.left < -1);
      })
      .slice(0, 20)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          selector: selectorFor(element),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      });
    const anchors = [...document.querySelectorAll('a[href]')].map((anchor) => ({
      text: anchor.textContent?.trim().replace(/\s+/g, ' ') || anchor.getAttribute('aria-label') || '',
      href: anchor.getAttribute('href'),
    }));
    const nestedInteractive = [...document.querySelectorAll('a, button')].filter((element) =>
      element.querySelector('a, button, input, select, textarea'),
    );
    return {
      title: document.title,
      pathname: location.pathname,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth,
      documentHeight: document.documentElement.scrollHeight,
      horizontalOverflow: document.documentElement.scrollWidth > viewportWidth + 1,
      overflow,
      brokenImages: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src),
      h1: [...document.querySelectorAll('h1')].map((heading) => heading.textContent?.trim()),
      unlabeledButtons: [...document.querySelectorAll('button')]
        .filter(
          (button) =>
            !button.textContent?.trim() &&
            !button.getAttribute('aria-label') &&
            !button.getAttribute('title'),
        )
        .map(selectorFor),
      unlabeledFields: [...document.querySelectorAll('input:not([type="hidden"]), select, textarea')]
        .filter(
          (field) =>
            !(field.labels && field.labels.length) &&
            !field.getAttribute('aria-label') &&
            !field.getAttribute('aria-labelledby'),
        )
        .map(selectorFor),
      nestedInteractive: nestedInteractive.map(selectorFor),
      visiblePlaceholders: [...document.querySelectorAll('body *')]
        .filter(
          (element) =>
            element.children.length === 0 &&
            /lorem ipsum|placeholder|\[(?:à|a) compléter\]/i.test(element.textContent || ''),
        )
        .map((element) => element.textContent?.trim()),
      anchors,
    };
  });
}

async function capture(page, name, fullPage = true) {
  await page.screenshot({
    path: path.join(OUTPUT_DIR, `${name}.png`),
    fullPage,
    animations: 'disabled',
  });
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const diagnostics = [];
  const special = {};

  for (const viewport of viewports) {
    const viewportKey = `${viewport.width}x${viewport.height}`;
    for (const [name, route] of routes) {
      const page = await browser.newPage({ viewport });
      const consoleMessages = [];
      const pageErrors = [];
      const failedRequests = [];
      page.on('console', (message) => {
        if (['error', 'warning'].includes(message.type())) {
          consoleMessages.push({ type: message.type(), text: message.text() });
        }
      });
      page.on('pageerror', (error) => pageErrors.push(error.message));
      page.on('requestfailed', (request) => {
        if (request.failure()?.errorText !== 'net::ERR_ABORTED') {
          failedRequests.push({
            url: request.url(),
            error: request.failure()?.errorText,
          });
        }
      });
      const response = await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'load',
        timeout: 30_000,
      });
      await page.waitForTimeout(100);
      await primePage(page);
      const result = await collectDiagnostics(page);
      diagnostics.push({
        route,
        name,
        viewport: viewportKey,
        status: response?.status() ?? null,
        ...result,
        consoleMessages,
        pageErrors,
        failedRequests,
      });
      const screenshotKey = `${name}-${viewportKey}`;
      if (
        (PHASE === 'before' && screenshotWidths.has(viewport.width)) ||
        (PHASE !== 'before' && requiredAfterScreenshots.has(screenshotKey))
      ) {
        await capture(page, `${name}-${viewportKey}`);
      }
      await page.close();
      process.stdout.write(`Audited ${route} at ${viewportKey}\n`);
    }
  }

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(`${BASE_URL}/`, { waitUntil: 'load' });
  await desktop.waitForTimeout(500);
  await capture(desktop, 'home-hero-slide-01-1440x900', false);
  const nextSlide = desktop.getByRole('button', { name: /suivant/i });
  if (await nextSlide.count()) {
    for (let index = 2; index <= 5; index += 1) {
      await nextSlide.click();
      await desktop.waitForTimeout(500);
      await capture(desktop, `home-hero-slide-0${index}-1440x900`, false);
    }
  }
  await desktop.evaluate(() => window.scrollTo(0, 1100));
  await desktop.waitForTimeout(250);
  await desktop.evaluate(() => window.scrollTo(0, 850));
  await desktop.waitForTimeout(450);
  await capture(desktop, 'header-scrolled-1440x900', false);
  special.headerScrolled = await desktop.locator('.site-header').evaluate((header) => ({
    classes: header.className,
    top: header.getBoundingClientRect().top,
    height: header.getBoundingClientRect().height,
  }));
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(`${BASE_URL}/`, { waitUntil: 'load' });
  await mobile.waitForTimeout(800);
  await mobile.getByRole('button', { name: /ouvrir le menu/i }).click();
  await mobile.waitForTimeout(350);
  await capture(mobile, 'mobile-menu-390x844', false);
  special.mobileMenu = await mobile.evaluate(() => ({
    panel: Boolean(document.querySelector('#mobile-navigation')),
    bodyOverflow: document.body.style.overflow,
    activeLabel: document.activeElement?.getAttribute('aria-label'),
  }));
  await mobile.keyboard.press('Escape');
  await mobile.close();

  const journal = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await journal.goto(`${BASE_URL}/journal`, { waitUntil: 'load' });
  const rubric = journal.getByRole('button', { name: /méthode et gouvernance/i });
  if (await rubric.count()) {
    await rubric.click();
    await journal.waitForTimeout(350);
    await rubric.scrollIntoViewIfNeeded();
    await capture(journal, 'journal-accordion-open-1440x900', false);
  }
  special.journal = {
    previewLinks: await journal.locator('.journal-preview-card a').count(),
    openRubrics: await journal.locator('[aria-expanded="true"]').count(),
  };
  await journal.close();

  const contact = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await contact.goto(`${BASE_URL}/contact`, { waitUntil: 'load' });
  await contact.locator('button[type="submit"]').click();
  await contact.waitForTimeout(250);
  await contact.locator('button[type="submit"]').scrollIntoViewIfNeeded();
  await capture(contact, 'contact-errors-390x844', false);
  special.contactErrors = {
    alerts: await contact.locator('[role="alert"]').count(),
    activeId: await contact.evaluate(() => document.activeElement?.id),
  };
  await contact.close();

  const contactSuccess = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await contactSuccess.route('**/api/contact', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Votre demande a bien été transmise.' }),
    }),
  );
  await contactSuccess.goto(`${BASE_URL}/contact`, { waitUntil: 'load' });
  await contactSuccess.locator('#fullName').fill('Test visuel');
  await contactSuccess.locator('#profile').selectOption({ index: 1 });
  await contactSuccess.locator('#email').fill('test@example.com');
  await contactSuccess.locator('#projectType').selectOption({ index: 1 });
  await contactSuccess.locator('#projectStage').selectOption({ index: 1 });
  await contactSuccess.locator('#message').fill('Demande de validation visuelle du formulaire.');
  await contactSuccess.locator('button[type="submit"]').click();
  await contactSuccess.locator('.form-status--success').waitFor();
  await contactSuccess.locator('.form-status--success').scrollIntoViewIfNeeded();
  await capture(contactSuccess, 'contact-success-390x844', false);
  special.contactSuccess = {
    visible: await contactSuccess.locator('.form-status--success').isVisible(),
    text: await contactSuccess.locator('.form-status--success').textContent(),
  };
  await contactSuccess.close();

  const footer = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await footer.goto(`${BASE_URL}/`, { waitUntil: 'load' });
  await footer.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await footer.waitForTimeout(900);
  await footer.locator('.site-footer').screenshot({
    path: path.join(OUTPUT_DIR, 'footer-1440x900.png'),
    animations: 'disabled',
  });
  await footer.close();

  const reduced = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  await reduced.goto(`${BASE_URL}/`, { waitUntil: 'load' });
  await reduced.waitForTimeout(300);
  special.reducedMotion = await reduced.evaluate(() => {
    const animated = document.querySelector('.home-hero__images img');
    return {
      mediaMatches: matchMedia('(prefers-reduced-motion: reduce)').matches,
      transitionDuration: animated ? getComputedStyle(animated).transitionDuration : null,
      animationDuration: animated ? getComputedStyle(animated).animationDuration : null,
    };
  });
  await capture(reduced, 'home-reduced-motion-1440x900', false);
  await reduced.close();

  await writeFile(
    path.join(OUTPUT_DIR, 'diagnostics.json'),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseUrl: BASE_URL,
        phase: PHASE,
        diagnostics,
        special,
      },
      null,
      2,
    ),
  );
  await browser.close();
  process.stdout.write(`Completed ${diagnostics.length} route/viewport checks in ${OUTPUT_DIR}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
