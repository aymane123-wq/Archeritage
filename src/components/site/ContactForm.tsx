'use client';

const requestTypes = ['Projet architectural', 'Projet patrimonial', 'Réhabilitation / restauration', 'Lotissement / projet urbain', 'Assistance à maîtrise d’ouvrage', 'Audit / redressement de projet', 'Gouvernance documentaire', 'Valorisation territoriale', 'Partenariat', 'Presse / intervention', 'Autre'];
const projectStages = ['Idée / opportunité', 'Études préalables', 'Programmation', 'Conception', 'Consultation', 'Chantier', 'Projet en difficulté', 'Réception / clôture', 'Autre'];
const fields = ['Nom et prénom', 'Organisation / société', 'Fonction', 'Email', 'Téléphone', 'Localisation du projet'];
const fieldClass = 'mt-2 min-h-12 w-full rounded-[0.15rem] border border-[var(--border)] bg-[#0b0b09]/60 px-4 text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]';

export function ContactForm() {
  return (
    <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {fields.slice(0, 5).map((field) => <label key={field}>{field}<input className={fieldClass} name={field} type={field === 'Email' ? 'email' : field === 'Téléphone' ? 'tel' : 'text'} required={field === 'Nom et prénom' || field === 'Email'} /></label>)}
        <label>Type de demande<select className={fieldClass} name="Type de demande" defaultValue="" required><option value="" disabled>Type de demande</option>{requestTypes.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label>{fields[5]}<input className={fieldClass} name={fields[5]} type="text" /></label>
        <label>Stade du projet<select className={fieldClass} name="Stade du projet" defaultValue=""><option value="" disabled>Stade du projet</option>{projectStages.map((option) => <option key={option}>{option}</option>)}</select></label>
      </div>
      <label>Votre message<textarea className={`${fieldClass} min-h-44 py-3`} name="Votre message" required /></label>
      <label>Pièce jointe<input className="contact-file" name="Pièce jointe" type="file" /></label>
      <div className="flex flex-col items-start gap-5 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>Les informations transmises via ce formulaire sont utilisées uniquement pour traiter votre demande et organiser, le cas échéant, un premier échange avec Archeritage.</p>
        <button type="submit" className="button-primary shrink-0">Envoyer ma demande</button>
      </div>
    </form>
  );
}
