import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from './Container';

type CTASectionProps = {
  title?: string;
  text: string;
  label?: string;
  href?: string;
};

export function CTASection({
  title = 'Discuter d’un projet',
  text,
  label = 'CONTACTEZ-NOUS',
  href = '/contact',
}: CTASectionProps) {
  return (
    <section className="cta-section" data-motion="section">
      <Container className="cta-section__inner">
        <div>
          <p className="eyebrow" data-motion-eyebrow>Premier échange</p>
          <h2 data-motion-heading>{title}</h2>
          <p data-motion-copy>{text}</p>
        </div>
        <Link href={href} className="button button--primary" data-motion-item>
          {label}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
