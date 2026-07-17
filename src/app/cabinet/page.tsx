import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ProofBox } from '@/components/ui/ProofBox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatRow } from '@/components/ui/StatRow';
import { cabinet, home, pillars } from '@/content/site/official';

export const metadata: Metadata = { title: cabinet.title, description: cabinet.introduction, alternates: { canonical: '/cabinet' } };

export default function CabinetPage() { return <>
  <PageHero eyebrow="Cabinet" title={cabinet.title} introduction={cabinet.introduction} supporting={cabinet.distinction} />
  <section className="section section--ivory"><Container><div className="editorial-split"><div><p className="eyebrow">Expérience fondatrice</p><h2>35 années à la croisée de l’architecture, du patrimoine et du territoire</h2></div><p>{cabinet.experience}</p></div><StatRow stats={home.stats.slice(0, 3)} /></Container></section>
  <section className="section section--alt"><Container><ProofBox eyebrow="Notre conviction" title="Le patrimoine, matière stratégique et territoriale"><p>{cabinet.conviction}</p></ProofBox></Container></section>
  <section className="section section--ivory"><Container><SectionHeading eyebrow="Nos trois piliers" title="Un même niveau d’exigence" /><div className="compact-pillars">{pillars.map((pillar, index) => <article key={pillar.title}><span>0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.description}</p></article>)}</div></Container></section>
  <section className="section section--ink"><Container className="founder-grid"><div className="founder-image"><Image src="/images/profile/nacir.jpeg" alt="Portrait d’Ahmed Taoufik Naciri, architecte et fondateur d’ARCHERITAGE" fill sizes="(min-width: 1024px) 42vw, 100vw" /></div><div><p className="eyebrow">Le fondateur</p><h2>Ahmed Taoufik Naciri, architecte</h2><p>{cabinet.founder}</p></div></Container></section>
  <section className="section section--ivory"><Container><div className="editorial-split"><div><p className="eyebrow">Notre manière d’intervenir</p><h2>Comprendre avant de proposer</h2></div><p>{cabinet.approach}</p></div></Container></section>
  <CTASection text="Un projet à structurer, restaurer ou valoriser ? Parlons-en." />
  </>; }
