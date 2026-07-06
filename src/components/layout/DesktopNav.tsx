"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { navigation } from '@/data/navigation';
import { DropdownMenu } from './DropdownMenu';

export function DesktopNav() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
      {navigation.map((item, index) => {
        if (item.children?.length) {
          return (
            <div key={item.href} onMouseLeave={() => setOpenIndex(null)} onMouseEnter={() => setOpenIndex(index)}>
              <DropdownMenu item={item} open={openIndex === index} onOpenChange={(open) => setOpenIndex(open ? index : null)} currentPath={pathname} />
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm transition-colors hover:text-[var(--accent)]',
              pathname === item.href ? 'text-[var(--accent)]' : 'text-[var(--foreground)]',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
