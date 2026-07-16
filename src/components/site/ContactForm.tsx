'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactValues } from '@/lib/validation';

const requestTypes = ['Projet architectural', 'Projet patrimonial', 'Réhabilitation / restauration', 'Lotissement / projet urbain', 'Assistance à maîtrise d’ouvrage', 'Audit / redressement de projet', 'Gouvernance documentaire', 'Valorisation territoriale', 'Partenariat', 'Presse / intervention', 'Autre'];
const projectStages = ['Idée / opportunité', 'Études préalables', 'Programmation', 'Conception', 'Consultation', 'Chantier', 'Projet en difficulté', 'Réception / clôture', 'Autre'];

export function ContactForm() {
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: { website: '' } });

  const submit = handleSubmit(async (values, event) => {
    setStatus(null);
    const form = new FormData();
    Object.entries(values).forEach(([key, value]) => form.append(key, value ?? ''));
    const attachment = (event?.target as HTMLFormElement | undefined)?.elements.namedItem('attachment') as HTMLInputElement | null;
    if (attachment?.files?.[0]) form.append('attachment', attachment.files[0]);
    try {
      const response = await fetch('/api/contact', { method: 'POST', body: form });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || 'La demande n’a pas pu être envoyée.');
      setStatus({ kind: 'success', message: result.message || 'Votre demande a bien été transmise.' });
      reset();
      if (attachment) attachment.value = '';
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Une erreur est survenue.' });
    }
  });

  const field = (name: keyof ContactValues, label: string, type = 'text', required = false) => <label>{label}{required ? <span aria-hidden="true"> *</span> : null}<input type={type} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} {...register(name)} />{errors[name] ? <small id={`${name}-error`} role="alert">{errors[name]?.message}</small> : null}</label>;

  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label>Site web<input tabIndex={-1} autoComplete="off" {...register('website')} /></label></div>
    <div className="form-grid">{field('fullName', 'Nom et prénom', 'text', true)}{field('organization', 'Organisation / société')}{field('role', 'Fonction')}{field('email', 'Email', 'email', true)}{field('phone', 'Téléphone', 'tel')}
      <label>Type de demande <span aria-hidden="true">*</span><select defaultValue="" aria-invalid={Boolean(errors.requestType)} {...register('requestType')}><option value="" disabled>Sélectionner</option>{requestTypes.map((option) => <option key={option}>{option}</option>)}</select>{errors.requestType ? <small role="alert">{errors.requestType.message}</small> : null}</label>
      {field('location', 'Localisation du projet')}
      <label>Stade du projet<select defaultValue="" {...register('projectStage')}><option value="">Sélectionner</option>{projectStages.map((option) => <option key={option}>{option}</option>)}</select></label>
    </div>
    <label>Votre message <span aria-hidden="true">*</span><textarea rows={7} aria-invalid={Boolean(errors.message)} {...register('message')} />{errors.message ? <small role="alert">{errors.message.message}</small> : null}</label>
    <label>Pièce jointe <span className="optional">Optionnel · PDF, DOC, DOCX, JPG ou PNG · 5 Mo max.</span><input name="attachment" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" /></label>
    {status ? <div className={`form-status form-status--${status.kind}`} role="status">{status.message}</div> : null}
    <button className="button button--primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}</button>
  </form>;
}
