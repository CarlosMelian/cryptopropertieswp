import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, languageAlternates, localeTags, locales } from "@/i18n/config";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: meta.title, template: `%s | ${siteConfig.name}` },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: siteConfig.name }],
    alternates: { canonical: `/${lang}`, languages: languageAlternates() },
    openGraph: {
      type: "website",
      locale: localeTags[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeTags[l].og),
      url: `/${lang}`,
      siteName: siteConfig.name,
      title: meta.title,
      description: meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: meta.twitterDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={localeTags[lang].html} className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: siteConfig.name,
              description: dict.meta.schemaDescription,
              areaServed: "Uruguay",
              url: `${siteConfig.url}/${lang}`,
              availableLanguage: ["English", "Spanish", "Portuguese"],
            }),
          }}
        />
        <I18nProvider value={{ lang, common: dict.common, properties: dict.properties }}>
          <Navbar />
          <main>{children}</main>
          <Footer lang={lang} dict={dict.common} />
        </I18nProvider>
      </body>
    </html>
  );
}
