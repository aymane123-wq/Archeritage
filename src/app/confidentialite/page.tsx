import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Politique de confidentialité', robots: { index: false, follow: true } };
export default function PrivacyPage() { return <><PageHero eyebrow="Données personnelles" title="Politique de confidentialité" introduction="Une politique complète sera finalisée avec les coordonnées juridiques du cabinet avant la mise en ligne." /><section className="section section--ivory"><Container className="legal-copy"><h2>Formulaire de contact</h2><p>Les informations transmises sont utilisées exclusivement pour comprendre votre demande et organiser, le cas échéant, un premier échange avec ARCHERITAGE.</p><h2>Pièces jointes</h2><p>Les documents, plans et données transmis sont traités de manière confidentielle. Un cadre spécifique peut être établi avant tout partage approfondi.</p><h2>Vos droits</h2><p>Le contact permettant d’exercer vos droits d’accès, de rectification et de suppression doit être complété avant la mise en ligne : [à compléter].</p></Container></section></>; }
