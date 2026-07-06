"use client";

import { useState } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  fallbackLabel?: string;
};

export function SafeImage({ src, alt, className, sizes, priority, fill = true, width, height, fallbackLabel }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const fallbackContent = (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(245,240,232,0.08),rgba(200,169,106,0.1)),#11110f]">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(245,240,232,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,240,232,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-70" />
      <div className="absolute inset-0 flex items-end p-5">
        <div className="max-w-[18rem]">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--accent)]">{fallbackLabel ?? 'Image d’architecture'}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{alt}</p>
        </div>
      </div>
    </div>
  );

  if (hasError || !src) {
    return <div className={cn('relative h-full w-full overflow-hidden rounded-[1.75rem] bg-[#11110f]', className)}>{fallbackContent}</div>;
  }

  return fill ? (
    <div className={cn('relative h-full w-full overflow-hidden rounded-[1.75rem] bg-[#11110f]', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  ) : (
    <div className={cn('relative overflow-hidden rounded-[1.75rem] bg-[#11110f]', className)}>
      <Image
        src={src}
        alt={alt}
        width={width ?? 1600}
        height={height ?? 1200}
        priority={priority}
        sizes={sizes}
        className="h-full w-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
