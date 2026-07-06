"use client";

import { useLenis } from '@/hooks/useLenis';

import { Footer } from './Footer';
import { Header } from './Header';
import { PageTransition } from './PageTransition';

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  useLenis();

  return (
    <>
      <Header />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
