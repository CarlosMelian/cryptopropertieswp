import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localeTags, locales } from "@/i18n/config";
import { parentCompany, siteConfig } from "@/lib/site";
import { jsonLdString, pageMetadata, siteJsonLd } from "@/lib/seo";
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
    // Defaults for every page; each page overrides title/description/openGraph via pageMetadata().
    ...pageMetadata({ lang, path: "", title: meta.title, description: meta.description, absoluteTitle: true }),
    metadataBase: new URL(siteConfig.url),
    title: { default: meta.title, template: `%s | ${siteConfig.name}` },
    applicationName: siteConfig.name,
    keywords: meta.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: parentCompany.name,
    category: "Real estate",
    icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
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
          dangerouslySetInnerHTML={{ __html: jsonLdString(siteJsonLd(lang)) }}
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
