# Audit final du site ARCHERITAGE

Audit de clôture réalisé le 17 juillet 2026 sur l’application Next.js rendue en mode production. Les sources officielles ARCHERITAGE ont été prioritaires sur les recommandations marketing et sur l’implémentation antérieure. Aucun fait, projet, résultat, témoignage, logo, chiffre ou contenu d’article n’a été inventé.

## 1. Résumé exécutif

Le site présente désormais ARCHERITAGE comme un cabinet d’architecture à l’intersection de la valorisation foncière et territoriale, des projets d’envergure, du patrimoine et de la gouvernance de projet via PATRIGOV. L’ensemble est cohérent, éditorial et identifiable comme un même système : hero photographique, hiérarchie typographique, cartes, icônes, CTA, formulaire, header et footer partagent une direction visuelle commune.

L’audit a porté sur 14 routes ou états de route, à 7 dimensions — 360×800, 390×844, 768×1024, 1024×768, 1280×800, 1440×900 et 1920×1080 — soit 98 diagnostics rendus. Des captures pleine page ont été produites aux formats mobile, tablette et desktop, avec des contrôles dédiés pour les cinq slides du hero, le header scrollé, le menu mobile normal et réduit, le menu à 1024 px, la validation du formulaire et `prefers-reduced-motion`.

Les résultats consolidés dans [`artifacts/final-site-audit/diagnostics.json`](../artifacts/final-site-audit/diagnostics.json) sont les suivants :

| Contrôle automatisé sur les 98 rendus | Résultat |
| --- | ---: |
| Débordements horizontaux du document | 0 |
| Images cassées | 0 |
| Pages avec un nombre de `h1` différent de 1 | 0 |
| Boutons sans nom accessible | 0 |
| Champs sans libellé accessible | 0 |
| Placeholders visibles | 0 |
| Échecs réseau hors réponses 404 attendues | 0 |

Les 28 entrées console recensées correspondent exclusivement aux quatre routes 404 volontairement testées à chacune des sept dimensions : les trois articles non publiés et une route inexistante. Aucun avertissement d’hydratation, de GSAP, d’imbrication DOM ou de chargement d’image n’a été relevé sur les routes publiques en 200.

Les P0 et P1 justifiés dans le code ont été corrigés. Le site ne peut toutefois pas être déclaré prêt à lancer tant que les éléments externes suivants ne sont pas fournis et validés : logo et favicon officiels, identifiants légaux complets, configuration et test réel de Resend, visuel officiel de la référence Safi.

## 2. Score global de qualité professionnelle sur 10

**Score post-correction : 8,6/10.**

Ce score reflète la qualité réellement rendue du produit, pas seulement sa compilation. Les points forts sont le positionnement, la composition éditoriale, la cohérence visuelle, la robustesse responsive, la navigation et l’accessibilité des parcours principaux. L’écart restant avec un niveau de lancement complet tient principalement à des dépendances officielles ou opérationnelles que le code ne doit pas fabriquer : identité de marque, conformité légale, transport d’email et image Safi.

Le site est donc proche d’un niveau premium publiable sur le plan UX/UI, mais son score de **launch-readiness** est inférieur à son score de qualité d’interface tant que ces quatre blocages ne sont pas levés.

## 3. Évaluation du positionnement

Le positionnement ne réduit plus ARCHERITAGE à un studio de restauration patrimoniale. Les trois piliers sont présents et équilibrés :

- valorisation foncière et territoriale ;
- architecture et projets d’envergure ;
- valorisation du patrimoine.

PATRIGOV est présenté comme la méthode propriétaire de gouvernance et de coordination du cabinet, et non comme une statistique du parcours du fondateur. L’attribution des repères de preuve distingue désormais explicitement les trois premiers indicateurs issus des 35 années d’expérience du fondateur de la méthode actuelle du cabinet.

La séquence d’images du hero renforce cette lecture avec, dans l’ordre, une architecture publique, un territoire urbain et foncier, Tinmel comme référence patrimoniale, une architecture résidentielle et une scène de coordination par les plans. La description SEO et la description du package ont aussi été rééquilibrées autour des trois champs d’intervention et de la gouvernance.

Les références restent formulées comme des expériences du fondateur lorsqu’une attribution directe à ARCHERITAGE ne serait pas démontrée. Ce niveau de prudence protège la crédibilité du cabinet. La principale fragilité de marque restante est l’absence du logo officiel : le wordmark typographique actuel est un repli propre, pas un substitut définitif.

## 4. Évaluation de la homepage

La homepage suit un récit lisible : proposition de valeur, preuve, trois expertises, orientation par profil client, références et appel à l’action. Elle demeure une vitrine synthétique et ne cherche pas à dupliquer toutes les pages internes.

Le hero a été vérifié slide par slide à 390×844 et 1440×900. Les dix états dédiés consignés dans [`hero-diagnostics.json`](../artifacts/final-site-audit/hero-diagnostics.json) conservent le CTA complet, visible et à opacité 1, avec l’image et le compteur attendus. Le texte reste lisible sur les cinq visuels et la série traduit bien l’équilibre architecture–territoire–patrimoine–coordination. Le préchargement manuel redondant a été retiré afin de laisser Next.js gérer les images sans requête non maîtrisée.

Le panneau de preuve est visuellement relié au hero et l’attribution a été clarifiée. Les cartes de piliers et de profils clients sont plus compactes, scannables et enrichies d’icônes secondaires. Le CTA final utilise l’intitulé exact `CONTACTEZ-NOUS`. En mode réduit, le contrôle lecture/pause, devenu sans objet, n’est plus exposé ; le contenu reste immédiatement visible.

La longueur totale augmente naturellement sur mobile, mais chaque écran porte une idée principale et aucun bloc n’a été identifié comme répétition injustifiée ou catalogue surchargé.

## 5. Évaluation page par page

| Route | Évaluation rendue | Statut |
| --- | --- | --- |
| `/` | Hero, preuve, piliers, segmentation, références et CTA forment un parcours cohérent. Les cinq slides ont été contrôlées séparément. | Validée sous réserve des assets globaux officiels |
| `/cabinet` | Le récit distingue le cabinet actuel du parcours de son fondateur. Les preuves UNESCO/PNUD, Banque mondiale et les 35 ans restent attribuées, lisibles et proportionnées. | Validée |
| `/expertises` | Les trois piliers et les douze compétences se comparent rapidement. Les icônes structurent la lecture sans transformer la page en tableau de bord. | Validée |
| `/missions` | Les trois enjeux précèdent logiquement les formats d’intervention. Le tableau desktop reste sémantique et lisible ; sa lecture mobile ne produit ni largeur fixe ni carte démesurée. | Validée |
| `/methode` | La preuve des 116 jours est mise en avant, puis les sept principes et le cycle en six temps concrétisent PATRIGOV. La méthode reste compréhensible sans animation. | Validée |
| `/references` | Les images validées et les métadonnées sont lisibles. Les expériences du fondateur ne sont pas présentées comme de fausses commandes directes du cabinet. Safi utilise un repli textuel honnête. | Validée visuellement ; asset Safi requis avant lancement |
| `/journal` | Les trois sujets officiels sont affichés comme publications à venir, avec titres correctement enveloppés et sans faux lien, date ou temps de lecture. | Validée comme index éditorial de prépublication |
| `/journal/valorisation-fonciere-diagnostic-prealable` | Le corps officiel est vide ; la route renvoie volontairement 404 plutôt qu’un faux article complet. | Non publiée, comportement correct |
| `/journal/tinmel-116-jours-retard` | Le corps officiel est vide ; la route renvoie volontairement 404. | Non publiée, comportement correct |
| `/journal/restauration-rehabilitation-reconversion` | Le corps officiel est vide ; la route renvoie volontairement 404. | Non publiée, comportement correct |
| `/contact` | Contact direct, motifs, confidentialité, formulaire qualifié et promesse de premier échange sous 48 heures sont correctement hiérarchisés. Le mobile donne d’abord accès aux coordonnées. | UX validée ; livraison email non opérationnelle sans Resend |
| `/mentions-legales` | La page ne publie plus de consignes internes ni de fausses données. Sa composition est propre. | Incomplète juridiquement en attente des identifiants officiels |
| `/confidentialite` | Le traitement réel du formulaire, les contrôles et la finalité sont expliqués sans message interne de validation. | À faire valider par le responsable juridique |
| Route inexistante / 404 | Un `h1`, une explication et un retour utile sont présents ; le contraste du header sur la zone haute a été renforcé. | Validée |

Il n’existe actuellement aucun article Journal actif au sens éditorial : les trois fiches officielles possèdent un titre et un synopsis, mais aucun corps. Les rendre inaccessibles est donc la décision la plus exacte et la plus crédible.

## 6. Évaluation de la densité de contenu

Le contenu officiel a été conservé autant que possible. Les corrections se sont concentrées sur la hiérarchie, la largeur de lecture, l’ordre mobile, les intitulés et l’attribution plutôt que sur une réécriture marketing non autorisée.

Les introductions éditoriales restent contenues dans une largeur de lecture appropriée, les textes mobiles conservent une taille utilisable et les pages les plus denses alternent paragraphes, preuves, tableaux, timeline et cartes. La biographie du fondateur n’est pas répétée à chaque page ; la méthode PATRIGOV est expliquée en profondeur sur sa route dédiée et seulement contextualisée ailleurs.

Les titres longs du Journal utilisent une espace insécable avant les deux-points afin d’éviter des cassures typographiques faibles. La page Contact expose désormais le texte officiel de guidage à proximité immédiate du formulaire, tandis que le contact direct apparaît avant les explications secondaires sur petit écran.

La seule densité éditoriale volontairement absente est celle des articles : aucun corps n’étant fourni, aucun remplissage ou texte de substitution n’a été créé.

## 7. Évaluation des images

Les images actives ont été vérifiées dans leurs compositions mobile, tablette et desktop. Aucun fichier cassé ou échec réseau d’image n’a été détecté. Les visuels couvrent les registres nécessaires au positionnement : architecture institutionnelle et résidentielle, urbanisme et foncier, patrimoine, chantier, plans et coordination.

Les images validées de Tinmel, Tiznit et Cervantès ont été conservées. Elles ne sont pas accompagnées d’impacts, budgets ou résultats inventés. Les images contextuelles servent à exprimer un domaine d’intervention et ne sont pas légendées comme des réalisations directes d’ARCHERITAGE lorsqu’une telle attribution n’est pas établie.

Le visuel officiel de Safi n’est pas présent dans le dépôt. Le faux monogramme ou placeholder a été supprimé et la référence utilise une carte textuelle propre, sans donner l’illusion qu’un asset existe. Ce repli est honnête pour la QA, mais l’image officielle reste requise avant la mise en ligne finale demandée.

Une validation de provenance et de droits d’exploitation des images contextuelles doit accompagner le bon à tirer final ; cette vérification relève du management, pas d’une extrapolation du code.

## 8. Évaluation de l’iconographie

Le système local `ArcheritageIcon` apporte une grammaire homogène de traits, de tailles, de tons et de variantes. Les mappings couvrent les piliers, les profils clients, les formats de mission, les principes PATRIGOV, les coordonnées, la confidentialité, l’upload, les statuts du formulaire et le footer.

Les icônes restent secondaires par rapport aux titres et aux photographies. Elles n’ont pas été ajoutées aux liens de navigation ordinaires, à chaque champ, aux paragraphes, aux textes juridiques ou sur les images de projet. Les icônes purement visuelles sont masquées aux technologies d’assistance lorsque le libellé textuel porte déjà le sens ; les boutons d’icône disposent d’un nom accessible.

Le résultat se lit comme une iconographie d’orientation et de preuve, pas comme un kit SaaS décoratif. Aucun ajout d’une nouvelle bibliothèque d’icônes n’a été nécessaire.

## 9. Évaluation responsive

Les 98 diagnostics couvrent les sept dimensions imposées, dont les deux zones sensibles de 1024 et 1280 px. Aucun débordement horizontal du document, contenu coupé, image cassée, titre tronqué ou collision majeure n’a été relevé.

Les corrections spécifiques incluent :

- menu mobile monté uniquement lorsqu’il est ouvert, scrollable et verrouillant proprement le `body` ;
- menu 1024×768 conservant son CTA accessible par défilement (`clientHeight` 768, `scrollHeight` 842) ;
- CTA de sections empêché de se casser maladroitement à partir de 768 px ;
- cartes sans image ramenées à une colonne, notamment le repli Safi ;
- profils clients compactés sur desktop et redistribués sur tablette ;
- sélecteur de fichier empilé proprement sur les petits écrans ;
- contact direct placé avant le formulaire et les explications secondaires sur mobile ;
- footer et grille de preuves adaptés sans largeur fixe.

Les légers débords internes mesurés sur les images transformées du carousel sont contenus par leur cadre et ne créent pas de largeur de document ; ils ne constituent pas un overflow utilisateur.

## 10. Évaluation de l’accessibilité

Chaque rendu contrôlé comporte exactement un `h1`. Aucun bouton ou champ sans nom accessible n’a été détecté. Les titres de cartes ont été alignés sur une hiérarchie sémantique correcte et la navigation active utilise `aria-current="page"`, y compris sur les routes imbriquées.

Le menu mobile se comporte comme une boîte de dialogue modale : `aria-modal`, association du déclencheur via `aria-controls`, focus initial sur la fermeture, boucle de tabulation, fermeture par `Escape`, restitution du focus au bouton d’ouverture, fermeture lors d’un changement de route ou du passage au breakpoint desktop. Le test ciblé confirme aussi le verrouillage puis la restauration du scroll du document.

Avec `prefers-reduced-motion`, le menu est visible à opacité 1 et les contenus restent accessibles sans dépendre de GSAP. Le header ne disparaît plus lorsqu’un de ses éléments contient le focus. Les focus visibles ont été renforcés par un anneau à deux niveaux ; le ton rouille utilisé pour le texte et les contrastes faibles du footer ont été assombris.

Le formulaire indique les champs requis avec `required` et `aria-required`, relie les erreurs aux contrôles, place le focus sur le premier champ invalide et annonce les statuts via `alert` ou `status`. Le champ fichier possède un libellé français, une aide, un nom de fichier annoncé et une erreur accessible. La politique de confidentialité est liée depuis le formulaire.

Cette conclusion repose sur les diagnostics DOM, les essais clavier ciblés et l’inspection rendue. Elle ne remplace pas une certification WCAG indépendante ni un test exhaustif avec chaque lecteur d’écran du marché.

## 11. Évaluation de la conversion

Les parcours de conversion restent sobres et contextuels. Le CTA `CONTACTEZ-NOUS` est cohérent dans le header, le menu et la fin de homepage ; les pages métier mènent vers un contact préqualifié selon le besoin. L’email, le téléphone et l’adresse restent directement accessibles dans la page Contact et le footer.

La promesse officielle « Un premier échange, sous 48 heures » est placée dans le hero Contact et reprise dans le succès de soumission. Le formulaire qualifie l’organisation, le profil, le type de projet, la ville, l’échéance et le message sans ajouter de mécanisme marketing hors brief. La pièce jointe optionnelle est limitée à un fichier PDF, DOC, DOCX, JPG ou PNG de 5 Mo au maximum ; son extension, son type déclaré et sa signature binaire sont contrôlés côté serveur.

Lorsque `Content-Length` est fourni, l’API refuse les requêtes trop volumineuses avant le parsing multipart. Elle borne et nettoie aussi sa table locale de rate limiting, protège le champ honeypot, échappe le contenu HTML et limite l’attente Resend à dix secondes. Les indisponibilités produisent une réponse 503 explicite au lieu d’un faux succès.

Le parcours ne peut néanmoins pas être qualifié d’opérationnel en production tant que `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL` ne sont pas renseignés et qu’un envoi de bout en bout n’a pas été reçu et vérifié.

## 12. Constats P0

| P0 identifié | État après correction | Preuve ou action restante |
| --- | --- | --- |
| Menu mobile invisible ou dépendant de l’animation réduite | Corrigé | Menu visible en modes normal et réduit, scrollable à 1024 px, focus piégé et restitué |
| Contrôles de navigation insuffisamment accessibles | Corrigé | Noms accessibles, `aria-expanded`, `aria-controls`, `aria-current`, `Escape` et focus clavier testés |
| Articles vides présentés comme des publications complètes | Corrigé | Index « Publication à venir », absence de faux lien, trois slugs en 404 et exclus du sitemap |
| Attribution ambiguë des preuves et références | Corrigé | Distinction fondateur/PATRIGOV et prudence sur les commandes directes |
| Placeholder public et faux visuel Safi | Corrigé dans le code | README public supprimé, faux monogramme retiré, repli textuel ; visuel officiel encore requis |
| Consignes internes visibles sur les pages légales | Corrigé | Messages internes retirés et métadonnées canoniques ajoutées |
| Conversion mobile affaiblie par l’ordre du contenu et le champ fichier | Corrigé | Contact direct prioritaire, fichier accessible, validation et lien confidentialité |
| Identité visuelle officielle absente | **Ouvert, externe** | Fournir et intégrer logo et favicons approuvés |
| Mentions légales incomplètes | **Ouvert, externe** | Fournir les identifiants et faire valider les textes officiels |
| Livraison du formulaire non configurée | **Ouvert, externe** | Configurer Resend et réussir un test de réception réel |
| Image officielle Safi absente | **Ouvert, externe** | Fournir le fichier, les droits, l’alt et le cadrage validé |

Aucun autre P0 technique ou UX n’a été détecté dans la matrice rendue après correction. Les quatre P0 ouverts sont des portes de lancement externes : ils ne doivent pas être contournés par des données ou assets inventés.

## 13. Constats P1

Les P1 justifiés pendant l’audit ont été traités :

- hiérarchie et compacité des cartes de piliers et de profils clients ;
- icônes de lecture pour les missions, PATRIGOV, le contact et le footer ;
- CTA trop susceptible de se couper sur tablette ;
- contraste du texte rouille, des focus, du bas de footer et du header de la 404 ;
- titre Journal cassant mal autour des deux-points ;
- carte Références sans image trop proche d’un composant vide ;
- ordre mobile de la page Contact et proximité de son texte de guidage ;
- champ fichier natif peu lisible et statut de soumission insuffisamment explicite ;
- état actif limité aux correspondances exactes et absent des sous-routes ;
- header masquable alors qu’un élément recevait le focus ;
- préchargement manuel du hero inutile ;
- pages légales et articles brouillant le sitemap marketing.

Aucun P1 ouvert n’est connu à l’issue des inspections desktop, tablette et mobile. Toute intégration ultérieure des assets officiels devra cependant être recontrôlée aux sept dimensions, car un logo ou une image de proportions différentes peut créer de nouveaux écarts.

## 14. Recommandations P2 différées

Les améliorations suivantes sont volontairement différées parce qu’elles nécessitent du contenu, une décision ou une ambition hors du correctif final :

- publier les trois articles uniquement après réception et validation de leurs corps éditoriaux complets ;
- ajouter, si le management le souhaite, des études de cas plus détaillées avec données et résultats officiellement sourcés ;
- enrichir la référence Safi après intégration de son asset officiel, sans changer le repli honnête actuel avant cela ;
- évaluer un dispositif de mesure d’audience seulement après choix légal, consentement et gouvernance des données ;
- affiner les transitions de page uniquement dans le système de mouvement existant, sans reconstruire les animations ni ajouter des effets décoratifs sans fonction.
- imposer au niveau du proxy ou de la plateforme une limite de corps indépendante de `Content-Length`, puis remplacer le rate limiting mémoire par un stockage partagé si le site est déployé sur plusieurs instances.

Aucun chatbot, newsletter, lead magnet, calculateur, CRM, témoignage, logo partenaire ou chiffre spéculatif n’a été ajouté.

## 15. Corrections implémentées

Les corrections sont regroupées ci-dessous par impact :

- **Navigation et clavier :** menu mobile réellement modal, non monté lorsqu’il est fermé, scrollable, compatible reduced motion, focus piégé et restitué, fermeture sur route et breakpoint ; états actifs imbriqués ; header maintenu visible au focus.
- **Confiance éditoriale :** attribution fondateur/PATRIGOV clarifiée, références prudentes, faux visuel Safi retiré, dossier public débarrassé de son README de placeholder.
- **Journal :** détermination explicite de l’état publié à partir d’un corps réel, cartes « Publication à venir », slugs vides en 404, titres à césure maîtrisée, brouillons exclus du sitemap.
- **Contact :** copie officielle et ordre mobile corrigés, coordonnées iconographiées, guidage rapproché du formulaire, champs requis accessibles, sélecteur de fichier français, validation partagée client/serveur, statut et confidentialité explicites.
- **API Contact :** contrôle anticipé de taille lorsque l’en-tête est disponible, contrôle du nombre, de l’extension, du type et de la signature des pièces, rate limiting local borné et nettoyé, erreur multipart robuste, délai d’attente Resend, gestion réseau 503 et succès conforme à la promesse de 48 heures.
- **Design system :** système d’icônes local, contraste renforcé, focus à deux niveaux, cartes compactées, styles Journal et Contact harmonisés, bouton CTA stabilisé sur tablette, footer mieux lisible, 404 mieux contrastée.
- **Hero :** suppression du préchargement manuel, contrôle pause masqué en reduced motion, vérification dédiée des cinq images et du CTA sur mobile et desktop.
- **SEO et routage :** description globale équilibrée autour des trois piliers, canonicals légaux, sitemap limité aux routes publiques et éditorialement publiées.
- **QA :** scripts de diagnostic visuel et du hero, captures multi-viewports et JSON de preuve conservés dans `artifacts/final-site-audit/`.

Les changements restent ciblés : framework, routes validées, faits officiels, images projet approuvées et architecture générale ont été préservés.

## 16. Éléments nécessitant une entrée du management

Le management doit fournir ou valider les éléments suivants avant le bon à tirer :

1. Dénomination sociale exacte, forme juridique, capital, siège, registre de commerce, identifiant fiscal, ICE et toute autre immatriculation applicable.
2. Directeur ou responsable de publication, hébergeur, coordonnées légales et juridiction ou droit applicable à mentionner.
3. Responsable de traitement, modalités d’exercice des droits, durées de conservation et validation juridique finale des pages `mentions-legales` et `confidentialite`.
4. Adresses d’expédition et de réception du formulaire, domaine Resend vérifié, personne responsable des réponses et capacité réelle à tenir le premier échange sous 48 heures.
5. Corps complets et statut de validation des trois articles Journal ; aucune date ni durée de lecture ne doit être publiée sans source.
6. Validation de l’attribution, de la provenance et des droits d’exploitation des images contextuelles et des références.
7. Confirmation finale de la manière dont la référence Safi doit être décrite et illustrée.

Ces informations ne doivent pas être déduites de documents partiels ou remplacées par des exemples publics.

## 17. Éléments nécessitant des assets officiels

Les assets manquants à livrer sont :

- logo ARCHERITAGE officiel, idéalement en SVG, avec variantes clair/foncé, zone de protection et règles d’utilisation ;
- jeu de favicons officiel : `.ico`, PNG usuels, icône Apple et, si prévu, manifeste PWA cohérent ;
- image officielle de la référence Safi dans une définition suffisante pour desktop, accompagnée des droits d’utilisation, du crédit éventuel, du texte alternatif validé et d’une indication de cadrage ;
- le cas échéant, visuel de partage social officiel plutôt qu’une création non approuvée.

En leur absence, le site conserve volontairement un wordmark textuel et une référence Safi sans image. Ces replis empêchent toute fausse représentation, mais ne constituent pas les assets définitifs attendus pour le lancement.

## 18. Verdict final de launch-readiness

**Verdict : NON — le site n’est pas encore launch-ready.**

Le front-end, l’UX, le responsive et les parcours principaux sont à un niveau de QA avancé et peuvent être présentés pour validation finale. L’expérience rendue est cohérente, crédible et nettement supérieure à un premier jet. Les contrôles effectués pendant l’audit ont validé le lint, le typecheck et un build de production propre ; les routes publiques en 200, les 404 intentionnelles, le sitemap, le mode réduit, le menu et la validation du formulaire ont été exercés.

La publication doit rester bloquée jusqu’à ce que les quatre conditions suivantes soient toutes remplies :

1. logo et favicons officiels fournis, intégrés et revalidés aux sept dimensions ;
2. identifiants et textes légaux complétés puis approuvés ;
3. variables Resend configurées et test de soumission de bout en bout reçu avec succès ;
4. visuel Safi officiel fourni et intégré avec ses droits et son attribution.

Après toute intégration d’asset ou de configuration, exécuter à nouveau `npm run lint`, `npm run build`, `git diff --check`, le contrôle HTTP de toutes les routes et une vérification visuelle ciblée. Le passage en **GO** ne doit être prononcé qu’après la levée documentée de ces quatre portes.
