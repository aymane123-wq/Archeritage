"use client";

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';

import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type SectionMarkerProps = {
  className?: string;
  size?: 'sm' | 'md';
};

export function SectionMarker({ className, size = 'md' }: SectionMarkerProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.fromTo(ref.current, { opacity: 0, scale: 0.6, rotate: -12 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } });
    },
    { scope: ref },
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(245,240,232,0.04)] shadow-[inset_0_0_0_1px_rgba(200,169,106,0.12)]',
        size === 'sm' ? 'h-8 w-8' : 'h-11 w-11',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      <span className="absolute h-[70%] w-[70%] rounded-full border border-[rgba(245,240,232,0.14)]" />
    </span>
  );
}
