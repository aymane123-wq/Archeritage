export const clientProfileOptions = [
  'Collectivité ou institution publique',
  'Investisseur ou promoteur',
  'Maître d’ouvrage ou responsable de projet',
  'Propriétaire ou porteur de projet privé',
  'Professionnel de la maîtrise d’œuvre',
  'Autre',
] as const;

export const projectTypeOptions = [
  'Valorisation foncière ou étude de faisabilité',
  'Architecture ou construction neuve',
  'Projet d’envergure ou équipement',
  'Réhabilitation ou transformation',
  'Patrimoine ou restauration',
  'Assistance à maîtrise d’ouvrage',
  'Audit, redressement ou gouvernance de projet',
  'Partenariat ou contribution professionnelle',
  'Autre',
] as const;

export const projectStageOptions = [
  'Première réflexion',
  'Recherche ou analyse du site',
  'Étude de faisabilité',
  'Programme ou cadrage en cours',
  'Conception en cours',
  'Autorisations ou consultation',
  'Travaux en cours',
  'Projet bloqué ou en difficulté',
  'Autre',
] as const;

export const desiredTimelineOptions = [
  'Dès que possible',
  'Moins de 3 mois',
  '3 à 6 mois',
  '6 à 12 mois',
  'Plus de 12 mois',
  'À définir',
] as const;

export const profileQueryMap = {
  collectivite: 'Collectivité ou institution publique',
  investisseur: 'Investisseur ou promoteur',
  'maitre-ouvrage': 'Maître d’ouvrage ou responsable de projet',
} as const satisfies Record<string, (typeof clientProfileOptions)[number]>;

export const projectTypeQueryMap = {
  foncier: 'Valorisation foncière ou étude de faisabilité',
  architecture: 'Architecture ou construction neuve',
  patrimoine: 'Patrimoine ou restauration',
  gouvernance: 'Audit, redressement ou gouvernance de projet',
} as const satisfies Record<string, (typeof projectTypeOptions)[number]>;

export type ClientProfile = (typeof clientProfileOptions)[number];
export type ProjectType = (typeof projectTypeOptions)[number];
export type ProjectStage = (typeof projectStageOptions)[number];
export type DesiredTimeline = (typeof desiredTimelineOptions)[number];

export type ContactInitialValues = {
  profile?: ClientProfile;
  projectType?: ProjectType;
};

export function getContactInitialValues(searchParams: Record<string, string | string[] | undefined>): ContactInitialValues {
  const profileKey = singleValue(searchParams.profil);
  const projectTypeKey = singleValue(searchParams.type);

  return {
    profile: profileKey && profileKey in profileQueryMap
      ? profileQueryMap[profileKey as keyof typeof profileQueryMap]
      : undefined,
    projectType: projectTypeKey && projectTypeKey in projectTypeQueryMap
      ? projectTypeQueryMap[projectTypeKey as keyof typeof projectTypeQueryMap]
      : undefined,
  };
}

function singleValue(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : undefined;
}
