import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']);

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= 5) return NextResponse.json({ message: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 });
  attempts.set(ip, current && current.resetAt > now ? { ...current, count: current.count + 1 } : { count: 1, resetAt: now + 15 * 60_000 });

  const form = await request.formData();
  const parsed = contactSchema.safeParse(Object.fromEntries(['fullName', 'organization', 'role', 'email', 'phone', 'requestType', 'location', 'projectStage', 'message', 'website'].map((key) => [key, String(form.get(key) ?? '')])));
  if (!parsed.success) return NextResponse.json({ message: 'Vérifiez les informations du formulaire.' }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: 'Demande reçue.' });

  const attachment = form.get('attachment');
  if (attachment instanceof File && attachment.size > 0 && (attachment.size > MAX_FILE_SIZE || !ALLOWED_TYPES.has(attachment.type))) return NextResponse.json({ message: 'La pièce jointe doit être un PDF, DOC, DOCX, JPG ou PNG de 5 Mo maximum.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return NextResponse.json({ message: process.env.NODE_ENV === 'development' ? 'Envoi non configuré : renseignez RESEND_API_KEY, CONTACT_TO_EMAIL et CONTACT_FROM_EMAIL.' : 'Le formulaire est temporairement indisponible. Merci de réessayer ultérieurement.' }, { status: 503 });

  const emailFields: Array<[string, string | undefined]> = [
    ['Nom', parsed.data.fullName], ['Organisation', parsed.data.organization], ['Fonction', parsed.data.role], ['Email', parsed.data.email], ['Téléphone', parsed.data.phone], ['Type de demande', parsed.data.requestType], ['Localisation', parsed.data.location], ['Stade', parsed.data.projectStage], ['Message', parsed.data.message],
  ];
  const lines = emailFields.map(([label, value]) => `<p><strong>${escapeHtml(label)} :</strong> ${escapeHtml(value || '—')}</p>`).join('');
  const attachments = attachment instanceof File && attachment.size > 0 ? [{ filename: attachment.name, content: Buffer.from(await attachment.arrayBuffer()).toString('base64') }] : undefined;
  const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [to], reply_to: parsed.data.email, subject: `Nouvelle demande Archeritage — ${parsed.data.requestType}`, html: `<h1>Nouvelle demande</h1>${lines}`, attachments }) });
  if (!response.ok) return NextResponse.json({ message: 'La demande n’a pas pu être transmise. Réessayez ultérieurement.' }, { status: 502 });
  return NextResponse.json({ message: 'Votre demande a bien été transmise. Archeritage vous répondra sous 48 heures.' });
}

function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character); }
