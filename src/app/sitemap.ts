import type { MetadataRoute } from "next";
import { localeTags, locales } from "@/i18n/config";
import { getPropertySlugs } from "@/lib/properties";
import { siteConfig } from "@/lib/site";

const legal = ["privacy", "terms", "risk", "compliance"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/properties", priority: 0.9, changeFrequency: "weekly" },
    ...getPropertySlugs().map((slug) => ({ path: `/properties/${slug}`, priority: 0.8, changeFrequency: "weekly" as const })),
    ...legal.map((doc) => ({ path: `/legal/${doc}`, priority: 0.3, changeFrequency: "yearly" as const })),
  ];

  // One entry per page and language, each listing its translations (hreflang).
  return pages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((lang) => ({
      url: `${siteConfig.url}/${lang}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeTags[l].html, `${siteConfig.url}/${l}${path}`])),
      },
    }))
  );
}
