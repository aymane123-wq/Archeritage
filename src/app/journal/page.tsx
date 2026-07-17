import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ArcheritageIcon } from '@/components/icons/ArcheritageIcon';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { journalCategories } from '@/content/site/official';
import { getJournalPosts, isJournalPostPublished } from '@/lib/journal';

export const metadata: Metadata = { title: 'Journal Archeritage', description: "Pensées, notes et regards sur l’architecture, le patrimoine et les projets complexes.", alternates: { canonical: '/journal' } };

export default async function JournalPage() { const posts = await getJournalPosts(); return <><PageHero eyebrow="Journal" title="Journal Archeritage" introduction="Pensées, notes et regards sur l’architecture, le patrimoine et les projets complexes." supporting="Le Journal rassemble les réflexions, notes de doctrine et retours d’expérience du cabinet. Ligne éditoriale : publier peu, mais publier juste." /><section className="section section--ivory"><Container><SectionHeading eyebrow="À paraître" title="Premières publications à lancer" /><div className="journal-grid">{posts.map((post, index) => { const isPublished = isJournalPostPublished(post); return <article key={post.slug}>{post.image ? <div className="journal-card__image"><Image src={post.image} alt={post.imageAlt ?? ''} fill sizes="(min-width: 1024px) 33vw, 100vw" /></div> : null}<div className="journal-card__body"><span className="journal-card__meta"><ArcheritageIcon name="document" tone="accent" />{post.category} · 0{index + 1}</span><h3>{post.title}</h3><p>{post.description}</p>{isPublished ? <Link href={`/journal/${post.slug}`}>Lire la publication <ArrowUpRight aria-hidden="true" /></Link> : <span className="journal-card__status">Publication à venir</span>}</div></article>; })}</div></Container></section><section className="section section--alt"><Container><SectionHeading eyebrow="Rubriques" title="Une ligne éditoriale resserrée" /><div className="category-list">{journalCategories.map((category, index) => <div key={category}><span>0{index + 1}</span><p>{category}</p></div>)}</div></Container></section><CTASection title="Être informé des prochaines publications" text="Contactez Archeritage pour suivre les prochaines notes et regards du cabinet." /></>; }
