"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { ContactPhoneIcon } from '@/components/ui/ContactPhoneIcon';
import { Container } from '@/components/ui/Container';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const direction = useScrollDirection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn('site-header', direction === 'down' && !mobileOpen && 'site-header--hidden', scrolled && 'site-header--scrolled')}>
      <Container className={cn('flex items-center justify-between gap-6 transition-[height] duration-300', scrolled ? 'h-[4.25rem] lg:h-[4.75rem]' : 'h-[4.75rem] lg:h-[5.5rem]')}>
        <Link href="/" aria-label="Retour à l’accueil" className="site-logo">
          <span>ARCHERITAGE</span>
        </Link>

        <DesktopNav />

        <Link
          href="/contact"
          aria-label="Contactez-nous"
          className="header-contact"
        >
          <span>CONTACTEZ-NOUS</span>
          <ContactPhoneIcon className="h-5 w-5" />
        </Link>

        <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
      </Container>
    </header>
  );
}
