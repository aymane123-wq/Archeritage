export type ReferenceSection = {
  title: 'Contexte' | 'Mission conduite' | 'Enjeux' | 'Approche';
  text: string;
};

export type ReferenceRecord = {
  slug: 'tinmel' | 'tiznit' | 'cervantes' | 'safi';
  title: string;
  institution?: string;
  location?: string;
  image?: string;
  imageAlt?: string;
  summary: string;
  attribution: string;
  sections: ReferenceSection[];
};

const founderAttribution = 'Expérience professionnelle du fondateur';

export const referenceRecords: ReferenceRecord[] = [
  {
    slug: 'tinmel',
    title: 'Mosquée de Tinmel',
    institution: 'Ministère des Habous',
    location: 'Tinmel',
    image: '/images/references/tinmel-cover.jpg',
    imageAlt: 'Architecture patrimoniale de la mosquée de Tinmel',
    summary: 'Restauration d’un édifice historique majeur du Haut Atlas, mobilisant lecture historique, coordination technique et gouvernance documentaire du chantier.',
    attribution: founderAttribution,
    sections: [
      { title: 'Contexte', text: 'Restauration d’un édifice historique majeur du Haut Atlas.' },
      { title: 'Mission conduite', text: 'Lecture historique, coordination technique et gouvernance documentaire du chantier.' },
      { title: 'Approche', text: 'Une conduite de mission structurée autour de la traçabilité et de la coordination.' },
    ],
  },
  {
    slug: 'tiznit',
    title: 'Kasbah de Tiznit et Place Mechouar',
    location: 'Tiznit',
    image: '/images/references/tiznit-cover.jpg',
    imageAlt: 'Ensemble patrimonial de la kasbah de Tiznit et de la place Mechouar',
    summary: 'Valorisation patrimoniale d’un ensemble historique urbain, entre restauration et mise en usage contemporaine.',
    attribution: founderAttribution,
    sections: [
      { title: 'Contexte', text: 'Valorisation patrimoniale d’un ensemble historique urbain.' },
      { title: 'Mission conduite', text: 'Restauration et mise en usage contemporaine.' },
    ],
  },
  {
    slug: 'cervantes',
    title: 'Théâtre Cervantès — Tanger',
    institution: 'APDN',
    location: 'Tanger',
    image: '/images/references/cervantes-cover.jpg',
    imageAlt: 'Façade du Théâtre Cervantès à Tanger',
    summary: 'Accompagnement d’une opération de réhabilitation d’un patrimoine architectural du XXe siècle, sous maîtrise d’ouvrage de l’Agence de promotion et de développement du Nord.',
    attribution: founderAttribution,
    sections: [
      { title: 'Contexte', text: 'Accompagnement d’une opération de réhabilitation d’un patrimoine architectural du XXe siècle.' },
      { title: 'Mission conduite', text: 'Sous maîtrise d’ouvrage de l’Agence de promotion et de développement du Nord.' },
    ],
  },
  {
    slug: 'safi',
    title: 'Murailles portugaises et Château de Mer — Safi',
    institution: 'Direction régionale de la Culture',
    location: 'Safi',
    summary: 'Intervention sur un monument classé du XVIe siècle, en lien avec la Direction régionale de la Culture.',
    attribution: founderAttribution,
    sections: [
      { title: 'Contexte', text: 'Intervention sur un monument classé du XVIe siècle.' },
      { title: 'Mission conduite', text: 'En lien avec la Direction régionale de la Culture.' },
    ],
  },
];

export const homepageReferences = referenceRecords.slice(0, 3);

export function getReferenceBySlug(slug: string) {
  return referenceRecords.find((reference) => reference.slug === slug);
}

export function getReferenceNavigation(slug: string) {
  const index = referenceRecords.findIndex((reference) => reference.slug === slug);
  if (index < 0) return null;
  return {
    previous: referenceRecords[(index - 1 + referenceRecords.length) % referenceRecords.length],
    next: referenceRecords[(index + 1) % referenceRecords.length],
  };
}
