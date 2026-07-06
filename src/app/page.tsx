import type { Metadata } from 'next';

import { BlogPreview } from '@/components/sections/BlogPreview';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { HomeHero } from '@/components/sections/HomeHero';
import { MissionPreview } from '@/components/sections/MissionPreview';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { StatsSection } from '@/components/sections/StatsSection';
import { stats } from '@/data/stats';
import { createMetadata } from '@/lib/seo';
import { site } from '@/data/site';

export const metadata: Metadata = createMetadata({
  title: 'ARCHERITAGE | Architecture, intérieur et identité',
  description: site.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <MissionPreview />
      <StatsSection items={stats} />
      <ServicesOverview />
      <FeaturedProjects />
      <ProcessSection intro="Une méthode rigoureuse pour faire passer une intention en espace construit." />
      <BlogPreview />
      <ContactCTA />
    </>
  );
}
