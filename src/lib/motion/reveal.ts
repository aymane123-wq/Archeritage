import type { gsap as GsapType } from 'gsap';
import { motionTokens } from './tokens';
import { isMobileViewport } from './prefers';

type TweenTarget = gsap.TweenTarget;

export function prepareLineMask(element: HTMLElement) {
  if (element.dataset.lineMasked === 'true') return;

  const fullText = element.textContent?.trim() ?? '';
  if (!fullText) return;

  element.setAttribute('aria-label', fullText);
  const parts = fullText.includes('. ')
    ? fullText.split(/(?<=\.)\s+/).filter(Boolean)
    : [fullText];

  // On mobile with many wraps, keep a single mask for readability.
  const useSingle = isMobileViewport() && parts.length > 2;
  const lines = useSingle ? [fullText] : parts;

  element.textContent = '';
  element.classList.add('line-mask');

  for (const part of lines) {
    const line = document.createElement('span');
    line.className = 'line-mask__line';
    line.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.className = 'line-mask__inner';
    inner.textContent = part;
    line.appendChild(inner);
    element.appendChild(line);
  }

  element.dataset.lineMasked = 'true';
}

export function revealLineMask(
  gsap: typeof GsapType,
  element: HTMLElement,
  options: { duration?: number; stagger?: number; delay?: number } = {},
) {
  prepareLineMask(element);
  const inners = element.querySelectorAll<HTMLElement>('.line-mask__inner');
  if (!inners.length) return null;

  gsap.set(inners, { yPercent: 105, opacity: 0.2 });
  return gsap.to(inners, {
    yPercent: 0,
    opacity: 1,
    duration: options.duration ?? motionTokens.duration.hero,
    stagger: options.stagger ?? motionTokens.stagger.tight,
    delay: options.delay ?? 0,
    ease: motionTokens.ease.major,
  });
}

export function drawLine(
  gsap: typeof GsapType,
  element: TweenTarget,
  axis: 'x' | 'y' = 'x',
  options: { duration?: number; delay?: number } = {},
) {
  const from = axis === 'x' ? { scaleX: 0 } : { scaleY: 0 };
  const to = axis === 'x' ? { scaleX: 1 } : { scaleY: 1 };
  gsap.set(element, {
    ...from,
    transformOrigin: axis === 'x' ? 'left center' : 'top center',
  });
  return gsap.to(element, {
    ...to,
    duration: options.duration ?? motionTokens.duration.reveal,
    delay: options.delay ?? 0,
    ease: motionTokens.ease.reveal,
  });
}

export function curtainImage(
  gsap: typeof GsapType,
  media: HTMLElement,
  direction: 'left' | 'right' | 'up' = 'up',
  options: { duration?: number; delay?: number; reduced?: boolean } = {},
) {
  const image = media.querySelector('img') ?? media;
  const clips = {
    up: 'inset(100% 0 0 0)',
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
  } as const;

  if (options.reduced) {
    gsap.set([media, image], { clearProps: 'all', opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0)' });
    return null;
  }

  const mobile = isMobileViewport();
  gsap.set(media, { clipPath: clips[direction], autoAlpha: 1 });
  gsap.set(image, { scale: mobile ? 1.02 : motionTokens.imageScale });

  const timeline = gsap.timeline({ delay: options.delay ?? 0 });
  timeline.to(media, {
    clipPath: 'inset(0 0 0 0)',
    duration: options.duration ?? (mobile ? 0.7 : motionTokens.duration.image),
    ease: motionTokens.ease.major,
  });
  timeline.to(image, {
    scale: 1,
    duration: (options.duration ?? motionTokens.duration.image) + 0.12,
    ease: motionTokens.ease.reveal,
  }, '<');
  return timeline;
}

export function fadeRise(
  gsap: typeof GsapType,
  targets: TweenTarget,
  options: { duration?: number; stagger?: number; delay?: number; y?: number } = {},
) {
  const y = options.y ?? (isMobileViewport() ? motionTokens.distance.mobile : motionTokens.distance.desktop);
  gsap.set(targets, { autoAlpha: 0, y });
  return gsap.to(targets, {
    autoAlpha: 1,
    y: 0,
    duration: options.duration ?? (isMobileViewport() ? 0.55 : motionTokens.duration.reveal),
    stagger: options.stagger ?? 0,
    delay: options.delay ?? 0,
    ease: motionTokens.ease.reveal,
  });
}
