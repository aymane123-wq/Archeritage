import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ArcheritageIcon, clientProfileIcons } from '@/components/icons/ArcheritageIcon';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { clientSegments } from '@/content/site/client-segments';

export function ClientSegmentation() {
  return (
    <section className="section section--ivory client-segmentation">
      <Container>
        <SectionHeading
          eyebrow="À qui s’adresse Archeritage ?"
          title="Votre projet. Votre contexte. Notre manière d’intervenir."
          text="ARCHERITAGE adapte son intervention au profil du maître d’ouvrage, à la nature du projet et au cadre réel de décision."
        />
        <div className="client-segment-grid">
          {clientSegments.map((segment, index) => (
            <article className="client-segment-card" key={segment.title} data-motion-item>
              <div className="client-segment-card__meta">
                <span className="client-segment-card__icon-frame" aria-hidden="true">
                  <ArcheritageIcon name={clientProfileIcons[index]} variant="card" tone="accent" />
                </span>
                <span className="client-segment-card__index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{segment.title}</h3>
              <ul>{segment.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <Link href={segment.href}>{segment.cta}<ArrowUpRight aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
