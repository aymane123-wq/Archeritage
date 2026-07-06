"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';

import { navigation } from '@/data/navigation';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useGSAP(
    () => {
      registerGsapPlugins();

      if (!panelRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.fromTo(panelRef.current, { xPercent: 100, opacity: 0 }, { xPercent: open ? 0 : 100, opacity: open ? 1 : 0, duration: 0.55, ease: 'power3.out' });
    },
    { dependencies: [open], scope: panelRef },
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)]"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        ref={panelRef}
        className={cn(
          'fixed inset-0 z-50 bg-[rgba(10,10,9,0.98)] px-5 py-6 opacity-0',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <Link href="/" className="text-base font-semibold tracking-[0.32em] text-[var(--foreground)]" onClick={() => onOpenChange(false)}>
            ARCHERITAGE
          </Link>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)]" onClick={() => onOpenChange(false)} aria-label="Fermer le menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 grid gap-6">
          {navigation.map((item) => (
            <div key={item.href} className="space-y-3 border-b border-[var(--border)] pb-5">
              <Link href={item.href} className={cn('block text-3xl font-semibold tracking-[-0.03em]', pathname === item.href ? 'text-[var(--accent)]' : 'text-[var(--foreground)]')} onClick={() => onOpenChange(false)}>
                {item.label}
              </Link>
              {item.children?.length ? (
                <div className="grid gap-2 pl-1">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]" onClick={() => onOpenChange(false)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          <Button href="/contact" variant="primary" className="w-full justify-center">
            Contactez-nous
          </Button>
          <p className="text-sm text-[var(--muted)]">contact@archeritage.studio</p>
        </div>
      </div>
    </div>
  );
}
