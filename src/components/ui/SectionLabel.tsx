import { cn } from '@/lib/utils';

type SectionLabelProps = {
  label: string;
  title?: string;
  className?: string;
};

export function SectionLabel({ label, title, className }: SectionLabelProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">{label}</p>
      {title ? <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl lg:text-5xl">{title}</h2> : null}
    </div>
  );
}
