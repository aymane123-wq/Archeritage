import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogDetailContent } from '@/components/sections/BlogDetailContent';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Container } from '@/components/ui/Container';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { posts } from '@/data/posts';
import { createMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return createMetadata({ title: 'Article introuvable', description: 'L’article demandé est introuvable.', path: '/histoires' });
  }

  return createMetadata({
    title: `${post.title} | ARCHERITAGE`,
    description: post.excerpt,
    path: `/histoires/${post.slug}`,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="pt-28 sm:pt-32 lg:pt-36">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="pb-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">{post.category}</p>
            <SplitTextReveal text={post.title} className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-[var(--light)] sm:text-6xl lg:text-[clamp(4rem,6vw,6.5rem)]" />
            <p className="mt-5 text-sm uppercase tracking-[0.3em] text-[var(--muted)]">{formatDate(post.date)}</p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">{post.excerpt}</p>
          </div>
          <ImageReveal src={post.heroImage} alt={post.title} className="aspect-[4/5]" priority fallbackLabel={post.title} />
        </Container>
      </section>
      <BlogDetailContent post={post} />
      <ContactCTA title="Discutons d’un sujet ou d’un projet." />
    </>
  );
}
