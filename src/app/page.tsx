import type { Metadata } from 'next';
import Image from 'next/image';
import { HomeHeroSlider } from '@/components/home/HomeHeroSlider';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PillarCard } from '@/components/ui/PillarCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatRow } from '@/components/ui/StatRow';
import { founderAttribution, home, pillars, references } from '@/content/site/official';
import { site } from '@/data/site';

export const metadata: Metadata = { title: home.hero.title, description: home.hero.introduction, alternates: { canonical: '/' } };

export default function HomePage() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: site.brand, url: site.url, description: site.description, areaServed: { '@type': 'City', name: 'Casablanca' }, address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="home-hero-flow"><HomeHeroSlider {...home.hero} /><div className="home-proof-band"><Container><StatRow stats={home.stats} note={founderAttribution} variant="floating" /></Container></div></div>
    <section className="section section--alt home-pillars-section"><Container><SectionHeading eyebrow="Nos trois piliers" title={home.pillarsTitle} text="Du foncier brut au monument classé, une même culture de la maîtrise relie nos interventions." /><div className="pillar-grid">{pillars.map((pillar, index) => <PillarCard key={pillar.title} pillar={pillar} index={index} />)}</div></Container></section>
    <section className="section section--ink home-references-section"><Container><SectionHeading eyebrow="Expérience fondatrice" title="Des missions patrimoniales significatives" text="Ces missions ont été conduites dans le cadre de l’expérience professionnelle du fondateur. Elles ne sont pas présentées comme des commandes directes d’ARCHERITAGE." light /><div className="reference-strip">{references.map((reference, index) => <article key={reference.name}>{reference.image ? <div className="reference-strip__image"><Image src={reference.image} alt={reference.name} fill sizes="(min-width: 1024px) 25vw, 100vw" /></div> : null}<span>0{index + 1}</span><h3>{reference.name}</h3>{reference.institution ? <p>{reference.institution}</p> : null}</article>)}</div></Container></section>
    <CTASection text={home.finalCta} />
  </>;
}
