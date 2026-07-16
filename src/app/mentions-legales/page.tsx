import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false, follow: true } };
export default function LegalPage() { return <><PageHero eyebrow="Informations légales" title="Mentions légales" introduction="Les informations juridiques définitives doivent être validées avant la mise en ligne." /><section className="section section--ivory"><Container className="legal-copy"><h2>Éditeur du site</h2><p>Raison sociale : [à compléter]</p><p>Forme juridique, capital social et registre de commerce : [à compléter]</p><p>Adresse : [à compléter]</p><p>Email et téléphone : [à compléter]</p><h2>Hébergement</h2><p>Hébergeur : [à compléter lors du déploiement]</p></Container></section></>; }
