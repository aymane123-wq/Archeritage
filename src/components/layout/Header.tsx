"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { ContactPhoneIcon } from '@/components/ui/ContactPhoneIcon';
import { Container } from '@/components/ui/Container';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const contactRef = useRef<HTMLAnchorElement | null>(null);
  const direction = useScrollDirection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn('fixed left-0 top-0 z-40 w-full transition-all duration-500', direction === 'down' && !mobileOpen ? '-translate-y-full' : 'translate-y-0', scrolled ? 'glass-panel border-b border-[var(--border)] shadow-[0_14px_50px_rgba(0,0,0,0.2)]' : 'bg-transparent')}>
      <Container className={cn('flex items-center justify-between gap-6 transition-[height] duration-300', scrolled ? 'h-[4.25rem] lg:h-[4.75rem]' : 'h-[4.75rem] lg:h-[5.5rem]')}>
        <Link href="/" aria-label="Retour à l’accueil" className="flex flex-col leading-none text-[var(--foreground)]">
          <span className="text-[0.95rem] font-semibold tracking-[0.24em] sm:text-base">ARCHERITAGE</span>
        </Link>

        <DesktopNav />

        <Link
          ref={contactRef}
          href="/contact"
          aria-label="Contactez-nous"
          className={cn(
            'group hidden h-11 min-w-[195px] shrink-0 items-center justify-center gap-3 rounded-full border border-white/25 px-5 text-[13px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-px hover:border-white/45 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C300] lg:inline-flex xl:h-12 xl:min-w-[220px] xl:px-6 xl:text-sm',
            scrolled ? 'bg-black/55 shadow-[0_10px_30px_rgba(0,0,0,0.2)]' : 'bg-black/25',
          )}
          onPointerMove={(event) => {
            if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            gsap.to(event.currentTarget, { x: (event.clientX - bounds.left - bounds.width / 2) * .05, y: (event.clientY - bounds.top - bounds.height / 2) * .1, duration: .35, ease: 'power3.out' });
          }}
          onPointerLeave={(event) => gsap.to(event.currentTarget, { x: 0, y: 0, duration: .55, ease: 'power3.out' })}
        >
          <span>CONTACTEZ-NOUS</span>
          <ContactPhoneIcon className="h-6 w-6 shrink-0 text-[#F2C300] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-3" />
        </Link>

        <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
      </Container>
    </header>
  );
}
