import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ReferenceCard } from '@/components/sections/ReferenceCard';
import { referencesIntro } from '@/content/site/official';
import { referenceRecords } from '@/content/site/references';

export const metadata: Metadata = {
  title: referencesIntro.title,
  description: referencesIntro.introduction,
  alternates: { canonical: '/references' },
};

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Références"
        title={referencesIntro.title}
        introduction={referencesIntro.introduction}
        supporting={referencesIntro.attribution}
      />
      <section className="section section--ivory">
        <Container>
          <div className="references-grid references-grid--overview">
            {referenceRecords.map((reference, index) => (
              <ReferenceCard
                key={reference.slug}
                reference={reference}
                href={`/references/${reference.slug}`}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>
      <CTASection text="Discuter d’une référence ou d’un projet comparable." label="CONTACTEZ-NOUS" />
    </>
  );
}
