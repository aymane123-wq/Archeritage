import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EditorialMotion } from '@/components/motion/EditorialMotion';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { PillarCard } from '@/components/ui/PillarCard';
import { ProofBox } from '@/components/ui/ProofBox';
import { expertises, pillars } from '@/content/site/official';

export const metadata: Metadata = {
  title: 'Expertises',
  description: expertises.introduction,
  alternates: { canonical: '/expertises' },
};

export default function ExpertisesPage() {
  return (
    <EditorialMotion>
      <PageHero
        eyebrow="Expertises"
        title={expertises.title}
        introduction={expertises.introduction}
        supporting={expertises.supporting}
      />
      <section className="section section--ivory" data-motion="section">
        <Container>
          <div className="pillar-grid pillar-grid--expertises">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} pillar={pillar} index={index} detailed headingLevel="h2" />
            ))}
          </div>
        </Container>
      </section>
      <section className="section section--alt" data-motion="section">
        <Container>
          <div data-motion-item>
            <ProofBox eyebrow="Signature transversale" title="Gouvernance documentaire">
              <p>{expertises.governance}</p>
              <Link href="/methode" className="text-link">
                Découvrir PATRIGOV <ArrowUpRight aria-hidden="true" />
              </Link>
            </ProofBox>
          </div>
        </Container>
      </section>
      <CTASection text="Une expertise à mobiliser sur votre projet ?" label="CONTACTEZ-NOUS" />
    </EditorialMotion>
  );
}
