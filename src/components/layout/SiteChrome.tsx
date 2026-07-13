"use client";

import { AnimationProvider } from '@/components/motion/AnimationProvider';
import { Footer } from './Footer';
import { Header } from './Header';
import { PageTransition } from './PageTransition';

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  return (
    <AnimationProvider>
      <Header />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </AnimationProvider>
  );
}
