import type { FooterGroup } from '@/types';

export const footerGroups: FooterGroup[] = [
  {
    title: 'Studio',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Mission', href: '/mission' },
      { label: 'Services', href: '/services' },
      { label: 'Histoires', href: '/histoires' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Conception Architecturale', href: '/services/conception-architecturale' },
      { label: 'Réalisation & Exécution', href: '/services/realisation-execution' },
      { label: 'Design Intérieur', href: '/services/design-interieur' },
      { label: 'Branding & Identité', href: '/services/branding-identite' },
    ],
  },
  {
    title: 'Projets',
    links: [
      { label: 'Habitat', href: '/projets?category=habitat' },
      { label: 'Commercial', href: '/projets?category=commercial' },
      { label: 'Intérieurs', href: '/projets?category=interieurs' },
      { label: 'Équipements', href: '/projets?category=equipements' },
    ],
  },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
];
