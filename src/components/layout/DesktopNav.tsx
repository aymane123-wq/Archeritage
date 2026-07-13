'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '@/data/navigation';
import { cn } from '@/lib/utils';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-2 lg:flex xl:gap-5" aria-label="Navigation principale">
      {navigation.filter((item) => item.href !== '/contact').map((item) => (
        <Link key={item.href} href={item.href} className={cn('relative py-2 text-[0.72rem] font-medium tracking-[0.04em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-[var(--accent)] after:transition-transform hover:text-[var(--accent)] xl:text-[0.78rem]', pathname === item.href ? 'text-[var(--accent)] after:scale-x-100' : 'text-[var(--foreground)] after:scale-x-0')}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
