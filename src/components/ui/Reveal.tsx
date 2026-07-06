"use client";

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';

import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: React.ElementType;
};

const offsets = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
} as const;

export function Reveal({ children, className, direction = 'up', delay = 0, stagger = 0, once = true, as: Component = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const target = ref.current;
      const animatedChildren = target.querySelectorAll<HTMLElement>('[data-reveal-item]');
      const initial = offsets[direction];

      if (stagger > 0 && animatedChildren.length > 0) {
        gsap.fromTo(animatedChildren, { opacity: 0, ...initial }, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          delay,
          scrollTrigger: { trigger: target, start: 'top 82%', once },
        });
        return;
      }

      gsap.fromTo(target, { opacity: 0, ...initial }, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        scrollTrigger: { trigger: target, start: 'top 82%', once },
      });
    },
    { scope: ref },
  );

  return (
    <Component ref={ref as never} className={cn('will-change-transform', className)}>
      {children}
    </Component>
  );
}
