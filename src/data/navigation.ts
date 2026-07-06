import type { NavItem } from '@/types';

export const navigation: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Mission', href: '/mission' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Conception Architecturale', href: '/services/conception-architecturale' },
      { label: 'Réalisation & Exécution', href: '/services/realisation-execution' },
      { label: 'Design Intérieur', href: '/services/design-interieur' },
      { label: 'Branding & Identité', href: '/services/branding-identite' },
    ],
  },
  {
    label: 'Projets',
    href: '/projets',
    children: [
      { label: 'Habitat', href: '/projets?category=habitat' },
      { label: 'Commercial', href: '/projets?category=commercial' },
      { label: 'Intérieurs', href: '/projets?category=interieurs' },
      { label: 'Équipements', href: '/projets?category=equipements' },
    ],
  },
  { label: 'Histoires', href: '/histoires' },
  { label: 'Contact', href: '/contact' },
];
