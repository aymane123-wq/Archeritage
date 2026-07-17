'use client';

import { useState, type InputHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  clientProfileOptions,
  desiredTimelineOptions,
  projectStageOptions,
  projectTypeOptions,
  type ContactInitialValues,
} from '@/content/site/contact-form';
import { contactSchema, type ContactValues } from '@/lib/validation';

type ContactFormProps = {
  initialValues?: ContactInitialValues;
};

export function ContactForm({ initialValues = {} }: ContactFormProps) {
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
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

  const submit = handleSubmit(async (values, event) => {
    setStatus(null);
    const form = new FormData();
    Object.entries(values).forEach(([key, value]) => form.append(key, value ?? ''));
    const formElement = event?.target as HTMLFormElement | undefined;
    const attachment = formElement?.elements.namedItem('attachment') as HTMLInputElement | null;
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
        <textarea id="message" rows={7} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} {...register('message')} />
        {errors.message ? <small id="message-error" role="alert">{errors.message.message}</small> : null}
      </label>
      <label htmlFor="attachment">
        Pièce jointe <span className="optional">Optionnel · PDF, DOC, DOCX, JPG ou PNG · 5 Mo max.</span>
        <input id="attachment" name="attachment" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
      </label>
      {status ? <div className={`form-status form-status--${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'} aria-live="polite">{status.message}</div> : null}
      <button className="button button--primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>
    </form>
  );
}
