import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
    <div className="reference-detail">
      <header className="reference-detail__hero">
        <Container>
          <nav aria-label="Fil d’Ariane" className="reference-detail__breadcrumb">
            <Link href="/references">Références</Link>
            <span aria-hidden="true">/</span>
            <span>{reference.title}</span>
          </nav>
          <div className="reference-detail__hero-grid">
            <div className="reference-detail__hero-copy">
              <p className="eyebrow">Référence</p>
              <h1>{reference.title}</h1>
              <p className="reference-detail__hero-meta">{[reference.institution, reference.location].filter(Boolean).join(' · ')}</p>
              <p className="reference-detail__hero-attribution">{reference.attribution}</p>
            </div>
            {reference.image ? (
              <div className="reference-detail__hero-media">
                <Image src={reference.image} alt={reference.imageAlt ?? reference.title} fill priority sizes="(min-width: 1024px) 58vw, 100vw" />
              </div>
            ) : (
              <div className="reference-detail__hero-no-image" aria-hidden="true">
                <span className="reference-detail__hero-no-image-label">ARCHERITAGE</span>
                <span className="reference-detail__hero-no-image-title">{reference.title}</span>
              </div>
            )}
          </div>
        </Container>
      </header>

      <section className="section section--ivory reference-detail__sections">
        <Container>
          <div className="reference-detail__intro">
            <p>{reference.summary}</p>
          </div>
          <div className="reference-detail__content">
            {reference.sections.map((section) => (
              <section key={section.title} className="reference-detail__section">
                <h2 className="eyebrow eyebrow-heading">{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
          {navigation ? (
            <nav aria-label="Navigation entre les références" className="reference-detail__nav">
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
    </div>
  );
}