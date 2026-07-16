import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { FooterMotion } from '@/components/motion/FooterMotion';
import { Container } from '@/components/ui/Container';
import { siteRoutes } from '@/content/site/navigation';
import { site } from '@/data/site';

export function Footer() {
  return (
    <FooterMotion><footer className="site-footer">
      <Container>
        <div className="site-footer__wordmark">ARCHERITAGE</div>
        <div className="site-footer__grid">
          <div><p className="eyebrow">Cabinet d’architecture</p><p className="site-footer__statement">Valorisation foncière, projets d’envergure et patrimoine.</p><p className="site-footer__copy">ARCHERITAGE réunit trois expertises pour transformer des sites complexes en projets maîtrisés.</p></div>
          <nav aria-label="Navigation du pied de page">{siteRoutes.map((route, index) => <Link key={route.href} href={route.href}><span>{String(index + 1).padStart(2, '0')}</span>{route.label}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}</nav>
          <div className="site-footer__contact"><p className="eyebrow">Contact</p><p>Email : {site.email}</p><p>Téléphone : {site.phone}</p><p>{site.city}</p><Link href="/contact" className="arrow-link">Parler d’un projet<ArrowUpRight className="h-4 w-4" /></Link><div className="footer-legal"><Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link></div></div>
        </div>
        <div className="site-footer__bottom"><p>ARCHERITAGE</p><p>Casablanca, Maroc</p><p>© {new Date().getFullYear()} ARCHERITAGE</p></div>
      </Container>
    </footer></FooterMotion>
  );
}
