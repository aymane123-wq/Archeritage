'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, registerGsapPlugins, ScrollTrigger } from '@/lib/gsap';
import { isMobileViewport, motionTokens, prefersReducedMotion } from '@/lib/motion';

export function MethodTimeline({ steps }: { steps: readonly (readonly [string, string])[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsapPlugins();
    if (!root.current) return;

    const line = root.current.querySelector('[data-line]');
    const items = root.current.querySelectorAll<HTMLElement>('li');
    const mobile = isMobileViewport();
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set([line, ...items].filter(Boolean), { clearProps: 'all', opacity: 1, scaleX: 1, scaleY: 1 });
      items.forEach((item) => item.classList.add('is-active'));
      return;
    }

    if (line) {
      gsap.fromTo(
        line,
        mobile ? { scaleY: 0 } : { scaleX: 0 },
        {
          ...(mobile ? { scaleY: 1 } : { scaleX: 1 }),
          duration: 1.1,
          ease: motionTokens.ease.reveal,
          transformOrigin: mobile ? 'top center' : 'left center',
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        },
      );
    }

    gsap.set(items, { autoAlpha: 0, y: mobile ? 14 : 20 });
    gsap.to(items, {
      autoAlpha: 1,
      y: 0,
      duration: mobile ? 0.5 : 0.65,
      stagger: motionTokens.stagger.standard,
      ease: motionTokens.ease.reveal,
      scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
    });

    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 72%',
        once: true,
        onEnter: () => item.classList.add('is-active'),
      });
    });
  }, { scope: root });

  return (
    <div className="method-timeline" ref={root}>
      <div className="method-timeline__line" data-line />
      <ol>
        {steps.map(([title, text], index) => (
          <li key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
