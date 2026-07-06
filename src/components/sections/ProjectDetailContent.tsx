import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

type ProjectDetailContentProps = {
  project: Project;
};

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <SectionLabel label="Projet" title="Une écriture architecturale sobre, précise et habitée." />
            <div className="article mt-6 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              <p>{project.description}</p>
              <p>
                Le projet a été conduit avec une attention particulière portée au rythme des espaces, au rapport entre lumière naturelle et artificielle, ainsi qu’au confort des usages.
              </p>
            </div>
          </div>
          <div className="grid gap-4 rounded-[1.75rem] border border-[var(--border)] bg-white/[0.02] p-6 text-sm leading-7 text-[var(--muted)]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Localisation</p>
              <p className="mt-2 text-[var(--foreground)]">{project.location}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Année</p>
              <p className="mt-2 text-[var(--foreground)]">{project.year}</p>
            </div>
            {project.surface ? (
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Surface</p>
                <p className="mt-2 text-[var(--foreground)]">{project.surface}</p>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="grid gap-4 md:grid-cols-2">
          <Link href={`/projets/${previousProject.slug}`} className="rounded-[1.5rem] border border-[var(--border)] p-6 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Projet précédent</p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{previousProject.title}</p>
          </Link>
          <Link href={`/projets/${nextProject.slug}`} className="rounded-[1.5rem] border border-[var(--border)] p-6 text-right transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Projet suivant</p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{nextProject.title}</p>
          </Link>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionLabel label="Galerie" title="Des images qui racontent le projet dans sa continuité." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {project.gallery.map((image, index) => (
              <ImageReveal key={image} src={image} alt={`${project.title} - image ${index + 1}`} className="aspect-[4/3]" fallbackLabel={project.title} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
