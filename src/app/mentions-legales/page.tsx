import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { contactDetails, contactLinks } from '@/content/site/contact-details';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Informations légales et conditions d’utilisation du site ARCHERITAGE.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/mentions-legales' },
};

export default function LegalPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" introduction="Informations disponibles sur l’éditeur et l’utilisation du site ARCHERITAGE." />
      <section className="section section--ivory">
        <Container className="legal-copy">
          <h2>Éditeur et contact</h2>
          <p><strong>ARCHERITAGE</strong> — Cabinet d’architecture, valorisation foncière et patrimoine.</p>
          <address>{contactDetails.addressLines.map((line) => <span key={line}>{line}</span>)}</address>
          <p><a href={contactLinks.email}>{contactDetails.email}</a> · <a href={contactLinks.phone}>{contactDetails.phoneDisplay}</a></p>

          <h2>Propriété intellectuelle</h2>
          <p>Les textes, la structure, l’identité visuelle et les éléments graphiques publiés sur ce site sont protégés. Toute reproduction ou adaptation nécessite l’autorisation préalable d’ARCHERITAGE, sauf usage autorisé par la loi.</p>

          <h2>Responsabilité</h2>
          <p>Les informations présentées ont une vocation générale et ne constituent ni une étude, ni un diagnostic, ni un engagement contractuel. Chaque projet fait l’objet d’un cadrage adapté à son contexte.</p>

        </Container>
      </section>
    </>
  );
}
