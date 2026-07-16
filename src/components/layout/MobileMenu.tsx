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
    <div className="mobile-nav-trigger">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[0.55rem] border border-current bg-black/20 text-inherit backdrop-blur-sm"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        ref={panelRef}
        className={cn(
          'fixed inset-0 z-50 bg-[rgba(10,10,9,0.98)] px-5 py-6 text-white opacity-0',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <Link href="/" aria-label="Retour à l’accueil" className="text-base font-semibold tracking-[0.32em] text-white" onClick={() => onOpenChange(false)}>
            ARCHERITAGE
          </Link>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-[0.55rem] border border-[var(--border)]" onClick={() => onOpenChange(false)} aria-label="Fermer le menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 grid border-t border-[var(--border)]">
          {navigation.filter((item) => item.href !== '/contact').map((item, index) => (
            <div key={item.href} className="border-b border-[var(--border)]">
              <Link href={item.href} className={cn('group flex items-center justify-between py-4', pathname === item.href ? 'text-[var(--color-sand)]' : 'text-white')} onClick={() => onOpenChange(false)}>
                <span className="text-[10px] tracking-[.2em] text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-right text-[clamp(1.7rem,8vw,2.6rem)] font-medium tracking-[-0.035em] transition-transform group-hover:-translate-x-2">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
        <Link
          href="/contact"
          aria-label="Contactez-nous"
          className="button button--primary mt-8 w-full"
          onClick={() => onOpenChange(false)}
        >
          <span>CONTACTEZ-NOUS</span>
          <ContactPhoneIcon className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
