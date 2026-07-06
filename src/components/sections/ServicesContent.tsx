import { Container } from '@/components/ui/Container';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { services } from '@/data/services';

export function ServicesContent() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container>
        <SectionLabel label="Services" title="Des offres claires, liées à chaque phase du projet." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
