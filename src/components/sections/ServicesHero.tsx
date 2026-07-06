import { Container } from '@/components/ui/Container';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';

export function ServicesHero() {
  return (
    <section className="pt-28 sm:pt-32 lg:pt-36">
      <Container className="pb-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">Nos services</p>
        <SplitTextReveal text="Quatre expertises pour cadrer, réaliser et affiner chaque projet." className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-[var(--light)] sm:text-6xl lg:text-[clamp(4rem,6vw,6.25rem)]" />
        <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
          De l’idée initiale à la livraison, nous accompagnons les projets avec une approche lisible, rigoureuse et orientée usage.
        </p>
      </Container>
    </section>
  );
}
