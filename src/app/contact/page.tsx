import type { Metadata } from 'next';
import { ArcheritageIcon } from '@/components/icons/ArcheritageIcon';
import { ContactForm } from '@/components/site/ContactForm';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { contact } from '@/content/site/official';
import { contactDetails, contactLinks } from '@/content/site/contact-details';
import { getContactInitialValues } from '@/content/site/contact-form';
import { getProfessionalServiceJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: contact.title,
  description: 'Présentez votre projet à ARCHERITAGE. Un premier échange, sous 48 heures.',
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
        introduction={contact.promise}
        supporting={contact.introduction}
      />
      <section className="section section--ivory">
        <Container className="contact-layout">
          <div className="contact-guidance">
            <div className="contact-details contact-details--primary">
              <p className="eyebrow">Contact direct</p>
              <h2>Coordonnées</h2>
              <p className="contact-detail-line"><ArcheritageIcon name="mail" tone="accent" /><a href={contactLinks.email}>{contactDetails.email}</a></p>
              <p className="contact-detail-line"><ArcheritageIcon name="phone" tone="accent" /><a href={contactLinks.phone}>{contactDetails.phoneDisplay}</a></p>
              <address className="contact-detail-line"><ArcheritageIcon name="map-pin" tone="accent" /><span>{contactDetails.addressLines.map((line) => <span key={line}>{line}</span>)}</span></address>
            </div>
            <p className="eyebrow">Nous solliciter pour</p>
            <ul>{contact.reasons.map((reason) => <li key={reason}><ArcheritageIcon name="check" tone="accent" />{reason}</li>)}</ul>
            <div className="contact-details contact-details--identity">
              <p>ARCHERITAGE — Cabinet d’architecture, valorisation foncière et patrimoine</p>
              <p>Fondateur : Ahmed Taoufik Naciri, architecte</p>
            </div>
            <div className="contact-note">
              <h2><ArcheritageIcon name="shield-check" variant="card" tone="accent" />Confidentialité</h2>
              <p>{contact.confidentiality}</p>
            </div>
          </div>
          <div className="contact-form-panel">
            <p className="eyebrow">Votre demande</p>
            <h2>Décrire votre projet</h2>
            <p className="contact-form-panel__guidance">{contact.guidance}</p>
            <ContactForm initialValues={initialValues} />
          </div>
        </Container>
      </section>
    </>
  );
}
