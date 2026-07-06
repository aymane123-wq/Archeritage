import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { footerGroups, socialLinks } from '@/data/footer';
import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#0b0b09] text-[var(--foreground)]">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">ARCHERITAGE</p>
            <p className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-[var(--light)] sm:text-5xl lg:text-6xl">
              Architecture, intérieur et identité pour des lieux durables et précis.
            </p>
            <p className="max-w-lg text-sm leading-7 text-[var(--muted)]">{site.description}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">{group.title}</h2>
                <div className="grid gap-3 text-sm text-[var(--muted)]">
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} className="transition-colors hover:text-[var(--foreground)]">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div className="space-y-2 text-sm text-[var(--muted)]">
            <p>{site.email}</p>
            <p>{site.phone} · {site.secondaryPhone}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-[var(--foreground)]" target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
          <div className="text-sm text-[var(--muted)]">
            <p>{site.address}</p>
            <p className="mt-2">© 2026 {site.legalName}. Tous droits réservés.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
