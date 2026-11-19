"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, LoaderCircle, Mail, ShieldCheck, X } from "lucide-react";
import type { ContactMethod, InquiryIntent } from "@/types";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { formatPrice } from "@/lib/properties";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface InquiryProperty {
  slug: string;
  title: string;
  price: number;
  url: string;
}

interface InquiryDialogProps {
  open: boolean;
  intent: InquiryIntent;
  defaultContactMethod: ContactMethod;
  property: InquiryProperty;
  onClose: () => void;
}

const copy: Record<InquiryIntent, { eyebrow: string; heading: string; message: string; submit: string }> = {
  information: {
    eyebrow: "Request Information",
    heading: "Interested in this property?",
    message: "",
    submit: "Send Request",
  },
  crypto: {
    eyebrow: "Crypto Purchase Inquiry",
    heading: "Discuss a crypto purchase",
    message:
      "I would like to understand how I could acquire this property using cryptocurrency.",
    submit: "Send Inquiry",
  },
};

const methods: { value: ContactMethod; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
];

const methodPhrase: Record<ContactMethod, string> = {
  email: "by email",
  phone: "by phone",
  whatsapp: "on WhatsApp",
};

type Status = "idle" | "submitting" | "success" | "error";

const label = "mb-2 block font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint";
const input =
  "h-12 w-full rounded-xl border border-graphite-border bg-void/60 px-4 font-body text-sm text-ink transition-colors placeholder:text-ink-faint/70 hover:border-white/15 focus:border-gold/50 focus:outline-none focus-visible:outline-none";

export function InquiryDialog({ open, intent, defaultContactMethod, property, onClose }: InquiryDialogProps) {
  const ids = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const [method, setMethod] = useState<ContactMethod>(defaultContactMethod);
  const c = copy[intent];

  useModalBehavior(open, onClose);

  // Reset each time the dialog opens.
  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setError(null);
    setMethod(defaultContactMethod);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open, defaultContactMethod]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      preferredContact: method,
      message: String(data.get("message") ?? "").trim(),
      intent,
      propertySlug: property.slug,
      website: String(data.get("website") ?? ""), // honeypot
    };

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "We could not send your request.");
      }
      setSubmittedName(payload.fullName.split(/\s+/)[0] ?? "");
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send your request.");
      setStatus("error");
    }
  }

  const mailtoFallback = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `${c.eyebrow}: ${property.title}`
  )}&body=${encodeURIComponent(`Property: ${property.title}\n${property.url}\n\n`)}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-void/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${ids}-title`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-graphite-border bg-graphite shadow-glass sm:max-w-xl sm:rounded-3xl"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-line opacity-60" />

            <div className="flex items-start justify-between gap-6 border-b border-graphite-border px-6 py-6 sm:px-8">
              <div className="min-w-0">
                <p className="eyebrow">{c.eyebrow}</p>
                <h2 id={`${ids}-title`} className="mt-3 font-display text-2xl leading-tight text-ink">
                  {status === "success" ? "Request received" : c.heading}
                </h2>
                <p className="mt-2 truncate font-body text-sm text-ink-muted">
                  {property.title} · <span className="text-ink">{formatPrice(property.price)}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-colors hover:border-gold/40 hover:text-gold-bright"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {status === "success" ? (
              <div className="px-6 py-12 text-center sm:px-8">
                <CircleCheck className="mx-auto h-12 w-12 text-gold" strokeWidth={1.25} aria-hidden />
                <h3 className="mt-6 font-display text-2xl text-ink">
                  Thank you{submittedName ? `, ${submittedName}` : ""}.
                </h3>
                <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed text-ink-muted">
                  A CryptoProperties Uruguay advisor will contact you {methodPhrase[method]} regarding{" "}
                  <span className="text-ink">{property.title}</span>.
                </p>
                <button type="button" onClick={onClose} className={buttonVariants({ variant: "secondary", className: "mt-8" })}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5 px-6 py-7 sm:px-8" noValidate={false}>
                {/* Honeypot: hidden from people, tempting for bots */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label htmlFor={`${ids}-website`}>Website</label>
                  <input id={`${ids}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor={`${ids}-name`} className={label}>
                    Full name
                  </label>
                  <input
                    ref={firstFieldRef}
                    id={`${ids}-name`}
                    name="fullName"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                    className={input}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${ids}-email`} className={label}>
                      Email
                    </label>
                    <input
                      id={`${ids}-email`}
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      className={input}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${ids}-phone`} className={label}>
                      Phone / WhatsApp
                    </label>
                    <input
                      id={`${ids}-phone`}
                      name="phone"
                      type="tel"
                      required
                      minLength={6}
                      maxLength={30}
                      pattern="[0-9+()\-.\s]{6,30}"
                      title="Include your country code, e.g. +1 555 123 4567"
                      placeholder="+1 555 123 4567"
                      autoComplete="tel"
                      className={input}
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className={label}>Preferred contact method</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {methods.map((m) => (
                      <label
                        key={m.value}
                        className={cn(
                          "flex h-11 cursor-pointer items-center justify-center rounded-xl border px-2 text-center font-body text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                          method === m.value
                            ? "border-gold/60 bg-gold/10 text-gold-bright"
                            : "border-graphite-border bg-void/40 text-ink-muted hover:border-white/15"
                        )}
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value={m.value}
                          checked={method === m.value}
                          onChange={() => setMethod(m.value)}
                          className="sr-only"
                        />
                        {m.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor={`${ids}-message`} className={label}>
                    Message <span className="normal-case tracking-normal text-ink-faint/70">(optional)</span>
                  </label>
                  <textarea
                    id={`${ids}-message`}
                    name="message"
                    rows={4}
                    maxLength={2000}
                    defaultValue={c.message}
                    placeholder="Questions, preferred viewing dates, or anything we should know."
                    className={cn(input, "h-auto resize-none py-3 leading-relaxed")}
                  />
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-gold/15 bg-gold-mist px-4 py-3.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  <p className="font-body text-xs leading-relaxed text-ink-muted">
                    A member of the CryptoProperties Uruguay team will contact you personally to follow up on
                    this inquiry. Your details are handled confidentially in line with our{" "}
                    <Link href="/legal/privacy" className="text-gold-bright underline decoration-gold/40 underline-offset-2">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>

                {status === "error" && (
                  <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3.5 font-body text-sm text-ink">
                    <p>{error}</p>
                    <a
                      href={mailtoFallback}
                      className="mt-2 inline-flex items-center gap-1.5 text-gold-bright underline decoration-gold/40 underline-offset-2"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden />
                      Email us directly at {siteConfig.email}
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={buttonVariants({ size: "lg", className: "w-full" })}
                >
                  {status === "submitting" ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    c.submit
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
