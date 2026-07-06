import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { services } from '@/data/services';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { Reveal } from '@/components/ui/Reveal';

export function ServicesOverview() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <SectionMarker className="hidden sm:inline-flex" />
            <SectionLabel label="Expertise" title="Nos domaines d’intervention" />
          </div>
          <Button href="/services" variant="secondary">
            Tous les services <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.slug} direction="up" delay={index * 0.06}>
              <ServiceCard service={service} variant="featured" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
