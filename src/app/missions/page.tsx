import type { Metadata } from 'next';
import { ArcheritageIcon, missionFormatIcons } from '@/components/icons/ArcheritageIcon';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ProofBox } from '@/components/ui/ProofBox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { missionFormats, missionIssues } from '@/content/site/official';

const title = 'Comment Archeritage intervient sur vos projets';
const description = 'Une intervention calibrée au niveau de complexité réel de votre opération — jamais une réponse standard.';

export const metadata: Metadata = { title, description, alternates: { canonical: '/missions' } };

export default function MissionsPage() {
  return (
    <>
      <PageHero eyebrow="Missions" title={title} introduction={description} supporting="Archeritage accompagne les maîtres d’ouvrage publics et privés, institutions, collectivités et investisseurs à chaque étape de leurs projets, du foncier brut au monument classé." />
      <section className="section section--ivory">
        <Container>
          <SectionHeading eyebrow="Selon vos trois enjeux" title="Identifier rapidement le bon point d’entrée" />
          <div className="issue-grid">
            {missionIssues.map((issue, index) => <article key={issue.title}><span>0{index + 1}</span><h3>{issue.title}</h3><p>{issue.text}</p></article>)}
          </div>
        </Container>
      </section>
      <section className="section section--alt">
        <Container>
          <SectionHeading eyebrow="Selon votre besoin" title="Un format calibré pour décider et agir" />
          <div className="mission-table-wrap">
            <table className="mission-table">
              <thead><tr><th>Format</th><th>Ce que nous produisons</th></tr></thead>
              <tbody>
                {missionFormats.map(([format, output], index) => (
                  <tr key={format}>
                    <th scope="row"><span className="mission-format-title"><ArcheritageIcon name={missionFormatIcons[index]} variant="card" tone="accent" />{format}</span></th>
                    <td>{output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <section className="section section--ivory">
        <Container><ProofBox eyebrow="Pour qui" title="Des cadres publics, institutionnels et privés"><p>Institutions publiques, collectivités territoriales, agences de développement, opérateurs privés, investisseurs fonciers et équipes de maîtrise d’œuvre confrontées à des opérations sensibles.</p></ProofBox></Container>
      </section>
      <CTASection text="Décrivez votre projet pour identifier la forme d’accompagnement la plus adaptée." label="Décrire votre besoin" />
    </>
  );
}
