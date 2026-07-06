"use client";

import { useEffect } from 'react';

import Lenis from 'lenis';

import { ScrollTrigger } from '@/lib/gsap';

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
    });

    let animationFrame = 0;

    const raf = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
      animationFrame = window.requestAnimationFrame(raf);
    };

    animationFrame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);
}
