"use client";

import { useEffect, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SafeImage } from '@/components/ui/SafeImage';
import { SplitTextReveal } from '@/components/ui/SplitTextReveal';
import { heroSlides } from '@/data/hero';
import { gsap, registerGsapPlugins } from '@/lib/gsap';

export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      registerGsapPlugins();

      if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const titleItems = titleRef.current?.querySelectorAll<HTMLElement>('[data-hero-line]') ?? [];
      const previewItems = previewRef.current?.querySelectorAll<HTMLElement>('[data-hero-preview]') ?? [];

      if (titleItems.length > 0) {
        gsap.fromTo(Array.from(titleItems), { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09 });
      }

      if (previewItems.length > 0) {
        gsap.fromTo(Array.from(previewItems), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08, delay: 0.3 });
      }
    },
    { scope: heroRef },
  );

  useGSAP(
    () => {
      registerGsapPlugins();

      if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      slideRefs.current.forEach((slide, index) => {
        if (!slide) {
          return;
        }

        if (index === activeIndex) {
          gsap.killTweensOf(slide);
          gsap.fromTo(slide, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' });
          const image = slide.querySelector<HTMLElement>('[data-hero-image]');
          if (image) {
            gsap.fromTo(image, { scale: 1.06 }, { scale: 1, duration: 4.5, ease: 'none' });
          }
        } else {
          gsap.to(slide, { opacity: 0, scale: 1.04, duration: 0.85, ease: 'power2.out' });
        }
      });
    },
    { scope: heroRef, dependencies: [activeIndex] },
  );

  const activeSlide = heroSlides[activeIndex];
  const progress = ((activeIndex + 1) / heroSlides.length) * 100;

  return (
    <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32 lg:pt-0">
      <div className="absolute inset-0 bg-[#0e0e0c]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,169,106,0.16),transparent_38%),linear-gradient(180deg,rgba(14,14,12,0.16),rgba(14,14,12,0.94))]" />
      <div className="absolute inset-0 premium-grid opacity-15" />

      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            className="absolute inset-0 opacity-0 will-change-transform"
          >
            <div data-hero-image className="absolute inset-0">
              <SafeImage src={slide.image} alt={slide.alt} className="h-full w-full rounded-none border-0" fallbackLabel={slide.title} />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,14,12,0.18),rgba(14,14,12,0.82))]" />
          </div>
        ))}
      </div>

      <Container className="relative z-10 grid min-h-[100svh] items-end lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="pb-14 pt-8 lg:pb-20 lg:pt-24">
          <div ref={titleRef} className="max-w-5xl space-y-6">
            <p data-hero-line className="text-[11px] uppercase tracking-[0.42em] text-[var(--accent)]">Architecture · Intérieur · Identité</p>
            <SplitTextReveal
              text="Nous concevons des espaces premium pour l’habitat, le commerce et les équipements"
              className="max-w-5xl text-[clamp(3.2rem,7vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[var(--light)]"
            />
            <p data-hero-line className="max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base lg:text-lg">
              ARCHERITAGE développe une architecture sobre, cinématographique et durable, portée par des matières justes, une lumière maîtrisée et une exécution précise.
            </p>
            <p data-hero-line className="text-[11px] uppercase tracking-[0.38em] text-[var(--muted)]">Rabat Maroc · Est. 2026 · ARCHERITAGE</p>

            <div data-hero-line className="flex flex-wrap gap-4 pt-2">
              <Button href="/projets" variant="primary">
                Découvrir nos projets <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="secondary">
                Nous contacter
              </Button>
            </div>
          </div>

          <Reveal className="mt-8 lg:hidden" direction="up" delay={0.2}>
            <div className="max-w-[20rem] rounded-[1.5rem] border border-[var(--border)] bg-[rgba(14,14,12,0.64)] p-4 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--accent)]">{activeSlide.category}</p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[var(--light)]">{activeSlide.title}</p>
              <div className="mt-4 h-px w-full bg-white/10">
                <div className="h-px bg-[var(--accent)] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="hidden justify-self-end lg:block">
          <div ref={previewRef} className="max-w-[24rem]">
            <div className="glass-panel rounded-[1.75rem] border border-[var(--border)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.26)]">
              <p data-hero-preview className="text-[10px] uppercase tracking-[0.38em] text-[var(--accent)]">{activeSlide.category}</p>
              <p data-hero-preview className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--light)]">{activeSlide.title}</p>
              <div data-hero-preview className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-[var(--muted)]">
                  <span>{activeSlide.id} / {heroSlides.length.toString().padStart(2, '0')}</span>
                  <span>Vue active</span>
                </div>
                <div className="h-px w-full bg-white/10">
                  <div className="h-px bg-[var(--accent)] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Une composition d’image et de matière pensée comme une vitrine éditoriale pour présenter l’architecture du studio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="relative z-10 pb-8 lg:pb-10">
        <div className="grid gap-4 border-t border-[var(--border)] pt-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[var(--muted)]">
            <span>{activeSlide.id} / {heroSlides.length.toString().padStart(2, '0')}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline max-w-[22ch] truncate text-[var(--foreground)]">{activeSlide.title}</span>
          </div>

          <div className="hidden h-px w-full min-w-[14rem] bg-white/10 lg:block">
            <div className="h-px bg-[var(--accent)] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <a href="#mission-preview" className="inline-flex items-center gap-2 justify-self-start text-[11px] uppercase tracking-[0.35em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)] lg:justify-self-end">
            Scroll <ChevronDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}