import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ReferenceCard } from '@/components/sections/ReferenceCard';
import { referenceRecords } from '@/content/site/references';

const title = "Une expérience construite à l’intersection du foncier, de l’architecture et du patrimoine";
export const metadata: Metadata = { title, description: "35 ans de projets publics, institutionnels et patrimoniaux — le socle sur lequel Archeritage s’appuie.", alternates: { canonical: '/references' } };

export default function ReferencesPage() { return <>
  <PageHero eyebrow="Références" title={title} introduction="35 ans de projets publics, institutionnels et patrimoniaux — le socle sur lequel Archeritage s’appuie." supporting="Le fondateur d’Archeritage a construit son parcours autour de projets territoriaux, patrimoniaux et institutionnels, avec une attention constante portée à la qualité architecturale et à la maîtrise d’ouvrage. Les références ci-dessous relèvent de cette expérience fondatrice ; les projets conduits directement sous l’enseigne Archeritage viendront enrichir cette page au fil des missions." />
  <section className="section section--ivory"><Container><div className="references-grid references-grid--overview">{referenceRecords.map((reference, index) => <ReferenceCard key={reference.slug} reference={reference} href={`/references/${reference.slug}`} index={index} />)}</div></Container></section>
  <CTASection text="Discuter d’une référence ou d’un projet similaire avec Archeritage." />
  </>; }
