import type { Metadata } from 'next';
import { ArcheritageIcon, methodPrincipleIcons } from '@/components/icons/ArcheritageIcon';
import { EditorialMotion } from '@/components/motion/EditorialMotion';
import { MethodTimeline } from '@/components/motion/MethodTimeline';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ProofBox } from '@/components/ui/ProofBox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { methode } from '@/content/site/official';

export const metadata: Metadata = {
  title: methode.title,
  description: methode.introduction,
  alternates: { canonical: '/methode' },
};

export default function MethodePage() {
  return (
    <EditorialMotion>
      <PageHero eyebrow="Méthode propriétaire" title={methode.title} introduction={methode.introduction} />
      <section className="section section--ivory" data-motion="section">
        <Container>
          <div data-motion-item>
            <ProofBox eyebrow="Preuve de méthode" accent="116 jours" title="Du retard non documenté aux droits opposables">
              <p>{methode.proof}</p>
            </ProofBox>
          </div>
        </Container>
      </section>
      <section className="section section--ink" data-motion="section">
        <Container>
          <SectionHeading eyebrow="Sept principes" title="Rendre la complexité maîtrisable" light />
          <div className="principle-grid">
            {methode.principles.map((principle, index) => (
              <article key={principle} data-motion-item>
                <div className="principle-grid__meta">
                  <span>0{index + 1}</span>
                  <ArcheritageIcon name={methodPrincipleIcons[index]} variant="card" tone="light" />
                </div>
                <h3>{principle}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section section--alt" data-motion="section">
        <Container>
          <SectionHeading eyebrow="Un cycle en six temps" title="De la compréhension à la transmission" />
          <MethodTimeline steps={methode.cycle} />
        </Container>
      </section>
      <section className="section section--ivory" data-motion="section">
        <Container>
          <div className="editorial-split">
            <div>
              <p className="eyebrow" data-motion-eyebrow>Méthode propriétaire</p>
              <h2 data-motion-heading>Partager les principes, protéger les outils</h2>
            </div>
            <p data-motion-copy>{methode.proprietary}</p>
          </div>
        </Container>
      </section>
      <CTASection
        text="Évaluer le cadre de gouvernance adapté à votre projet."
        label="Évaluer le cadre de gouvernance"
        href="/contact?type=gouvernance"
      />
    </EditorialMotion>
  );
}
