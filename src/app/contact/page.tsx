import type { Metadata } from 'next';

import { ContactFormSection } from '@/components/sections/ContactFormSection';
import { ContactHero } from '@/components/sections/ContactHero';
import { Container } from '@/components/ui/Container';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contact | ARCHERITAGE',
  description: 'Parlez à l’équipe ARCHERITAGE de votre projet, de votre site et de vos ambitions.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <section className="py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white/[0.03]">
            <div className="flex min-h-[280px] items-center justify-center bg-[linear-gradient(135deg,rgba(245,240,232,0.08),rgba(200,169,106,0.08))] p-8 text-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Carte</p>
                <p className="mt-4 max-w-lg text-2xl font-semibold tracking-[-0.03em]">Emplacement du bureau à Rabat, Maroc</p>
                <p className="mt-3 text-sm text-[var(--muted)]">Remplacez ce bloc par une carte intégrée lorsque vous serez prêt à connecter le service choisi.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
