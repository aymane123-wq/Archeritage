import type { SitePage } from './types';

export const expertisesPage: SitePage = {
  eyebrow: 'Expertises',
  title: 'Une expertise transversale au service du patrimoine et de la décision',
  introduction: 'Archeritage combine lecture architecturale, connaissance du bâti ancien, compréhension institutionnelle et maîtrise des opérations complexes. Cette transversalité permet d’intervenir avec justesse, de la matière du lieu jusqu’au cadre de décision.',
  sections: [
    {
      eyebrow: 'A', title: 'Comprendre le patrimoine', introduction: 'Établir une connaissance solide du lieu avant toute transformation.', variant: 'cards',
      cards: [
        { title: 'Architecture patrimoniale', text: 'Lire les valeurs architecturales, les usages et le potentiel d’évolution des bâtiments, tissus et sites patrimoniaux.' },
        { title: 'Diagnostic patrimonial et architectural', text: 'Qualifier l’état, les fragilités, les contraintes et les orientations d’intervention possibles.' },
        { title: 'Lecture historique, constructive et matérielle', text: 'Comprendre les systèmes constructifs, les matériaux, les traces et les transformations successives du bâti.' },
      ],
    },
    {
      eyebrow: 'B', title: 'Transformer avec justesse', introduction: 'Concilier conservation, usage, faisabilité et qualité architecturale.', variant: 'cards',
      cards: [
        { title: 'Restauration, réhabilitation et reconversion', text: 'Définir une intervention responsable, attentive à la valeur du lieu et à sa nouvelle trajectoire d’usage.' },
        { title: 'Patrimoine, territoire et identité urbaine', text: 'Inscrire le projet dans son contexte urbain, culturel, social et territorial.' },
        { title: 'Valorisation, transmission et récit patrimonial', text: 'Rendre lisibles l’histoire, les choix et les savoir-faire afin de mieux transmettre la valeur du patrimoine.' },
      ],
    },
    {
      eyebrow: 'C', title: 'Maîtriser les projets complexes', introduction: 'Donner aux maîtres d’ouvrage une vision claire des responsabilités, des risques et de l’avancement réel.', variant: 'cards',
      cards: [
        { title: 'Maîtrise d’ouvrage et projets institutionnels', text: 'Cadrer le besoin, préparer les décisions et accompagner les phases sensibles d’une opération.' },
        { title: 'Gouvernance documentaire et traçabilité', text: 'Organiser les documents, les validations et la mémoire des arbitrages.' },
        { title: 'Pilotage des chantiers patrimoniaux complexes', text: 'Coordonner les informations, suivre les risques et soutenir les décisions en phase d’exécution.' },
        { title: 'Audit, redressement et sécurisation des projets', text: 'Analyser les écarts, reconstituer les faits et remettre en place un cadre de maîtrise opérationnelle.' },
      ],
    },
    {
      eyebrow: 'D', title: 'Structurer la décision', introduction: 'Transformer la complexité en informations utiles, hiérarchisées et exploitables.', variant: 'cards',
      cards: [
        { title: 'Référentiels, méthodes et outils', text: 'Créer des procédures, matrices et tableaux de bord adaptés au fonctionnement réel du projet.' },
        { title: 'Conseil stratégique patrimonial', text: 'Éclairer les orientations, les priorités d’investissement et les trajectoires de valorisation.' },
      ],
    },
  ],
  cta: { title: 'Mobiliser les expertises utiles à votre projet', text: 'Archeritage compose son intervention selon le lieu, les enjeux et le niveau de complexité de l’opération.', label: 'Nous contacter', href: '/contact' },
};
