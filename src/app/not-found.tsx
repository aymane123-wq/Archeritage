import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-28 sm:pt-32 lg:pt-36">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">404</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-[var(--light)] sm:text-6xl">La page demandée est introuvable.</h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
          Le lien peut avoir changé ou la ressource n’existe plus. Retournez à l’accueil pour reprendre la navigation.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/">Retour à l’accueil</Button>
          <Link href="/contact" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
            Contactez-nous
          </Link>
        </div>
      </Container>
    </section>
  );
}
