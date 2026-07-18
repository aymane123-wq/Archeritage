import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

import { EditorialMotion } from '@/components/motion/EditorialMotion';
import { Container } from '@/components/ui/Container';
import { getExpertiseBySlug, getExpertiseNavigation, expertiseSlugs } from '@/content/site/expertises';

type ExpertisePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return expertiseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ExpertisePageProps): Promise<Metadata> {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);

  if (!expertise) {
    return { title: 'Expertise introuvable | ARCHERITAGE', robots: { index: false, follow: false } };
  }

  return {
    title: { absolute: expertise.metaTitle },
    description: expertise.metaDescription,
    alternates: { canonical: `/expertises/${expertise.slug}` },
    openGraph: {
      title: expertise.metaTitle,
      description: expertise.metaDescription,
      url: `https://archeritage.ma/expertises/${expertise.slug}`,
      siteName: 'ARCHERITAGE',
      type: 'website',
    },
  };
}

export default async function ExpertiseDetailPage({ params }: ExpertisePageProps) {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);

  if (!expertise) {
    notFound();
  }

  const navigation = getExpertiseNavigation(expertise.slug);

  return (
    <EditorialMotion className="expertise-detail">
      <header className="expertise-detail__hero" data-motion="hero">
        <Container>
          <nav aria-label="Fil d'Ariane" className="expertise-detail__breadcrumb">
            <Link href="/expertises">Expertises</Link>
            <span aria-hidden="true">/</span>
            <span>{expertise.title}</span>
          </nav>
          <div className="expertise-detail__hero-grid">
            <div className="expertise-detail__hero-copy">
              <p className="eyebrow" data-motion-eyebrow>{expertise.eyebrow}</p>
              <h1 data-motion-heading>{expertise.title}</h1>
              <p className="expertise-detail__hero-intro" data-motion-copy>{expertise.introduction}</p>
              <Link href={expertise.contactCtaHref} className="button button--primary expertise-detail__hero-cta" data-motion-copy>
                {expertise.contactCtaLabel}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <div className="expertise-detail__hero-media" data-motion-media data-motion-dir="right">
              <Image
                src={expertise.image}
                alt={expertise.imageAlt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 48vw"
              />
            </div>
          </div>
        </Container>
      </header>

      <section className="section section--compact section--ivory" data-motion="section">
        <Container>
          <div className="expertise-detail__competencies">
            <h2 className="eyebrow eyebrow-heading" data-motion-eyebrow>Nos champs d&apos;intervention</h2>
            <ol className="expertise-detail__competency-grid">
              {expertise.competencies.map((competency, i) => (
                <li key={competency} data-motion-item>
                  <span className="expertise-detail__competency-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="expertise-detail__competency-label">{competency}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section section--compact section--alt" data-motion="section">
        <Container>
          <div className="expertise-detail__fits" data-motion-item>
            <h2 className="eyebrow eyebrow-heading">Cette expertise est adaptée à votre projet si…</h2>
            <div className="expertise-detail__fits-grid">
              <div className="expertise-detail__fits-col">
                <h3>Vos enjeux</h3>
                <ul className="expertise-detail__needs">
                  {expertise.projectNeeds.map((need) => (
                    <li key={need}>{need}</li>
                  ))}
                </ul>
              </div>
              <div className="expertise-detail__fits-col">
                <h3>Pour qui</h3>
                <div className="expertise-detail__chips">
                  {expertise.clientProfiles.map((profile) => (
                    <span key={profile} className="expertise-detail__chip">{profile}</span>
                  ))}
                </div>
              </div>
              <div className="expertise-detail__fits-col">
                <h3>Formats possibles</h3>
                <ul className="expertise-detail__formats">
                  {expertise.interventionFormats.map((format) => (
                    <li key={format}>{format}</li>
                  ))}
                </ul>
                <Link href="/missions" className="text-link">
                  Découvrir nos formats d&apos;intervention <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--compact section--ivory" data-motion="section">
        <Container>
          <div className="expertise-detail__patrigov" data-motion-item>
            <div className="expertise-detail__patrigov-left">
              <p className="eyebrow">Signature transversale</p>
              <h2 data-motion-heading>Gouvernance documentaire — PATRIGOV</h2>
            </div>
            <div className="expertise-detail__patrigov-right">
              <p data-motion-copy>{expertise.patrigovConnection}</p>
              <Link href="/methode" className="text-link">
                Découvrir la méthode <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--compact section--alt" data-motion="section">
        <Container>
          <div className="expertise-detail__footer">
            {navigation ? (
              <nav aria-label="Navigation entre les expertises" className="expertise-detail__explore" data-motion-item>
                <p className="eyebrow">Explorer aussi</p>
                <div className="expertise-detail__explore-links">
                  <Link href={`/expertises/${navigation.previous.slug}`} className="expertise-detail__explore-link">
                    <ArrowLeft aria-hidden="true" />
                    <span>
                      <small>Précédente</small>
                      <strong>{navigation.previous.title}</strong>
                    </span>
                  </Link>
                  <Link href="/expertises" className="expertise-detail__explore-center">
                    Retour à toutes les expertises
                  </Link>
                  <Link href={`/expertises/${navigation.next.slug}`} className="expertise-detail__explore-link expertise-detail__explore-link--next">
                    <span>
                      <small>Suivante</small>
                      <strong>{navigation.next.title}</strong>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </nav>
            ) : null}
            <div className="expertise-detail__final-cta" data-motion-item>
              <h2>{expertise.contactCtaLabel}</h2>
              <p>Un premier échange, sous 48 heures.</p>
              <Link href={expertise.contactCtaHref} className="button button--primary">
                CONTACTEZ-NOUS
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </EditorialMotion>
  );
}
