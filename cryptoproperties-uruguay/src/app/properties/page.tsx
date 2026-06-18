import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Mail, ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Property Portfolio",
  description:
    "Our curated portfolio of premium Uruguayan real estate is available exclusively to verified clients. Schedule a private consultation to request access.",
};

export default function PropertiesPage() {
  return (
    <main className="relative overflow-hidden bg-void px-6 pb-32 pt-40 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionEyebrow align="center">Property Portfolio</SectionEyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-8 font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
            Our Portfolio Is Reserved For{" "}
            <span className="bg-gradient-to-r from-gold-bright to-gold bg-clip-text text-transparent">
              Verified Clients
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-balance font-body text-base leading-relaxed text-ink-muted sm:text-lg">
            To protect the privacy of sellers and the integrity of our private
            investor network, our curated selection of Uruguayan properties is
            shared directly with clients following an initial consultation
            and verification step.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 inline-flex items-center gap-3 rounded-full border border-graphite-border bg-graphite/60 px-5 py-2.5">
            <Lock className="h-4 w-4 text-gold" />
            <span className="font-mono text-xs uppercase tracking-widest2 text-ink-faint">
              Access By Verification Only
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-b from-gold-bright to-gold px-8 py-4 text-[0.95rem] font-body font-medium text-void shadow-gold-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold"
            >
              Request Portfolio Access
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full glass-panel px-8 py-4 text-[0.95rem] font-body font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40"
            >
              Back To Homepage
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mx-auto mt-20 flex max-w-md items-center justify-center gap-3 border-t border-graphite-border pt-8 font-mono text-xs text-ink-faint">
            <Mail className="h-3.5 w-3.5 text-gold/70" />
            <span>contact@cryptoproperties.uy</span>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
