import type { Metadata } from 'next';

import { site } from '@/data/site';

export function createMetadata(options: { title: string; description: string; path?: string }): Metadata {
  const url = options.path ? `${site.url}${options.path}` : site.url;

  return {
    title: options.title,
    description: options.description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: site.brand,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
    },
  };
}
