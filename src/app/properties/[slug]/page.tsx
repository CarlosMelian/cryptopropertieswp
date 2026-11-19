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
  getAllProperties,
  getPropertyBySlug,
  getPropertyImages,
  getRelatedProperties,
  propertyStatusLabels,
  propertyTypeLabels,
} from "@/lib/properties";
import { propertyUrl, siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const title = `${property.title} | ${formatPrice(property.price)}`;
  const description = `${property.shortDescription} ${propertyTypeLabels[property.type]} in ${formatLocation(property.location)}.`;

  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description: property.shortDescription,
      url: `/properties/${property.slug}`,
      images: [{ url: property.mainImage.src, width: 2400, height: 1600, alt: property.mainImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: property.shortDescription,
      images: [property.mainImage.src],
    },
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const images = getPropertyImages(property);
  const related = getRelatedProperties(property);
  const url = propertyUrl(property.slug);

  const facts = [
    { icon: House, label: "Type", value: propertyTypeLabels[property.type] },
    property.bedrooms !== undefined && { icon: BedDouble, label: "Bedrooms", value: String(property.bedrooms) },
    property.bathrooms !== undefined && { icon: Bath, label: "Bathrooms", value: String(property.bathrooms) },
    property.builtArea !== undefined && { icon: Ruler, label: "Built area", value: formatArea(property.builtArea) },
    property.landArea !== undefined && { icon: LandPlot, label: "Land area", value: formatArea(property.landArea) },
  ].filter(Boolean) as { icon: typeof House; label: string; value: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.shortDescription,
    url,
    image: images.map((i) => i.src),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability:
        property.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      seller: { "@type": "RealEstateAgent", name: siteConfig.name, url: siteConfig.url },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article className="relative overflow-hidden bg-void">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[140px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-8xl px-6 pt-32 sm:px-10 sm:pt-36 lg:px-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
            <Link href="/properties" className="group inline-flex items-center gap-2 transition-colors hover:text-gold-bright">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
              All Properties
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
                <span className="eyebrow">{propertyTypeLabels[property.type]}</span>
                {property.status !== "available" && (
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 font-mono text-[0.625rem] uppercase tracking-widest2 text-gold-bright">
                    {propertyStatusLabels[property.status]}
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
              <span className="block font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint">Asking price</span>
              <span className="mt-1 block font-display text-3xl text-ink sm:text-4xl">
                {formatPrice(property.price)}
                <span className="ml-2 font-mono text-xs tracking-widest2 text-ink-faint">USD</span>
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
              <section aria-label="Key facts">
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]">
                  {facts.map((f) => (
                    <div key={f.label} className="rounded-2xl border border-graphite-border bg-graphite/40 px-5 py-5">
                      <dt className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
                        <f.icon className="h-3.5 w-3.5 text-gold/80" aria-hidden />
                        {f.label}
                      </dt>
                      <dd className="mt-2 font-display text-lg text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Description */}
              <section aria-labelledby="about-heading">
                <SectionEyebrow>About the property</SectionEyebrow>
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
                  <SectionEyebrow>Features & Amenities</SectionEyebrow>
                  <h2 id="amenities-heading" className="sr-only">
                    Features and amenities
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
                  <SectionEyebrow>Continue exploring</SectionEyebrow>
                  <h2 id="related-heading" className="mt-5 font-display text-2xl text-ink sm:text-3xl">
                    You may also consider
                  </h2>
                </div>
                <Link
                  href="/properties"
                  className="hidden whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-gold-bright sm:block"
                >
                  View all properties →
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
