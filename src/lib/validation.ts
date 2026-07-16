import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Indiquez votre nom et prénom.'),
  organization: z.string().trim().max(160).optional(),
  role: z.string().trim().max(160).optional(),
  email: z.string().trim().email('Indiquez une adresse email valide.'),
  phone: z.string().trim().max(40).optional(),
  requestType: z.string().trim().min(1, 'Choisissez un type de demande.'),
  location: z.string().trim().max(180).optional(),
  projectStage: z.string().trim().max(120).optional(),
  message: z.string().trim().min(20, 'Votre message doit contenir au moins 20 caractères.').max(5000),
  website: z.string().max(0, 'Envoi non autorisé.').optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
