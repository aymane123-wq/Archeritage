import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EditorialMotion } from '@/components/motion/EditorialMotion';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ProofBox } from '@/components/ui/ProofBox';
import { StatRow } from '@/components/ui/StatRow';
import { cabinet, home, pillars } from '@/content/site/official';

export const metadata: Metadata = {
  title: 'Cabinet',
  description: cabinet.introduction,
  alternates: { canonical: '/cabinet' },
};

export default function CabinetPage() {
  return (
    <EditorialMotion>
      <PageHero
        eyebrow="Cabinet"
        title={cabinet.title}
        introduction={cabinet.introduction}
        supporting={cabinet.distinction}
      />
      <section className="section section--ivory" data-motion="section">
        <Container>
          <div className="editorial-split">
            <div>
              <p className="eyebrow" data-motion-eyebrow>Expérience fondatrice</p>
              <h2 data-motion-heading>35 années d’expérience territoriale</h2>
            </div>
            <p data-motion-copy>{cabinet.experience}</p>
          </div>
          <div data-motion-item>
            <StatRow stats={home.stats.slice(0, 3)} />
          </div>
        </Container>
      </section>
      <section className="section section--alt" data-motion="section">
        <Container>
          <div data-motion-item>
            <ProofBox eyebrow="Notre exigence" title="Cadre, décisions et conduite">
              <p>{cabinet.conviction}</p>
            </ProofBox>
          </div>
        </Container>
      </section>
      <section className="section section--ivory" data-motion="section">
        <Container>
          <div className="cabinet-orientations">
            <div>
              <p className="eyebrow" data-motion-eyebrow>Expertises</p>
              <h2 data-motion-heading>{cabinet.orientationsTitle}</h2>
              <p data-motion-copy>{cabinet.orientationsIntro}</p>
            </div>
            <ul>
              {pillars.map((pillar) => (
                <li key={pillar.href} data-motion-item>
                  <Link href={pillar.href}>
                    {pillar.title}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="section section--ink" data-motion="section">
        <Container className="founder-grid">
          <div className="founder-image" data-motion-media data-motion-dir="left">
            <Image
              src="/images/profile/nacir.jpeg"
              alt="Portrait d’Ahmed Taoufik Naciri, architecte et fondateur d’ARCHERITAGE"
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
            />
          </div>
          <div data-motion-copy>
            <p className="eyebrow">Le fondateur</p>
            <h2>Ahmed Taoufik Naciri, architecte</h2>
            <p>{cabinet.founder}</p>
          </div>
        </Container>
      </section>
      <section className="section section--ivory" data-motion="section">
        <Container>
          <div className="editorial-split">
            <div>
              <p className="eyebrow" data-motion-eyebrow>Notre manière d’intervenir</p>
              <h2 data-motion-heading>Comprendre avant de proposer</h2>
            </div>
            <div>
              <p data-motion-copy>{cabinet.approach}</p>
              <ul className="cabinet-formats">
                {cabinet.approachFormats.map((format) => (
                  <li key={format.label} data-motion-item>
                    <Link href={format.href}>{format.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <CTASection text="Un projet à structurer, restaurer ou valoriser ?" label="CONTACTEZ-NOUS" />
    </EditorialMotion>
  );
}
