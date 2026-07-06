import type { Metadata } from 'next';

import { BlogGrid } from '@/components/sections/BlogGrid';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Container } from '@/components/ui/Container';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Histoires | ARCHERITAGE',
  description: 'Articles, idées et retours d’expérience autour de l’architecture et de l’intérieur.',
  path: '/histoires',
});

export default function StoriesPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32 lg:pt-36">
        <Container className="pb-10">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">Histoires</p>
          <SplitTextReveal text="Idées, récits et références autour du projet architectural." className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-[var(--light)] sm:text-6xl lg:text-[clamp(4rem,6vw,6.5rem)]" />
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Nous partageons ici des lectures du métier, des sujets de conception et des inspirations liées à la matière, au rythme et à l’usage.
          </p>
        </Container>
      </section>
      <BlogGrid />
      <ContactCTA title="Vous souhaitez approfondir un sujet ?" />
    </>
  );
}
