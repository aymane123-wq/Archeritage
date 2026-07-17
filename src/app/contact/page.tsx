import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { contact } from '@/content/site/official';
import { contactDetails, contactLinks } from '@/content/site/contact-details';
import { getContactInitialValues } from '@/content/site/contact-form';
import { getProfessionalServiceJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: contact.title,
  description: 'Présentez votre projet à ARCHERITAGE. Une première réponse sous 48 heures ouvrées.',
  alternates: { canonical: '/contact' },
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const initialValues = getContactInitialValues(await searchParams);
  const jsonLd = getProfessionalServiceJsonLd();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Contact"
        title={contact.title}
        introduction="Un premier échange sous 48 heures"
        supporting="Nous revenons vers vous sous 48 heures ouvrées afin de clarifier votre contexte et de préparer un premier échange utile."
      />
      <section className="section section--ivory">
        <Container className="contact-layout">
          <div className="contact-form-panel">
            <p className="eyebrow">Votre demande</p>
            <h2>Décrire votre projet</h2>
            <ContactForm initialValues={initialValues} />
          </div>
          <div className="contact-guidance">
            <p className="eyebrow">Nous solliciter pour</p>
            <ul>{contact.reasons.map((reason) => <li key={reason}><Check aria-hidden="true" />{reason}</li>)}</ul>
            <div className="contact-details">
              <h2>Coordonnées</h2>
              <p>ARCHERITAGE — Cabinet d’architecture, valorisation foncière et patrimoine</p>
              <p>Fondateur : Ahmed Taoufik Naciri, architecte</p>
              <p><a href={contactLinks.email}>{contactDetails.email}</a></p>
              <p><a href={contactLinks.phone}>{contactDetails.phoneDisplay}</a></p>
              <address>{contactDetails.addressLines.map((line) => <span key={line}>{line}</span>)}</address>
            </div>
            <div className="contact-note">
              <h2>Confidentialité</h2>
              <p>{contact.confidentiality}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
