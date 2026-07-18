import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Pillar } from '@/content/site/official';

type PillarCardProps = {
  pillar: Pillar;
  index: number;
  detailed?: boolean;
  headingLevel?: 'h2' | 'h3';
};

export function PillarCard({ pillar, index, detailed = false, headingLevel = 'h3' }: PillarCardProps) {
  const Heading = headingLevel;

  return (
    <article className={`pillar-card${detailed ? ' pillar-card--detailed' : ''}`} data-motion-item>
      <div
        className="pillar-card__media"
        data-motion-media
        data-motion-dir={index % 2 === 0 ? 'right' : 'left'}
        style={{ '--pillar-image-position': pillar.imagePosition ?? 'center' } as CSSProperties}
      >
        <Image src={pillar.image} alt={pillar.imageAlt ?? ''} fill sizes="(max-width: 1023px) 100vw, 33vw" />
        <span aria-hidden="true">0{index + 1}</span>
      </div>
      <div className="pillar-card__body">
        <Heading>{pillar.title}</Heading>
        <p>{pillar.description}</p>
        {detailed ? (
          <>
            <ol>{pillar.competencies.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
            <div className="pillar-card__actions">
              <Link href={pillar.href} className="pillar-card__detail-link">
                Découvrir l&apos;expertise <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </>
        ) : (
          <Link href={pillar.href} aria-label={`Découvrir l'expertise ${pillar.title}`}>
            Découvrir l&apos;expertise <ArrowUpRight aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
