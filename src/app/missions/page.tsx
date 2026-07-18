import type { Metadata } from 'next';
import { ArcheritageIcon, missionFormatIcons } from '@/components/icons/ArcheritageIcon';
import { EditorialMotion } from '@/components/motion/EditorialMotion';
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
    <EditorialMotion>
      <PageHero eyebrow="Missions" title={missionsPage.title} introduction={missionsPage.introduction} />
      <section className="section section--ivory" data-motion="section">
        <Container>
          <SectionHeading eyebrow="Selon vos enjeux" title="Identifier le bon point d’entrée" />
          <div className="issue-grid">
            {missionIssues.map((issue, index) => (
              <article key={issue.title} data-motion-item>
                <span>0{index + 1}</span>
                <h3>{issue.title}</h3>
                <p>{issue.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section section--alt" data-motion="section">
        <Container>
          <SectionHeading eyebrow="Formats d’intervention" title="Un niveau d’accompagnement calibré" />
          <span className="mission-formats__progress" data-motion-line aria-hidden="true" />
          <div className="mission-table-wrap" data-motion-item>
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
                        <span className="mission-format-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
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
      <section className="section section--ivory" data-motion="section">
        <Container>
          <div data-motion-item>
            <ProofBox eyebrow="Pour qui" title="Cadres publics, institutionnels et privés">
              <p>{missionsPage.audience}</p>
            </ProofBox>
          </div>
        </Container>
      </section>
      <CTASection text="Décrivez votre projet pour identifier la forme d’accompagnement adaptée." label="Décrire votre besoin" />
    </EditorialMotion>
  );
}
