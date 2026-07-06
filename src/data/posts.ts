import type { Post } from '@/types';

export const posts: Post[] = [
  {
    slug: 'matiere-lumiere-architecture-interieure',
    title: 'Matière et lumière dans l’architecture intérieure contemporaine',
    category: 'Architecture intérieure',
    date: '2026-05-10',
    excerpt: 'Comment composer une ambiance calme sans sacrifier la précision technique ni la fonctionnalité.',
    coverImage: '/images/blog/blog-01.webp',
    altText: 'Intérieur contemporain avec matière et lumière',
    heroImage: '/images/blog/blog-01.webp',
    content: [
      'La matière structure la perception d’un espace autant que ses volumes. Nous privilégions des surfaces tactiles, peu démonstratives, pour laisser la lumière travailler les reliefs.',
      'L’architecture intérieure contemporaine gagne en qualité lorsqu’elle se construit par couches: usage, circulation, matières, éclairage et détails de mobilier.',
      'Le résultat n’est pas seulement esthétique. Il devient durable parce qu’il répond à une logique de confort et de lisibilité au quotidien.',
    ],
    relatedPostSlugs: ['construire-une-maison-durable', 'penser-un-espace-commercial-premium'],
  },
  {
    slug: 'construire-une-maison-durable',
    title: 'Construire une maison durable sans perdre en élégance',
    category: 'Habitat',
    date: '2026-03-18',
    excerpt: 'Une lecture simple des volumes et des ouvertures permet d’améliorer à la fois l’usage et la performance.',
    coverImage: '/images/blog/blog-02.webp',
    altText: 'Maison contemporaine durable et lumineuse',
    heroImage: '/images/blog/blog-02.webp',
    content: [
      'La durabilité n’est pas une surcouche. Elle s’intègre dès la conception par l’orientation, les percements, les protections solaires et le choix des systèmes techniques.',
      'Une maison élégante reste claire dans ses intentions. Elle ne multiplie pas les effets, mais assume ses proportions et la cohérence de ses matières.',
      'Le bon projet est souvent celui qui résiste au temps parce qu’il a été pensé avec précision, et non avec excès.',
    ],
    relatedPostSlugs: ['matiere-lumiere-architecture-interieure', 'penser-un-espace-commercial-premium'],
  },
  {
    slug: 'penser-un-espace-commercial-premium',
    title: 'Penser un espace commercial premium autour du parcours client',
    category: 'Commercial',
    date: '2026-01-26',
    excerpt: 'Le parcours, le rythme et la lumière déterminent la perception d’une marque dans l’espace.',
    coverImage: '/images/blog/blog-03.webp',
    altText: 'Espace commercial premium avec lumière contrôlée',
    heroImage: '/images/blog/blog-03.webp',
    content: [
      'Un lieu commercial premium ne se résume pas à une belle façade. Il doit organiser le regard, révéler les produits et laisser de l’air aux circulations.',
      'Nous travaillons les profondeurs, la hiérarchie des objets et le temps de découverte pour créer un espace mémorable mais lisible.',
      'La cohérence entre architecture, matière et image de marque devient alors un levier direct de valeur perçue.',
    ],
    relatedPostSlugs: ['matiere-lumiere-architecture-interieure', 'construire-une-maison-durable'],
  },
];
