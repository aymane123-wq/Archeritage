import { NextResponse } from 'next/server';
import {
  CONTACT_ATTACHMENT_ERROR,
  CONTACT_ATTACHMENT_MAX_BYTES,
  contactSchema,
  hasAllowedContactAttachmentSignature,
  isAllowedContactAttachment,
} from '@/lib/validation';

const attempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 5_000;
const MAX_REQUEST_SIZE = CONTACT_ATTACHMENT_MAX_BYTES + 512 * 1024;
const RESEND_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  pruneAttempts(now, ip);
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return NextResponse.json({ message: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 });
  }
  attempts.set(ip, current && current.resetAt > now
    ? { ...current, count: current.count + 1 }
    : { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_SIZE) {
    return NextResponse.json({ message: CONTACT_ATTACHMENT_ERROR }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ message: 'La demande n’a pas pu être lue. Vérifiez le formulaire puis réessayez.' }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(Object.fromEntries([
    'fullName',
    'organization',
    'role',
    'profile',
    'email',
    'phone',
    'projectType',
    'projectLocation',
    'projectStage',
    'desiredTimeline',
    'message',
    'website',
  ].map((key) => [key, String(form.get(key) ?? '')])));

  if (!parsed.success) {
    return NextResponse.json({ message: 'Vérifiez les informations du formulaire.' }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ message: 'Demande reçue.' });

  const attachmentFiles = form
    .getAll('attachment')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const totalAttachmentSize = attachmentFiles.reduce((total, file) => total + file.size, 0);
  if (
    attachmentFiles.length > 1
    || totalAttachmentSize > CONTACT_ATTACHMENT_MAX_BYTES
    || attachmentFiles.some((file) => !isAllowedContactAttachment(file))
  ) {
    return NextResponse.json({ message: CONTACT_ATTACHMENT_ERROR }, { status: 400 });
  }
  const validAttachmentSignatures = await Promise.all(
    attachmentFiles.map((file) => hasAllowedContactAttachmentSignature(file)),
  );
  if (validAttachmentSignatures.some((valid) => !valid)) {
    return NextResponse.json({ message: CONTACT_ATTACHMENT_ERROR }, { status: 400 });
  }
  const attachment = attachmentFiles[0];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({
      message: process.env.NODE_ENV === 'development'
        ? 'Envoi non configuré : renseignez RESEND_API_KEY, CONTACT_TO_EMAIL et CONTACT_FROM_EMAIL.'
        : 'Le formulaire est temporairement indisponible. Merci de réessayer ultérieurement.',
    }, { status: 503 });
  }

  const emailFields: Array<[string, string | undefined]> = [
    ['Nom et prénom', parsed.data.fullName],
    ['Organisation', parsed.data.organization],
    ['Fonction', parsed.data.role],
    ['Profil', parsed.data.profile],
    ['Email', parsed.data.email],
    ['Téléphone', parsed.data.phone],
    ['Type de projet', parsed.data.projectType],
    ['Localisation du projet', parsed.data.projectLocation],
    ['Stade d’avancement', parsed.data.projectStage],
    ['Échéance souhaitée', parsed.data.desiredTimeline],
    ['Message / contexte', parsed.data.message],
  ];
  const lines = emailFields
    .map(([label, value]) => `<p><strong>${escapeHtml(label)} :</strong> ${escapeHtml(value || '—')}</p>`)
    .join('');
  const attachments = attachment
    ? [{ filename: attachment.name, content: Buffer.from(await attachment.arrayBuffer()).toString('base64') }]
    : undefined;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: parsed.data.email,
        subject: `Nouvelle demande Archeritage — ${parsed.data.projectType}`,
        html: `<h1>Nouvelle demande qualifiée</h1>${lines}`,
        attachments,
      }),
      signal: controller.signal,
    });
  } catch {
    return NextResponse.json({ message: 'Le formulaire est temporairement indisponible. Merci de réessayer ultérieurement.' }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) {
    return NextResponse.json({ message: 'La demande n’a pas pu être transmise. Réessayez ultérieurement.' }, { status: 502 });
  }
  return NextResponse.json({ message: 'Votre demande a bien été transmise. Un premier échange, sous 48 heures.' });
}

function pruneAttempts(now: number, currentIp: string) {
  for (const [ip, attempt] of attempts) {
    if (attempt.resetAt <= now) attempts.delete(ip);
  }

  if (attempts.size >= RATE_LIMIT_MAX_ENTRIES && !attempts.has(currentIp)) {
    const oldestIp = attempts.keys().next().value;
    if (oldestIp) attempts.delete(oldestIp);
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character);
}
