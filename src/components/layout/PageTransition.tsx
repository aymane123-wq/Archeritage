"use client";

import { usePathname } from 'next/navigation';
import { useRef } from 'react';

import { useGSAP } from '@gsap/react';

import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAPAnimations(ref);

  useGSAP(
    () => {
      registerGsapPlugins();

      if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.fromTo(ref.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    },
    { scope: ref, dependencies: [pathname] },
  );

  return (
    <div ref={ref} key={pathname} className="relative z-10">
      {children}
    </div>
  );
}
