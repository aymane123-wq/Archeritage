import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EditorialRubricsAccordion } from '@/components/journal/EditorialRubricsAccordion';
import { journalPosts, editorialRubrics } from '@/content/site/official';

export const metadata: Metadata = {
  title: 'Journal Archeritage',
  description: "Pensées, notes et regards sur l'architecture, le patrimoine et les projets complexes.",
  alternates: { canonical: '/journal' },
};

export default async function JournalPage() {
  const rubrics = editorialRubrics.map((rubric) => ({
    ...rubric,
    plannedPublicationTitle: journalPosts.find(
      (post) => post.slug === rubric.plannedPublicationSlug,
    )?.title,
  }));

  return (
    <>
      <header className="journal-hero">
        <Container className="journal-hero__inner">
          <div>
            <p className="eyebrow">Journal</p>
            <h1>Journal Archeritage</h1>
          </div>
          <div className="journal-hero__copy">
            <p className="journal-hero__introduction">
              Pensées, notes et regards sur l&apos;architecture, le patrimoine
              et les projets complexes.
            </p>
            <p className="journal-hero__line">
              Ligne éditoriale&nbsp;: publier peu, mais publier juste.
            </p>
          </div>
        </Container>
      </header>

      <section className="journal-publications section section--ivory">
        <Container>
          <SectionHeading
            eyebrow="À paraître"
            title="Prochaines publications"
          />
          <div className="journal-preview-grid">
            {journalPosts.map((post, index) => (
              <article key={post.slug} className="journal-preview-card">
                {post.image ? (
                  <div className="journal-preview-card__image">
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? ''}
                      fill
                      sizes="(max-width: 679px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                    <span className="journal-preview-card__badge">
                      À paraître
                    </span>
                  </div>
                ) : null}
                <div className="journal-preview-card__body">
                  <div className="journal-preview-card__meta">
                    <span>{post.category}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="journal-rubrics section section--alt">
        <Container>
          <EditorialRubricsAccordion rubrics={rubrics} />
        </Container>
      </section>

      <div className="journal-cta">
        <CTASection
          title="Échanger autour de ces sujets"
          text="Une question sur le foncier, le patrimoine ou la gouvernance d’un projet ? Contactez ARCHERITAGE."
          label="CONTACTEZ-NOUS"
        />
      </div>
    </>
  );
}
