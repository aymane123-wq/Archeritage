# ARCHERITAGE — Audit professionnel des images

Date de l’audit : 16 juillet 2026  
Périmètre : état actuel du projet Next.js, sans modification du code de production, des fichiers image, des chemins ni de l’interface.

## 1. Résumé exécutif

- **9 fichiers image physiques** ont été trouvés dans `public/` : 9 JPEG, 0 PNG, 0 WebP, 0 SVG.
- Les 9 fichiers ont des empreintes SHA-256 différentes : il n’existe pas de doublon binaire.
- Les cinq fichiers du hero sont tous des photographies verticales de patrimoine, de médina ou de décor traditionnel. Aucun ne communique clairement le foncier, un équipement public contemporain ou la gouvernance de projet.
- Aucun logo officiel, aucune variante claire/sombre et aucune icône d’application ne sont présents.
- Tinmel et Cervantès semblent représenter les sites annoncés, sous réserve de validation officielle et des droits. Le fichier Tiznit montre une mosquée et ne prouve pas la Kasbah de Tiznit ou la Place Mechouar. Safi est absent.
- Aucun chemin actif ne pointe vers un fichier inexistant : Safi utilise volontairement une carte typographique sans photo.
- Il n’existe aucune image mobile dédiée ni aucun `<picture>` avec art direction. Tous les visuels responsives utilisent la même source avec `object-fit: cover`.
- Aucun `background-image: url(...)` raster n’est actif. Les fonds CSS sont des couleurs, dégradés ou grilles générées.
- Les composants `SafeImage` et `ImageReveal` possèdent un fallback graphique CSS, mais ils ne sont pas utilisés par les pages App Router actuelles.

### Décisions sur les 36 slots actifs ou explicitement requis

| Décision | Nombre de slots |
|---|---:|
| KEEP | 9 |
| REPLACE | 25 |
| REMOVE | 0 |
| OPTIONAL | 2 |
| **Total** | **36** |

Les décisions `KEEP` portant sur `hero-02.jpg`, `hero-03.jpg`, `tinmel-cover.jpg` et `cervantes-cover.jpg` restent **conditionnelles** à la preuve de licence, au droit à l’image et à la validation du sujet par ARCHERITAGE.

### Besoin final consolidé

- **21 actifs visuels uniques requis** pour la bibliothèque cible, hors options et hors diagramme PATRIGOV déjà produit en HTML/CSS/GSAP.
- **4 actifs uniques actuels peuvent être conservés** sous réserve de validation.
- **17 nouveaux actifs uniques obligatoires manquent**.
- Deux enrichissements restent optionnels : un hero Cabinet et une photographie Missions. S’ils sont retenus, la bibliothèque atteindra 23 actifs uniques.

Le fichier [`IMAGE_MANIFEST.csv`](./IMAGE_MANIFEST.csv) est le registre opérationnel complet et contient les 16 colonnes demandées pour chaque slot.

## 2. Méthode et limites

L’audit couvre :

- `public/images` ;
- toutes les pages sous `src/app` ;
- tous les usages de `next/image`, `SafeImage` et `ImageReveal` ;
- tous les littéraux `/images/...` dans `src/components`, `src/content` et `src/data` ;
- les dimensions, ratios, poids et empreintes des fichiers ;
- le comportement CSS desktop/mobile des composants actifs ;
- les fallbacks, le hero, les piliers, les références, le Journal, le Cabinet, le header/footer et l’Open Graph.

La correspondance exacte avec un projet et les droits d’utilisation **ne peuvent pas être prouvés à partir des pixels seuls**. Aucun registre de licence, crédit photographique ou métadonnée d’attribution exploitable n’a été trouvé dans le dépôt. Toute mention « semble correspondre » impose donc une validation par le cabinet.

## 3. Inventaire physique

| Fichier | Dimensions | Ratio source | Poids | Sujet observé | Usage actif principal | Conclusion |
|---|---:|---:|---:|---|---|---|
| `/images/hero/hero-01.jpg` | 2000×3008 | 0,665 — env. 2:3 portrait | 876 Ko | Arcades, zellige et décor patrimonial | Hero slide 1, Open Graph | Remplacer dans les deux usages |
| `/images/hero/hero-02.jpg` | 3651×5476 | 0,667 — 2:3 portrait | 1 378 Ko | Cour intérieure traditionnelle, bois sculpté, zellige | Hero slide 2, pilier patrimoine, article transformation | Garder uniquement pour le pilier patrimoine si licence validée ; remplacer les autres usages |
| `/images/hero/hero-03.jpg` | 4480×6720 | 0,667 — 2:3 portrait | 4 451 Ko | Cour monumentale décorée avec une personne visible | Hero slide 3, pilier foncier | Garder seulement pour le slide patrimoine sous conditions ; remplacer le pilier foncier |
| `/images/hero/hero-04.jpg` | 4000×6000 | 0,667 — 2:3 portrait | 3 206 Ko | Ruelle de médina, bâti traditionnel et minaret | Hero slide 4, pilier architecture | Remplacer dans les deux usages |
| `/images/hero/hero-05.jpg` | 4536×8064 | 0,563 — 9:16 portrait | 7 567 Ko | Grande porte sculptée et décor patrimonial | Hero slide 5, bloc fondateur Cabinet | Remplacer dans les deux usages |
| `/images/references/tinmel-cover.jpg` | 1000×665 | 1,504 — env. 3:2 | 71 Ko | Mosquée en terre dans un paysage du Haut Atlas | Accueil, Références, Journal Tinmel | Garder pour Références sous validation ; créer une image Journal distincte |
| `/images/references/tiznit-cover.jpg` | 1000×750 | 1,333 — 4:3 | 78 Ko | Mosquée et minaret sur une place | Accueil et Références Tiznit | Remplacer : Kasbah/Place Mechouar non démontrées |
| `/images/references/cervantes-cover.jpg` | 1138×619 | 1,838 — proche 16:9 | 142 Ko | Façade du Gran Teatro Cervantes avec chantier | Accueil et Références | Garder sous validation officielle et droits |
| `/images/references/diagnostic-cover.jpg` | 1680×1120 | 1,5 — 3:2 | 242 Ko | Toitures et cour intérieure de médina | Journal « diagnostic foncier » | Remplacer : sujet foncier absent |

## 4. Contrats d’affichage et risques de crop

| Composant actif | Desktop observé / prévu | Mobile | Crop actuel | Risque principal |
|---|---|---|---|---|
| `HomeHeroSlider` | `100vw × 100svh`, typiquement 1440×900 à 1440×1000 | 360×800 à 390×844 | `object-cover`, source unique | Les sources 2:3 ou 9:16 sont massivement coupées en haut/bas sur desktop ; aucune art direction mobile |
| `PillarCard` | Trois colonnes, image proche de 360–405×270–304 | Environ 312–342×234–257 | Ratio CSS 4:3 | Les sources portrait perdent une grande partie du haut/bas ; les sujets actuels sont surtout sémantiquement faux |
| `Reference strip` Accueil | Quatre colonnes, env. 270–300×152–169 | Une colonne, env. 312–342×175–192 | Ratio 16:9 | Tinmel/Tiznit 3:2 et 4:3 sont légèrement recadrées ; le sujet doit rester centré |
| Bloc fondateur Cabinet | Environ 430–500×544 | Environ 312–342×544 | Hauteur fixe, `object-cover` | Le ratio varie fortement ; exiger un portrait 4:5 avec visage dans le tiers supérieur |
| `ReferenceCard` | Colonne image étroite env. 245–320×384 | Env. 312–342×384 | Crop proche portrait 4:5 | Les masters paysage perdent fortement les côtés ; prévoir un sujet central et une marge de sécurité |
| Carte Journal | Env. 350–400×219–250 | Env. 312–342×195–214 | Ratio 16:10 | Bonne tolérance si le master est 16:9 avec focal central |
| Hero article | Jusqu’à 1280×640 | Env. 312–342×156–171 | Ratio 2:1 | Les sujets latéraux disparaissent ; conserver l’information au centre horizontal |
| Open Graph | Déclaré 1200×630 | Plateformes sociales | Crop plateforme | Le fichier actuel est vertical malgré une metadata 1200×630 ; aperçu LinkedIn incohérent |

## 5. Table d’audit des slots actifs

Pour rester exploitable, les 20 champs demandés sont répartis en deux tables liées par l’identifiant. Les spécifications détaillées et les notes longues sont reprises dans le CSV.

### 5.1 État actuel — champs 1 à 10

| ID | Page | Section | Composant | Chemin actuel | Sujet actuel | Ratio actuel | Affichage desktop | Mobile | Pilier | Décision |
|---|---|---|---|---|---|---|---|---|---|---|
| A01 | Accueil | Hero 1 | HomeHeroSlider | `/images/hero/hero-01.jpg` | Arcades et zellige | 2:3 portrait | Plein écran | Même source, crop | Patrimoine au lieu d’architecture | REPLACE |
| A02 | Accueil | Hero 2 | HomeHeroSlider | `/images/hero/hero-02.jpg` | Cour intérieure patrimoniale | 2:3 portrait | Plein écran | Même source, crop | Patrimoine au lieu de foncier | REPLACE |
| A03 | Accueil | Hero 3 | HomeHeroSlider | `/images/hero/hero-03.jpg` | Cour monumentale avec personne | 2:3 portrait | Plein écran | Même source, crop | Patrimoine | KEEP conditionnel |
| A04 | Accueil | Hero 4 | HomeHeroSlider | `/images/hero/hero-04.jpg` | Ruelle de médina | 2:3 portrait | Plein écran | Même source, crop | Patrimoine au lieu d’institutionnel | REPLACE |
| A05 | Accueil | Hero 5 | HomeHeroSlider | `/images/hero/hero-05.jpg` | Porte sculptée | 9:16 portrait | Plein écran | Même source, crop | Patrimoine au lieu de gouvernance | REPLACE |
| A06 | Accueil | Pilier foncier | PillarCard | `/images/hero/hero-03.jpg` | Cour patrimoniale | 2:3 portrait | Carte 4:3 | Carte empilée 4:3 | Foncier | REPLACE |
| A07 | Accueil | Pilier architecture | PillarCard | `/images/hero/hero-04.jpg` | Médina ancienne | 2:3 portrait | Carte 4:3 | Carte empilée 4:3 | Architecture | REPLACE |
| A08 | Accueil | Pilier patrimoine | PillarCard | `/images/hero/hero-02.jpg` | Intérieur traditionnel | 2:3 portrait | Carte 4:3 | Carte empilée 4:3 | Patrimoine | KEEP conditionnel |
| A09 | Accueil | Référence Tinmel | Reference strip | `/images/references/tinmel-cover.jpg` | Mosquée du Haut Atlas | 3:2 | Vignette 16:9 | Vignette 16:9 | Patrimoine | KEEP conditionnel |
| A10 | Accueil | Référence Tiznit | Reference strip | `/images/references/tiznit-cover.jpg` | Mosquée et minaret | 4:3 | Vignette 16:9 | Vignette 16:9 | Patrimoine | REPLACE |
| A11 | Accueil | Référence Cervantès | Reference strip | `/images/references/cervantes-cover.jpg` | Théâtre identifiable | 1,84:1 | Vignette 16:9 | Vignette 16:9 | Patrimoine | KEEP conditionnel |
| A12 | Accueil | Référence Safi | Reference strip | Aucun | Carte texte | Aucun | Pas d’image | Pas d’image | Patrimoine | REPLACE |
| A13 | Cabinet | Page hero | PageHero | Aucun | Hero éditorial | Aucun | Texte sur encre | Identique | Transversal | OPTIONAL |
| A14 | Cabinet | Fondateur | Founder section | `/images/hero/hero-05.jpg` | Porte sculptée | 9:16 | Env. 4:5 variable | Colonne haute | Transversal | REPLACE |
| A15 | Cabinet | Expérience terrain | Aucun slot actuel | Aucun | Aucun | Aucun | À prévoir ultérieurement | À empiler | Transversal | REPLACE |
| A16 | Expertises | Pilier foncier | PillarCard detailed | `/images/hero/hero-03.jpg` | Cour patrimoniale | 2:3 | Carte 4:3 | Carte 4:3 | Foncier | REPLACE |
| A17 | Expertises | Pilier architecture | PillarCard detailed | `/images/hero/hero-04.jpg` | Médina ancienne | 2:3 | Carte 4:3 | Carte 4:3 | Architecture | REPLACE |
| A18 | Expertises | Pilier patrimoine | PillarCard detailed | `/images/hero/hero-02.jpg` | Intérieur traditionnel | 2:3 | Carte 4:3 | Carte 4:3 | Patrimoine | KEEP conditionnel |
| A19 | Missions | Visuel principal | Aucun slot actuel | Aucun | Aucun | Aucun | Non requis | Non requis | Transversal | OPTIONAL |
| A20 | Méthode | Cycle six temps | MethodTimeline | HTML/CSS/GSAP | Diagramme animé | Vectoriel responsive | Horizontal 6 colonnes | Séquence verticale | Gouvernance | KEEP |
| A21 | Références | Tinmel | ReferenceCard | `/images/references/tinmel-cover.jpg` | Mosquée du Haut Atlas | 3:2 | Crop vertical sévère | Bloc portrait | Patrimoine | KEEP conditionnel |
| A22 | Références | Tiznit | ReferenceCard | `/images/references/tiznit-cover.jpg` | Mosquée et minaret | 4:3 | Crop vertical | Bloc portrait | Patrimoine | REPLACE |
| A23 | Références | Cervantès | ReferenceCard | `/images/references/cervantes-cover.jpg` | Théâtre identifiable | 1,84:1 | Crop vertical sévère | Bloc portrait | Patrimoine | KEEP conditionnel |
| A24 | Références | Safi | ReferenceCard | Aucun | Monogramme SAFI | Aucun | Carte no-photo | Carte no-photo | Patrimoine | REPLACE |
| A25 | Journal | Carte foncier | Journal card | `/images/references/diagnostic-cover.jpg` | Médina de Fès | 3:2 | 16:10 | 16:10 | Foncier | REPLACE |
| A26 | Journal | Carte Tinmel | Journal card | `/images/references/tinmel-cover.jpg` | Vue générale Tinmel | 3:2 | 16:10 | 16:10 | Patrimoine/gouvernance | REPLACE |
| A27 | Journal | Carte transformation | Journal card | `/images/hero/hero-02.jpg` | Intérieur décoratif | 2:3 | 16:10 | 16:10 | Patrimoine | REPLACE |
| A28 | Article | Hero foncier | Article image | `/images/references/diagnostic-cover.jpg` | Médina de Fès | 3:2 | 2:1 | 2:1 | Foncier | REPLACE |
| A29 | Article | Hero Tinmel | Article image | `/images/references/tinmel-cover.jpg` | Vue générale Tinmel | 3:2 | 2:1 | 2:1 | Patrimoine/gouvernance | REPLACE |
| A30 | Article | Hero transformation | Article image | `/images/hero/hero-02.jpg` | Intérieur décoratif | 2:3 | 2:1 | 2:1 | Patrimoine | REPLACE |
| A31 | Contact | Stratégie visuelle | Aucun slot actuel | Aucun | Aucun | Aucun | Aucun nécessaire | Aucun nécessaire | Transversal | KEEP |
| A32 | Global | Header transparent | Wordmark texte | Aucun logo | Texte ARCHERITAGE | N/A | Blanc | Blanc | Marque | REPLACE |
| A33 | Global | Header sticky | Wordmark texte | Aucun logo | Texte ARCHERITAGE | N/A | Encre | Encre | Marque | REPLACE |
| A34 | Global | Footer | Wordmark texte | Aucun logo | Texte ARCHERITAGE | N/A | Clair | Clair | Marque | REPLACE |
| A35 | Global | Favicon / app icon | Metadata | Aucun | Aucun | N/A | Navigateur/app | Navigateur/app | Marque | REPLACE |
| A36 | Global | Open Graph | Root metadata | `/images/hero/hero-01.jpg` | Arcades patrimoniales verticales | 2:3 | Déclaré 1200×630 | Plateformes | Transversal | REPLACE |

### 5.2 Cible — champs 11 à 20

| ID | Motif | Sujet requis | Orientation | Ratio recommandé | Résolution mini | Nom final | Dossier | Alt français | Priorité | Type de source |
|---|---|---|---|---|---:|---|---|---|---|---|
| A01 | Mauvais pilier et source portrait | Grand équipement public ou architecture contemporaine | Panoramique | 16:9 | 2560×1440 | `hero-architecture-envergure.jpg` | `/images/hero/` | Équipement public contemporain inscrit dans son contexte urbain | P0 | Projet officiel ou contextual licensed |
| A02 | Aucun signal foncier | Vue aérienne, parcelles, accès, territoire | Panoramique | 16:9 | 2560×1440 | `hero-valorisation-fonciere.jpg` | `/images/hero/` | Vue territoriale d’un foncier et de ses trames d’aménagement | P0 | Photo détenue ou contextual licensed |
| A03 | Sujet juste, droits inconnus | Patrimoine/restauration, focal centre-droit | Panoramique | 16:9 | 2560×1440 | `hero-03.jpg` | `/images/hero/` | Architecture patrimoniale marocaine et savoir-faire décoratifs | P0 validation | Contextual licensed |
| A04 | Médina ≠ équipement institutionnel | Projet institutionnel ou équipement collectif | Panoramique | 16:9 | 2560×1440 | `hero-equipement-institutionnel.jpg` | `/images/hero/` | Équipement institutionnel ouvert sur l’espace public | P0 | Projet officiel ou contextual licensed |
| A05 | Porte décorative ≠ gouvernance | Coordination de plans, revue documentaire, chantier | Panoramique | 16:9 | 2560×1440 | `hero-gouvernance-projet.jpg` | `/images/hero/` | Équipe de projet examinant des plans et documents | P0 | Photo détenue par le cabinet |
| A06/A16 | Contresens foncier | Aérien parcellaire, plan masse ou développement | Paysage | 4:3 | 1600×1200 | `pillar-valorisation-fonciere.jpg` | `/images/pillars/` | Vue aérienne d’un site foncier structuré par ses parcelles et ses accès | P0 | Photo détenue ou contextual licensed |
| A07/A17 | Contresens architecture | Équipement public ou grand projet contemporain | Paysage | 4:3 | 1600×1200 | `pillar-architecture-envergure.jpg` | `/images/pillars/` | Architecture d’un équipement public contemporain au Maroc | P0 | Projet officiel ou contextual licensed |
| A08/A18 | Sujet cohérent, droits à confirmer | Restauration ou détail constructif traditionnel | Paysage | 4:3 | 1600×1200 | `pillar-patrimoine.jpg` | `/images/pillars/` | Intérieur patrimonial marocain restauré | P1 | Contextual licensed |
| A09/A21 | Correspondance probable | Vue officielle Tinmel, sujet central | Paysage master | 3:2 crop-safe | 1600×1200 | `tinmel-cover.jpg` | `/images/references/` | Mosquée de Tinmel dans son paysage du Haut Atlas | P0 validation | Projet officiel |
| A10/A22 | Projet non démontré | Kasbah de Tiznit et Place Mechouar | Paysage master | 3:2 crop-safe | 1800×1200 | `tiznit-place-mechouar-cover.jpg` | `/images/references/` | Kasbah de Tiznit et Place Mechouar après valorisation | P0 | Projet officiel |
| A11/A23 | Correspondance forte, droits inconnus | Façade officielle Cervantès | Paysage master | 16:9 crop-safe | 1600×900 | `cervantes-cover.jpg` | `/images/references/` | Façade du Théâtre Cervantès à Tanger en réhabilitation | P0 validation | Projet officiel |
| A12/A24 | Fichier absent | Château de Mer et murailles portugaises | Paysage master | 3:2 crop-safe | 1800×1200 | `safi-chateau-de-mer-cover.jpg` | `/images/references/` | Murailles portugaises et Château de Mer à Safi | P0 | Projet officiel |
| A13 | Photo non nécessaire | Contexte territorial discret uniquement si validé | Panoramique | 16:9 | 2400×1350 | `cabinet-hero-context.jpg` | `/images/cabinet/` | Contexte architectural et territorial d’une mission | P2 | Photo détenue |
| A14 | Faux substitut au portrait | Portrait validé du fondateur | Portrait | 4:5 | 1600×2000 | `ahmed-taoufik-naciri-portrait.jpg` | `/images/cabinet/` | Ahmed Taoufik Naciri, architecte et fondateur | P0 | Photo détenue |
| A15 | Preuve humaine absente | Fondateur sur site ou revue de plans | Paysage | 3:2 | 1800×1200 | `fondateur-experience-terrain.jpg` | `/images/cabinet/` | Ahmed Taoufik Naciri lors d’une revue de projet | P1 | Photo détenue |
| A19 | Page déjà lisible | Une photo maximum de coordination si réelle | Paysage | 3:2 | 1800×1200 | `mission-coordination-site.jpg` | `/images/missions/` | Réunion de coordination autour de plans | P2 | Photo détenue |
| A20 | Solution actuelle adaptée | Conserver la frise code-native ; SVG exportable seulement si utile | Vectoriel | Responsive | Vectoriel | `patrigov-cycle.svg` | `/images/methode/` | Cycle PATRIGOV en six étapes | P1 | Diagramme personnalisé |
| A25/A28 | Sujet actuel patrimonial | Parcelle, terrain, plan cadastral ou diagnostic | Paysage master | 16:9, crops 16:10 et 2:1 | 2400×1350 | `journal-diagnostic-foncier.jpg` | `/images/journal/` | Parcelles et voies analysées lors d’un diagnostic foncier | P1 | Contextual licensed ou diagramme |
| A26/A29 | Duplication Références | Chantier Tinmel et suivi documentaire | Paysage master | 16:9, crops 16:10 et 2:1 | 2400×1350 | `journal-tinmel-suivi-chantier.jpg` | `/images/journal/` | Suivi documentaire du chantier de Tinmel | P1 | Projet officiel |
| A27/A30 | Pas de transformation visible | Ancien/nouveau, intervention ou chantier de reconversion | Paysage master | 16:9, crops 16:10 et 2:1 | 2400×1350 | `journal-restauration-rehabilitation-reconversion.jpg` | `/images/journal/` | Bâtiment ancien en cours de réhabilitation | P1 | Projet officiel ou contextual licensed |
| A31 | Aucun besoin fonctionnel | Pas d’image | Aucun | Aucun | Aucun | Aucun | `/images/contact/` réservé | Chaîne vide | P2 | Aucune image requise |
| A32/A34 | Logo absent | Logo officiel clair | Vectoriel | Logo source | SVG | `archeritage-logo-light.svg` | `/images/brand/` | ARCHERITAGE | P0 | Asset officiel de marque |
| A33 | Logo absent | Logo officiel sombre | Vectoriel | Logo source | SVG | `archeritage-logo-dark.svg` | `/images/brand/` | ARCHERITAGE | P0 | Asset officiel de marque |
| A35 | Icône absente | Icône officielle | Carré | 1:1 | SVG + 512×512 | `archeritage-icon.svg` | `/images/brand/` | Icône ARCHERITAGE | P0 | Asset officiel de marque |
| A36 | Source verticale et mono-pilier | Composition sociale dédiée | Paysage | 1,91:1 | 1200×630 | `archeritage-open-graph.jpg` | `/images/brand/` | ARCHERITAGE — foncier, architecture et patrimoine | P1 | Diagramme/composition personnalisée |

## 6. Revue page par page

### 6.1 Accueil — hero

Séquence finale recommandée :

1. **Architecture et projets d’envergure** — grand équipement public ou bâtiment institutionnel contemporain ; prise de vue large, volume principal au tiers droit, zone calme et plus sombre à gauche pour le H1.
2. **Valorisation foncière et territoriale** — vue aérienne ou oblique montrant limites, accès, trame urbaine et contexte ; site focal au centre-droit ; éviter une vue de drone purement décorative.
3. **Valorisation du patrimoine** — `hero-03.jpg` peut rester provisoirement ; l’architecture doit dominer, sans visage identifiable au centre si les autorisations manquent.
4. **Projet institutionnel / équipement public** — façade et relation à l’espace public ; prise de vue à hauteur humaine, perspective stable, même lumière chaude que les autres slides.
5. **Coordination / gouvernance** — plans, documents, réunion ou inspection ; action au centre-droit, mains et supports de travail lisibles, pas de portrait corporate générique.

Pour rendre la série cohérente malgré la diversité des sujets : même plage colorimétrique chaude et minérale, contraste modéré, ciel non surexposé, absence d’effets HDR, horizon stable, point focal centre-droit et marge négative à gauche. Les cinq masters doivent tolérer un crop desktop 16:9 et mobile vertical sans perdre le sujet.

### 6.2 Accueil et Expertises — trois piliers

- **Foncier** : remplacement P0. Le visuel actuel est une cour historique et constitue un contresens.
- **Architecture d’envergure** : remplacement P0. La ruelle de médina ne prouve ni conception contemporaine ni coordination d’un projet important.
- **Patrimoine** : `hero-02.jpg` est sémantiquement cohérent, mais reste un placeholder sans licence documentée. Le conserver seulement après validation ; idéalement le remplacer à terme par une photographie de restauration réellement liée à l’expérience du cabinet.

Un seul master par pilier peut être réutilisé entre l’Accueil et Expertises : la duplication est ici cohérente car elle porte exactement le même concept.

### 6.3 Accueil et Références — missions fondatrices

| Référence | Fichier | Correspondance observée | Droits / attribution | Décision |
|---|---|---|---|---|
| Mosquée de Tinmel | `tinmel-cover.jpg` | Probable : architecture et paysage compatibles | À confirmer avec le Ministère des Habous et le détenteur de la photo | KEEP conditionnel |
| Kasbah de Tiznit / Place Mechouar | `tiznit-cover.jpg` | Non prouvée : l’image montre une mosquée | Exiger source officielle et validation du lieu | REPLACE |
| Théâtre Cervantès | `cervantes-cover.jpg` | Forte : nom du théâtre visible | Confirmer APDN, photographe et droit de diffusion | KEEP conditionnel |
| Safi — murailles / Château de Mer | Aucun | Manquant | Exiger photo officielle validée par la Direction régionale de la Culture | REPLACE |

Le ratio des cartes Références est problématique : les masters paysage sont affichés dans une colonne proche du 4:5. Les prochaines photos doivent avoir un sujet central avec suffisamment de marge latérale, ou être livrées avec un recadrage vertical approuvé.

### 6.4 Cabinet

- Le hero éditorial sombre peut rester sans photo. Ajouter un monument générique affaiblirait le positionnement.
- Le bloc fondateur exige un **portrait réel et validé**. `hero-05.jpg` est explicitement temporaire et doit être remplacé en P0.
- Une seconde photographie détenue par le cabinet — visite de site, examen de plans ou réunion professionnelle — est recommandée en P1 pour matérialiser l’expérience de terrain.
- Aucun monument générique ne doit remplacer l’une de ces preuves humaines.

### 6.5 Missions

La page n’a actuellement aucune image et reste claire grâce aux trois enjeux et au tableau. Une seule photographie peut être ajoutée ultérieurement si elle est réelle et utile : coordination de chantier, relevé, revue de plans ou inspection. Ne pas créer de galerie décorative. Décision actuelle : **OPTIONAL**.

### 6.6 Méthode

La frise `MethodTimeline` est déjà un visuel personnalisé, responsive et animé : ligne de progression, six étapes, version horizontale desktop et verticale mobile. Elle correspond mieux à PATRIGOV qu’une photographie. Aucune photo ne doit la remplacer. Un SVG n’est utile que pour des usages hors site ou une future version imprimable.

### 6.7 Journal

- **Diagnostic foncier** : `diagnostic-cover.jpg` montre une médina ; remplacement nécessaire par une parcelle, un plan de site ou une lecture territoriale.
- **Tinmel / 116 jours** : la photo générale est correcte mais déjà utilisée pour les Références. Le Journal doit montrer le chantier, le suivi ou la documentation.
- **Restauration / réhabilitation / reconversion** : l’intérieur décoratif ne montre aucune transformation. Utiliser un bâtiment en intervention ou une articulation ancien/contemporain.

Chaque article réutilise logiquement son propre master entre la carte 16:10 et le hero 2:1. Les trois articles doivent en revanche utiliser trois photographies distinctes.

### 6.8 Contact

Aucune photographie n’est nécessaire. Le formulaire, les motifs de sollicitation et la confidentialité sont les contenus prioritaires. Une carte territoriale ou un trait architectural pourrait être envisagé plus tard, mais ne doit pas être ajouté pour remplir l’espace.

### 6.9 Header, footer et partage social

- Aucun fichier logo officiel n’existe.
- Le header et le footer utilisent un wordmark texte temporaire.
- Les variantes SVG claire et sombre manquent.
- Le favicon et l’icône d’application officiels manquent.
- L’Open Graph réutilise `hero-01.jpg`, une photo verticale patrimoniale, tout en déclarant 1200×630. Une composition dédiée LinkedIn/Open Graph est nécessaire.
- Ne pas recréer le logo : attendre les fichiers officiels de la charte.

## 7. Références héritées non actives

Les éléments suivants contiennent encore des chemins d’images, mais ne sont importés par aucune page App Router actuelle :

| Source inactive | Occurrences de chemins | Observation |
|---|---:|---|
| `src/data/hero.ts` | 5 | Ancien jeu du hero, doublon du slider actif |
| `src/data/team.ts` | 4 | Portraits fictifs alimentés par photos patrimoniales |
| `src/data/posts.ts` | 10 | Cinq anciens articles avec `coverImage` et `heroImage` dupliqués |
| `src/data/projects.ts` | 25 | Cinq anciens projets avec cover, hero et galeries réutilisant les 9 mêmes fichiers |
| `src/content/site/home.ts` | 3 | Ancien contenu Accueil, remplacé par `official.ts` |
| Anciennes sections `HomeHero`, `MissionHero`, `MissionPreview`, `MissionContent`, `ContactHero` | 5 | Composants non montés par les routes actuelles |

Ces références ne créent aucun téléchargement dans le site actuel. Elles constituent toutefois une dette documentaire : lors d’un futur nettoyage de code, elles devront être supprimées ou clairement archivées afin d’éviter qu’un ancien composant ne réintroduise les placeholders. Aucun de ces fichiers n’a été modifié pendant cet audit.

## 8. Stratégie finale

### A. Images à garder inchangées, sous conditions

- `hero-03.jpg` uniquement pour le slide patrimoine, si licence et droit à l’image confirmés.
- `hero-02.jpg` uniquement pour le pilier patrimoine, si licence confirmée.
- `tinmel-cover.jpg` pour les références, après validation du lieu, de la provenance et des droits.
- `cervantes-cover.jpg` pour les références, après validation APDN/photographe/droits.

### B. Images à remplacer immédiatement

- Hero slides 1, 2, 4 et 5.
- Piliers foncier et architecture.
- Tiznit.
- Visuel temporaire du fondateur.
- Les trois masters du Journal.
- Open Graph.

### C. Photographies officielles du cabinet ou du fondateur

- Portrait d’Ahmed Taoufik Naciri — P0.
- Fondateur sur site ou en revue de projet — P1.
- Hero gouvernance/coordination — P0.

### D. Photographies contextuelles sous licence

- Hero foncier si aucune photographie détenue n’est disponible.
- Hero architecture/institutionnel si aucune référence publiable n’est disponible.
- Piliers foncier et architecture.
- Journal foncier et transformation, seulement si aucune image officielle n’est pertinente.

### E. Diagrammes personnalisés plutôt que photographies

- PATRIGOV : conserver la frise code-native ; SVG exportable facultatif.
- Journal foncier : un diagramme parcellaire peut remplacer une photo générique.
- Open Graph : composition graphique dédiée avec assets officiels.

### F. Références manquantes ou non validées

- Safi : entièrement manquante.
- Tiznit / Place Mechouar : fichier actuel non probant.
- Tinmel et Cervantès : présents mais droits et attribution non documentés.

### G. Duplications à arrêter

- `tinmel-cover.jpg` ne doit plus illustrer simultanément Références et article méthodologique Tinmel.
- `hero-02.jpg` ne doit plus servir à la fois de slide, pilier et article transformation.
- `hero-03.jpg` ne doit plus illustrer le foncier.
- `hero-04.jpg` ne doit plus illustrer l’architecture d’envergure.
- `hero-05.jpg` ne doit plus illustrer gouvernance et portrait fondateur.
- La duplication Accueil/Expertises d’un même master de pilier reste acceptable car le sens est identique.
- La duplication carte/article d’un même master Journal reste acceptable car il s’agit du même contenu éditorial.

### H. Arborescence cible

```text
public/images/
  hero/
  cabinet/
  pillars/
  missions/
  methode/
  references/
  journal/
  contact/
  brand/
```

### I. Nombre exact d’actifs uniques requis

| Famille | Nombre obligatoire |
|---|---:|
| Hero | 5 |
| Piliers | 3 |
| Références | 4 |
| Cabinet | 2 |
| Missions | 0 obligatoire |
| Méthode | 0 fichier obligatoire — diagramme code-native existant |
| Journal | 3 |
| Contact | 0 |
| Marque : logos clair/sombre, icône, Open Graph | 4 |
| **Total obligatoire** | **21** |

Deux actifs optionnels — hero Cabinet et photographie Missions — portent le total maximal proposé à 23.

### J. Liste d’acquisition prioritaire

#### P0 — avant la prochaine validation design

1. `hero-architecture-envergure.jpg`
2. `hero-valorisation-fonciere.jpg`
3. `hero-equipement-institutionnel.jpg`
4. `hero-gouvernance-projet.jpg`
5. `pillar-valorisation-fonciere.jpg`
6. `pillar-architecture-envergure.jpg`
7. `ahmed-taoufik-naciri-portrait.jpg`
8. `tiznit-place-mechouar-cover.jpg`
9. `safi-chateau-de-mer-cover.jpg`
10. `archeritage-logo-light.svg`
11. `archeritage-logo-dark.svg`
12. `archeritage-icon.svg`

Validation P0 parallèle : licence/droit à l’image de `hero-03.jpg` et `hero-02.jpg`, provenance/droits de Tinmel et Cervantès.

#### P1 — avant production

1. `fondateur-experience-terrain.jpg`
2. `journal-diagnostic-foncier.jpg`
3. `journal-tinmel-suivi-chantier.jpg`
4. `journal-restauration-rehabilitation-reconversion.jpg`
5. `archeritage-open-graph.jpg`

#### P2 — enrichissements optionnels

1. `cabinet-hero-context.jpg`
2. `mission-coordination-site.jpg`
3. `patrigov-cycle.svg` uniquement si un fichier exportable est nécessaire.

## 9. Règles de livraison recommandées pour les prochains fichiers

- Fournir le master original, la preuve de licence ou l’autorisation écrite, le crédit et le nom du projet.
- Ne pas incorporer de texte dans les photographies.
- Conserver une zone de sécurité de 20 % autour du sujet principal.
- Livrer des masters JPEG haute qualité ou TIFF ; la conversion WebP/AVIF sera assurée par Next.js.
- Éviter l’accentuation excessive, le HDR, les perspectives artificiellement redressées et les filtres incohérents.
- Pour le hero, livrer si possible un crop desktop 16:9 et une variante mobile 4:5 du même master ; aucun chemin ne doit être modifié avant validation de la prochaine phase.
