'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, registerGsapPlugins } from '@/lib/gsap';

export function MethodTimeline({ steps }: { steps: readonly (readonly [string, string])[] }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    registerGsapPlugins();
    if (!root.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const line = root.current.querySelector('[data-line]');
    const mobile = matchMedia('(max-width: 767px)').matches;
    gsap.fromTo(
      line,
      mobile ? { scaleY: 0 } : { scaleX: 0 },
      {
        ...(mobile ? { scaleY: 1 } : { scaleX: 1 }),
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      },
    );
  }, { scope: root });
  return <div className="method-timeline" ref={root}><div className="method-timeline__line" data-line /><ol>{steps.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div>;
}
