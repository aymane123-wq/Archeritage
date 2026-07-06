import Link from 'next/link';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--light)] text-[var(--background)] hover:bg-[var(--accent)]',
  secondary: 'border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  ghost: 'bg-transparent text-[var(--foreground)] hover:bg-white/5',
  link: 'bg-transparent px-0 py-0 text-[var(--accent)] underline-offset-4 hover:underline',
};

export function Button({ href, children, variant = 'primary', className, onClick, type = 'button' }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
