"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn('fixed left-0 top-0 z-40 w-full transition-all duration-300', scrolled ? 'glass-panel border-b border-[var(--border)]' : 'bg-transparent')}>
      <Container className="flex h-20 items-center justify-between gap-4 lg:h-24">
        <Link href="/" className="flex flex-col leading-none text-[var(--foreground)]">
          <span className="text-xs uppercase tracking-[0.42em] text-[var(--accent)]">Studio</span>
          <span className="mt-1 text-lg font-semibold tracking-[0.32em]">ARCHERITAGE</span>
        </Link>

        <DesktopNav />

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact" variant={pathname === '/contact' ? 'secondary' : 'primary'}>
            Contactez-nous
          </Button>
        </div>

        <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
      </Container>
    </header>
  );
}
