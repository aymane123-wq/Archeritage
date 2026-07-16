type SectionHeadingProps = { eyebrow?: string; title: string; text?: string; light?: boolean };

export function SectionHeading({ eyebrow, title, text, light = false }: SectionHeadingProps) {
  return <div className={`section-heading${light ? ' section-heading--light' : ''}`}><div>{eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}<h2>{title}</h2></div>{text ? <p>{text}</p> : null}</div>;
}
