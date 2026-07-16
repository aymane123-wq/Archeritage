import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from './Container';

type CTASectionProps = { title?: string; text: string; label?: string };

export function CTASection({ title = "Discuter d’un projet", text, label = 'CONTACTEZ-NOUS' }: CTASectionProps) {
  return <section className="cta-section"><Container className="cta-section__inner"><div><p className="eyebrow">Premier échange</p><h2>{title}</h2><p>{text}</p></div><Link href="/contact" className="button button--primary">{label}<ArrowUpRight aria-hidden="true" /></Link></Container></section>;
}
