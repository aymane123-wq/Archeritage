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
  "Les trois premiers repères relèvent du parcours professionnel de 35 ans du fondateur et constituent le socle d’expérience sur lequel ARCHERITAGE construit son exigence. PATRIGOV est la méthode propriétaire du cabinet.";

export const home = {
  hero: {
    eyebrow: "Cabinet d’architecture · Casablanca",
    title: "Valoriser le foncier. Construire l’envergure. Préserver la mémoire.",
    introduction:
      "Archeritage est un cabinet d’architecture qui réunit trois expertises rarement combinées sous un même toit : la valorisation foncière et territoriale, l’architecture des projets d’envergure, et la restauration du patrimoine bâti.",
    supporting:
      "Fondé par Ahmed Taoufik Naciri, architecte, Archeritage s’appuie sur 35 années d’expérience territoriale au service d’institutions publiques, de collectivités et de maîtres d’ouvrage privés, pour transformer des sites complexes en projets maîtrisés — du foncier brut au monument classé.",
  },
  stats: [
    { value: "35 ans", label: "d’expérience territoriale" },
    { value: "UNESCO / UNDP", label: "Médina de Fès" },
    { value: "1er prêt", label: "Banque mondiale, ville de Casablanca" },
    { value: "PATRIGOV", label: "méthode propriétaire de gouvernance" },
  ],
  pillarsTitle: "Trois expertises, une seule exigence de maîtrise",
  finalCta: "Contactez Archeritage pour un premier échange.",
};

export const pillars: Pillar[] = [
  {
    title: "Valorisation foncière et territoriale",
    description:
      "Études de faisabilité, optimisation parcellaire, lotissements, structuration d’opérations foncières complexes et stratégies de valorisation pour collectivités et investisseurs.",
    href: "/expertises/valorisation-fonciere",
    image: "/images/pillars/pillar-valorisation-fonciere.png",
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
      "Conception, coordination et pilotage de bâtiments publics, équipements collectifs et opérations multi-acteurs nécessitant une gouvernance de projet rigoureuse.",
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
      "Diagnostic, restauration, réhabilitation et reconversion de monuments, kasbahs, médinas et sites historiques — de la lecture patrimoniale à la mise en valeur territoriale.",
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
  title: "Trois décennies d’action territoriale au service d’une nouvelle culture du patrimoine",
  introduction: "Archeritage n’est pas un cabinet qui débute. C’est un cabinet qui capitalise.",
  experience:
    "Ahmed Taoufik Naciri, architecte, fonde Archeritage après 35 années passées à la croisée de l’architecture, du patrimoine et de la gouvernance territoriale — au sein d’institutions publiques marocaines couvrant plusieurs provinces et wilayas. Ce parcours l’a conduit à collaborer avec l’UNESCO et le PNUD (UNDP) sur la sauvegarde de la Médina de Fès, et à porter, comme point focal technique à Casablanca, l’obtention du premier prêt de la Banque mondiale accordé à une ville de cette envergure.",
  distinction:
    "Cette expérience institutionnelle constitue le socle personnel du fondateur ; Archeritage en prolonge la méthode et l’exigence au service de ses clients, sans s’y substituer.",
  conviction:
    "Le patrimoine n’est pas un objet figé à conserver : c’est une matière stratégique et territoriale. Un projet patrimonial réussi ne se juge pas seulement à la qualité de son dessin, mais à la clarté de son cadre, à la traçabilité de ses décisions et à la maîtrise réelle de sa conduite.",
  founder:
    "Architecte de formation, Ahmed Taoufik Naciri a occupé, tout au long de sa carrière territoriale, des fonctions de direction en gestion économique, administration fiscale et direction générale des services au sein de collectivités marocaines, avant de se consacrer pleinement à l’architecture patrimoniale et à la gouvernance de projets complexes. Il porte à travers Archeritage une vision du patrimoine comme levier de transformation territoriale — associant exigence culturelle, méthode opérationnelle et capacité de dialogue institutionnel.",
  approach:
    "Chaque mission commence par la compréhension du lieu, des acteurs et des enjeux réels — jamais par une réponse standard. Archeritage propose ensuite un accompagnement calibré : diagnostic, note stratégique, assistance à maîtrise d’ouvrage, audit, dispositif de gouvernance ou stratégie de valorisation.",
};

export const expertises = {
  title: "Une expertise architecturale au service du foncier, des grands projets et du patrimoine",
  introduction: "Douze compétences, organisées autour de trois exigences : comprendre, concevoir, sécuriser.",
  supporting:
    "Archeritage combine une culture architecturale exigeante, une connaissance fine du patrimoine bâti et une méthode de gouvernance de projet éprouvée sur des opérations institutionnelles réelles.",
  governance:
    "Sur les trois piliers, Archeritage applique une même exigence : structurer les responsabilités, documenter les décisions et sécuriser les arbitrages. Cette gouvernance documentaire est formalisée dans notre méthode propriétaire PATRIGOV.",
};

export const missionIssues = [
  { title: "Valoriser un foncier ou un territoire", text: "Étude de faisabilité, optimisation parcellaire, structuration d’une opération de lotissement, stratégie de valorisation territoriale — nous transformons un site en projet argumenté et finançable." },
  { title: "Construire ou transformer un projet d’envergure", text: "Conception, cadrage stratégique, assistance à maîtrise d’ouvrage, gouvernance de projet complexe — nous donnons aux opérations multi-acteurs une méthode de pilotage claire." },
  { title: "Restaurer ou valoriser un patrimoine", text: "Diagnostic patrimonial, restauration, réhabilitation, reconversion, valorisation territoriale — nous accompagnons chaque étape avec la rigueur qu’exige un site historique." },
];

export const missionFormats = [
  ["Diagnostic flash", "Lecture rapide d’une situation foncière, architecturale ou patrimoniale"],
  ["Étude de faisabilité", "Analyse du potentiel d’un site ou d’un projet avant décision"],
  ["Assistance à maîtrise d’ouvrage", "Accompagnement structuré des phases sensibles d’un projet"],
  ["Audit et redressement", "Remise sous contrôle d’un projet bloqué ou insuffisamment gouverné"],
  ["Mission complète de gouvernance", "Pilotage documentaire et opérationnel de bout en bout (méthode PATRIGOV)"],
] as const;

export const methode = {
  title: "PATRIGOV by Archeritage",
  introduction: "La méthode propriétaire qui transforme la complexité d’un projet en système lisible, documenté et maîtrisable.",
  supporting: "Les projets fonciers, architecturaux et patrimoniaux complexes ne se pilotent pas par la seule présence sur site. Ils exigent une méthode capable de structurer les responsabilités, fiabiliser les validations, documenter les décisions et donner au maître d’ouvrage une vision claire de l’état réel du projet.",
  proof: "Preuve de méthode : sur une opération de restauration patrimoniale pilotée par le fondateur, l’application de cette gouvernance documentaire a permis de transformer 116 jours de retards jusque-là non documentés en droits contractuels opposables — un exemple concret de ce que la méthode apporte à un maître d’ouvrage.",
  principles: ["Clarifier", "Documenter", "Hiérarchiser", "Sécuriser", "Piloter", "Alerter", "Capitaliser"],
  cycle: [
    ["Comprendre le contexte", "acteurs, cadre institutionnel, documents existants"],
    ["Diagnostiquer la situation", "risques, zones de flou, écarts documentaires"],
    ["Structurer le cadre", "circuits de validation, matrices de responsabilités"],
    ["Accompagner la mise en œuvre", "outils, réunions, formalisation des décisions"],
    ["Suivre, alerter, ajuster", "lecture continue des écarts et des risques"],
    ["Capitaliser et transmettre", "synthèse de fin de mission, mémoire durable"],
  ] as const,
  proprietary: "PATRIGOV constitue une méthode propriétaire du cabinet. Les grandes lignes sont présentées publiquement ; les outils détaillés, matrices et dispositifs avancés sont communiqués dans le cadre de missions formalisées.",
};

export const references = [
  { name: "Mosquée de Tinmel", institution: "Ministère des Habous", description: "Restauration d’un édifice historique majeur du Haut Atlas, mobilisant lecture historique, coordination technique et gouvernance documentaire du chantier.", image: "/images/references/tinmel-cover.jpg" },
  { name: "Kasbah de Tiznit et Place Mechouar", institution: "", description: "Valorisation patrimoniale d’un ensemble historique urbain, entre restauration et mise en usage contemporaine.", image: "/images/references/tiznit-cover.jpg" },
  { name: "Théâtre Cervantès — Tanger", institution: "APDN", description: "Accompagnement d’une opération de réhabilitation d’un patrimoine architectural du XXe siècle, sous maîtrise d’ouvrage de l’Agence de promotion et de développement du Nord.", image: "/images/references/cervantes-cover.jpg" },
  { name: "Murailles portugaises et Château de Mer — Safi", institution: "Direction régionale de la Culture", description: "Intervention sur un monument classé du XVIe siècle, en lien avec la Direction régionale de la Culture." },
];

export const journalPosts: JournalPost[] = [
  { slug: "valorisation-fonciere-diagnostic-prealable", title: "Valorisation foncière : ce qu’un diagnostic préalable change vraiment", description: "Note de doctrine sur la valeur d’une étude de faisabilité avant toute décision foncière.", category: "Notes de doctrine", image: "/images/pillars/pillar-valorisation-fonciere.png", imageAlt: "Vue aérienne d’un territoire résidentiel structuré", body: [] },
  { slug: "tinmel-116-jours-retard", title: "Tinmel : documenter 116 jours de retard pour sécuriser un chantier patrimonial", description: "Retour d’expérience sur l’application de la gouvernance documentaire à un chantier de restauration réel.", category: "Méthode et gouvernance", image: "/images/references/tinmel-cover.jpg", imageAlt: "Architecture patrimoniale de la mosquée de Tinmel", body: [] },
  { slug: "restauration-rehabilitation-reconversion", title: "Restauration, réhabilitation, reconversion : trois mots que l’on confond à tort", description: "Note de doctrine clarifiant une distinction essentielle pour tout maître d’ouvrage patrimonial.", category: "Regards sur le patrimoine", image: "/images/journal/journal-chantier-construction.jpg", imageAlt: "Structure architecturale en cours de construction", body: [] },
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
  introduction: "Vous portez un projet foncier, architectural ou patrimonial ? Vous souhaitez valoriser un site, structurer une opération complexe ou sécuriser un chantier ? Archeritage étudie chaque demande avec rigueur et confidentialité.",
  reasons: ["une étude de faisabilité foncière ou une valorisation territoriale", "un projet architectural ou une opération complexe multi-acteurs", "un diagnostic, une restauration ou une réhabilitation patrimoniale", "une assistance à maîtrise d’ouvrage ou un audit de projet", "un partenariat, une intervention ou une contribution professionnelle"],
  guidance: "Nature du projet, localisation, maître d’ouvrage, stade d’avancement, objectifs, contraintes, délais, documents disponibles. Ces éléments permettent de préparer un premier échange directement utile.",
  confidentiality: "Les documents, plans et données transmis sont utilisés exclusivement pour comprendre votre demande. Un cadre de confidentialité spécifique peut être établi avant tout partage approfondi.",
};
