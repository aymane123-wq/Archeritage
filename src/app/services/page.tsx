import type { Metadata } from 'next';

import { ContactCTA } from '@/components/sections/ContactCTA';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesContent } from '@/components/sections/ServicesContent';
import { ServicesHero } from '@/components/sections/ServicesHero';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Services | ARCHERITAGE',
  description: 'Conception architecturale, réalisation, design intérieur et branding pour projets premium.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesContent />
      <ProcessSection />
      <ContactCTA title="Discutons de votre programme et de ses contraintes." />
    </>
  );
}
