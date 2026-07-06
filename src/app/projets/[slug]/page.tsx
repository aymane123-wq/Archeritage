import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactCTA } from '@/components/sections/ContactCTA';
import { ProjectDetailContent } from '@/components/sections/ProjectDetailContent';
import { ProjectDetailHero } from '@/components/sections/ProjectDetailHero';
import { projects } from '@/data/projects';
import { createMetadata } from '@/lib/seo';

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return createMetadata({ title: 'Projet introuvable', description: 'Le projet demandé est introuvable.', path: '/projets' });
  }

  return createMetadata({
    title: `${project.title} | ARCHERITAGE`,
    description: project.excerpt,
    path: `/projets/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectDetailContent project={project} />
      <ContactCTA title="Un projet à imaginer ensemble ?" />
    </>
  );
}
