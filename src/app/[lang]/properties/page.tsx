import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Lock } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { BridgeMark } from "@/components/ui/BridgeMark";
import { PropertyCatalog, PropertyCatalogFromUrl } from "@/components/properties/PropertyCatalog";
import { getAllProperties } from "@/lib/properties";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, languageAlternates } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/properties">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang).properties;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${lang}/properties`, languages: languageAlternates("/properties") },
    openGraph: {
      title: `${meta.title} | ${siteConfig.name}`,
      description: meta.ogDescription,
      url: `/${lang}/properties`,
    },
  };
}

export default async function PropertiesPage({ params }: PageProps<"/[lang]/properties">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).properties;
  const properties = getAllProperties(lang);

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
            <SectionEyebrow align="center">{t.hero.eyebrow}</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              {t.hero.titleLead}{" "}
              <span className="bg-gradient-to-r from-gold-bright to-gold bg-clip-text italic text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-balance font-body text-base leading-relaxed text-ink-muted sm:text-lg">
              {t.hero.subtitle}
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
                    {t.offMarket.badge}
                  </span>
                </div>
                <h2 className="mt-6 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl">
                  {t.offMarket.title}
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">{t.offMarket.text}</p>
              </div>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t.offMarket.emailSubject)}`}
                className={buttonVariants({ size: "lg", className: "self-start lg:self-auto" })}
              >
                {t.offMarket.cta}
                <ArrowUpRight className="h-4 w-4 text-void transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
