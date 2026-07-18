'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { fadeRise, motionTokens } from '@/lib/motion';

export function FooterMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    registerGsapPlugins();
    if (!ref.current) return;

    if (reduced) {
      gsap.set(ref.current.querySelectorAll('.site-footer__wordmark, .site-footer__grid > *, .site-footer__bottom'), {
        clearProps: 'all',
        autoAlpha: 1,
        opacity: 1,
        y: 0,
        clipPath: 'none',
      });
      return;
    }

    const wordmark = ref.current.querySelector('.site-footer__wordmark');
    const columns = ref.current.querySelectorAll('.site-footer__grid > *');
    const bottom = ref.current.querySelector('.site-footer__bottom');
    const topRule = ref.current.querySelector('.site-footer__rule');

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true },
      defaults: { ease: motionTokens.ease.reveal },
    });

    if (topRule) {
      gsap.set(topRule, { scaleX: 0, transformOrigin: 'left center' });
      timeline.to(topRule, { scaleX: 1, duration: 0.7 }, 0);
    }

    if (wordmark) {
      timeline.fromTo(
        wordmark,
        { clipPath: 'inset(0 0 100% 0)', y: 28 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.95, ease: motionTokens.ease.major },
        0.08,
      );
    }

    if (columns.length) {
      timeline.add(fadeRise(gsap, columns, { duration: 0.6, stagger: 0.09, y: 16 })!, 0.28);
    }

    if (bottom) {
      timeline.fromTo(bottom, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.2');
    }
  }, { scope: ref, dependencies: [reduced] });

  return <div ref={ref}>{children}</div>;
}
