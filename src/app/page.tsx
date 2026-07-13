import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

import { HomeHeroSlider } from '@/components/home/HomeHeroSlider';
import { HomeMotion } from '@/components/motion/HomeMotion';
import { Container } from '@/components/ui/Container';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { InterventionIcon, type InterventionIconName } from '@/components/ui/InterventionIcon';
import { Reveal } from '@/components/ui/Reveal';
import { SafeImage } from '@/components/ui/SafeImage';
import { homePage } from '@/content/site';

export const metadata: Metadata = { title: homePage.hero.title, description: homePage.hero.text };

export default function HomePage() {
  return (
    <HomeMotion>
      <HomeHeroSlider eyebrow={homePage.hero.eyebrow} title={homePage.hero.title} text={homePage.hero.text} />

      <section className="home-cabinet"><Container className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-20">
        <ImageReveal src="/images/hero/hero-02.jpg" alt="Composition architecturale" sizes="(min-width: 1024px) 46vw, 100vw" direction="left" className="aspect-[4/5] min-h-[28rem] rounded-none sm:min-h-[38rem]" />
        <Reveal><p className="eyebrow">{homePage.cabinet.eyebrow}</p><h2>{homePage.cabinet.title}</h2><p>{homePage.cabinet.text}</p><div className="mt-8"><Link href="/cabinet" className="arrow-link">Découvrir le cabinet<ArrowRight className="h-4 w-4" /></Link></div></Reveal>
      </Container></section>

      <section className="home-references"><Container>
        <Reveal className="home-section-heading"><div><p className="eyebrow">Portfolio</p><h2>Nos références</h2></div><p>Une lecture par domaines d’expérience, sans attribuer de projet ou de mission avant validation de son cadre de présentation.</p></Reveal>
        <div className="home-reference-grid">{homePage.references.map((item, index) => <Link key={item.title} href="/references" data-cursor="Voir" className="home-reference-card"><div className="home-reference-card__media"><SafeImage src={item.image} alt={item.title} sizes="(min-width: 1280px) 32vw, (min-width: 768px) 50vw, 100vw" className="h-full rounded-none" /><div className="home-reference-card__overlay" /><span>0{index + 1}</span><ArrowDownRight className="h-5 w-5" /></div><div className="home-reference-card__body"><p>{item.category}</p><h3>{item.title}</h3><p>{item.text}</p></div></Link>)}</div>
        <div className="mt-8"><Link href="/references" className="arrow-link">Voir toutes les références<ArrowRight className="h-4 w-4" /></Link></div>
      </Container></section>

      <section className="home-domains"><Container><Reveal className="home-section-heading"><div><p className="eyebrow">Expertises</p><h2>Nos domaines d’intervention</h2></div><p>Une pratique architecturale élargie, de la conception au pilotage des opérations complexes.</p></Reveal><div className="home-domain-grid">{homePage.domains.map((domain, index) => <article key={domain.title} className="home-domain-card"><div><span>0{index + 1}</span><InterventionIcon name={domain.icon as InterventionIconName} /></div><h3>{domain.title}</h3><p>{domain.text}</p><ul>{domain.points.map((point) => <li key={point}>{point}</li>)}</ul><Link href="/expertises" className="home-domain-card__link" aria-label={`Découvrir ${domain.title}`}><ArrowRight className="h-4 w-4" /></Link></article>)}</div><div className="mt-8"><Link href="/expertises" className="arrow-link">Explorer nos expertises<ArrowRight className="h-4 w-4" /></Link></div></Container></section>

      <section className="home-method"><Container><Reveal className="home-method__panel"><div className="method-highlight__grid" /><div className="relative z-10"><p className="eyebrow">Méthode propriétaire</p><h2>{homePage.method.title}</h2><p>{homePage.method.text}</p><div className="mt-8"><Link href="/methode" className="arrow-link">Découvrir la méthode<ArrowRight className="h-4 w-4" /></Link></div></div><div className="home-method__principles"><div className="home-method__connector" />{homePage.method.principles.map((principle, index) => <div key={principle}><span>0{index + 1}</span><p>{principle}</p></div>)}</div></Reveal></Container></section>

      <section className="home-journal"><Container><Reveal className="home-section-heading"><div><p className="eyebrow">Éditorial</p><h2>{homePage.journal.title}</h2></div><p>{homePage.journal.text}</p></Reveal><div className="home-journal-grid">{homePage.journal.cards.map((card, index) => <article key={card.title}><span>0{index + 1}</span><h3>{card.title}</h3><p>{card.text}</p><Link href="/journal" className="arrow-link">Découvrir<ArrowRight className="h-4 w-4" /></Link></article>)}</div><div className="mt-8"><Link href="/journal" className="arrow-link">Découvrir le Journal<ArrowRight className="h-4 w-4" /></Link></div></Container></section>

      <section className="showcase-cta-wrap"><Container><Reveal className="contact-cta"><div><p className="eyebrow">Contact</p><h2>{homePage.contact.title}</h2><p>{homePage.contact.text}</p></div><Link href="/contact" className="button-primary shrink-0">Nous contacter<ArrowRight className="h-4 w-4" /></Link></Reveal></Container></section>
    </HomeMotion>
  );
}
