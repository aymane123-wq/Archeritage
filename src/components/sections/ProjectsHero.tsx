import { Container } from '@/components/ui/Container';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';

export function ProjectsHero() {
  return (
    <section className="pt-28 sm:pt-32 lg:pt-36">
      <Container className="pb-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">Découvrir nos projets</p>
        <SplitTextReveal text="Une sélection de projets habitat, commercial, intérieur et équipement." className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-[var(--light)] sm:text-6xl lg:text-[clamp(4rem,6vw,6.5rem)]" />
        <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
          Des espaces conçus pour être à la fois lisibles, calmes et identitaires, avec une grande attention portée à la circulation et à la matérialité.
        </p>
      </Container>
    </section>
  );
}
