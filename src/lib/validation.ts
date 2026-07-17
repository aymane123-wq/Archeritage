import { z } from 'zod';
import {
  clientProfileOptions,
  desiredTimelineOptions,
  projectStageOptions,
  projectTypeOptions,
} from '@/content/site/contact-form';

const optionalTimeline = z.union([
  z.enum(desiredTimelineOptions),
  z.literal(''),
]);

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Indiquez votre nom et prénom.').max(160),
  organization: z.string().trim().max(160).optional(),
  role: z.string().trim().max(160).optional(),
  profile: z.enum(clientProfileOptions, { error: 'Choisissez votre profil.' }),
  email: z.string().trim().email('Indiquez une adresse email valide.').max(254),
  phone: z.string().trim().max(40).optional(),
  projectType: z.enum(projectTypeOptions, { error: 'Choisissez un type de projet.' }),
  projectLocation: z.string().trim().max(180).optional(),
  projectStage: z.enum(projectStageOptions, { error: 'Choisissez le stade d’avancement.' }),
  desiredTimeline: optionalTimeline.optional(),
  message: z.string().trim().min(20, 'Votre message doit contenir au moins 20 caractères.').max(5000),
  website: z.string().max(200).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
