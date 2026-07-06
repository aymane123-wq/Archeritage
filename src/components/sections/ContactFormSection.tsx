"use client";

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { site } from '@/data/site';

const contactSchema = z.object({
  name: z.string().min(2, 'Veuillez saisir votre nom.'),
  email: z.string().email('Veuillez saisir une adresse email valide.'),
  phone: z.string().min(6, 'Veuillez saisir un numéro de téléphone.'),
  projectType: z.string().min(1, 'Choisissez un type de projet.'),
  message: z.string().min(20, 'Expliquez brièvement votre besoin.'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactFormSection() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', projectType: '', message: '' },
  });

  const onSubmit = async () => {
    setSuccess(true);
    reset();
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-8">
          <SectionLabel label="Informations" title="Parlez-nous de votre besoin." />
          <div className="grid gap-5 rounded-[1.75rem] border border-[var(--border)] bg-white/[0.02] p-6 text-sm leading-7 text-[var(--muted)]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Adresse</p>
              <p className="mt-2">{site.address}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Téléphone</p>
              <p className="mt-2">{site.phone}</p>
              <p>{site.secondaryPhone}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">Email</p>
              <p className="mt-2">{site.email}</p>
              <p>{site.hours}</p>
            </div>
          </div>
        </div>

        <form className="rounded-[1.75rem] border border-[var(--border)] bg-white/[0.02] p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom" error={errors.name?.message}>
              <input {...register('name')} className={inputClass} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input type="email" {...register('email')} className={inputClass} />
            </Field>
            <Field label="Téléphone" error={errors.phone?.message}>
              <input type="tel" {...register('phone')} className={inputClass} />
            </Field>
            <Field label="Type de projet" error={errors.projectType?.message}>
              <select {...register('projectType')} className={inputClass} defaultValue="">
                <option value="" disabled>
                  Sélectionner
                </option>
                <option value="Conception architecturale">Conception architecturale</option>
                <option value="Réalisation & exécution">Réalisation & exécution</option>
                <option value="Design intérieur">Design intérieur</option>
                <option value="Branding & identité">Branding & identité</option>
              </select>
            </Field>
          </div>

          <Field label="Message" error={errors.message?.message} className="mt-5">
            <textarea {...register('message')} className={inputClass} rows={7} />
          </Field>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button type="submit" variant="primary" className="min-w-40" onClick={undefined}>
              {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
            </Button>
            {success ? <p className="text-sm text-[var(--accent)]">Merci. Votre message a bien été envoyé.</p> : <p className="text-sm text-[var(--muted)]">Réponse sous 24h ouvrées.</p>}
          </div>
        </form>
      </Container>
    </section>
  );
}

const inputClass =
  'mt-2 w-full rounded-[1rem] border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]';

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={className}>
      <span className="text-sm text-[var(--foreground)]">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-[#d99191]">{error}</span> : null}
    </label>
  );
}
