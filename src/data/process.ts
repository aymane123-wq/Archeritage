import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Esquisse',
    description: 'Nous cadrons le besoin, le site et les usages afin de produire une première direction claire et lisible.',
  },
  {
    number: '02',
    title: 'Développement',
    description: 'Le concept se précise avec les matières, les volumes, les contraintes techniques et le budget cible.',
  },
  {
    number: '03',
    title: 'Autorisations',
    description: 'Nous préparons les dossiers administratifs et les pièces nécessaires à la validation du projet.',
  },
  {
    number: '04',
    title: 'Exécution',
    description: 'Les plans techniques, détails et consultations entreprises sont finalisés avec une rigueur millimétrique.',
  },
  {
    number: '05',
    title: 'Réalisation',
    description: 'Le chantier est suivi jusqu’à la livraison afin de préserver la qualité du geste architectural.',
  },
];
