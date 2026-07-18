'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import {
  curtainImage,
  drawLine,
  fadeRise,
  isMobileViewport,
  motionTokens,
  revealLineMask,
} from '@/lib/motion';

type EditorialMotionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Declares motion via data attributes inside the subtree:
 * - [data-motion="hero"] — load entrance for page heroes
 * - [data-motion="section"] — grouped scroll reveal
 * - [data-motion-heading] — line-mask heading
 * - [data-motion-line] — architectural scaleX/Y line
 * - [data-motion-item] — staggered child
 * - [data-motion-media] — image curtain (direction via data-motion-dir)
 * - [data-motion-copy] — supporting copy fade
 */
export function EditorialMotion({ children, className }: EditorialMotionProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    registerGsapPlugins();
    if (!root.current) return;

    const scope = root.current;
    const mobile = isMobileViewport();

    if (reduced) {
      gsap.set(scope.querySelectorAll('[data-motion-heading], [data-motion-item], [data-motion-copy], [data-motion-media], [data-motion-line], [data-motion="hero"] *'), {
        clearProps: 'all',
        opacity: 1,
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
        clipPath: 'none',
      });
      return;
    }

    // Page heroes (above the fold)
    scope.querySelectorAll<HTMLElement>('[data-motion="hero"]').forEach((hero) => {
      const eyebrow = hero.querySelector<HTMLElement>('.eyebrow, [data-motion-eyebrow]');
      const heading = hero.querySelector<HTMLElement>('h1, [data-motion-heading]');
      const copy = hero.querySelectorAll<HTMLElement>('[data-motion-copy], .lede, .page-hero__copy > p');
      const timeline = gsap.timeline({ defaults: { ease: motionTokens.ease.major } });

      if (eyebrow) {
        gsap.set(eyebrow, { autoAlpha: 0, x: mobile ? 0 : -12 });
        timeline.to(eyebrow, { autoAlpha: 1, x: 0, duration: motionTokens.duration.ui }, 0.05);
      }
      if (heading) {
        const tween = revealLineMask(gsap, heading, {
          duration: mobile ? 0.75 : motionTokens.duration.hero,
          stagger: motionTokens.stagger.tight,
        });
        if (tween) timeline.add(tween, 0.12);
      }
      const rule = hero.querySelector<HTMLElement>('[data-motion-line]');
      if (rule) {
        gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' });
        timeline.to(rule, { scaleX: 1, duration: 0.65, ease: motionTokens.ease.reveal }, '-=0.55');
      }
      if (copy.length) {
        timeline.add(fadeRise(gsap, copy, {
          duration: mobile ? 0.55 : 0.7,
          stagger: 0.08,
          y: mobile ? 12 : 20,
        })!, '-=0.45');
      }

      const heroMedia = hero.querySelectorAll<HTMLElement>('[data-motion-media]');
      heroMedia.forEach((node, index) => {
        const dirAttr = node.dataset.motionDir as 'left' | 'right' | 'up' | undefined;
        const tween = curtainImage(gsap, node, mobile ? 'up' : (dirAttr ?? 'right'), {
          duration: mobile ? 0.7 : motionTokens.duration.image,
        });
        if (tween) timeline.add(tween, index === 0 ? '-=0.55' : '-=0.5');
      });
    });

    // Section groups
    scope.querySelectorAll<HTMLElement>('[data-motion="section"]').forEach((section, sectionIndex) => {
      const heading = section.querySelector<HTMLElement>('[data-motion-heading], .section-heading h2');
      const eyebrow = section.querySelector<HTMLElement>('.section-heading .eyebrow, [data-motion-eyebrow]');
      const line = section.querySelectorAll<HTMLElement>('[data-motion-line]');
      const items = [...section.querySelectorAll<HTMLElement>('[data-motion-item]')].filter(
        (el) => !el.querySelector('[data-motion-media]'),
      );
      const media = section.querySelectorAll<HTMLElement>('[data-motion-media]');
      const copy = section.querySelectorAll<HTMLElement>('[data-motion-copy]');
      const directions = ['right', 'left', 'up'] as const;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: mobile ? 'top 88%' : 'top 78%',
          once: true,
        },
        defaults: { ease: motionTokens.ease.reveal },
      });

      if (eyebrow) {
        gsap.set(eyebrow, { autoAlpha: 0, x: -10 });
        timeline.to(eyebrow, { autoAlpha: 1, x: 0, duration: motionTokens.duration.ui }, 0);
      }

      if (heading) {
        const tween = revealLineMask(gsap, heading, {
          duration: mobile ? 0.65 : motionTokens.duration.reveal,
        });
        if (tween) timeline.add(tween, 0.05);
      }

      if (line.length) {
        line.forEach((node, index) => {
          const axis = node.dataset.motionAxis === 'y' ? 'y' : 'x';
          timeline.add(drawLine(gsap, node, axis, { duration: 0.7 })!, index === 0 ? '-=0.35' : '-=0.5');
        });
      }

      if (copy.length) {
        timeline.add(fadeRise(gsap, copy, {
          duration: 0.6,
          stagger: 0.06,
          y: mobile ? 12 : 18,
        })!, '-=0.3');
      }

      media.forEach((node, index) => {
        const dirAttr = node.dataset.motionDir as 'left' | 'right' | 'up' | undefined;
        const direction = dirAttr ?? directions[(sectionIndex + index) % directions.length];
        const tween = curtainImage(gsap, node, mobile ? 'up' : direction, {
          duration: mobile ? 0.65 : motionTokens.duration.image,
        });
        if (tween) timeline.add(tween, index === 0 ? '-=0.2' : `-=${mobile ? 0.45 : 0.55}`);
      });

      if (items.length) {
        timeline.add(fadeRise(gsap, items, {
          duration: mobile ? 0.5 : 0.65,
          stagger: mobile ? 0.05 : motionTokens.stagger.standard,
          y: mobile ? 14 : 22,
        })!, media.length ? '-=0.45' : '-=0.25');
      }

      // Card bodies that sit under curtain media (pillars, journal, references)
      const mediaCards = [...section.querySelectorAll<HTMLElement>('[data-motion-item]')].filter(
        (el) => el.querySelector('[data-motion-media]'),
      );
      if (mediaCards.length) {
        const bodies = mediaCards
          .map((card) => card.querySelector<HTMLElement>('[data-motion-body], .pillar-card__body, .reference-card__body, .journal-preview-card__body, .home-reference-card__body'))
          .filter((node): node is HTMLElement => Boolean(node));
        if (bodies.length) {
          timeline.add(fadeRise(gsap, bodies, {
            duration: mobile ? 0.5 : 0.6,
            stagger: mobile ? 0.06 : motionTokens.stagger.standard,
            y: mobile ? 12 : 18,
          })!, '-=0.4');
        }
      }
    });
  }, { scope: root, dependencies: [reduced] });

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
