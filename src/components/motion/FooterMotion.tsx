'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { motion } from '@/lib/motion-config';

export function FooterMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    registerGsapPlugins();
    if (!ref.current || reduced) return;
    const wordmark = ref.current.querySelector('.site-footer__wordmark');
    const columns = ref.current.querySelectorAll('.site-footer__grid > *');
    const bottom = ref.current.querySelector('.site-footer__bottom');
    const timeline = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } });
    if (wordmark) timeline.fromTo(wordmark, { clipPath: 'inset(0 0 100% 0)', y: 40 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.15, ease: motion.ease.cinematic });
    timeline.fromTo(columns, { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: .12, duration: .7 }, .45);
    if (bottom) timeline.fromTo(bottom, { opacity: 0, scaleX: .85, transformOrigin: 'left' }, { opacity: 1, scaleX: 1, duration: .7 }, .75);
  }, { scope: ref, dependencies: [reduced] });
  return <div ref={ref}>{children}</div>;
}
