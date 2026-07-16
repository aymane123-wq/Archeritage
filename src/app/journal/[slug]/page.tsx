import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { getJournalPostBySlug, getJournalPosts } from '@/lib/journal';

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getJournalPosts()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = await getJournalPostBySlug(slug); if (!post) return {}; return { title: post.title, description: post.description, alternates: { canonical: `/journal/${slug}` }, openGraph: { title: post.title, description: post.description, type: 'article' } }; }

export default async function JournalPostPage({ params }: Props) { const { slug } = await params; const post = await getJournalPostBySlug(slug); if (!post) notFound(); const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, publisher: { '@type': 'Organization', name: 'ARCHERITAGE' }, mainEntityOfPage: `https://archeritage.ma/journal/${post.slug}` }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><article className="article-page"><Container><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="article-page__lede">{post.description}</p>{post.image ? <div className="article-page__image"><Image src={post.image} alt={post.imageAlt ?? ''} fill priority sizes="(min-width: 1024px) 1280px, 100vw" /></div> : null}<div className="article-page__body">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Container></article><CTASection text="Vous souhaitez échanger sur cette publication ou sur un projet ?" /></>; }
