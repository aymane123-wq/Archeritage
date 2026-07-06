import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';

import './globals.css';

import { SiteChrome } from '@/components/layout/SiteChrome';
import { site } from '@/data/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${display.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
