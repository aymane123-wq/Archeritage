import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';

const values = [
  { title: 'Précision', text: 'Des décisions nettes, des détails clairs et une exécution maîtrisée.' },
  { title: 'Sobriété', text: 'Un langage visuel élégant, sans surcharge ni effet décoratif gratuit.' },
  { title: 'Durabilité', text: 'Des matières et des solutions pensées pour durer dans le temps.' },
  { title: 'Cohérence', text: 'Une continuité entre architecture, intérieur et identité du projet.' },
];

export function ValuesSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionLabel label="Valeurs" title="Une méthode de travail simple, claire et exigeante." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <article key={value.title} className="rounded-[1.5rem] border border-[var(--border)] bg-white/[0.02] p-6" data-card>
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">{value.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{value.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
