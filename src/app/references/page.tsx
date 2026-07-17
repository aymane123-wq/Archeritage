import type { Metadata } from 'next';
import Image from 'next/image';
import { ArcheritageIcon } from '@/components/icons/ArcheritageIcon';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ProofBox } from '@/components/ui/ProofBox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { references } from '@/content/site/official';

const title = "Une expérience construite à l’intersection du foncier, de l’architecture et du patrimoine";
export const metadata: Metadata = { title, description: "35 ans de projets publics, institutionnels et patrimoniaux — le socle sur lequel Archeritage s’appuie.", alternates: { canonical: '/references' } };

export default function ReferencesPage() { return <>
  <PageHero eyebrow="Références" title={title} introduction="35 ans de projets publics, institutionnels et patrimoniaux — le socle sur lequel Archeritage s’appuie." supporting="Le fondateur d’Archeritage a construit son parcours autour de projets territoriaux, patrimoniaux et institutionnels, avec une attention constante portée à la qualité architecturale et à la maîtrise d’ouvrage. Les références ci-dessous relèvent de cette expérience fondatrice ; les projets conduits directement sous l’enseigne Archeritage viendront enrichir cette page au fil des missions." />
  <section className="section section--ivory"><Container><SectionHeading eyebrow="Expérience du fondateur" title="Missions patrimoniales significatives" /><div className="references-grid">{references.map((reference, index) => <article key={reference.name} className={`reference-card${reference.image ? '' : ' reference-card--no-image'}`}>{reference.image ? <div className="reference-card__media"><Image src={reference.image} alt={reference.name} fill sizes="(min-width: 1024px) 50vw, 100vw" /></div> : null}<div className={`reference-card__body${reference.image ? '' : ' reference-card__body--full'}`}><span>0{index + 1}</span><h3>{reference.name}</h3>{reference.institution ? <p className="reference-card__institution"><ArcheritageIcon name="institution" tone="accent" />{reference.institution}</p> : null}<p>{reference.description}</p><small>Expérience professionnelle du fondateur</small></div></article>)}</div></Container></section>
  <section className="section section--ink"><Container><ProofBox eyebrow="Expérience institutionnelle fondatrice" title="Une pratique à l’échelle des territoires"><p>Point focal technique pour l’obtention du premier prêt de la Banque mondiale accordé à une ville de l’envergure de Casablanca ; collaboration avec l’UNESCO et le PNUD sur la sauvegarde de la Médina de Fès ; fonctions de direction générale des services au sein de collectivités marocaines.</p></ProofBox></Container></section>
  <section className="section section--alt"><Container><div className="editorial-split"><div><p className="eyebrow">Études de cas</p><h2>Une documentation appelée à s’enrichir</h2></div><p>Des études de cas détaillées — contexte, enjeux, méthode mobilisée, livrables, enseignements — seront publiées progressivement pour les missions pouvant être présentées publiquement.</p></div></Container></section>
  <CTASection text="Discuter d’une référence ou d’un projet similaire avec Archeritage." />
  </>; }
