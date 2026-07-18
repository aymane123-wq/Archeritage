export type Pillar = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  competencies: string[];
};

export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  imageAlt?: string;
  body: string[];
};

export const founderAttribution =
  "Les trois premiers repères relèvent du parcours professionnel du fondateur. PATRIGOV est la méthode de gouvernance développée par ARCHERITAGE.";

export const home = {
  hero: {
    eyebrow: "Cabinet d’architecture · Casablanca",
    title: "Valoriser le foncier. Construire l’envergure. Préserver la mémoire.",
    introduction:
      "ARCHERITAGE accompagne les institutions, collectivités, investisseurs et maîtres d’ouvrage dans la valorisation de sites, la conception de projets d’envergure et la transformation du patrimoine bâti.",
  },
  stats: [
    { value: "35 ans", label: "d’expérience territoriale" },
    { value: "UNESCO / UNDP", label: "Médina de Fès" },
    { value: "1er prêt", label: "Banque mondiale, ville de Casablanca" },
    { value: "PATRIGOV", label: "méthode propriétaire de gouvernance" },
  ],
  pillarsTitle: "Trois expertises, une seule exigence de maîtrise",
  pillarsIntro: "Du foncier au patrimoine, trois familles d’intervention reliées par une même exigence de cadrage et de conduite.",
  finalCta: "Discuter d’un projet avec ARCHERITAGE.",
};

export const pillars: Pillar[] = [
  {
    title: "Valorisation foncière et territoriale",
    description:
      "Structurer le potentiel d’un site : faisabilité, optimisation parcellaire, lotissements et stratégies de valorisation pour collectivités et investisseurs.",
    href: "/expertises/valorisation-fonciere",
    image: "/images/pillars/pillar-valorisation-fonciere.jpg",
    imageAlt: "Vue aérienne d’un site foncier structuré par ses parcelles et ses accès",
    imagePosition: "center",
    competencies: [
      "Études de faisabilité et optimisation parcellaire",
      "Conception de lotissements et insertion urbaine",
      "Stratégies de valorisation territoriale pour collectivités et investisseurs",
      "Analyse réglementaire et structuration d’opérations foncières complexes",
    ],
  },
  {
    title: "Architecture et projets d’envergure",
    description:
      "Concevoir et piloter des bâtiments publics, équipements collectifs et opérations multi-acteurs qui exigent une gouvernance de projet claire.",
    href: "/expertises/architecture-projets-envergure",
    image: "/images/pillars/pillar-architecture-envergure.jpg",
    imageAlt: "Architecture contemporaine d’un équipement de grande envergure",
    imagePosition: "center 48%",
    competencies: [
      "Conception architecturale de bâtiments publics et équipements collectifs",
      "Coordination de projets multi-acteurs et institutionnels",
      "Maîtrise d’ouvrage déléguée et assistance à maîtrise d’ouvrage",
      "Audit, redressement et sécurisation de projets en difficulté",
    ],
  },
  {
    title: "Valorisation du patrimoine",
    description:
      "Diagnostiquer, restaurer, réhabiliter et reconvertir monuments, kasbahs, médinas et sites historiques — de la lecture du lieu à sa mise en valeur.",
    href: "/expertises/valorisation-patrimoine",
    image: "/images/references/tiznit-cover.jpg",
    imageAlt: "Ensemble patrimonial de la kasbah de Tiznit et de la place Mechouar",
    imagePosition: "center",
    competencies: [
      "Diagnostic patrimonial et lecture historique, constructive et matérielle",
      "Restauration, réhabilitation et reconversion de bâtiments anciens",
      "Valorisation territoriale de sites historiques, kasbahs et médinas",
      "Documentation, transmission et récit patrimonial",
    ],
  },
];

export const cabinet = {
  title: "Un cabinet d’architecture pour les projets qui engagent un territoire",
  introduction:
    "Fondé par Ahmed Taoufik Naciri, ARCHERITAGE capitalise sur 35 années d’expérience territoriale pour accompagner des projets fonciers, architecturaux et patrimoniaux exigeants.",
  distinction:
    "Le cabinet réunit conception architecturale, lecture territoriale, expertise patrimoniale et gouvernance de projet.",
  experience:
    "Le parcours du fondateur s’est construit à la croisée de l’architecture, du patrimoine et de la gouvernance territoriale, au sein d’institutions publiques marocaines. Il a collaboré avec l’UNESCO et le PNUD (UNDP) sur la sauvegarde de la Médina de Fès, et porté, comme point focal technique à Casablanca, l’obtention du premier prêt de la Banque mondiale accordé à une ville de cette envergure.",
  conviction:
    "Un projet exigeant ne se juge pas seulement à la qualité de son dessin, mais à la clarté de son cadre, à la traçabilité des décisions et à la maîtrise réelle de sa conduite.",
  founder:
    "Architecte de formation, Ahmed Taoufik Naciri a exercé des responsabilités de direction en gestion économique, administration fiscale et direction générale des services au sein de collectivités marocaines, avant de se consacrer à l’architecture et à la gouvernance de projets complexes. À travers ARCHERITAGE, il associe exigence culturelle, méthode opérationnelle et dialogue institutionnel.",
  approach:
    "Chaque mission commence par la compréhension du lieu, des acteurs et des enjeux — jamais par une réponse standard.",
  approachFormats: [
    { label: "Diagnostic", href: "/missions" },
    { label: "Étude", href: "/missions" },
    { label: "AMO", href: "/missions" },
    { label: "Audit", href: "/missions" },
    { label: "Gouvernance", href: "/methode" },
  ] as const,
  orientationsTitle: "Trois familles d’expertise",
  orientationsIntro: "Pour le détail des compétences, consultez les pages dédiées.",
};

export const expertises = {
  title: "Foncier, architecture d’envergure et patrimoine",
  introduction: "Douze compétences, organisées autour de trois exigences : comprendre, concevoir, sécuriser.",
  supporting:
    "Comparez les trois familles d’expertise, puis ouvrez la page dédiée pour le détail des interventions.",
  governance:
    "Sur les trois piliers, ARCHERITAGE applique la même exigence : structurer les responsabilités, documenter les décisions et clarifier les arbitrages — formalisée dans PATRIGOV.",
};

export const missionIssues = [
  {
    title: "Valoriser un foncier ou un territoire",
    text: "Faisabilité, optimisation parcellaire, lotissement ou stratégie territoriale : nous transformons un site en projet structuré et argumenté.",
  },
  {
    title: "Construire ou transformer un projet d’envergure",
    text: "Conception, cadrage, AMO ou gouvernance : nous donnons aux opérations multi-acteurs une méthode de pilotage claire.",
  },
  {
    title: "Restaurer ou valoriser un patrimoine",
    text: "Diagnostic, restauration, réhabilitation ou reconversion : nous accompagnons chaque étape avec la rigueur qu’exige un site historique.",
  },
];

export const missionFormats = [
  ["Diagnostic flash", "Lecture rapide d’une situation foncière, architecturale ou patrimoniale"],
  ["Étude de faisabilité", "Analyse du potentiel d’un site ou d’un projet avant décision"],
  ["Assistance à maîtrise d’ouvrage", "Accompagnement structuré des phases sensibles d’un projet"],
  ["Audit et redressement", "Remise sous contrôle d’un projet bloqué ou insuffisamment gouverné"],
  ["Mission complète de gouvernance", "Pilotage documentaire et opérationnel de bout en bout (PATRIGOV)"],
] as const;

export const missionsPage = {
  title: "Choisir le bon niveau d’accompagnement",
  introduction:
    "Du diagnostic ciblé à la gouvernance complète, ARCHERITAGE adapte sa mission à l’état réel du projet, aux décisions à prendre et aux acteurs concernés.",
  audience:
    "Institutions publiques, collectivités, agences de développement, opérateurs privés, investisseurs fonciers et équipes confrontées à des opérations sensibles.",
};

export const methode = {
  title: "PATRIGOV by Archeritage",
  introduction:
    "La méthode propriétaire qui rend un projet complexe lisible, documenté et maîtrisable.",
  supporting: "",
  proof:
    "Sur une opération de restauration patrimoniale pilotée par le fondateur, cette gouvernance documentaire a permis de transformer 116 jours de retards jusque-là non documentés en droits contractuels opposables.",
  principles: ["Clarifier", "Documenter", "Hiérarchiser", "Sécuriser", "Piloter", "Alerter", "Capitaliser"],
  cycle: [
    ["Comprendre le contexte", "acteurs, cadre, documents existants"],
    ["Diagnostiquer la situation", "risques, zones de flou, écarts"],
    ["Structurer le cadre", "validations et responsabilités"],
    ["Accompagner la mise en œuvre", "outils, réunions, décisions"],
    ["Suivre, alerter, ajuster", "écarts et risques en continu"],
    ["Capitaliser et transmettre", "synthèse et mémoire de mission"],
  ] as const,
  proprietary:
    "Les grandes lignes de PATRIGOV sont présentées ici ; les outils détaillés sont partagés dans le cadre de missions formalisées.",
};

export const referencesIntro = {
  title: "Références sélectionnées",
  introduction:
    "Une sélection de missions territoriales, institutionnelles et patrimoniales qui constitue le socle d’expérience d’ARCHERITAGE.",
  attribution:
    "Ces références relèvent du parcours professionnel du fondateur. Les missions conduites directement sous l’enseigne ARCHERITAGE seront ajoutées progressivement.",
};

export const journalPosts: JournalPost[] = [
  {
    slug: "valorisation-fonciere-diagnostic-prealable",
    title: "Valorisation foncière : ce qu’un diagnostic préalable change vraiment",
    description: "Note de doctrine sur la valeur d’une étude de faisabilité avant toute décision foncière.",
    category: "Notes de doctrine",
    image: "/images/pillars/pillar-valorisation-fonciere.jpg",
    imageAlt: "Vue aérienne d’un territoire résidentiel structuré",
    body: [],
  },
  {
    slug: "tinmel-116-jours-retard",
    title: "Tinmel : documenter 116 jours de retard pour sécuriser un chantier patrimonial",
    description: "Retour d’expérience sur l’application de la gouvernance documentaire à un chantier de restauration réel.",
    category: "Méthode et gouvernance",
    image: "/images/references/tinmel-cover.jpg",
    imageAlt: "Architecture patrimoniale de la mosquée de Tinmel",
    body: [],
  },
  {
    slug: "restauration-rehabilitation-reconversion",
    title: "Restauration, réhabilitation, reconversion : trois mots que l’on confond à tort",
    description: "Note de doctrine clarifiant une distinction essentielle pour tout maître d’ouvrage patrimonial.",
    category: "Regards sur le patrimoine",
    image: "/images/journal/journal-chantier-construction.jpg",
    imageAlt: "Structure architecturale en cours de construction",
    body: [],
  },
];

export const journalCategories = ["Notes de doctrine", "Regards sur le patrimoine", "Carnets de projets", "Méthode et gouvernance"];

export type EditorialRubric = {
  id: string;
  title: string;
  description: string;
  plannedPublicationSlug?: string;
};

export const editorialRubrics: EditorialRubric[] = [
  {
    id: "notes-de-doctrine",
    title: "Notes de doctrine",
    description: "Les positions professionnelles d’ARCHERITAGE sur le foncier, l’architecture, le patrimoine et la conduite des projets complexes.",
    plannedPublicationSlug: "valorisation-fonciere-diagnostic-prealable",
  },
  {
    id: "regards-sur-le-patrimoine",
    title: "Regards sur le patrimoine",
    description: "Des lectures de lieux, de bâtiments et de territoires pour comprendre leur histoire, leurs transformations et leur potentiel.",
    plannedPublicationSlug: "restauration-rehabilitation-reconversion",
  },
  {
    id: "carnets-de-projets",
    title: "Carnets de projets",
    description: "Des fragments de démarche, observations de terrain et enseignements issus de situations professionnelles pouvant être partagées publiquement.",
  },
  {
    id: "methode-et-gouvernance",
    title: "Méthode et gouvernance",
    description: "Les principes de PATRIGOV, la gouvernance documentaire et les outils qui permettent de clarifier, sécuriser et piloter un projet.",
    plannedPublicationSlug: "tinmel-116-jours-retard",
  },
];

export const contact = {
  title: "Parler d’un projet avec Archeritage",
  promise: "Un premier échange, sous 48 heures",
  introduction:
    "Vous portez un projet foncier, architectural ou patrimonial ? Décrivez-le pour préparer un échange utile.",
  reasons: [
    "une étude de faisabilité foncière ou une valorisation territoriale",
    "un projet architectural ou une opération multi-acteurs",
    "un diagnostic, une restauration ou une réhabilitation patrimoniale",
    "une assistance à maîtrise d’ouvrage ou un audit de projet",
    "un partenariat ou une contribution professionnelle",
  ],
  guidance: "Indiquez le type de projet, le stade d’avancement et le contexte utile au premier échange.",
  confidentiality:
    "Les informations et pièces jointes transmises servent uniquement à comprendre votre demande.",
};
