import { cn } from '@/lib/utils';
import type { Stat } from '@/types';

type StatItemProps = {
  stat: Stat;
  className?: string;
};

export function StatItem({ stat, className }: StatItemProps) {
  return (
    <div className={cn('rounded-[1.5rem] border border-[var(--border)] bg-white/3 p-6', className)} data-card>
      <p className="text-4xl font-semibold tracking-[-0.04em] text-[var(--light)] sm:text-5xl">{stat.value}</p>
      <p className="mt-3 text-sm uppercase tracking-[0.28em] text-[var(--accent)]">{stat.label}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{stat.detail}</p>
    </div>
  );
}
