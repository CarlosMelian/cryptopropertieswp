import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, languageAlternates } from "@/i18n/config";

type LegalKey = "privacy" | "terms" | "risk" | "compliance";
type Params = { params: Promise<{ lang: string }> };

/** Builds the metadata + page component for a legal document. */
export function legalPage(key: LegalKey) {
  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { lang } = await params;
    if (!isLocale(lang)) return {};
    const doc = getDictionary(lang).legal[key];
    return {
      title: doc.title,
      description: doc.description,
      alternates: { canonical: `/${lang}/legal/${key}`, languages: languageAlternates(`/legal/${key}`) },
    };
  }

  async function Page({ params }: Params) {
    const { lang } = await params;
    if (!isLocale(lang)) notFound();
    const { legal } = getDictionary(lang);
    return <LegalLayout lang={lang} common={legal.common} doc={legal[key]} />;
  }

  return { generateMetadata, Page };
}
