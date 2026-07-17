import type { Metadata } from 'next';
import { ArcheritageIcon, methodPrincipleIcons } from '@/components/icons/ArcheritageIcon';
import { MethodTimeline } from '@/components/motion/MethodTimeline';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ProofBox } from '@/components/ui/ProofBox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { methode } from '@/content/site/official';

export const metadata: Metadata = { title: methode.title, description: methode.introduction, alternates: { canonical: '/methode' } };

export default function MethodePage() {
  return (
    <>
      <PageHero eyebrow="Méthode propriétaire" title={methode.title} introduction={methode.introduction} supporting={methode.supporting} />
      <section className="section section--ivory"><Container><ProofBox eyebrow="Preuve de méthode" accent="116 jours" title="Du retard non documenté aux droits contractuels opposables"><p>{methode.proof}</p></ProofBox></Container></section>
      <section className="section section--ink">
        <Container>
          <SectionHeading eyebrow="Sept principes" title="Rendre la complexité maîtrisable" light />
          <div className="principle-grid">
            {methode.principles.map((principle, index) => (
              <article key={principle}>
                <div className="principle-grid__meta"><span>0{index + 1}</span><ArcheritageIcon name={methodPrincipleIcons[index]} variant="card" tone="light" /></div>
                <h3>{principle}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section section--alt"><Container><SectionHeading eyebrow="Un cycle en six temps" title="De la compréhension à la transmission" /><MethodTimeline steps={methode.cycle} /></Container></section>
      <section className="section section--ivory"><Container><div className="editorial-split"><div><p className="eyebrow">Une méthode propriétaire</p><h2>Partager les principes, protéger les outils</h2></div><p>{methode.proprietary}</p></div></Container></section>
      <CTASection text="Évaluez la méthode adaptée à votre projet avec Archeritage." label="Évaluer le cadre de gouvernance du projet" href="/contact?type=gouvernance" />
    </>
  );
}
