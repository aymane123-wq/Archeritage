import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { processSteps } from '@/data/process';
import { projects } from '@/data/projects';
import type { Service } from '@/types';

type ServiceDetailContentProps = {
  service: Service;
};

export function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const relatedProjects = projects.filter((project) => service.relatedProjectSlugs.includes(project.slug));

  return (
    <>
      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionLabel label="Approche" title="Une méthode claire pour faire avancer chaque projet." />
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">{service.description}</p>
          </div>
          <div className="grid gap-5 rounded-[1.75rem] border border-[var(--border)] bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Bénéfices clés</h2>
            <ul className="grid gap-4 text-sm leading-7 text-[var(--muted)]">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionLabel label="Processus lié" title="Les étapes appliquées à ce service." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step) => (
              <article key={step.number} className="rounded-[1.5rem] border border-[var(--border)] bg-white/[0.02] p-5" data-card>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">{step.number}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {relatedProjects.length ? (
        <section className="py-20 sm:py-24 lg:py-28">
          <Container>
            <SectionLabel label="Réalisations" title="Projets associés à cette expertise." />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="flex flex-wrap gap-4">
          <Link href="/projets" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
            Voir les projets
          </Link>
          <Link href="/contact" className="rounded-full bg-[var(--light)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-colors hover:bg-[var(--accent)]">
            Nous contacter
          </Link>
        </Container>
      </section>
    </>
  );
}
