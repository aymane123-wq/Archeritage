import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { FooterMotion } from '@/components/motion/FooterMotion';
import { Container } from '@/components/ui/Container';
import { cabinetPage, contactPage, siteRoutes } from '@/content/site';

export function Footer() {
  return (
    <FooterMotion><footer className="site-footer">
      <Container>
        <div className="site-footer__wordmark">ARCHERITAGE</div>
        <div className="site-footer__grid">
          <div><p className="eyebrow">Cabinet d’architecture</p><p className="site-footer__statement">{cabinetPage.statement}</p><p className="site-footer__copy">{cabinetPage.introduction}</p></div>
          <nav aria-label="Navigation du pied de page">{siteRoutes.map((route, index) => <Link key={route.href} href={route.href}><span>{String(index + 1).padStart(2, '0')}</span>{route.label}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}</nav>
          <div className="site-footer__contact"><p className="eyebrow">Contact</p>{contactPage.details.map((detail) => <p key={detail}>{detail}</p>)}<Link href="/contact" className="arrow-link">Parler d’un projet<ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
        <div className="site-footer__bottom"><p>Archeritage</p><p>Architecture · Patrimoine · Gouvernance</p><p>© 2026 Archeritage</p></div>
      </Container>
    </footer></FooterMotion>
  );
}
