'use client';

import Link from 'next/link';
import { useRef, useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArcheritageIcon } from '@/components/icons/ArcheritageIcon';
import {
  clientProfileOptions,
  desiredTimelineOptions,
  projectStageOptions,
  projectTypeOptions,
  type ContactInitialValues,
} from '@/content/site/contact-form';
import {
  CONTACT_ATTACHMENT_ACCEPT,
  CONTACT_ATTACHMENT_ERROR,
  contactSchema,
  isAllowedContactAttachment,
  type ContactValues,
} from '@/lib/validation';

type ContactFormProps = {
  initialValues?: ContactInitialValues;
};

export function ContactForm({ initialValues = {} }: ContactFormProps) {
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [attachmentName, setAttachmentName] = useState('Aucun fichier sélectionné');
  const attachmentRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      organization: '',
      role: '',
      profile: initialValues.profile,
      email: '',
      phone: '',
      projectType: initialValues.projectType,
      projectLocation: '',
      projectStage: undefined,
      desiredTimeline: '',
      message: '',
      website: '',
    },
  });

  const submit = handleSubmit(async (values) => {
    setStatus(null);
    const attachment = attachmentRef.current?.files?.[0];
    if (attachment && !isAllowedContactAttachment(attachment)) {
      setAttachmentError(CONTACT_ATTACHMENT_ERROR);
      attachmentRef.current?.focus();
      return;
    }
    setAttachmentError(null);

    const form = new FormData();
    Object.entries(values).forEach(([key, value]) => form.append(key, value ?? ''));
    if (attachment) form.append('attachment', attachment);

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: form });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || 'La demande n’a pas pu être envoyée.');
      setStatus({ kind: 'success', message: result.message || 'Votre demande a bien été transmise.' });
      reset();
      if (attachmentRef.current) attachmentRef.current.value = '';
      setAttachmentName('Aucun fichier sélectionné');
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Une erreur est survenue.' });
    }
  });

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAttachmentName(file?.name || 'Aucun fichier sélectionné');
    setAttachmentError(file && !isAllowedContactAttachment(file) ? CONTACT_ATTACHMENT_ERROR : null);
  };

  const field = (
    name: keyof ContactValues,
    label: string,
    options: InputHTMLAttributes<HTMLInputElement> = {},
    required = false,
  ) => (
    <label htmlFor={name}>
      {label}{required ? <span aria-hidden="true"> *</span> : null}
      <input
        id={name}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...options}
        {...register(name)}
      />
      {errors[name] ? <small id={`${name}-error`} role="alert">{errors[name]?.message}</small> : null}
    </label>
  );

  const selectField = (
    name: 'profile' | 'projectType' | 'projectStage' | 'desiredTimeline',
    label: string,
    options: readonly string[],
    required = false,
  ) => (
    <label htmlFor={name}>
      {label}{required ? <span aria-hidden="true"> *</span> : null}
      <select
        id={name}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...register(name)}
      >
        <option value="">Sélectionner</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {errors[name] ? <small id={`${name}-error`} role="alert">{errors[name]?.message}</small> : null}
    </label>
  );

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Site web<input id="website" tabIndex={-1} autoComplete="off" {...register('website')} /></label>
      </div>
      <div className="form-grid">
        {field('fullName', 'Nom et prénom', { autoComplete: 'name' }, true)}
        {field('organization', 'Organisation / société', { autoComplete: 'organization' })}
        {field('role', 'Fonction', { autoComplete: 'organization-title' })}
        {selectField('profile', 'Vous êtes', clientProfileOptions, true)}
        {field('email', 'Email', { type: 'email', autoComplete: 'email' }, true)}
        {field('phone', 'Téléphone', { type: 'tel', autoComplete: 'tel' })}
        {selectField('projectType', 'Type de projet', projectTypeOptions, true)}
        {field('projectLocation', 'Localisation du projet', { autoComplete: 'street-address' })}
        {selectField('projectStage', 'Stade d’avancement', projectStageOptions, true)}
        {selectField('desiredTimeline', 'Échéance souhaitée', desiredTimelineOptions)}
      </div>
      <label htmlFor="message">
        Message / contexte du projet <span aria-hidden="true">*</span>
        <textarea id="message" rows={7} required aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} {...register('message')} />
        {errors.message ? <small id="message-error" role="alert">{errors.message.message}</small> : null}
      </label>
      <div className="contact-file-field">
        <span id="attachment-label" className="form-label-with-icon"><ArcheritageIcon name="upload" tone="accent" />Pièce jointe</span>
        <span id="attachment-help" className="optional">Optionnel · PDF, DOC, DOCX, JPG ou PNG · 5 Mo max.</span>
        <div className="contact-file-control">
          <input
            ref={attachmentRef}
            className="contact-file-input"
            id="attachment"
            name="attachment"
            type="file"
            accept={CONTACT_ATTACHMENT_ACCEPT}
            aria-labelledby="attachment-label"
            aria-describedby={`attachment-help attachment-name${attachmentError ? ' attachment-error' : ''}`}
            aria-invalid={Boolean(attachmentError)}
            onChange={handleAttachmentChange}
          />
          <label className="contact-file-trigger" htmlFor="attachment">Choisir un fichier</label>
          <span className="contact-file-name" id="attachment-name" aria-live="polite">{attachmentName}</span>
        </div>
        {attachmentError ? <small id="attachment-error" role="alert">{attachmentError}</small> : null}
      </div>
      {status ? <div className={`form-status form-status--${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'} aria-live="polite"><ArcheritageIcon name={status.kind === 'success' ? 'check' : 'shield-alert'} />{status.message}</div> : null}
      <p className="contact-form-privacy">Vos données sont utilisées uniquement pour répondre à votre demande. <Link href="/confidentialite">Consulter la politique de confidentialité</Link>.</p>
      <button className="button button--primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}<ArcheritageIcon name="send" />
      </button>
    </form>
  );
}
