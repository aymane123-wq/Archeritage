'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/ui/Container';
import { gsap, registerGsapPlugins } from '@/lib/gsap';

const slides = [
  {
    src: '/images/hero/hero-architecture-publique.jpg',
    alt: 'Architecture contemporaine d’un équipement public de grande envergure',
    position: { desktop: 'center 56%', mobile: 'center 54%' },
  },
  {
    src: '/images/hero/hero-urbanisme-foncier.png',
    alt: 'Vue aérienne d’un territoire structuré par ses parcelles et ses voies',
    position: { desktop: 'center 52%', mobile: 'center' },
  },
  {
    src: '/images/references/tinmel-cover.jpg',
    alt: 'Architecture patrimoniale de la mosquée de Tinmel',
    position: { desktop: 'center 52%', mobile: 'center' },
  },
  {
    src: '/images/hero/hero-architecture-residentielle.jpg',
    alt: 'Architecture résidentielle contemporaine dans son environnement paysager',
    position: { desktop: 'center 52%', mobile: 'center' },
  },
  {
    src: '/images/missions/mission-coordination-plans.jpg',
    alt: 'Professionnels examinant des plans lors d’une coordination de projet',
    position: { desktop: 'center 50%', mobile: 'center 48%' },
  },
];

type Props = { eyebrow: string; title: string; introduction: string; supporting: string };

export function HomeHeroSlider({ eyebrow, title, introduction, supporting }: Props) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const next = new window.Image();
    next.src = slides[(active + 1) % slides.length].src;
  }, [active]);

  useGSAP(() => {
    registerGsapPlugins();
    if (!root.current) return;
    const items = root.current.querySelectorAll('[data-slide]');
    items.forEach((item, index) => gsap.to(item, { autoAlpha: index === active ? 1 : 0, scale: index === active ? 1.025 : 1, duration: 1.1, ease: 'power2.inOut', overwrite: true }));
  }, { scope: root, dependencies: [active] });

  return <header className="home-hero" ref={root}>
    <div className="home-hero__images">{slides.map((slide, index) => <div
      data-slide
      key={slide.src}
      className={index ? 'opacity-0' : ''}
      aria-hidden={index !== active}
      style={{
        '--hero-position-desktop': slide.position.desktop,
        '--hero-position-mobile': slide.position.mobile,
      } as CSSProperties}
    ><Image src={slide.src} alt={slide.alt} fill priority={index === 0} loading={index === 0 ? 'eager' : 'lazy'} sizes="100vw" /></div>)}</div>
    <div className="home-hero__shade" />
    <Container className="home-hero__inner">
      <div className="home-hero__content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="home-hero__bottom"><div><p className="home-hero__intro">{introduction}</p><p className="home-hero__support">{supporting}</p></div><div className="home-hero__actions"><Link className="button button--primary" href="/contact">Discuter d’un projet <ArrowRight aria-hidden="true" /></Link><Link className="button button--ghost" href="/expertises">Découvrir nos expertises</Link></div></div>
      </div>
      <div className="hero-progress" aria-label={`Image ${active + 1} sur ${slides.length}`}><span>{String(active + 1).padStart(2, '0')}</span><div>{slides.map((slide, index) => <button key={slide.src} type="button" aria-label={`Afficher l’image ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)}><i /></button>)}</div><span>{String(slides.length).padStart(2, '0')}</span></div>
    </Container>
  </header>;
}
