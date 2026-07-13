import type { SitePage } from './types';

export const referencesPage: SitePage = {
  eyebrow: 'Références',
  title: 'Des expériences à l’intersection de l’architecture, du patrimoine et des projets complexes',
  introduction: 'Archeritage s’appuie sur un parcours professionnel développé dans des contextes architecturaux, urbains, patrimoniaux, territoriaux et institutionnels. Les références sont présentées par familles d’intervention, avec rigueur sur le rôle réellement exercé.',
  sections: [
    {
      eyebrow: 'Domaines de références',
      title: 'Six familles d’intervention',
      introduction: 'Ces domaines expriment l’étendue de l’expérience mobilisable par le cabinet. Ils ne constituent pas une liste de projets attribués sans validation.',
      variant: 'cards',
      cards: [
        { title: 'Architecture et équipements', text: 'Bâtiments publics ou privés, équipements collectifs, transformations, extensions et études de faisabilité.' },
        { title: 'Urbanisme, lotissements et aménagement', text: 'Études foncières, scénarios urbains, insertion réglementaire, organisation parcellaire et espaces collectifs.' },
        { title: 'Patrimoine et réhabilitation', text: 'Diagnostics, restauration, reconversion, sauvegarde et valorisation de bâtiments ou de sites anciens.' },
        { title: 'Grands projets et opérations institutionnelles', text: 'Programmes multi-acteurs nécessitant coordination technique, administrative et stratégique.' },
        { title: 'AMO, audit et gouvernance', text: 'Cadrage, aide à la décision, audit de situation, sécurisation documentaire et redressement opérationnel.' },
        { title: 'Territoires et valorisation', text: 'Patrimoine comme levier d’identité, de développement local, de transmission et d’attractivité.' },
      ],
    },
    {
      eyebrow: 'Expérience fondatrice',
      title: 'Un cabinet jeune, fondé sur un parcours consolidé',
      introduction: 'L’expérience professionnelle d’Ahmed Taoufik Naciri constitue le socle du cabinet. Elle permet d’aborder un projet comme un système complet : un site, un programme, un maître d’ouvrage, des acteurs, des risques, des arbitrages et une trajectoire de réalisation.',
      variant: 'split',
    },
    {
      eyebrow: 'Présentation responsable',
      title: 'Distinguer clairement la nature de chaque contribution',
      introduction: 'Archeritage veille à préciser si une expérience relève directement du cabinet, du parcours professionnel de son fondateur, d’un partenariat ou d’une contribution méthodologique. Les missions sensibles peuvent être présentées de manière anonymisée ou rester confidentielles.',
      points: ['Références du cabinet', 'Expériences professionnelles du fondateur', 'Missions réalisées en partenariat', 'Contributions stratégiques ou documentaires', 'Missions anonymisées ou confidentielles'],
      variant: 'list',
    },
    {
      eyebrow: 'Études de cas',
      title: 'Une sélection appelée à s’enrichir',
      introduction: 'Les études de cas validées présenteront le contexte, les enjeux, la mission assurée, la méthode mobilisée et les enseignements utiles. Cette rubrique privilégiera la compréhension du projet à la simple galerie d’images.',
      variant: 'split',
    },
  ],
  cta: { title: 'Échanger sur une expérience ou un domaine d’intervention', text: 'Certaines références peuvent être détaillées dans un cadre adapté au niveau de confidentialité de la mission.', label: 'Nous contacter', href: '/contact' },
};
