import type { Metadata } from 'next';

import { ContactCTA } from '@/components/sections/ContactCTA';
import { MissionContent } from '@/components/sections/MissionContent';
import { MissionHero } from '@/components/sections/MissionHero';
import { StatsSection } from '@/components/sections/StatsSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { stats } from '@/data/stats';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Mission | ARCHERITAGE',
  description: 'Notre vision, notre méthode et l’équipe qui porte les projets ARCHERITAGE.',
  path: '/mission',
});

export default function MissionPage() {
  return (
    <>
      <MissionHero />
      <MissionContent />
      <StatsSection items={stats} title="Des repères solides dans chaque projet" label="Impact" />
      <TeamSection />
      <ValuesSection />
      <ContactCTA title="Construisons une architecture qui dure." />
    </>
  );
}
