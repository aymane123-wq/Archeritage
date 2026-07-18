'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/ui/Container';
import { StatRow } from '@/components/ui/StatRow';
import { gsap, registerGsapPlugins } from '@/lib/gsap';

const AUTOPLAY_DELAY = 5000;

const slides = [
  { src: '/images/hero/hero-architecture-publique.jpg', alt: 'Architecture contemporaine d’un équipement public de grande envergure', position: { desktop: 'center 56%', mobile: 'center 54%' } },
  { src: '/images/hero/hero-urbanisme-foncier.jpg', alt: 'Vue aérienne d’un territoire structuré par ses parcelles et ses voies', position: { desktop: 'center 52%', mobile: 'center' } },
  { src: '/images/references/tinmel-cover.jpg', alt: 'Architecture patrimoniale de la mosquée de Tinmel', position: { desktop: 'center 52%', mobile: 'center' } },
  { src: '/images/hero/hero-architecture-residentielle.jpg', alt: 'Architecture résidentielle contemporaine dans son environnement paysager', position: { desktop: 'center 52%', mobile: 'center' } },
  { src: '/images/missions/mission-coordination-plans.jpg', alt: 'Professionnels examinant des plans lors d’une coordination de projet', position: { desktop: 'center 50%', mobile: 'center 48%' } },
];

type Props = { eyebrow: string; title: string; introduction: string; stats: { value: string; label: string }[]; note: string };

export function HomeHeroSlider({ eyebrow, title, introduction, stats, note }: Props) {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [timerVersion, setTimerVersion] = useState(0);
  // Prioritize only the LCP slide; warm the next slide after first paint.
  const [mountedSlides, setMountedSlides] = useState(() => new Set([0]));
  const hasAdvanced = useRef(false);
  const root = useRef<HTMLElement>(null);

  const autoplayEnabled = isPlaying && isVisible && !reducedMotion;

  const mountedList = useMemo(() => [...mountedSlides].sort((a, b) => a - b), [mountedSlides]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (document.hidden || reducedMotion) {
      setMountedSlides((current) => new Set(current).add(1));
      return;
    }
    const warmNext = window.setTimeout(() => {
      setMountedSlides((current) => new Set(current).add(1));
    }, 2500);
    return () => window.clearTimeout(warmNext);
  }, [reducedMotion]);

  useEffect(() => {
    setMountedSlides((current) => {
      const next = new Set(current);
      next.add(active);
      if (hasAdvanced.current) {
        next.add((active + 1) % slides.length);
        next.add((active - 1 + slides.length) % slides.length);
      }
      return next;
    });
  }, [active]);

  useEffect(() => {
    if (!autoplayEnabled) return;
    const timer = window.setTimeout(() => {
      hasAdvanced.current = true;
      setActive((value) => (value + 1) % slides.length);
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [active, autoplayEnabled, timerVersion]);

  useGSAP(() => {
    registerGsapPlugins();
    if (!root.current) return;
    const items = root.current.querySelectorAll('[data-slide]');
    items.forEach((item, index) => gsap.to(item, {
      autoAlpha: index === active ? 1 : 0,
      scale: reducedMotion || index !== active ? 1 : 1.025,
      duration: reducedMotion ? 0 : 1.1,
      ease: 'power2.inOut',
      overwrite: true,
    }));
  }, { scope: root, dependencies: [active, reducedMotion, mountedList] });

  const navigate = (index: number) => {
    hasAdvanced.current = true;
    setActive((index + slides.length) % slides.length);
    setTimerVersion((value) => value + 1);
  };

  const handleControlKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigate(active - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigate(active + 1);
    }
  };

  return (
    <header className="home-hero" ref={root}>
      <div className="home-hero__images">
        {slides.map((slide, index) => (
          <div
            data-slide
            key={slide.src}
            className={index ? 'opacity-0' : undefined}
            aria-hidden={index !== active}
            style={{ '--hero-position-desktop': slide.position.desktop, '--hero-position-mobile': slide.position.mobile } as CSSProperties}
          >
            {mountedSlides.has(index) ? (
              <Image
                src={slide.src}
                alt={index === active ? slide.alt : ''}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
                quality={index === 0 ? 80 : 75}
              />
            ) : null}
          </div>
        ))}
      </div>
      <div className="home-hero__shade" />
      <Container className="home-hero__inner">
        <div className="home-hero__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="home-hero__intro">{introduction}</p>
          <div className="home-hero__actions">
            <Link className="button button--primary" href="/contact">Discuter d’un projet <ArrowRight aria-hidden="true" /></Link>
            <Link className="button button--ghost" href="/expertises">Découvrir nos expertises</Link>
          </div>
        </div>
        <div className="home-hero__meta">
          <div className="hero-controls" role="group" aria-label="Contrôles du diaporama" onKeyDown={handleControlKeys}>
            <div className="hero-counter" aria-label={`Image ${active + 1} sur ${slides.length}`}>
              <span>{String(active + 1).padStart(2, '0')}</span><span aria-hidden="true">/</span><span>{String(slides.length).padStart(2, '0')}</span>
            </div>
            <div className="hero-progress" aria-hidden="true">
              {slides.map((slide, index) => <span key={slide.src} className={index === active ? 'is-active' : ''}><i key={`${active}-${timerVersion}-${autoplayEnabled}`} className={index === active && autoplayEnabled ? 'is-running' : ''} /></span>)}
            </div>
            <div className="hero-controls__buttons">
              <button type="button" onClick={() => navigate(active - 1)} aria-label="Image précédente"><ChevronLeft aria-hidden="true" /></button>
              <button type="button" onClick={() => navigate(active + 1)} aria-label="Image suivante"><ChevronRight aria-hidden="true" /></button>
              {!reducedMotion ? (
                <button type="button" onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? 'Mettre le diaporama en pause' : 'Reprendre le diaporama'} aria-pressed={!isPlaying}>
                  {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                </button>
              ) : null}
            </div>
          </div>
          <div className="home-hero__proof">
            <StatRow stats={stats} note={note} variant="floating" />
          </div>
        </div>
      </Container>
    </header>
  );
}
