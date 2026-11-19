import Link from "next/link";
import { Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import { BridgeMark } from "@/components/ui/BridgeMark";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonDict } from "@/i18n/dictionaries";
import { parentCompany, siteConfig } from "@/lib/site";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/uycryptomonedas", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/uycryptomonedas", label: "Instagram" },
];

export function Footer({ lang, dict }: { lang: Locale; dict: CommonDict }) {
  const t = dict.footer;
  const l = t.links;
  const p = (path: string) => localePath(lang, path);

  const columns = [
    {
      title: t.company,
      links: [
        { label: l.about, href: p("/#trust") },
        { label: l.whyUruguay, href: p("/#why-uruguay") },
        { label: l.process, href: p("/#process") },
        { label: l.insights, href: p("/#insights") },
        { label: l.properties, href: p("/properties") },
      ],
    },
    {
      title: t.services,
      links: [
        { label: l.buyWithCrypto, href: p("/#services") },
        { label: l.sellToCrypto, href: p("/#services") },
        { label: l.wealthAdvisory, href: p("/#services") },
        { label: l.residency, href: p("/#services") },
        { label: l.network, href: p("/#services") },
      ],
    },
    {
      title: t.legal,
      links: [
        { label: l.privacy, href: p("/legal/privacy") },
        { label: l.terms, href: p("/legal/terms") },
        { label: l.compliance, href: p("/legal/compliance") },
        { label: l.risk, href: p("/legal/risk") },
      ],
    },
  ];

  return (
    <footer id="contact" className="relative border-t border-graphite-border bg-void">
      <div className="mx-auto max-w-8xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href={p("/")} className="flex items-center gap-2.5 text-ink">
              <BridgeMark className="h-7 w-7 text-gold" />
              <span className="font-display text-base tracking-wide">
                CryptoProperties Uruguay
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink-muted">
              {t.tagline}
            </p>
            <p className="mt-4 max-w-xs font-body text-xs leading-relaxed text-ink-faint">
              {t.parentPrefix}{" "}
              <a
                href={parentCompany.url}
                target="_blank"
                rel="noopener"
                className="font-medium text-gold-bright underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold"
              >
                {parentCompany.name}
              </a>
              . {t.parentDescription}
            </p>
            <div className="mt-6 space-y-2.5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 font-body text-sm text-ink-muted transition-colors hover:text-gold-bright"
              >
                <Mail className="h-4 w-4 text-gold" />
                {siteConfig.email}
              </a>
              <div className="flex items-center gap-2.5 font-body text-sm text-ink-muted">
                <MapPin className="h-4 w-4 text-gold" />
                {t.location}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite-border text-ink-muted transition-colors hover:border-gold/40 hover:text-gold-bright"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-ink-muted transition-colors hover:text-gold-bright"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-graphite-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-ink-faint">
            © {new Date().getFullYear()} CryptoProperties Uruguay. {t.rights}
          </p>
          <p className="max-w-xl font-body text-xs text-ink-faint">{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
