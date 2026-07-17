import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { contactDetails, contactLinks } from '@/content/site/contact-details';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Traitement des données transmises à ARCHERITAGE par le formulaire de contact.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/confidentialite' },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Données personnelles" title="Politique de confidentialité" introduction="Cette page décrit les traitements réellement utilisés pour répondre aux demandes adressées à ARCHERITAGE." />
      <section className="section section--ivory">
        <Container className="legal-copy">
          <h2>Données transmises</h2>
          <p>Le formulaire recueille les coordonnées, le profil professionnel et les informations de projet que vous choisissez de transmettre. Une pièce jointe peut être ajoutée de manière facultative.</p>

          <h2>Finalité</h2>
          <p>Ces informations sont utilisées pour comprendre votre demande, vérifier son contexte et préparer un premier échange utile. Elles ne sont pas utilisées pour une newsletter, de la publicité ou du profilage.</p>

          <h2>Transmission et sécurité</h2>
          <p>La demande est validée côté serveur puis transmise par email à l’adresse configurée par ARCHERITAGE. Le formulaire utilise un champ anti-spam invisible, une limitation du nombre de demandes et des contrôles de format et de taille pour les pièces jointes.</p>

          <h2>Cookies et mesure d’audience</h2>
          <p>Le site ne déclare actuellement aucun cookie non essentiel, outil publicitaire ou outil de mesure d’audience. Aucun bandeau de consentement n’est donc affiché à ce stade.</p>

          <h2>Exercer vos droits</h2>
          <p>Pour demander l’accès, la rectification ou la suppression des informations transmises, écrivez à <a href={contactLinks.email}>{contactDetails.email}</a>. Toute demande est traitée selon le cadre légal applicable et après vérification de l’identité du demandeur lorsque cela est nécessaire.</p>
        </Container>
      </section>
    </>
  );
}
