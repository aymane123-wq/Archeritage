import type { Metadata } from 'next';

import { ContactCTA } from '@/components/sections/ContactCTA';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { ProjectsHero } from '@/components/sections/ProjectsHero';
import { createMetadata } from '@/lib/seo';
import { projects } from '@/data/projects';
import type { ProjectCategory } from '@/types';

type ProjectsPageProps = {
  searchParams?: Promise<{ category?: string }>;
};

export const metadata: Metadata = createMetadata({
  title: 'Projets | ARCHERITAGE',
  description: 'Une sélection de projets résidentiels, commerciaux, intérieurs et d’équipements.',
  path: '/projets',
});

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeCategory = (resolvedSearchParams?.category as ProjectCategory | undefined) ?? 'all';
  const filteredProjects = activeCategory === 'all' ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <ProjectsHero />
      <ProjectsGrid projects={filteredProjects} activeCategory={activeCategory} />
      <ContactCTA title="Vous avez un projet à structurer ?" />
    </>
  );
}
