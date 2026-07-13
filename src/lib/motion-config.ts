export const motion = {
  duration: { fast: 0.45, standard: 0.85, slow: 1.2, cinematic: 1.5 },
  stagger: { small: 0.06, standard: 0.1, large: 0.16 },
  ease: { standard: 'power3.out', strong: 'power4.out', cinematic: 'expo.out', inOut: 'power2.inOut' },
  breakpoint: { desktop: 1024, finePointer: '(pointer: fine)' },
} as const;
