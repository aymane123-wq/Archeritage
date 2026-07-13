import type { Metadata } from 'next';

import { PageMotion } from '@/components/motion/PageMotion';
import { ContactForm } from '@/components/site/ContactForm';
import { Container } from '@/components/ui/Container';
import { contactPage } from '@/content/site';

export const metadata: Metadata = { title: contactPage.title, description: contactPage.introduction };

export default function ContactPage() {
  return (
    <PageMotion>
      <header className="showcase-hero"><div className="showcase-hero__grid" /><Container className="relative z-10"><div><p className="eyebrow">{contactPage.eyebrow}</p><h1>{contactPage.title}</h1><p className="showcase-hero__intro">{contactPage.introduction}</p></div></Container></header>
      <section className="contact-page"><Container className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-12">
        <div className="contact-context">
          <div className="space-y-8">{contactPage.guidance.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}</div>
          <div className="mt-10 border-t border-[var(--border)] pt-7">{contactPage.details.map((detail) => <p key={detail} className="text-sm leading-7 text-[var(--muted)]">{detail}</p>)}</div>
        </div>
        <div className="contact-form-panel"><p className="eyebrow">Formulaire de contact</p><h2>Décrire votre projet</h2><div className="mt-8"><ContactForm /></div></div>
      </Container></section>
    </PageMotion>
  );
}
