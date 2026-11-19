import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowUpRight, Lock } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { BridgeMark } from "@/components/ui/BridgeMark";
import { PropertyCatalog, PropertyCatalogFromUrl } from "@/components/properties/PropertyCatalog";
import { getAllProperties } from "@/lib/properties";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Properties For Sale In Uruguay",
  description:
    "A curated portfolio of premium Uruguayan real estate: coastal villas in Punta del Este and José Ignacio, Montevideo residences, countryside chacras and commercial assets. Acquisitions with cryptocurrency guided case by case.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "Properties For Sale In Uruguay | CryptoProperties Uruguay",
    description:
      "Curated premium real estate across Punta del Este, José Ignacio and Montevideo.",
    url: "/properties",
  },
};

export default function PropertiesPage() {
  const properties = getAllProperties();

  return (
    <div className="relative overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
        aria-hidden
      />

      {/* Header */}
      <section className="relative px-6 pb-14 pt-36 sm:px-10 sm:pt-44 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionEyebrow align="center">Property Portfolio</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              Exceptional Properties{" "}
              <span className="bg-gradient-to-r from-gold-bright to-gold bg-clip-text italic text-transparent">
                Across Uruguay
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-balance font-body text-base leading-relaxed text-ink-muted sm:text-lg">
              A curated selection of coastal villas, city residences, countryside estates and
              commercial assets, each reviewed by our team for title clarity and long-term value.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Catalog */}
      <section className="relative px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-8xl">
          <Suspense fallback={<PropertyCatalog properties={properties} />}>
            <PropertyCatalogFromUrl properties={properties} />
          </Suspense>
        </div>
      </section>

      {/* Off-market CTA */}
      <section className="relative px-6 pb-28 sm:px-10 lg:px-16">
        <Reveal>
          <div className="glass-panel-gold relative mx-auto max-w-8xl overflow-hidden rounded-3xl px-8 py-14 sm:px-14 sm:py-16">
            <BridgeMark className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 text-gold opacity-[0.05]" />
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-void/40 px-4 py-1.5">
                  <Lock className="h-3.5 w-3.5 text-gold" aria-hidden />
                  <span className="font-mono text-[0.625rem] uppercase tracking-widest2 text-gold">
                    Private Investor Network
                  </span>
                </div>
                <h2 className="mt-6 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl">
                  Looking for something not listed here?
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">
                  Many of the most interesting opportunities in Uruguay never reach the open
                  market. Tell us what you are looking for and we will share relevant
                  off-market properties following an initial consultation.
                </p>
              </div>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Off-market property search")}`}
                className={buttonVariants({ size: "lg", className: "self-start lg:self-auto" })}
              >
                Request Off-Market Access
                <ArrowUpRight className="h-4 w-4 text-void transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
