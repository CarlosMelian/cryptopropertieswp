import Link from "next/link";
import { Linkedin, Instagram, Twitter, Mail, MapPin } from "lucide-react";
import { BridgeMark } from "@/components/ui/BridgeMark";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#trust" },
      { label: "Why Uruguay", href: "#why-uruguay" },
      { label: "Our Process", href: "#process" },
      { label: "Insights", href: "#insights" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Buy With Crypto", href: "#services" },
      { label: "Sell To Crypto Investors", href: "#services" },
      { label: "Crypto Wealth Advisory", href: "#services" },
      { label: "Residency & Relocation", href: "#services" },
      { label: "Private Investor Network", href: "#services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Compliance Disclosures", href: "/legal/compliance" },
      { label: "Risk Disclosure", href: "/legal/risk" },
    ],
  },
];

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-graphite-border bg-void">
      <div className="mx-auto max-w-8xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-ink">
              <BridgeMark className="h-7 w-7 text-gold" />
              <span className="font-display text-base tracking-wide">
                CryptoProperties Uruguay
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink-muted">
              The bridge between crypto wealth and Uruguayan real estate.
              Legal, secure, and built for the modern investor.
            </p>
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:contact@cryptoproperties.uy"
                className="flex items-center gap-2.5 font-body text-sm text-ink-muted transition-colors hover:text-gold-bright"
              >
                <Mail className="h-4 w-4 text-gold" />
                contact@cryptoproperties.uy
              </a>
              <div className="flex items-center gap-2.5 font-body text-sm text-ink-muted">
                <MapPin className="h-4 w-4 text-gold" />
                Montevideo, Uruguay
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
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
            © {new Date().getFullYear()} CryptoProperties Uruguay. All rights reserved.
          </p>
          <p className="max-w-xl font-body text-xs text-ink-faint">
            CryptoProperties Uruguay is an advisory firm and does not provide
            investment, legal, or tax advice. All transactions are subject to
            independent legal, notarial, and tax review.
          </p>
        </div>
      </div>
    </footer>
  );
}
