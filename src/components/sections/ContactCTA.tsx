import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

type ContactCTAProps = {
  title?: string;
  subtitle?: string;
};

export function ContactCTA({ title = 'Prêt à collaborer sur votre prochain espace ?', subtitle = 'Nous prenons le temps de cadrer le projet pour proposer une réponse architecturale précise, élégante et durable.' }: ContactCTAProps) {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(245,240,232,0.08),rgba(200,169,106,0.05))] p-8 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <SectionLabel label="Contact" title={title} />
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)]">{subtitle}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Démarrer votre projet <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/projets" variant="secondary">
              Voir les projets
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
