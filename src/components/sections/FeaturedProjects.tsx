import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { projects } from '@/data/projects';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { Reveal } from '@/components/ui/Reveal';

export function FeaturedProjects() {
  return (
    <section className="bg-white/[0.015] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <SectionMarker className="hidden sm:inline-flex" />
            <SectionLabel label="Sélection" title="Nos projets récents" />
          </div>
          <Button href="/projets" variant="secondary">
            Voir tout <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {projects.slice(0, 4).map((project) => (
            <Reveal key={project.slug} direction="up" stagger={0}>
              <ProjectCard project={project} variant="featured" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
