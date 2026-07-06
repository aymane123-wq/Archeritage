import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionMarker } from '@/components/ui/SectionMarker';

export function MissionPreview() {
  return (
    <section id="mission-preview" className="bg-white/[0.015] py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <SectionMarker className="hidden sm:inline-flex" />
            <SectionLabel label="À propos" title="Une architecture visionnaire, calme et durable." />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Nous offrons des solutions architecturales novatrices et durables, adaptées aux besoins spécifiques de chaque projet. Notre approche relie rigueur technique et sens du détail.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Chaque espace est pensé pour durer, évoluer et garder une cohérence forte entre l’usage, la matérialité et l’identité du lieu.
          </p>
          <div className="mt-8">
            <Button href="/mission" variant="secondary">
              Découvrir notre mission <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <ImageReveal src="/images/mission/studio-01.webp" alt="Studio ARCHERITAGE" className="aspect-[4/5]" fallbackLabel="Mission studio placeholder" direction="right" />
          <div className="absolute left-4 top-4 max-w-[16rem] rounded-[1.25rem] border border-white/12 bg-[rgba(14,14,12,0.72)] p-4 backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--accent)]">Studio Rabat</p>
            <p className="mt-2 text-sm leading-6 text-[var(--light)]">Un atelier conçu pour la réflexion, la maquette et le dialogue avec la matière.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
