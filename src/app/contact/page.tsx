import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { ContactForm } from '@/components/site/ContactForm';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { contact } from '@/content/site/official';
import { site } from '@/data/site';

export const metadata: Metadata = { title: contact.title, description: contact.introduction, alternates: { canonical: '/contact' } };

export default function ContactPage() { const jsonLd = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: site.brand, url: site.url, areaServed: 'Casablanca, Morocco' }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><PageHero eyebrow="Contact" title={contact.title} introduction={contact.promise} supporting={contact.introduction} /><section className="section section--ivory"><Container className="contact-layout"><div className="contact-guidance"><p className="eyebrow">Nous solliciter pour</p><ul>{contact.reasons.map((reason) => <li key={reason}><Check aria-hidden="true" />{reason}</li>)}</ul><div className="contact-note"><h2>Décrire votre projet</h2><p>{contact.guidance}</p></div><div className="contact-details"><h2>Coordonnées</h2><p>ARCHERITAGE — Cabinet d’architecture, valorisation foncière et patrimoine</p><p>Fondateur : Ahmed Taoufik Naciri, architecte</p><p>Ville : Casablanca, Maroc</p><p>Email : {site.email}</p><p>Téléphone : {site.phone}</p></div><div className="contact-note"><h2>Confidentialité</h2><p>{contact.confidentiality}</p></div></div><div className="contact-form-panel"><p className="eyebrow">Votre demande</p><h2>Un premier échange, sous 48 heures</h2><ContactForm /></div></Container></section></>; }
