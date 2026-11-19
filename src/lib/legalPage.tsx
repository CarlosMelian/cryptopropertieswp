import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

type LegalKey = "privacy" | "terms" | "risk" | "compliance";
type Params = { params: Promise<{ lang: string }> };

/** Builds the metadata + page component for a legal document. */
export function legalPage(key: LegalKey) {
  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { lang } = await params;
    if (!isLocale(lang)) return {};
    const doc = getDictionary(lang).legal[key];
    return pageMetadata({ lang, path: `/legal/${key}`, title: doc.title, description: doc.description });
  }

  async function Page({ params }: Params) {
    const { lang } = await params;
    if (!isLocale(lang)) notFound();
    const { legal } = getDictionary(lang);
    return <LegalLayout lang={lang} common={legal.common} doc={legal[key]} />;
  }

  return { generateMetadata, Page };
}
