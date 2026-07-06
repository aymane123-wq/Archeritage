import { Container } from '@/components/ui/Container';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function MissionContent() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <SectionLabel label="Philosophie" title="Créer des lieux clairs, sensibles et intemporels." />
          <Reveal>
            <div className="space-y-6 text-sm leading-7 text-[var(--muted)] sm:text-base">
              <p>
                Notre démarche fusionne créativité, précision technique et sens du contexte. Chaque volume est pensé comme une réponse juste à un usage réel.
              </p>
              <p>
                Nous recherchons des architectures sobres, robustes et élégantes, où les matières nobles, la lumière et les détails dessinent une expérience durable.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-6">
          <ImageReveal src="/images/mission/studio-02.webp" alt="Atelier ARCHERITAGE" className="aspect-[5/4]" fallbackLabel="Mission interior placeholder" />
          <Reveal>
            <p className="rounded-[1.5rem] border border-[var(--border)] bg-white/[0.02] p-6 text-sm leading-7 text-[var(--muted)]">
              Nous travaillons l’architecture comme un ensemble cohérent: une structure, une atmosphère, un mobilier, une image. Le résultat doit être lisible immédiatement et rester pertinent dans le temps.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
