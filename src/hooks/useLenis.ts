"use client";

import { useEffect } from 'react';

import Lenis from 'lenis';

import { gsap, registerGsapPlugins, ScrollTrigger } from '@/lib/gsap';

export function useLenis() {
  useEffect(() => {
    registerGsapPlugins();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    const onVisibility = () => document.hidden ? lenis.stop() : lenis.start();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const refreshScrollTrigger = () => window.requestAnimationFrame(() => ScrollTrigger.refresh());
    window.addEventListener('load', refreshScrollTrigger);
    document.addEventListener('visibilitychange', onVisibility);
    document.fonts.ready.then(refreshScrollTrigger);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener('load', refreshScrollTrigger);
      document.removeEventListener('visibilitychange', onVisibility);
      lenis.destroy();
    };
  }, []);
}
