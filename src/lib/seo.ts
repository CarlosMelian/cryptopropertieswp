import type { Metadata } from "next";
import { languageAlternates, localeTags, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { parentCompany, siteConfig } from "@/lib/site";

interface PageSeo {
  lang: Locale;
  /** Path without the locale, e.g. "/properties" ("" for the home page). */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is instead of appending " | CryptoProperties Uruguay". */
  absoluteTitle?: boolean;
  /** Defaults to the branded share image for the locale. */
  image?: { url: string; width: number; height: number; alt: string };
}

/**
 * Complete metadata for one page in one language. Next merges `openGraph`
 * shallowly, so every page builds the whole object here to avoid losing the
 * share image, URL or locale defined higher up.
 */
export function pageMetadata({ lang, path, title, description, absoluteTitle, image }: PageSeo): Metadata {
  const { meta } = getDictionary(lang);
  const url = `/${lang}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const ogImage = image ?? {
    url: `/api/og/${lang}`,
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${meta.ogTagline}`,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: localeTags[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeTags[l].og),
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

/* ---------------------------- Structured data ---------------------------- */

export const ids = {
  organization: `${siteConfig.url}/#organization`,
  parent: `${parentCompany.url}/#organization`,
  website: `${siteConfig.url}/#website`,
};

/** Organization + parent company + website, included on every page. */
export function siteJsonLd(lang: Locale) {
  const { meta } = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": ids.organization,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        description: meta.schemaDescription,
        image: `${siteConfig.url}/api/og/en`,
        logo: `${siteConfig.url}/icon.svg`,
        areaServed: { "@type": "Country", name: "Uruguay" },
        address: { "@type": "PostalAddress", addressLocality: "Montevideo", addressCountry: "UY" },
        knowsLanguage: ["en", "es", "pt"],
        parentOrganization: { "@id": ids.parent },
      },
      {
        "@type": "Organization",
        "@id": ids.parent,
        name: parentCompany.name,
        url: parentCompany.url,
        sameAs: parentCompany.sameAs,
        subOrganization: { "@id": ids.organization },
        address: parentCompany.offices.map((city) => ({
          "@type": "PostalAddress",
          addressLocality: city,
          addressCountry: "UY",
        })),
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: ["en", "es", "pt-BR"],
        publisher: { "@id": ids.organization },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/** Safe JSON for <script type="application/ld+json">. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
