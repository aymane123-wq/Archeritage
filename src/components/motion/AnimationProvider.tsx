'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLenis } from '@/hooks/useLenis';
import { gsap, registerGsapPlugins, ScrollTrigger } from '@/lib/gsap';
import { motion } from '@/lib/motion-config';
import { CursorFollower } from './CursorFollower';
import { ScrollProgress } from './ScrollProgress';

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [destination, setDestination] = useState('ARCHERITAGE');
  useLenis();

  useEffect(() => {
    if (reduced) return;
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === pathname || url.hash) return;
      event.preventDefault();
      setDestination(anchor.textContent?.trim().slice(0, 40) || 'ARCHERITAGE');
      gsap.timeline({ onComplete: () => router.push(`${url.pathname}${url.search}`) })
        .set(overlayRef.current, { display: 'grid', yPercent: 100 })
        .to(overlayRef.current, { yPercent: 0, duration: 0.5, ease: motion.ease.inOut });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname, reduced, router]);

  useGSAP(() => {
    registerGsapPlugins();
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (reduced) { gsap.set(overlayRef.current, { display: 'none' }); return; }
    const overlay = overlayRef.current;
    if (overlay && gsap.getProperty(overlay, 'display') !== 'none') {
      gsap.to(overlay, { yPercent: -100, duration: 0.65, delay: 0.08, ease: motion.ease.inOut, onComplete: () => gsap.set(overlay, { display: 'none', yPercent: 100 }) });
    }
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(refresh);
  }, { dependencies: [pathname, reduced] });

  return (
    <>
      {children}
      <ScrollProgress />
      <CursorFollower />
      <div ref={overlayRef} className="route-transition-panel" aria-hidden="true">
        <span>ARCHERITAGE</span><div /><p>{destination}</p>
      </div>
    </>
  );
}
