# ARCHERITAGE — Content and navigation refinement

Date: 2026-07-18  
Environment: local production build (`next start` on port 3001)  
Screenshots: `artifacts/content-navigation/`

---

## 1. Navigation before and after

### Before
Desktop / mobile / footer (no Accueil):

1. Cabinet  
2. Expertises  
3. Missions  
4. Méthode  
5. Références  
6. Journal  
7. Contact (footer + CTA only in header)

Desktop breakpoint: `min-width: 1180px`

### After
Canonical list in `src/content/site/navigation.ts`:

1. Accueil → `/`  
2. Cabinet → `/cabinet`  
3. Expertises → `/expertises`  
4. Missions → `/missions`  
5. Méthode → `/methode`  
6. Références → `/references`  
7. Journal → `/journal`  
8. Contact → `/contact`

Desktop breakpoint raised to **`1220px`** so Accueil does not compress the bar at intermediate widths. At 1180px / 1100px / 1024px the hamburger menu is used.

---

## 2. Final Header menu (desktop ≥ 1220px)

| Item | Destination | Notes |
|---|---|---|
| Logo ARCHERITAGE | `/` | No active underline |
| Accueil | `/` | Active on homepage |
| Cabinet | `/cabinet` | |
| Expertises | `/expertises` | |
| Missions | `/missions` | |
| Méthode | `/methode` | |
| Références | `/references` | |
| Journal | `/journal` | |
| CONTACTEZ-NOUS | `/contact` | Separate CTA button |

Verified at 1440px: Accueil active + underline; CTA intact (`artifacts/content-navigation/header-1440.png`).

---

## 3. Final mobile-menu items

Same text links as desktop (Contact excluded from the list), numbered in the panel, plus bottom CTA **CONTACTEZ-NOUS**. Accueil is first. Breakpoint sync: `matchMedia('(min-width: 1220px)')` in `MobileMenu.tsx`.

---

## 4. Final Footer menu

| # | Label | Href |
|---|---|---|
| 01 | Accueil | `/` |
| 02 | Cabinet | `/cabinet` |
| 03 | Expertises | `/expertises` |
| 04 | Missions | `/missions` |
| 05 | Méthode | `/methode` |
| 06 | Références | `/references` |
| 07 | Journal | `/journal` |
| 08 | Contact | `/contact` |

Footer positioning reduced to:

- eyebrow: `Cabinet d’architecture`  
- statement: `Valorisation foncière, projets d’envergure et patrimoine.`  

Removed the third redundant sentence about “trois expertises…”.

---

## 5. Content removed per page

| Page | Removed / demoted |
|---|---|
| Accueil | Second long hero paragraph (founder 35 years); long references disclaimer; pillar competency dump stays off homepage |
| Cabinet | Defensive “n’est pas un cabinet qui débute”; full three-pillar card block with repeated descriptions |
| Expertises | Per-card Contact CTAs; long governance title; second competing conversion path |
| Missions | Long supporting hero paragraph; “finançable” implication |
| Méthode | Long supporting hero paragraph; expanded proof wording |
| Références | Dual-paragraph attribution; long founder résumé in hero |
| Journal | Redundant middle hero paragraph; newsletter-implying CTA |
| Contact | Large separate “Confidentialité” block (reassurance remains under the form) |
| Footer | Third positioning sentence |

---

## 6. Content rewritten per page

### Accueil
- Hero intro → single sentence on who ARCHERITAGE accompanies and the three fields.  
- H1 unchanged.  
- Proof note shortened.  
- Pillar descriptions shortened (competencies remain on detail pages).  
- References section uses one attribution line.

### Cabinet
- New H1: `Un cabinet d’architecture pour les projets qui engagent un territoire`  
- Positive founding introduction.  
- Experience section keeps UNESCO / UNDP / Banque mondiale with explicit founder attribution.  
- Pillars replaced by three text links to expertise-detail pages.  
- Founder biography shortened (~110 words) without repeating UNESCO / World Bank.  
- Approach kept; formats as short links (Diagnostic, Étude, AMO, Audit, Gouvernance).

### Expertises
- Shorter title and one supporting paragraph.  
- Cards: competencies + primary `Découvrir l’expertise` only.  
- Shared final Contact CTA.

### Expertise detail
- Hero introductions tightened (no rebuild).  
- Structure unchanged: competencies, fit, PATRIGOV band, nav, CTA.

### Missions
- H1: `Choisir le bon niveau d’accompagnement`  
- Formats and needs shortened; “structuré et argumenté” replaces “finançable”.

### Méthode
- One-paragraph hero.  
- Shorter proof, cycle phrases, proprietary note.  
- CTA label: `Évaluer le cadre de gouvernance`.

### Références
- Concise intro + single attribution.  
- Cards unchanged in data; no per-card disclaimer duplication.

### Journal
- Hero densified.  
- CTA: `Échanger autour de ces sujets` / Contact (no newsletter implication).  
- Status remains `À paraître` only.

### Contact
- Shorter introduction and form guidance.  
- Honeypot visually clipped / out of tab order.

---

## 7. Repetition removed

- Three-pillar full copy no longer on Cabinet.  
- Founder 35-year story not repeated in homepage hero + proof note.  
- PATRIGOV long explanation confined to `/methode` (overview keeps a short pointer).  
- Contact confidentiality not duplicated as a large side block.  
- Footer no longer repeats the three-expertise pitch three times.

---

## 8. Claims softened or corrected

| Before | After |
|---|---|
| `projet argumenté et finançable` | `projet structuré et argumenté` |
| Journal CTA implying subscription | Contact CTA without newsletter claim |
| Absolute marketing guarantees | Not introduced |

`Un premier échange, sous 48 heures` retained (already present in validated site + API success copy).

---

## 9. Homepage text reduction

- Hero: one introduction (~35 words) instead of two long paragraphs.  
- Proof attribution: one sentence.  
- Pillar blurbs shortened.  
- Client segment focus lines deduplicated.

---

## 10. Cabinet restructuring

Hero → experience + stats → conviction → orientation links → founder → approach formats → CTA.  
No second Expertises clone.

---

## 11. Expertises hierarchy changes

Overview = compare three families + enter detail.  
Detail pages keep Contact CTAs.  
Overview Contact consolidated in the final CTA section.

---

## 12. Missions differentiation

Missions answers “sous quelle forme intervenir ?”  
Expertises answers “dans quels domaines ?”  
Formats table retained; audience reduced to one paragraph.

---

## 13. PATRIGOV simplification

Hero one paragraph; proof one paragraph; principles remain single words; cycle phrases shortened; proprietary note one paragraph.

---

## 14. References attribution changes

Single attribution on the index hero.  
Cards no longer restate the long disclaimer.

---

## 15. Journal CTA / status correction

- Status label: `À paraître` only.  
- Final CTA title: `Échanger autour de ces sujets`.  
- Button: `CONTACTEZ-NOUS`.

---

## 16. Contact honeypot correction

- Field remains registered as `website` for bots.  
- Visually clipped / off-screen; `aria-hidden`; `tabIndex={-1}`; `autoComplete="off"`.  
- Lab check: present, 1×1 clipped, **not in tab order** (`inTabOrder: false`).  
- Visible “Site web” label is not shown to normal users.

---

## 17. Footer text reduction

Kept category + one statement. Removed the third overlapping sentence. CTA wording: `Discuter d’un projet`.

---

## 18. Link audit

Verified destinations:

- Logo → `/`  
- Accueil → `/` (active on homepage)  
- Cabinet, Expertises, Missions, Méthode, Références, Journal, Contact CTA  
- Footer 01–08  
- Expertise-detail links from Cabinet orientations and PillarCard  
- `/methode`, `/missions` format links from Cabinet  
- Legal links unchanged  

Sitemap deduplicates `/` when Accueil is in `siteRoutes`.

---

## 19. Responsive screenshots

Captured under `artifacts/content-navigation/`:

- `home-desktop.png`, `home-mobile.png`, `mobile-menu.png`  
- `cabinet-desktop.png`, `cabinet-mobile.png`  
- `expertises-desktop.png`, `expertise-detail-desktop.png`  
- `missions-desktop.png`, `methode-desktop.png`  
- `references-desktop.png`, `journal-desktop.png`, `contact-desktop.png`  
- `header-1440.png`, `header-1180.png`, `header-1100.png`, `header-1024.png`  
- `footer-desktop.png`

Observations:

- 1440: full desktop nav with Accueil, no wrap.  
- ≤1180: hamburger (breakpoint 1220).  
- Cabinet hero and orientation links render cleanly.  
- Contact honeypot not visible in the form UI.

---

## 20. Lint, TypeScript and build results

| Check | Result |
|---|---|
| `npm run lint` | Pass |
| `npx tsc --noEmit --incremental false` | Pass |
| `npm run build` | Pass |
| `git diff --check` | Pass |

---

## Page purpose map (final)

| Route | Purpose |
|---|---|
| `/` | Complete positioning |
| `/cabinet` | Who ARCHERITAGE is and the experience behind it |
| `/expertises` | Compare three competence areas |
| `/expertises/[slug]` | One expertise in depth |
| `/missions` | Forms / levels of intervention |
| `/methode` | PATRIGOV |
| `/references` | Selected founder experience |
| `/journal` | Future editorial themes (honest) |
| `/contact` | Qualify and send a request |
