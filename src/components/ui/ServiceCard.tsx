import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { SafeImage } from './SafeImage';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

type ServiceCardProps = {
  service: Service;
  className?: string;
  variant?: 'default' | 'featured';
};

export function ServiceCard({ service, className, variant = 'default' }: ServiceCardProps) {
  return (
    <article className={cn('group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(245,240,232,0.03),rgba(245,240,232,0.01))] transition-colors duration-300 hover:border-[var(--accent)]', className)} data-card>
      <Link href={`/services/${service.slug}`} className="block h-full">
        <div className={cn('relative overflow-hidden', variant === 'featured' ? 'aspect-[4/3]' : 'aspect-[16/10]')}>
          <SafeImage src={service.image} alt={service.altText} fallbackLabel={service.title} className="h-full w-full rounded-none border-0 transition-transform duration-700 group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,12,0.8)] via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/25 text-sm font-semibold text-[var(--light)] backdrop-blur-sm">
            {service.eyebrow}
          </div>
        </div>
        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">{service.icon}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)] transition-transform duration-500 group-hover:-translate-y-0.5">{service.title}</h3>
            </div>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
          </div>
          <p className="text-sm leading-7 text-[var(--muted)]">{service.description}</p>
          <p className="inline-flex items-center gap-2 text-sm text-[var(--accent)]">
            Découvrir
            <span className="h-px w-8 bg-[var(--accent)] transition-all duration-300 group-hover:w-12" />
          </p>
        </div>
      </Link>
    </article>
  );
}
