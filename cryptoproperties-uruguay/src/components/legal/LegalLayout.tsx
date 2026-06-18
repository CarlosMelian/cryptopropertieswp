import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <main className="relative min-h-screen bg-void px-6 pb-32 pt-36 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04]" />

      <div className="relative mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-ink-faint transition-colors hover:text-gold-bright"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back To Homepage
        </Link>

        <p className="eyebrow mt-10">{eyebrow}</p>
        <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 font-body text-sm text-ink-faint">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-8 flex gap-3 rounded-2xl border border-gold/25 bg-gold/[0.06] p-5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="font-body text-sm leading-relaxed text-ink-muted">
            This page is placeholder template content prepared for design and
            structural purposes only. It does not constitute legal, tax, or
            investment advice and must be reviewed and finalized by a
            licensed Uruguayan attorney and compliance professional before
            this site is published or used to onboard real clients.
          </p>
        </div>

        <div className="legal-prose mt-12 space-y-8 font-body text-[0.95rem] leading-relaxed text-ink-muted">
          {children}
        </div>

        <div className="mt-16 border-t border-graphite-border pt-8">
          <p className="font-body text-xs text-ink-faint">
            Questions about this policy? Contact us at{" "}
            <a
              href="mailto:contact@cryptoproperties.uy"
              className="text-gold-bright hover:underline"
            >
              contact@cryptoproperties.uy
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
