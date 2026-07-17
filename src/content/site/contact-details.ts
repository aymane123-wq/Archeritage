export const contactDetails = {
  email: 'contact@archeritage.ma',
  phoneDisplay: '06 61 04 71 30',
  phoneHref: '+212661047130',
  addressLines: [
    'Rue Soumaya, Imm. 82, Étage 4, Appt. N°16',
    'Quartier Palmier, Maarif',
    'Casablanca, Maroc',
  ],
  streetAddress: 'Rue Soumaya, Imm. 82, Étage 4, Appt. N°16, Quartier Palmier, Maarif',
  city: 'Casablanca',
  country: 'Maroc',
  countryCode: 'MA',
} as const;

export const contactLinks = {
  email: `mailto:${contactDetails.email}`,
  phone: `tel:${contactDetails.phoneHref}`,
} as const;
