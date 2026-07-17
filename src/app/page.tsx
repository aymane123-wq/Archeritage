import type { Metadata } from 'next';
import Link from 'next/link';
import { ClientSegmentation } from '@/components/home/ClientSegmentation';
import { HomeHeroSlider } from '@/components/home/HomeHeroSlider';
import { ReferenceCard } from '@/components/sections/ReferenceCard';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PillarCard } from '@/components/ui/PillarCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { founderAttribution, home, pillars } from '@/content/site/official';
import { homepageReferences } from '@/content/site/references';
import { getProfessionalServiceJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: home.hero.title,
  description: home.hero.introduction,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const jsonLd = getProfessionalServiceJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHeroSlider {...home.hero} stats={home.stats} note={founderAttribution} />
      <section className="section section--alt home-pillars-section">
        <Container>
          <SectionHeading eyebrow="Nos trois piliers" title={home.pillarsTitle} text="Du foncier brut au monument classé, une même culture de la maîtrise relie nos interventions." />
          <div className="pillar-grid">{pillars.map((pillar, index) => <PillarCard key={pillar.title} pillar={pillar} index={index} />)}</div>
        </Container>
      </section>
      <ClientSegmentation />
      <section className="section section--ink home-references-section">
        <Container>
          <SectionHeading eyebrow="Expérience fondatrice" title="Des missions patrimoniales significatives" text="Ces missions ont été conduites dans le cadre de l’expérience professionnelle du fondateur. Elles ne sont pas présentées comme des commandes directes d’ARCHERITAGE." light />
          <div className="reference-grid reference-grid--home">
            {homepageReferences.map((reference, index) => <ReferenceCard key={reference.slug} reference={reference} href={`/references/${reference.slug}`} index={index} variant="home" />)}
          </div>
          <div className="home-reference-cta"><Link href="/references" className="text-link">Voir toutes les références <span aria-hidden="true">↗</span></Link></div>
        </Container>
      </section>
      <CTASection text={home.finalCta} label="CONTACTEZ-NOUS" />
    </>
  );
}
