import { Container } from './Container';

type PageHeroProps = { eyebrow: string; title: string; introduction: string; supporting?: string };

export function PageHero({ eyebrow, title, introduction, supporting }: PageHeroProps) {
  return <header className="page-hero"><Container><div className="page-hero__heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><div className="page-hero__copy"><p className="lede">{introduction}</p>{supporting ? <p>{supporting}</p> : null}</div></Container></header>;
}
