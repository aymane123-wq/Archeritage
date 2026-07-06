import { Container } from '@/components/ui/Container';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { team } from '@/data/team';

export function TeamSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionLabel label="L’Atelier" title="Une équipe pluridisciplinaire unie par l’exigence." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <article key={member.name} className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white/[0.02]" data-card>
              <ImageReveal src={member.image} alt={member.name} className="aspect-[3/4] rounded-none border-0" fallbackLabel={member.name} />
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">{member.role}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{member.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
