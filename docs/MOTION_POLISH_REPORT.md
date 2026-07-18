# Motion polish report

## 1. Motion system created

Centralized under `src/lib/motion/`:

| Module | Role |
| --- | --- |
| `tokens.ts` | Durations (UI 240ms, reveal 750ms, image 950ms, hero 1050ms), stagger 70–110ms, easing (`power2.out` / `power3.out`), image/slide scales |
| `prefers.ts` | `prefersReducedMotion()`, `isMobileViewport()` |
| `reveal.ts` | `prepareLineMask` / `revealLineMask`, `drawLine`, `curtainImage`, `fadeRise` |
| `index.ts` | Public barrel |

Declarative orchestration:

- `EditorialMotion` — page heroes + grouped section ScrollTriggers via data attributes
- `HomeHeroSlider` — one-shot entrance + slide crossfade (LCP image never hidden)
- `MethodTimeline` — progress line + step activation
- `FooterMotion` — rule draw, wordmark mask, columns, legal row
- Mobile menu — panel + link stagger using shared tokens

Restricted vocabulary: line-mask headings, architectural `scaleX`/`scaleY` lines, image curtains, grouped fade-rise, restrained hovers. No Framer Motion.

## 2. Existing animation code removed or reused

**Reused**

- GSAP + ScrollTrigger + `@gsap/react`
- Single Lenis instance via `AnimationProvider` / `useLenis` (duplicate guard retained)
- Legacy `motion` export in `motion-config.ts` re-exports `motionTokens` for older modules (`HomeMotion`, `PageMotion`, showcase)

**Superseded on live routes**

- Homepage no longer wraps content in `HomeMotion` (generic per-card fades / pin scrub)
- Marketing pages use `EditorialMotion` instead of ad-hoc fades
- `PageMotion` remains only for showcase tooling; contact no longer animates individual inputs

## 3. Page-by-page motion added

| Route | Motion |
| --- | --- |
| `/` | Hero entrance (eyebrow → H1 line-mask → intro → CTAs → controls → proof); slide crossfade + 1.025→1 scale; progress fill; pillars / clients / references as grouped sections with curtains + body stagger |
| `/cabinet` | Experience, founder curtain, orientations, approach sequence |
| `/expertises` | Overview compositions with alternating media direction |
| `/expertises/[slug]` | Hero text + media; 2×2 competencies; fit panel; PATRIGOV; explore nav |
| `/missions` | Issues row; desktop formats progress line; table as one block |
| `/methode` | Proof; seven principles cluster; six-step cycle with scroll-driven line + `is-active` |
| `/references` | Index curtains + titles |
| `/references/[slug]` | Hero composition (Safi: typography only, no fake image); sections + prev/next |
| `/journal` | Planned cards as editorial row; accordion unchanged (opacity/height only) |
| `/contact` | Hero + guidance reveal; form panel immediately usable (no per-field scroll animation) |
| Header / mobile | Active underline CSS; menu overlay + fast link stagger; Accueil present |
| Footer | Rule, wordmark vertical mask, columns, legal last |

## 4. Desktop versus mobile behavior

| Concern | Desktop | Mobile (~&lt;768px) |
| --- | --- | --- |
| Durations / distance | Full tokens | Shortened; smaller `y` |
| Image curtains | Direction from layout (`left` / `right` / `up`) | Simplified `up` |
| Missions progress line | Visible `scaleX` connector | Hidden |
| Method cycle | Horizontal progress line | Vertical progress line; no pin / no parallax |
| Line masks | Multi-part when titles split on `. ` | Collapses to single mask if &gt;2 parts |
| Staggers | ~90ms | ~50–60ms |

## 5. Reduced-motion behavior

When `prefers-reduced-motion: reduce`:

- `EditorialMotion` / `FooterMotion` / hero entrance clear transforms and force visible content
- Hero autoplay and progress animation disabled; slides swap without scale
- Method steps marked active immediately; no progress tween
- Mobile menu opens without stagger timeline
- Lenis not initialized
- Hover/transform CSS reduced via existing `prefers-reduced-motion` rules in `globals.css`

## 6. Performance safeguards

- Homepage still mounts only slide `0` initially; warms slide `1` after ~2.5s; neighbors after navigation
- LCP hero image never starts at `autoAlpha: 0`
- Grouped ScrollTriggers with `once: true` (no replay on small scroll)
- Autoplay pauses when tab hidden
- Transforms/opacity preferred; no permanent `will-change`
- Contact form not gated behind scroll reveals
- Header `z-index` raised to keep controls above transformed media

## 7. Recordings generated

Saved under `artifacts/motion-polish/` (production server, Playwright Chromium):

1. `01-home-load-scroll.webm` — initial load + first scroll (1440×900)
2. `02-home-pillars-references.webm` — pillars and references
3. `03-methode-cycle.webm` — PATRIGOV cycle
4. `04-mobile-menu.webm` — open/close (390×844)
5. `05-mobile-home-scroll.webm` — mobile homepage scroll

Script: `scripts/record-motion-polish.mjs`.

## 8. Files changed

**New**

- `src/lib/motion/tokens.ts`, `prefers.ts`, `reveal.ts`, `index.ts`
- `src/components/motion/EditorialMotion.tsx`
- `scripts/record-motion-polish.mjs`
- `artifacts/motion-polish/*.webm`
- `docs/MOTION_POLISH_REPORT.md`

**Updated (motion wiring / polish)**

- `src/app/page.tsx`, `cabinet`, `contact`, `expertises`, `expertises/[slug]`, `journal`, `methode`, `missions`, `references`, `references/[slug]`
- `src/components/home/HomeHeroSlider.tsx`, `ClientSegmentation.tsx`
- `src/components/layout/Footer.tsx`, `MobileMenu.tsx`
- `src/components/motion/FooterMotion.tsx`, `MethodTimeline.tsx`
- `src/components/sections/ReferenceCard.tsx`
- `src/components/ui/CTASection.tsx`, `PageHero.tsx`, `PillarCard.tsx`, `SectionHeading.tsx`
- `src/lib/motion-config.ts`
- `src/app/globals.css`

## 9. Lint, TypeScript and build results

| Check | Result |
| --- | --- |
| `npm run lint` | Pass |
| `npx tsc --noEmit --incremental false` | Pass |
| `npm run build` | Pass |
| `git diff --check` | Pass (CRLF warnings only on Windows) |

Verified locally: Accueil in `siteRoutes` (Header, mobile menu, Footer); selective hero image mounting intact.

## 10. Remaining issues

- Legacy `HomeMotion` / `PageMotion` / `CursorFollower` still exist for showcase or unused paths; they are not on primary marketing routes.
- Motion recordings require a healthy JS server (`next start` or a fresh `next dev`); recording against a broken post-build `.next` cache yields static HTML without hydration.
- Tablet (768–1024) inherits desktop choreography with fluid layout; no separate tablet-only timeline beyond CSS breakpoints.
- Expertise overview blocks share the same EditorialMotion recipe with alternating curtain directions; further per-block timeline uniqueness would need content-level direction attributes only.
