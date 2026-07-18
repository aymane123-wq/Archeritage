import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { EditorialMotion } from '@/components/motion/EditorialMotion';
import { CTASection } from '@/components/ui/CTASection';
import { Container } from '@/components/ui/Container';
import { getReferenceBySlug, getReferenceNavigation, referenceRecords } from '@/content/site/references';

type ReferencePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return referenceRecords.map((reference) => ({ slug: reference.slug }));
}

export async function generateMetadata({ params }: ReferencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const reference = getReferenceBySlug(slug);

  if (!reference) {
    return { title: 'Référence introuvable | ARCHERITAGE', robots: { index: false, follow: false } };
  }

  return {
    title: `${reference.title} | Références | ARCHERITAGE`,
    description: reference.summary,
    alternates: { canonical: `/references/${reference.slug}` },
  };
}

export default async function ReferenceDetailPage({ params }: ReferencePageProps) {
  const { slug } = await params;
  const reference = getReferenceBySlug(slug);

  if (!reference) {
    notFound();
  }

  const navigation = getReferenceNavigation(reference.slug);

  return (
    <EditorialMotion className="reference-detail">
      <header className="reference-detail__hero" data-motion="hero">
        <Container>
          <nav aria-label="Fil d’Ariane" className="reference-detail__breadcrumb">
            <Link href="/references">Références</Link>
            <span aria-hidden="true">/</span>
            <span>{reference.title}</span>
          </nav>
          <div className="reference-detail__hero-grid">
            <div className="reference-detail__hero-copy">
              <p className="eyebrow" data-motion-eyebrow>Référence</p>
              <h1 data-motion-heading>{reference.title}</h1>
              <p className="reference-detail__hero-meta" data-motion-copy>
                {[reference.institution, reference.location].filter(Boolean).join(' · ')}
              </p>
              <p className="reference-detail__hero-attribution" data-motion-copy>{reference.attribution}</p>
            </div>
            {reference.image ? (
              <div className="reference-detail__hero-media" data-motion-media data-motion-dir="right">
                <Image src={reference.image} alt={reference.imageAlt ?? reference.title} fill priority sizes="(max-width: 1023px) 100vw, 58vw" />
              </div>
            ) : (
              <div className="reference-detail__hero-no-image" aria-hidden="true" data-motion-copy>
                <span className="reference-detail__hero-no-image-label">ARCHERITAGE</span>
                <span className="reference-detail__hero-no-image-title">{reference.title}</span>
              </div>
            )}
          </div>
        </Container>
      </header>

      <section className="section section--ivory reference-detail__sections" data-motion="section">
        <Container>
          <div className="reference-detail__intro" data-motion-copy>
            <p>{reference.summary}</p>
          </div>
          <div className="reference-detail__content">
            {reference.sections.map((section) => (
              <section key={section.title} className="reference-detail__section" data-motion-item>
                <h2 className="eyebrow eyebrow-heading">{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
          {navigation ? (
            <nav aria-label="Navigation entre les références" className="reference-detail__nav" data-motion-item>
              <Link href={`/references/${navigation.previous.slug}`} className="reference-detail__nav-link">
                <ArrowLeft aria-hidden="true" />
                <span>
                  <small>Référence précédente</small>
                  <strong>{navigation.previous.title}</strong>
                </span>
              </Link>
              <Link href="/references" className="reference-detail__nav-center">Retour aux références</Link>
              <Link href={`/references/${navigation.next.slug}`} className="reference-detail__nav-link reference-detail__nav-link--next">
                <span>
                  <small>Référence suivante</small>
                  <strong>{navigation.next.title}</strong>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </nav>
          ) : null}
        </Container>
      </section>

      <CTASection text="Vous portez un projet comparable ?" label="CONTACTEZ-NOUS" />
    </EditorialMotion>
  );
}