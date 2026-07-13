'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';

import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { motion } from '@/lib/motion-config';

const slides = [
  { src: '/images/hero/hero-01.jpg', label: 'Architecture' },
  { src: '/images/hero/hero-02.jpg', label: 'Patrimoine' },
  { src: '/images/hero/hero-03.jpg', label: 'Réhabilitation' },
  { src: '/images/hero/hero-04.jpg', label: 'Territoires' },
  { src: '/images/hero/hero-05.jpg', label: 'Projets complexes' },
];

type HomeHeroSliderProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export function HomeHeroSlider({ eyebrow, title, text }: HomeHeroSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const previousRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || reduced || document.hidden) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), 5500);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduced]);

  useEffect(() => {
    const visibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);

  useGSAP(() => {
    registerGsapPlugins();
    if (!rootRef.current) return;

    const images = rootRef.current.querySelectorAll<HTMLElement>('[data-hero-slide]');
    const incoming = images[active];
    const outgoing = images[previousRef.current];
    if (reduced) {
      images.forEach((image, index) => gsap.set(image, { autoAlpha: index === active ? 1 : 0, scale: 1, clipPath: 'inset(0 0 0 0)' }));
      return;
    }
    if (incoming && active !== previousRef.current) {
      gsap.set(incoming, { zIndex: 2, autoAlpha: 1 });
      gsap.fromTo(incoming, { clipPath: 'inset(0 0 0 100%)', scale: 1.065, xPercent: 1.5 }, { clipPath: 'inset(0 0 0 0%)', scale: 1, xPercent: 0, duration: motion.duration.cinematic, ease: motion.ease.inOut, overwrite: true });
      if (outgoing) gsap.to(outgoing, { autoAlpha: 0, scale: 1.025, duration: motion.duration.slow, ease: motion.ease.inOut, overwrite: true, onComplete: () => gsap.set(outgoing, { zIndex: 0 }) });
    }
    previousRef.current = active;
    const status = rootRef.current.querySelector('[data-hero-status]');
    if (status) gsap.fromTo(status, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: motion.duration.fast, ease: motion.ease.strong });
  }, { scope: rootRef, dependencies: [active, reduced] });

  useGSAP(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root || reduced) return;
    const alreadySeen = sessionStorage.getItem('archeritage-intro-seen');
    const panels = root.querySelectorAll('[data-intro-panel]');
    const wordmark = root.querySelector('[data-intro-wordmark]');
    const lines = root.querySelectorAll('[data-hero-line]');
    const supporting = root.querySelectorAll('[data-hero-support]');
    const controls = root.querySelector('.hero-slider-controls');
    const timeline = gsap.timeline({ defaults: { ease: motion.ease.strong } });
    if (!alreadySeen) {
      sessionStorage.setItem('archeritage-intro-seen', 'true');
      gsap.set(panels, { display: 'block' });
      timeline
        .fromTo(wordmark, { opacity: 0, letterSpacing: '.5em' }, { opacity: 1, letterSpacing: '.3em', duration: .5 })
        .to(wordmark, { opacity: 0, duration: .25 }, .55)
        .to(panels[0], { xPercent: -101, duration: 1.05, ease: motion.ease.inOut }, .65)
        .to(panels[1], { xPercent: 101, duration: 1.05, ease: motion.ease.inOut }, .65)
        .set(panels, { display: 'none' });
    }
    timeline
      .fromTo(document.querySelectorAll('header.fixed a, header.fixed nav'), { opacity: 0, y: -12 }, { opacity: 1, y: 0, stagger: .06, duration: .55 }, alreadySeen ? 0 : 1.05)
      .fromTo(root.querySelector('.hero-copy .eyebrow'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5 }, '<.05')
      .fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: .12, duration: 1.05, ease: motion.ease.cinematic }, '<.05')
      .fromTo(supporting, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: .09, duration: .7 }, '-=.55')
      .fromTo(controls, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5 }, '-=.25');
  }, { scope: rootRef, dependencies: [reduced] });

  return (
    <header ref={rootRef} className="portfolio-hero">
      <div data-intro-panel className="hero-intro-panel hero-intro-panel--left" />
      <div data-intro-panel className="hero-intro-panel hero-intro-panel--right" />
      <div data-intro-wordmark className="hero-intro-wordmark">ARCHERITAGE</div>
      <div className="absolute inset-0 bg-[#0b0b09]">
        {slides.map((slide, index) => (
          <div key={slide.src} data-hero-slide className={`absolute inset-0 ${index === 0 ? 'opacity-100' : 'opacity-0'}`} aria-hidden={index !== active}>
            <Image src={slide.src} alt="" fill priority={index === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="portfolio-hero__overlay" />
      <div className="portfolio-hero__grid" />
      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-8 pt-32 sm:pb-12 lg:pb-14">
        <div className="hero-copy max-w-6xl">
          <p className="eyebrow text-[var(--light)]">{eyebrow}</p>
          <h1>{title.split(', ').map((line, index) => <span key={line} className="hero-title-line"><span data-hero-line>{line}{index < title.split(', ').length - 1 ? ',' : ''}</span></span>)}</h1>
          <div className="mt-7 grid gap-6 border-t border-white/25 pt-6 lg:grid-cols-[minmax(0,42rem)_auto] lg:items-end lg:justify-between">
            <p data-hero-support>{text}</p>
            <div data-hero-support className="flex flex-wrap gap-3"><Link href="/cabinet" className="button-primary">Découvrir le cabinet<ArrowRight className="h-4 w-4" /></Link><Link href="/references" className="button-secondary">Voir les références<ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </div>

        <div className="hero-slider-controls" aria-label="Images du cabinet" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <p data-hero-status key={active}><span>{String(active + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')} · {slides[active].label}</p>
          <div>{slides.map((slide, index) => <button key={slide.src} type="button" onClick={() => setActive(index)} aria-label={`Afficher ${slide.label}`} aria-current={index === active}><span className={index === active ? 'is-active' : ''} /></button>)}</div>
        </div>
      </Container>
    </header>
  );
}
