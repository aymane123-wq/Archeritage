import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Pillar } from '@/content/site/official';

export function PillarCard({ pillar, index, detailed = false }: { pillar: Pillar; index: number; detailed?: boolean }) {
  return <article className={`pillar-card${detailed ? ' pillar-card--detailed' : ''}`} id={detailed ? ['foncier', 'architecture', 'patrimoine'][index] : undefined}><div className="pillar-card__media" style={{ '--pillar-image-position': pillar.imagePosition ?? 'center' } as CSSProperties}><Image src={pillar.image} alt={pillar.imageAlt ?? ''} fill sizes="(min-width: 1024px) 33vw, 100vw" /><span>0{index + 1}</span></div><div className="pillar-card__body"><h3>{pillar.title}</h3><p>{pillar.description}</p>{detailed ? <ol>{pillar.competencies.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span>{item}</li>)}</ol> : <Link href={pillar.href}>Découvrir cette expertise <ArrowUpRight aria-hidden="true" /></Link>}</div></article>;
}
