"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ArrowUpRight, Coins, FileCheck2, MessageCircle, Scale, ShieldCheck } from "lucide-react";
import type { ContactMethod, InquiryIntent, PropertyStatus } from "@/types";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { BridgeMark } from "@/components/ui/BridgeMark";
import { formatPrice, propertyStatusLabels } from "@/lib/properties";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { InquiryDialog, type InquiryProperty } from "./InquiryDialog";

/* -------------------------------- Context -------------------------------- */

interface InquiryContextValue {
  property: InquiryProperty & { status: PropertyStatus };
  openInquiry: (intent: InquiryIntent, method?: ContactMethod) => void;
  whatsappHref: string | null;
}

const InquiryContext = createContext<InquiryContextValue | null>(null);

function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used inside <PropertyInquiryProvider>");
  return ctx;
}

export function PropertyInquiryProvider({
  property,
  children,
}: {
  property: InquiryProperty & { status: PropertyStatus };
  children: React.ReactNode;
}) {
  const [state, setState] = useState<{ open: boolean; intent: InquiryIntent; method: ContactMethod }>({
    open: false,
    intent: "information",
    method: "email",
  });

  const openInquiry = useCallback((intent: InquiryIntent, method: ContactMethod = "email") => {
    setState({ open: true, intent, method });
  }, []);

  const value = useMemo<InquiryContextValue>(
    () => ({
      property,
      openInquiry,
      whatsappHref: whatsappLink(
        `Hello CryptoProperties Uruguay, I'm interested in "${property.title}" (${formatPrice(property.price)}).\n${property.url}`
      ),
    }),
    [property, openInquiry]
  );

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <InquiryDialog
        open={state.open}
        intent={state.intent}
        defaultContactMethod={state.method}
        property={property}
        onClose={() => setState((s) => ({ ...s, open: false }))}
      />
    </InquiryContext.Provider>
  );
}

/* ------------------------------- WhatsApp -------------------------------- */

function WhatsAppButton({ className }: { className?: string }) {
  const { whatsappHref, openInquiry } = useInquiry();
  const classes = buttonVariants({ variant: "secondary", size: "lg", className });
  const content = (
    <>
      <MessageCircle className="h-4 w-4 text-gold" aria-hidden />
      Contact via WhatsApp
    </>
  );

  if (whatsappHref) {
    return (
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  // No WhatsApp number configured: collect the lead and flag WhatsApp as preferred.
  return (
    <button type="button" onClick={() => openInquiry("information", "whatsapp")} className={classes}>
      {content}
    </button>
  );
}

/* ------------------------------ Contact card ----------------------------- */

export function PropertyContactCard() {
  const { property, openInquiry } = useInquiry();

  return (
    <aside aria-label="Contact about this property" className="glass-panel relative overflow-hidden rounded-3xl p-7 shadow-glass sm:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-line opacity-60" />

      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint">Asking price</span>
        <span
          className={cn(
            "rounded-full px-3 py-1 font-mono text-[0.625rem] uppercase tracking-widest2",
            property.status === "available" && "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
            property.status === "under-offer" && "border border-gold/40 bg-gold/10 text-gold-bright",
            property.status === "sold" && "border border-white/10 bg-white/5 text-ink-muted"
          )}
        >
          {propertyStatusLabels[property.status]}
        </span>
      </div>
      <p className="mt-2 font-display text-4xl text-ink">
        {formatPrice(property.price)}
        <span className="ml-2 font-mono text-xs tracking-widest2 text-ink-faint">USD</span>
      </p>

      <div className="my-7 h-px bg-graphite-border" />

      <h2 className="font-display text-xl text-ink">Interested in this property?</h2>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
        Request the full information pack, arrange a private viewing or a video walkthrough with one of our advisors.
      </p>

      <div className="mt-7 flex flex-col gap-3">
        <button type="button" onClick={() => openInquiry("information")} className={buttonVariants({ size: "lg", className: "w-full" })}>
          Request Information
          <ArrowUpRight className="h-4 w-4 text-void transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </button>
        <WhatsAppButton className="w-full" />
      </div>

      <p className="mt-6 flex items-start gap-2.5 font-body text-xs leading-relaxed text-ink-faint">
        <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-gold/80" aria-hidden />
        A CryptoProperties Uruguay advisor will contact you personally. Your inquiry is handled confidentially.
      </p>
    </aside>
  );
}

/* ---------------------------- Crypto purchase ---------------------------- */

const cryptoSteps = [
  {
    icon: FileCheck2,
    title: "Source-of-funds review",
    text: "We prepare the documentation that traces your digital assets, as required by Uruguayan AML regulations.",
  },
  {
    icon: Coins,
    title: "Settlement path",
    text: "Where the seller does not accept crypto directly, we coordinate a compliant conversion and settlement.",
  },
  {
    icon: Scale,
    title: "Legal & notarial closing",
    text: "Independent attorneys and a Uruguayan notary review the contract and execute the transfer.",
  },
];

export function CryptoPurchaseSection() {
  const { openInquiry } = useInquiry();

  return (
    <section aria-labelledby="crypto-purchase-heading" className="glass-panel-gold relative overflow-hidden rounded-3xl p-7 sm:p-10">
      <BridgeMark className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 text-gold opacity-[0.05]" />

      <div className="relative">
        <p className="eyebrow">Crypto Acquisitions</p>
        <h2 id="crypto-purchase-heading" className="mt-4 max-w-xl text-balance font-display text-2xl leading-snug text-ink sm:text-3xl">
          Interested in purchasing this property with cryptocurrency?
        </h2>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-muted">
          Our team can guide you through the process of acquiring real estate in Uruguay using cryptocurrency,
          subject to applicable legal and compliance requirements.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {cryptoSteps.map((s) => (
            <li key={s.title} className="rounded-2xl border border-gold/15 bg-void/40 p-5">
              <s.icon className="h-5 w-5 text-gold" aria-hidden />
              <h3 className="mt-4 font-body text-sm font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 font-body text-xs leading-relaxed text-ink-muted">{s.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-body text-xs leading-relaxed text-ink-faint">
            Not every seller accepts cryptocurrency directly. Payment arrangements are coordinated on a
            case-by-case basis and are subject to the seller&apos;s agreement and regulatory review.
          </p>
          <button
            type="button"
            onClick={() => openInquiry("crypto")}
            className={buttonVariants({ variant: "secondary", size: "lg", className: "shrink-0 border-gold/40" })}
          >
            Discuss a Crypto Purchase
            <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Mobile action bar --------------------------- */

export function MobileInquiryBar() {
  const { property, openInquiry } = useInquiry();
  return (
    <div data-mobile-inquiry-bar className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-void/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="block font-mono text-[0.5625rem] uppercase tracking-widest2 text-ink-faint">Asking price</span>
          <span className="block truncate font-display text-lg text-ink">{formatPrice(property.price)}</span>
        </div>
        <button type="button" onClick={() => openInquiry("information")} className={buttonVariants({ className: "px-5" })}>
          Request Information
        </button>
      </div>
    </div>
  );
}
