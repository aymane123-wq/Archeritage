import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactCTA } from '@/components/sections/ContactCTA';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServiceDetailContent } from '@/components/sections/ServiceDetailContent';
import { ServiceDetailHero } from '@/components/sections/ServiceDetailHero';
import { services } from '@/data/services';
import { createMetadata } from '@/lib/seo';

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return createMetadata({ title: 'Service introuvable', description: 'Le service demandé est introuvable.', path: '/services' });
  }

  return createMetadata({
    title: `${service.title} | ARCHERITAGE`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceDetailContent service={service} />
      <ProcessSection title="Le même fil conducteur pour chaque service" />
      <ContactCTA title="Parlons de votre service et de son cadrage." />
    </>
  );
}
