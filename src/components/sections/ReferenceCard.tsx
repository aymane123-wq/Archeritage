import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { ReferenceRecord } from '@/content/site/references';

type ReferenceCardProps = {
  reference: ReferenceRecord;
  href: string;
  index: number;
  variant?: 'home' | 'index';
};

export function ReferenceCard({ reference, href, index, variant = 'index' }: ReferenceCardProps) {
  const Heading = variant === 'index' ? 'h2' : 'h3';
  const imageSizes = variant === 'index'
    ? '(max-width: 767px) 100vw, 50vw'
    : '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw';

  return (
    <Link className={`reference-card-link reference-card-link--${variant}`} href={href} aria-label={`Découvrir la référence ${reference.title}`}>
      <article className={`reference-card reference-card--${variant}${reference.image ? '' : ' reference-card--no-image'}`}>
        {reference.image ? (
          <div className="reference-card__media">
            <Image src={reference.image} alt={reference.imageAlt ?? reference.title} fill sizes={imageSizes} />
          </div>
        ) : (
          <div className="reference-card__surface" aria-hidden="true">
            <span className="reference-card__surface-grid" />
            <span className="reference-card__surface-mark">ARCHERITAGE</span>
          </div>
        )}
        <div className="reference-card__body">
          <div className="reference-card__meta">
            <span className="reference-card__index">{String(index + 1).padStart(2, '0')}</span>
            {reference.location ? <span className="reference-card__location">{reference.location}</span> : null}
          </div>
          <Heading>{reference.title}</Heading>
          {reference.institution ? <p className="reference-card__institution">{reference.institution}</p> : null}
          <p className="reference-card__summary">{reference.summary}</p>
          <span className="reference-card__cta">Découvrir la référence <ArrowUpRight aria-hidden="true" /></span>
        </div>
      </article>
    </Link>
  );
}