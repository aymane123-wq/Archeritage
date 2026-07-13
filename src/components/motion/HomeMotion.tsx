'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { motion } from '@/lib/motion-config';

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    registerGsapPlugins();
    const root = ref.current;
    if (!root || reduced) return;
    const match = gsap.matchMedia();

    const references = gsap.utils.toArray<HTMLElement>('.home-reference-card', root);
    references.forEach((card, index) => {
      const media = card.querySelector('.home-reference-card__media');
      const body = card.querySelector('.home-reference-card__body');
      const timeline = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 86%', once: true } });
      timeline
        .fromTo(card, { y: 32 + index * 10 }, { y: 0, duration: motion.duration.standard, ease: motion.ease.strong })
        .fromTo(media, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: motion.duration.slow, ease: motion.ease.inOut }, 0)
        .fromTo(body, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: .65 }, .45);
    });

    const domains = gsap.utils.toArray<HTMLElement>('.home-domain-card', root);
    domains.forEach((card, index) => {
      const paths = card.querySelectorAll<SVGGeometryElement>('svg path, svg circle');
      paths.forEach((path) => {
        const length = 'getTotalLength' in path ? path.getTotalLength() : 40;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
      timeline
        .fromTo(card, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .75, delay: (index % 3) * .07, ease: motion.ease.strong })
        .to(paths, { strokeDashoffset: 0, duration: 1, stagger: .035, ease: motion.ease.inOut }, '-=.45')
        .fromTo(card.querySelectorAll('h3, p, li'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: .045, duration: .45 }, '-=.65');
    });

    const journalCards = root.querySelectorAll('.home-journal-grid article');
    if (journalCards.length) gsap.fromTo(journalCards, { clipPath: 'inset(0 0 100% 0)', y: 20 }, { clipPath: 'inset(0 0 0% 0)', y: 0, stagger: .12, duration: 1, ease: motion.ease.strong, scrollTrigger: { trigger: '.home-journal-grid', start: 'top 84%', once: true } });

    const closing = root.querySelector('.contact-cta');
    if (closing) gsap.fromTo(closing, { clipPath: 'inset(10% 50% 10% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: motion.ease.inOut, scrollTrigger: { trigger: closing, start: 'top 86%', once: true } });

    match.add('(min-width: 1024px)', () => {
      const cabinetMedia = root.querySelector('.home-cabinet [data-image-reveal-media]');
      if (cabinetMedia) gsap.fromTo(cabinetMedia, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.home-cabinet', start: 'top bottom', end: 'bottom top', scrub: .8 } });
      references.forEach((card, index) => gsap.fromTo(card, { yPercent: index % 2 ? 2 : -2 }, { yPercent: index % 2 ? -2 : 2, ease: 'none', scrollTrigger: { trigger: '.home-references', start: 'top bottom', end: 'bottom top', scrub: 1 } }));

      const methodPanel = root.querySelector<HTMLElement>('.home-method__panel');
      const principles = root.querySelectorAll<HTMLElement>('.home-method__principles > div:not(.home-method__connector)');
      const connector = root.querySelector<HTMLElement>('.home-method__connector');
      if (methodPanel && principles.length) {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: '.home-method', start: 'top top+=90', end: '+=650', pin: methodPanel, scrub: .55, anticipatePin: 1 } });
        if (connector) timeline.fromTo(connector, { scaleX: 0 }, { scaleX: 1, duration: principles.length, ease: 'none' }, 0);
        principles.forEach((principle) => timeline.to(principle, { backgroundColor: '#211c12', borderColor: 'rgba(193,161,102,.5)', color: '#f3eee5', duration: 1 }).to(principle, { opacity: .55, duration: .7 }, '+=.2'));
      }
    });

    return () => match.revert();
  }, { scope: ref, dependencies: [reduced] });

  return <div ref={ref}>{children}</div>;
}
