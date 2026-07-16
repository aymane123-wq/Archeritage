import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="not-found">
      <Container>
        <p className="eyebrow">Erreur 404</p>
        <h1>La page demandée est introuvable.</h1>
        <p>
          Le lien peut avoir changé ou la ressource n’existe plus. Retournez à l’accueil pour reprendre la navigation.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/">Retour à l’accueil</Button>
          <Button href="/contact" variant="secondary">Contactez-nous</Button>
        </div>
      </Container>
    </section>
  );
}
