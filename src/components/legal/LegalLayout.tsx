import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { format, localePath, type Locale } from "@/i18n/config";
import type { Dictionary, LegalDoc } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

interface LegalLayoutProps {
  lang: Locale;
  common: Dictionary["legal"]["common"];
  doc: LegalDoc;
}

export function LegalLayout({ lang, common, doc }: LegalLayoutProps) {
  return (
    <div className="relative min-h-screen bg-void px-6 pb-32 pt-36 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04]" />

      <div className="relative mx-auto max-w-3xl">
        <Link
          href={localePath(lang)}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-ink-faint transition-colors hover:text-gold-bright"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {common.back}
        </Link>

        <p className="eyebrow mt-10">{common.eyebrow}</p>
        <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 font-body text-sm text-ink-faint">
          {format(common.lastUpdated, { date: doc.lastUpdated })}
        </p>

        <div className="mt-8 flex gap-3 rounded-2xl border border-gold/25 bg-gold/[0.06] p-5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="font-body text-sm leading-relaxed text-ink-muted">{common.notice}</p>
        </div>

        <div className="legal-prose mt-12 space-y-8 font-body text-[0.95rem] leading-relaxed text-ink-muted">
          {doc.sections.map((section, i) => (
            <section key={i} className="space-y-4">
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
              {section.list && (
                <ul>
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-graphite-border pt-8">
          <p className="font-body text-xs text-ink-faint">
            {common.questions}{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-gold-bright hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
