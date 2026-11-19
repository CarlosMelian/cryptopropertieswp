import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, Check, House, LandPlot, MapPin, Ruler } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import {
  CryptoPurchaseSection,
  MobileInquiryBar,
  PropertyContactCard,
  PropertyInquiryProvider,
} from "@/components/properties/PropertyInquiry";
import {
  formatArea,
  formatLocation,
  formatPrice,
  getPropertyBySlug,
  getPropertyImages,
  getPropertySlugs,
  getRelatedProperties,
} from "@/lib/properties";
import { propertyUrl, siteConfig } from "@/lib/site";
import { getDictionary } from "@/i18n/dictionaries";
import { format, isLocale, localePath, localeTags } from "@/i18n/config";
import { breadcrumbJsonLd, ids, jsonLdString, pageMetadata } from "@/lib/seo";

type Props = PageProps<"/[lang]/properties/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return getPropertySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const property = getPropertyBySlug(slug, lang);
  if (!property) return {};
  const t = getDictionary(lang).properties;
  const price = formatPrice(property.price, lang);

  // e.g. "Apartment for sale in Pocitos, Montevideo, Uruguay: 3 bedrooms, 3 bathrooms, 245 m². Asking price $1,180,000. ..."
  const facts = [
    property.bedrooms !== undefined && `${property.bedrooms} ${t.facts.bedrooms.toLowerCase()}`,
    property.bathrooms !== undefined && `${property.bathrooms} ${t.facts.bathrooms.toLowerCase()}`,
    property.builtArea !== undefined && formatArea(property.builtArea, lang),
    property.builtArea === undefined && property.landArea !== undefined && `${formatArea(property.landArea, lang)} ${t.detail.metaLand}`,
  ].filter(Boolean);
  const description = format(t.detail.metaDescription, {
    type: t.types[property.type],
    location: formatLocation(property.location),
    facts: facts.length ? `: ${facts.join(", ")}` : "",
    price,
  });

  return pageMetadata({
    lang,
    path: `/properties/${property.slug}`,
    title: `${property.title} — ${price}`,
    description,
    image: { url: property.mainImage.src, width: 2400, height: 1600, alt: property.mainImage.alt },
  });
}

export default async function PropertyPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const property = getPropertyBySlug(slug, lang);
  if (!property) notFound();

  const dict = getDictionary(lang);
  const t = dict.properties;
  const images = getPropertyImages(property);
  const related = getRelatedProperties(property, lang);
  const url = propertyUrl(property.slug, lang);

  const facts = [
    { icon: House, label: t.facts.type, value: t.types[property.type] },
    property.bedrooms !== undefined && { icon: BedDouble, label: t.facts.bedrooms, value: String(property.bedrooms) },
    property.bathrooms !== undefined && { icon: Bath, label: t.facts.bathrooms, value: String(property.bathrooms) },
    property.builtArea !== undefined && { icon: Ruler, label: t.facts.builtArea, value: formatArea(property.builtArea, lang) },
    property.landArea !== undefined && { icon: LandPlot, label: t.facts.landArea, value: formatArea(property.landArea, lang) },
  ].filter(Boolean) as { icon: typeof House; label: string; value: string }[];

  const breadcrumb = breadcrumbJsonLd([
    { name: siteConfig.name, path: `/${lang}` },
    { name: dict.common.nav.properties, path: `/${lang}/properties` },
    { name: property.title, path: `/${lang}/properties/${property.slug}` },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.shortDescription,
    url,
    inLanguage: localeTags[lang].html,
    image: images.map((i) => i.src),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability:
        property.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      seller: { "@id": ids.organization },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location.city,
      addressRegion: property.location.department,
      addressCountry: "UY",
    },
  };

  return (
    <PropertyInquiryProvider
      property={{ slug: property.slug, title: property.title, price: property.price, url, status: property.status }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString([jsonLd, breadcrumb]) }}
      />

      <article className="relative overflow-hidden bg-void">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[140px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-8xl px-6 pt-32 sm:px-10 sm:pt-36 lg:px-16">
          {/* Breadcrumb */}
          <nav aria-label={t.detail.breadcrumb} className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
            <Link href={localePath(lang, "/properties")} className="group inline-flex items-center gap-2 transition-colors hover:text-gold-bright">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
              {t.detail.allProperties}
            </Link>
            <span aria-hidden className="text-graphite-border">/</span>
            <span className="truncate text-ink-muted" aria-current="page">
              {property.location.neighborhood}
            </span>
          </nav>

          {/* Title row */}
          <header className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">{t.types[property.type]}</span>
                {property.status !== "available" && (
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 font-mono text-[0.625rem] uppercase tracking-widest2 text-gold-bright">
                    {t.status[property.status]}
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-balance font-display text-3xl font-medium leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
                {property.title}
              </h1>
              <p className="mt-4 flex items-center gap-2 font-body text-base text-ink-muted">
                <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                {formatLocation(property.location, "full")}
              </p>
            </div>
            <div className="lg:text-right">
              <span className="block font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint">{t.card.askingPrice}</span>
              <span className="mt-1 block font-display text-3xl text-ink sm:text-4xl">
                {formatPrice(property.price, lang)}
                {lang === "en" && <span className="ml-2 font-mono text-xs tracking-widest2 text-ink-faint">USD</span>}
              </span>
            </div>
          </header>

          {/* Gallery */}
          <div className="mt-10">
            <PropertyGallery images={images} title={property.title} />
          </div>

          {/* Body */}
          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_26rem]">
            <div className="min-w-0 space-y-14">
              {/* Key facts */}
              <section aria-label={t.detail.keyFacts}>
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]">
                  {facts.map((f) => (
                    <div key={f.label} className="rounded-2xl border border-graphite-border bg-graphite/40 px-5 py-5">
                      <dt className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
                        <f.icon className="h-3.5 w-3.5 shrink-0 text-gold/80" aria-hidden />
                        {f.label}
                      </dt>
                      <dd className="mt-2 font-display text-lg text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Description */}
              <section aria-labelledby="about-heading">
                <SectionEyebrow>{t.detail.about}</SectionEyebrow>
                <h2 id="about-heading" className="mt-5 text-balance font-display text-2xl leading-snug text-ink sm:text-3xl">
                  {property.shortDescription}
                </h2>
                <div className="mt-6 space-y-5 font-body text-base leading-[1.8] text-ink-muted">
                  {property.fullDescription.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <section aria-labelledby="amenities-heading">
                  <SectionEyebrow>{t.detail.amenities}</SectionEyebrow>
                  <h2 id="amenities-heading" className="sr-only">
                    {t.detail.amenities}
                  </h2>
                  <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {property.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-3 border-b border-graphite-border pb-4 font-body text-sm text-ink">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold-mist">
                          <Check className="h-3 w-3 text-gold" aria-hidden />
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Crypto */}
              <Reveal>
                <CryptoPurchaseSection />
              </Reveal>
            </div>

            {/* Sticky contact card */}
            <div className="lg:relative">
              <div className="lg:sticky lg:top-28">
                <PropertyContactCard />
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-24 border-t border-graphite-border pb-28 pt-16">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <SectionEyebrow>{t.detail.relatedEyebrow}</SectionEyebrow>
                  <h2 id="related-heading" className="mt-5 font-display text-2xl text-ink sm:text-3xl">
                    {t.detail.relatedTitle}
                  </h2>
                </div>
                <Link
                  href={localePath(lang, "/properties")}
                  className="hidden whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-gold-bright sm:block"
                >
                  {t.detail.viewAll} →
                </Link>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
                {related.map((p) => (
                  <li key={p.id}>
                    <PropertyCard property={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <MobileInquiryBar />
    </PropertyInquiryProvider>
  );
}
