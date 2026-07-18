import type { Metadata } from 'next';
import { ArcheritageIcon, missionFormatIcons } from '@/components/icons/ArcheritageIcon';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { PageHero } from '@/components/ui/PageHero';
import { ProofBox } from '@/components/ui/ProofBox';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { missionFormats, missionIssues, missionsPage } from '@/content/site/official';

export const metadata: Metadata = {
  title: missionsPage.title,
  description: missionsPage.introduction,
  alternates: { canonical: '/missions' },
};

export default function MissionsPage() {
  return (
    <>
      <PageHero eyebrow="Missions" title={missionsPage.title} introduction={missionsPage.introduction} />
      <section className="section section--ivory">
        <Container>
          <SectionHeading eyebrow="Selon vos enjeux" title="Identifier le bon point d’entrée" />
          <div className="issue-grid">
            {missionIssues.map((issue, index) => (
              <article key={issue.title}>
                <span>0{index + 1}</span>
                <h3>{issue.title}</h3>
                <p>{issue.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section section--alt">
        <Container>
          <SectionHeading eyebrow="Formats d’intervention" title="Un niveau d’accompagnement calibré" />
          <div className="mission-table-wrap">
            <table className="mission-table">
              <thead>
                <tr>
                  <th>Format</th>
                  <th>Ce que nous produisons</th>
                </tr>
              </thead>
              <tbody>
                {missionFormats.map(([format, output], index) => (
                  <tr key={format}>
                    <th scope="row">
                      <span className="mission-format-title">
                        <ArcheritageIcon name={missionFormatIcons[index]} variant="card" tone="accent" />
                        {format}
                      </span>
                    </th>
                    <td>{output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <section className="section section--ivory">
        <Container>
          <ProofBox eyebrow="Pour qui" title="Cadres publics, institutionnels et privés">
            <p>{missionsPage.audience}</p>
          </ProofBox>
        </Container>
      </section>
      <CTASection text="Décrivez votre projet pour identifier la forme d’accompagnement adaptée." label="Décrire votre besoin" />
    </>
  );
}
