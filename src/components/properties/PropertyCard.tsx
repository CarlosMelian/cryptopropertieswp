"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, LandPlot, MapPin, Ruler } from "lucide-react";
import type { Property } from "@/types";
import { formatLocation, formatNumber, formatPrice } from "@/lib/properties";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const { slug, title, mainImage, location, price, shortDescription, type, status } = property;
  const { lang, properties: t } = useI18n();

  const specs = [
    property.bedrooms !== undefined && { icon: BedDouble, label: `${property.bedrooms} ${t.card.bedroomsShort}`, title: t.facts.bedrooms },
    property.bathrooms !== undefined && { icon: Bath, label: `${property.bathrooms} ${t.card.bathroomsShort}`, title: t.facts.bathrooms },
    property.builtArea !== undefined && { icon: Ruler, label: `${formatNumber(property.builtArea, lang)} m²`, title: t.facts.builtArea },
    property.builtArea === undefined &&
      property.landArea !== undefined && { icon: LandPlot, label: `${formatNumber(property.landArea, lang)} m²`, title: t.facts.landArea },
  ].filter(Boolean) as { icon: typeof Ruler; label: string; title: string }[];

  return (
    <Link
      href={localePath(lang, `/properties/${slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-graphite-border bg-graphite/40 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-glass focus-visible:border-gold/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30rem, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-void/0 to-void/10" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-void/60 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-widest2 text-ink backdrop-blur-md">
            {t.types[type]}
          </span>
          {status !== "available" && (
            <span
              className={cn(
                "rounded-full px-3 py-1 font-mono text-[0.625rem] uppercase tracking-widest2 backdrop-blur-md",
                status === "under-offer" && "border border-gold/40 bg-gold/15 text-gold-bright",
                status === "sold" && "border border-white/10 bg-void/70 text-ink-muted"
              )}
            >
              {t.status[status]}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold/80" aria-hidden />
          <span className="truncate">{formatLocation(location)}</span>
        </p>

        <h3 className="mt-3 font-display text-xl leading-snug text-ink transition-colors duration-300 group-hover:text-gold-bright sm:text-[1.375rem]">
          {title}
        </h3>

        <p className="mt-3 line-clamp-2 font-body text-sm leading-relaxed text-ink-muted">
          {shortDescription}
        </p>

        <div className="mt-auto pt-6">
          {specs.length > 0 && (
            <ul className="mb-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-graphite-border pt-5">
              {specs.map((s) => (
                <li key={s.title} title={s.title} className="flex items-center gap-1.5 font-body text-xs text-ink-muted">
                  <s.icon className="h-3.5 w-3.5 text-gold/70" aria-hidden />
                  <span className="sr-only">{s.title}: </span>
                  {s.label}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
            <div>
              <span className="block font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint">
                {t.card.askingPrice}
              </span>
              <span className="mt-1 block font-display text-2xl text-ink">
                {formatPrice(price, lang)}
                {lang === "en" && <span className="ml-1.5 font-mono text-[0.625rem] tracking-widest2 text-ink-faint">USD</span>}
              </span>
            </div>
            <span className="flex items-center gap-1.5 whitespace-nowrap pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint transition-colors duration-300 group-hover:text-gold-bright">
              {t.card.viewProperty}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
