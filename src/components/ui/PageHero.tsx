import { Container } from './Container';

type PageHeroProps = { eyebrow: string; title: string; introduction: string; supporting?: string };

export function PageHero({ eyebrow, title, introduction, supporting }: PageHeroProps) {
  return (
    <header className="page-hero" data-motion="hero">
      <Container>
        <div className="page-hero__heading">
          <p className="eyebrow" data-motion-eyebrow>{eyebrow}</p>
          <h1 data-motion-heading>{title}</h1>
          <span className="page-hero__rule" data-motion-line aria-hidden="true" />
        </div>
        <div className="page-hero__copy">
          <p className="lede" data-motion-copy>{introduction}</p>
          {supporting ? <p data-motion-copy>{supporting}</p> : null}
        </div>
      </Container>
    </header>
  );
}
