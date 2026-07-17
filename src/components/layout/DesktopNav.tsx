'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteRoutes as navigation } from '@/content/site/navigation';
import { cn } from '@/lib/utils';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="desktop-nav" aria-label="Navigation principale">
      {navigation.filter((item) => item.href !== '/contact').map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link key={item.href} href={item.href} className={cn(isActive && 'is-active')} aria-current={isActive ? 'page' : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
