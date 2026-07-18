export const motionTokens = {
  duration: {
    ui: 0.24,
    reveal: 0.75,
    image: 0.95,
    hero: 1.05,
  },
  stagger: {
    tight: 0.07,
    standard: 0.09,
    loose: 0.11,
  },
  ease: {
    ui: 'power2.out',
    reveal: 'power2.out',
    major: 'power3.out',
    crossfade: 'power2.inOut',
  },
  distance: {
    desktop: 28,
    mobile: 16,
  },
  imageScale: 1.04,
  slideScale: 1.025,
} as const;

/** @deprecated Prefer motionTokens — kept for legacy motion modules */
export const motion = {
  duration: {
    fast: motionTokens.duration.ui,
    standard: motionTokens.duration.reveal,
    slow: motionTokens.duration.image,
    cinematic: motionTokens.duration.hero,
  },
  stagger: {
    small: motionTokens.stagger.tight,
    standard: motionTokens.stagger.standard,
    large: motionTokens.stagger.loose,
  },
  ease: {
    standard: motionTokens.ease.major,
    strong: 'power4.out',
    cinematic: motionTokens.ease.major,
    inOut: motionTokens.ease.crossfade,
  },
  breakpoint: { desktop: 1024, finePointer: '(pointer: fine)' },
} as const;
