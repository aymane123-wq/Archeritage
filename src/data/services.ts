import type { Service } from '@/types';

export const services: Service[] = [
  {
    slug: 'conception-architecturale',
    eyebrow: '01',
    title: 'Conception Architecturale',
    description:
      'Des intentions claires, des plans maîtrisés et une lecture sensible du site pour construire une architecture durable.',
    intro:
      'Nous définissons le projet à partir des usages, du contexte et des contraintes, afin de produire une base solide et élégante.',
    image: '/images/services/architecture-outline.png',
    altText: 'Schéma architectural minimaliste',
    icon: 'Architecture',
    highlights: ['Esquisses et volumétrie', 'Études de faisabilité', 'Rénovation et réhabilitation', 'Coordination des intervenants'],
    process: ['Esquisse', 'Développement', 'Autorisations', 'Exécution', 'Réalisation'],
    relatedProjectSlugs: ['villa-atelier-terracotta', 'maison-avant-garde'],
  },
  {
    slug: 'realisation-execution',
    eyebrow: '02',
    title: 'Réalisation & Exécution',
    description:
      'Une présence rigoureuse sur le chantier pour préserver l’intention du projet et garantir une livraison précise.',
    intro:
      'Nous transformons les plans validés en une réalité construite, avec une attention constante aux détails et aux délais.',
    image: '/images/services/realisation-outline.png',
    altText: 'Détail de chantier et de réalisation architecturale',
    icon: 'Execution',
    highlights: ['Plans techniques', 'Suivi de chantier', 'Contrôle qualité', 'Réception finale'],
    process: ['Esquisse', 'Développement', 'Autorisations', 'Exécution', 'Réalisation'],
    relatedProjectSlugs: ['galerie-lumiere', 'atrium-atelier'],
  },
  {
    slug: 'design-interieur',
    eyebrow: '03',
    title: 'Design Intérieur',
    description:
      'Des espaces intérieurs chaleureux, précis et cohérents, où chaque matière contribue à l’expérience du lieu.',
    intro:
      'Nous orchestrons volumes, mobilier, lumière et matières pour construire une atmosphère éditoriale et durable.',
    image: '/images/services/interior-outline.png',
    altText: 'Esquisse de design intérieur premium',
    icon: 'Interior',
    highlights: ['Aménagement intérieur', 'Mobilier sur mesure', 'Matériaux et textures', 'Éclairage d’ambiance'],
    process: ['Esquisse', 'Développement', 'Autorisations', 'Exécution', 'Réalisation'],
    relatedProjectSlugs: ['residence-noir-sable', 'salon-atlas'],
  },
  {
    slug: 'branding-identite',
    eyebrow: '04',
    title: 'Branding & Identité',
    description:
      'Une identité visuelle sobre et singulière pour rendre les lieux, les projets et les enseignes immédiatement reconnaissables.',
    intro:
      'Nous traduisons la dimension architecturale en langage de marque, avec un système graphique cohérent et premium.',
    image: '/images/services/branding-outline.png',
    altText: 'Composition graphique pour identité architecturale',
    icon: 'Branding',
    highlights: ['Direction artistique', 'Identité visuelle', 'Signalétique', 'Supports de communication'],
    process: ['Esquisse', 'Développement', 'Autorisations', 'Exécution', 'Réalisation'],
    relatedProjectSlugs: ['atelier-nomade', 'maison-avant-garde'],
  },
];
