import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

import './globals.css';

import { SiteChrome } from '@/components/layout/SiteChrome';
import { site } from '@/data/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.brand,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  openGraph: {
    title: site.brand,
    description: site.description,
    url: site.url,
    siteName: site.brand,
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/images/hero/hero-architecture-publique.jpg', width: 2400, height: 1350, alt: 'ARCHERITAGE' }],
  },
  twitter: { card: 'summary_large_image', title: site.brand, description: site.description, images: ['/images/hero/hero-architecture-publique.jpg'] },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${display.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <a className="skip-link" href="#main-content">Aller au contenu</a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
