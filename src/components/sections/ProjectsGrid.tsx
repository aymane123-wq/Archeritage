import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils';
import type { Project, ProjectCategory } from '@/types';

const filters: Array<{ label: string; value: ProjectCategory | 'all' }> = [
  { label: 'Tous', value: 'all' },
  { label: 'Habitat', value: 'habitat' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Intérieurs', value: 'interieurs' },
  { label: 'Équipements', value: 'equipements' },
];

type ProjectsGridProps = {
  projects: Project[];
  activeCategory: ProjectCategory | 'all';
};

export function ProjectsGrid({ projects, activeCategory }: ProjectsGridProps) {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <Link
              key={filter.value}
              href={filter.value === 'all' ? '/projets' : `/projets?category=${filter.value}`}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                activeCategory === filter.value
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]'
                  : 'border-[var(--border)] bg-transparent text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
              )}
            >
              {filter.label}
            </Link>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
