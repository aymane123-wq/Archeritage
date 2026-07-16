'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteRoutes as navigation } from '@/content/site/navigation';
import { cn } from '@/lib/utils';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="desktop-nav" aria-label="Navigation principale">
      {navigation.filter((item) => item.href !== '/contact').map((item) => (
        <Link key={item.href} href={item.href} className={cn(pathname === item.href && 'is-active')}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
