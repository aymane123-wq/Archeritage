"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';

import { siteRoutes as navigation } from '@/content/site/navigation';
import { ContactPhoneIcon } from '@/components/ui/ContactPhoneIcon';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousOpenRef = useRef(false);
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      onOpenChange(false);
    }
  }, [onOpenChange, pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1180px)');
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onOpenChange(false);
      }
    };

    desktopQuery.addEventListener('change', handleBreakpointChange);
    return () => desktopQuery.removeEventListener('change', handleBreakpointChange);
  }, [onOpenChange]);

  useEffect(() => {
    const wasOpen = previousOpenRef.current;
    previousOpenRef.current = open;

    if (open) {
      const animationFrame = window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return () => window.cancelAnimationFrame(animationFrame);
    }

    if (wasOpen) {
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstElement || !panelRef.current.contains(activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (activeElement === lastElement || !panelRef.current.contains(activeElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange, open]);

  useGSAP(
    () => {
      registerGsapPlugins();

      if (!panelRef.current) {
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(panelRef.current, { xPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(panelRef.current, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' });
    },
    { dependencies: [open] },
  );

  return (
    <div className="mobile-nav-trigger">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[0.55rem] border border-current bg-black/20 text-inherit backdrop-blur-sm"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        aria-controls={open ? 'mobile-navigation' : undefined}
        onClick={() => onOpenChange(!open)}
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation principale"
          tabIndex={-1}
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[rgba(10,10,9,0.98)] px-5 py-6 text-white opacity-0"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[rgba(10,10,9,0.98)] pb-4">
            <Link href="/" aria-label="Retour à l’accueil" className="text-base font-semibold tracking-[0.32em] text-white" onClick={() => onOpenChange(false)}>
              ARCHERITAGE
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[0.55rem] border border-[var(--border)] text-white"
              style={{ color: 'white' }}
              onClick={() => onOpenChange(false)}
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-8 grid border-t border-[var(--border)]" aria-label="Navigation mobile">
            {navigation.filter((item) => item.href !== '/contact').map((item, index) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <div key={item.href} className="border-b border-[var(--border)]">
                  <Link
                    href={item.href}
                    className={cn('group flex items-center justify-between py-4', isActive ? 'text-[var(--color-sand)]' : 'text-white')}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => onOpenChange(false)}
                  >
                    <span className="text-[10px] tracking-[.2em] text-[var(--color-sand)]">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-right text-[clamp(1.7rem,8vw,2.6rem)] font-medium tracking-[-0.035em] transition-transform group-hover:-translate-x-2">{item.label}</span>
                  </Link>
                </div>
              );
            })}
          </nav>
          <Link
            href="/contact"
            aria-label="Contactez-nous"
            aria-current={pathname === '/contact' ? 'page' : undefined}
            className="button button--primary mt-8 w-full"
            onClick={() => onOpenChange(false)}
          >
            <span>CONTACTEZ-NOUS</span>
            <ContactPhoneIcon className="h-5 w-5" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
