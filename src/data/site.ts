import { contactDetails } from '@/content/site/contact-details';

export const site = {
  brand: 'ARCHERITAGE',
  legalName: 'ARCHERITAGE',
  url: 'https://archeritage.ma',
  email: contactDetails.email,
  phone: contactDetails.phoneDisplay,
  phoneHref: contactDetails.phoneHref,
  address: contactDetails.addressLines.join(', '),
  city: `${contactDetails.city}, ${contactDetails.country}`,
  description: 'Cabinet d’architecture, valorisation foncière et patrimoine à Casablanca.',
};
