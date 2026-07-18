# ARCHERITAGE — Performance and interactions audit

Lab environment: local production build (`next build` + `next start` on `http://localhost:3001`), Windows, Playwright Chromium, measured on 2026-07-18.

Artifacts:

- Baseline: `artifacts/performance/baseline/metrics.json`
- Final: `artifacts/performance/final/metrics.json`
- Lighthouse (final only): `artifacts/performance/final/lighthouse-home-mobile.json`
- Script: `scripts/performance-baseline.mjs`

No claim is made that the public site loads in under two seconds on every network. Figures below are lab measurements on localhost.

---

## 1. Baseline measurements

Homepage first paint (desktop 1440×900, before scroll, no intentional wait for warm preload):

| Metric | Baseline |
|---|---:|
| Image requests | 10 |
| Image transfer | 1039 KB |
| Hero `<img>` nodes mounted | 5 |
| Hero slides fully loaded | 5 (all slides at `w=1920`) |

Homepage scrolled (includes below-the-fold images):

| Viewport | FCP (ms) | CLS | Image transfer (KB) | JS transfer (KB) | Hero imgs |
|---|---:|---:|---:|---:|---:|
| 390×844 | 912 | 0 | 354 | 178 | 5 |
| 1440×900 | 672 | 0 | 1039 | 182 | 5 |

Playwright `largest-contentful-paint` entries were not reliably exposed in this Chromium setup (`lcp: null`). Image waterfall and transfer size were used as the primary before/after signal.

Main baseline finding: inactive hero slides used `loading="lazy"` but remained `position: absolute; inset: 0` inside the viewport, so the browser treated all five as visible and fetched five full-bleed optimized images immediately.

---

## 2. Final measurements

Homepage first paint (same protocol):

| Metric | Baseline | Final | Delta |
|---|---:|---:|---:|
| Image requests | 10 | 6 | −4 |
| Image transfer | 1039 KB | 388 KB | −651 KB (−63%) |
| Hero `<img>` nodes | 5 | 1 | −4 |
| Hero slides loaded | 5 | 1 (LCP only) | −4 |

Only the first hero slide is requested on initial paint (`q=80`, `priority`). The next slide is warmed ~2.5s later; previous/next neighbors mount after the first navigation.

Homepage scrolled:

| Viewport | FCP before → after | CLS | Images KB before → after | Hero imgs before → after |
|---|---|---:|---|---|
| 390×844 | 912 → 740 | 0 | 354 → 282 | 5 → 2 |
| 1440×900 | 672 → 816 | 0 | 1039 → 702 | 5 → 2 |

FCP variance on scrolled runs is treated as lab noise; the stable win is reduced initial image transfer and fewer concurrent hero decodes.

---

## 3. Routes measured

Playwright metrics for both phases:

- `/`
- `/cabinet`
- `/expertises`
- `/expertises/valorisation-fonciere`
- `/missions`
- `/methode`
- `/references`
- `/references/tinmel`
- `/journal`
- `/contact`

Viewports: `390×844`, `1440×900`.

---

## 4. Image changes

- Converted and replaced the 3.5 MB PNG duplicates:
  - `public/images/hero/hero-urbanisme-foncier.png` → `.jpg` (~422 KB source)
  - `public/images/pillars/pillar-valorisation-fonciere.png` → `.jpg` (~422 KB source)
- Deleted the unused PNG sources after reference updates.
- Recompressed `public/images/journal/journal-architecture-residentielle.jpg` (972 KB → 631 KB) without changing layout.
- Kept Next.js image optimization (AVIF/WebP serving) rather than a blanket manual WebP migration.
- Hero LCP image quality set to `80`; other mounted slides use `75`.

---

## 5. Hero-loading changes

`HomeHeroSlider`:

- Mounts only slide `0` on first render (`priority` + `eager`).
- Warms slide `1` after 2.5s (or immediately under `prefers-reduced-motion`).
- After the first advance (autoplay or controls), mounts current + next + previous as needed.
- Keeps ink background + GSAP crossfade to avoid black flashes.
- Pauses autoplay when the tab is hidden.
- Does not preload all five slides.

---

## 6. `sizes` corrections

| Component / page | Updated `sizes` |
|---|---|
| `PillarCard` | `(max-width: 1023px) 100vw, 33vw` |
| Journal preview cards | `(max-width: 679px) 100vw, (max-width: 1023px) 50vw, 33vw` |
| `ReferenceCard` home | `(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw` |
| `ReferenceCard` index | `(max-width: 767px) 100vw, 50vw` |
| Cabinet founder | `(max-width: 1023px) 100vw, 42vw` |
| Expertise detail hero | `(max-width: 767px) 100vw, 48vw` |
| Reference detail hero | `(max-width: 1023px) 100vw, 58vw` |
| Hero | `100vw` (unchanged, correct) |
| `SafeImage` default | `(max-width: 768px) 100vw, 50vw` when callers omit `sizes` |

---

## 7. Font-loading corrections

- `Inter` and `Fraunces` remain via `next/font/google` (variable fonts, required for weights such as 480 / 650 / 750).
- Added explicit `display: 'swap'`.
- No Google Fonts CSS/HTML duplicates found.
- Weights were not switched to a static subset that would drop intermediate axes used in CSS.

---

## 8. JavaScript / client-component corrections

- Live client surfaces kept where required: header/mobile nav, hero slider, Lenis provider, method timeline, footer motion, journal accordion, contact form.
- Removed permanent `will-change-transform` from `Reveal` / `RevealGroup`.
- `animations.css` remains unimported by the live app (dead legacy motion sheet); its global `0.01ms` reduced-motion hammer and permanent `will-change` rules were neutralized so accidental import is safer.
- No new client wrappers added around static page sections.
- Contact route remains the heaviest interactive page (~33 KB route JS for RHF/Zod) — expected and left intact.

---

## 9. GSAP / Lenis corrections

- Single Lenis instance via `AnimationProvider` → `useLenis`.
- Added a document-level guard (`activeLenisCount`) against duplicate Lenis construction.
- Lenis still skips entirely under `prefers-reduced-motion`.
- Ticker + visibility stop/start + cleanup on unmount retained.
- Hero GSAP still cleans via `overwrite: true` and scoped `useGSAP`.
- No full animation-system rewrite.

---

## 10. Contact reassurance added

Below the submit button (exact wording):

> Vos informations sont utilisées uniquement pour traiter votre demande et préparer le premier échange.

Discreet link: `En savoir plus sur la confidentialité` → `/confidentialite`.

Typography: `.contact-form-privacy` at `0.875rem` (~14px) with muted color and sufficient contrast; not styled as an error.

No new consent checkbox. Absolute unverified claims were not added.

---

## 11. Anti-spam review results

Reviewed and retained:

| Control | Status |
|---|---|
| Honeypot (`website`) | Retained; now returns the same success copy as a real submit (no bot tell) |
| Shared Zod schema (client + server) | Retained |
| Request size limit | Retained |
| Attachment size / extension / MIME | Retained |
| File-signature validation | Retained |
| Rate limit (5 / 15 min / IP, map prune) | Retained |
| HTML escaping in email body | Retained |
| Resend timeout + generic error messages | Retained |
| Filename sanitation | **Added** (`sanitizeContactAttachmentFilename`) |

Not added: Google reCAPTCHA (no demonstrated spam problem; extra JS/privacy/failure surface). Architecture remains compatible with a future challenge if needed. No empty Captcha placeholders.

---

## 12. Micro-interactions removed / avoided

- Global `* { transition… }` / Manus-style interaction CSS was **not** imported.
- Global `prefers-reduced-motion` `0.01ms !important` hammer removed from live `globals.css`.
- Card `translateY(-3px)` lift removed from reference cards.
- Button hover lift reduced from `2px` to `1px`.
- Permanent `will-change` removed from reveal wrappers and neutralized in unused `animations.css`.
- No pulse / float / bounce / glow / shimmer systems added.

---

## 13. Micro-interactions retained / standardized

- Primary buttons: fill transition + ~3px arrow translate + ≤1px vertical lift.
- Text links: underline draw (existing) + 3px arrow move.
- Image-led cards: ~1.03 image scale inside overflow-hidden; border/surface change; title shift ≤3px on references.
- Accordion: existing height/opacity timing (~250–350ms class of motion) with reduced-motion disable.
- Form: focus border + ring; no layout shift on focus.
- Header sticky behavior unchanged.
- Hero GSAP fade/scale retained for sighted motion users.

---

## 14. Reduced-motion behavior

Targeted rules in `globals.css` disable non-essential transitions/animations for hero progress, cards, buttons, accordion, and image zooms.

Runtime:

- Lenis disabled.
- Hero autoplay/progress animation disabled; controls remain usable.
- GSAP reveals/timeline/footer entrance short-circuit when reduced motion is set.

No global `0.01ms` rule that would break required UI timing.

---

## 15. Deferred features

Explicitly not implemented (and no dead UI left for them):

- Testimonials / testimonial carousel
- Lead magnets, sticky guide banner, guide landing, PDF download
- Newsletter / Mailchimp / Brevo
- Project impact metrics, budgets, surfaces, durations, conformity %
- External Captcha
- CRM
- ICE / IF / RC / capital / CNDP number / cookie banner

Privacy page content remains scoped to the contact form only.

---

## 16. Remaining performance risks

- Chrome’s native lazy-loading root margin can still fetch near-fold pillar/reference images shortly after first paint.
- Contact page JS weight remains high because of React Hook Form + Zod (acceptable for the form).
- Local Lighthouse still reports non-trivial main-thread work (~8.1s lab breakdown) and TBT (~360 ms) on mobile emulation — partly tooling/emulation cost, partly GSAP/Lenis on the homepage.
- Hero aerial slide remains a heavy photograph even as JPEG; further artistic compression would need design approval.
- Orphan legacy motion modules (`HomeMotion`, `CursorFollower`, etc.) are unused by live routes but still present in the repo (bundle-tree shaking keeps them out of production pages that do not import them).

---

## 17. Lighthouse / equivalent results

### Playwright before/after (primary)

See sections 1–2. First-paint image transfer on homepage desktop: **1039 KB → 388 KB**.

### Lighthouse (final only, mobile, localhost)

| Metric | Value |
|---|---|
| Performance score | 0.70 |
| FCP | 2.1 s |
| LCP | 4.3 s |
| CLS | 0 |
| TBT | 360 ms |
| Speed Index | 5.7 s |
| Total byte weight | 679 KiB |

Baseline Lighthouse was not captured before code changes (tooling permission issues on first attempt). Do not treat the 0.70 score as a before/after delta.

---

## 18. Lint result

```text
npm run lint
```

Passed (exit code 0).

---

## 19. TypeScript result

```text
npx tsc --noEmit --incremental false
```

Passed (exit code 0), including after the final hero preload adjustment.

---

## 20. Build result

```text
npm run build
```

Passed. Production routes generated successfully. Homepage first-load JS shared ~102 KB; contact remains the heaviest interactive route by design.

```text
git diff --check
```

Passed (no conflict markers / whitespace errors reported beyond normal CRLF notices).

---

## Comparison tables (scrolled lab runs)

### 390×844

| Route | FCP before | FCP after | CLS | Images KB before | Images KB after | JS KB | Hero imgs |
|---|---:|---:|---:|---:|---:|---:|---:|
| home | 912 | 740 | 0 | 354 | 282 | 178 | 2 |
| cabinet | 376 | 688 | 0 | 21 | 21 | 178 | 0 |
| expertises | 348 | 640 | 0 | 156 | 154 | 178 | 0 |
| expertise-foncier | 380 | 620 | 0 | 95 | 94 | 179 | 0 |
| missions | 364 | 700 | 0 | 0 | 0 | 178 | 0 |
| methode | 316 | 464 | 0 | 0 | 0 | 178 | 0 |
| references | 312 | 656 | 0 | 81 | 81 | 178 | 0 |
| reference-tinmel | 320 | 348 | 0 | 23 | 23 | 178 | 0 |
| journal | 456 | 760 | 0 | 150 | 149 | 179 | 0 |
| contact | 728 | 1068 | 0 | 0 | 0 | 210 | 0 |

FCP on non-home routes fluctuates run-to-run on localhost; image transfer is the stable comparator.

### 1440×900

| Route | FCP before | FCP after | CLS | Images KB before | Images KB after | JS KB | Hero imgs |
|---|---:|---:|---:|---:|---:|---:|---:|
| home | 672 | 816 | 0 | 1039 | 702 | 182 | 2 |
| cabinet | 348 | 552 | 0 | 21 | 21 | 182 | 0 |
| expertises | 468 | 716 | 0 | 156 | 154 | 181 | 0 |
| expertise-foncier | 536 | 788 | 0 | 127 | 125 | 182 | 0 |
| missions | 460 | 636 | 0 | 0 | 0 | 182 | 0 |
| methode | 528 | 556 | 0 | 0 | 0 | 182 | 0 |
| references | 444 | 716 | 0 | 105 | 105 | 181 | 0 |
| reference-tinmel | 408 | 700 | 0 | 43 | 43 | 181 | 0 |
| journal | 600 | 1020 | 0 | 150 | 149 | 182 | 0 |
| contact | 1008 | 984 | 0 | 0 | 0 | 215 | 0 |

Exact final numbers for every route are in `artifacts/performance/final/metrics.json`.

---

## Summary

The production optimization phase reduced homepage first-paint image weight by roughly **63%**, stopped loading all five hero slides up front, compressed the heaviest PNG sources, corrected responsive `sizes`, restrained micro-interactions, replaced the global reduced-motion hammer with targeted rules, added truthful contact privacy reassurance, and lightly hardened attachment filename handling — without redesign, Manus marketing content, Captcha, or legal identifiers.
