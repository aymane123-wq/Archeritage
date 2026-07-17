import { z } from 'zod';
import {
  clientProfileOptions,
  desiredTimelineOptions,
  projectStageOptions,
  projectTypeOptions,
} from '@/content/site/contact-form';

export const CONTACT_ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;
export const CONTACT_ATTACHMENT_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
export const CONTACT_ATTACHMENT_ALLOWED_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]);
export const CONTACT_ATTACHMENT_ALLOWED_EXTENSIONS = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.jpg',
  '.jpeg',
  '.png',
]);
export const CONTACT_ATTACHMENT_ERROR = 'La pièce jointe doit être un PDF, DOC, DOCX, JPG ou PNG de 5 Mo maximum.';

function getContactAttachmentExtension(name: string) {
  const extensionStart = name.lastIndexOf('.');
  return extensionStart >= 0 ? name.slice(extensionStart).toLowerCase() : '';
}

export function isAllowedContactAttachment(file: { name: string; size: number; type: string }) {
  const extension = getContactAttachmentExtension(file.name);

  return file.size <= CONTACT_ATTACHMENT_MAX_BYTES
    && CONTACT_ATTACHMENT_ALLOWED_TYPES.has(file.type)
    && CONTACT_ATTACHMENT_ALLOWED_EXTENSIONS.has(extension);
}

export async function hasAllowedContactAttachmentSignature(file: { name: string; slice: (start?: number, end?: number) => Blob }) {
  const header = new Uint8Array(await file.slice(0, 1024).arrayBuffer());
  const extension = getContactAttachmentExtension(file.name);
  const startsWith = (...bytes: number[]) => bytes.every((byte, index) => header[index] === byte);

  switch (extension) {
    case '.pdf':
      return header.some((byte, index) => byte === 0x25
        && header[index + 1] === 0x50
        && header[index + 2] === 0x44
        && header[index + 3] === 0x46
        && header[index + 4] === 0x2D);
    case '.doc':
      return startsWith(0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1);
    case '.docx':
      return startsWith(0x50, 0x4B, 0x03, 0x04);
    case '.jpg':
    case '.jpeg':
      return startsWith(0xFF, 0xD8, 0xFF);
    case '.png':
      return startsWith(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A);
    default:
      return false;
  }
}

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
