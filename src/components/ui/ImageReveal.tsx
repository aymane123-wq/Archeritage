"use client";

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';

import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { SafeImage } from './SafeImage';

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  fallbackLabel?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  delay?: number;
};

const revealInsets = {
  up: 'inset(0 0 100% 0)',
  down: 'inset(100% 0 0 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
} as const;

export function ImageReveal({ src, alt, className, priority, sizes, fill = true, fallbackLabel, direction = 'up', once = true, delay = 0 }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.fromTo(
        ref.current,
        { clipPath: revealInsets[direction], opacity: 0.4 },
        {
          clipPath: 'inset(0 0 0 0)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          delay,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn('relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white/5', className)}>
      <SafeImage src={src} alt={alt} priority={priority} sizes={sizes} fill={fill} fallbackLabel={fallbackLabel} />
    </div>
  );
}
