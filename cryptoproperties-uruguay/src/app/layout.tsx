import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

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

const siteUrl = "https://www.cryptoproperties.uy";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "CryptoProperties Uruguay | Crypto-Funded Real Estate Advisory",
    template: "%s | CryptoProperties Uruguay",
  },
  description:
    "CryptoProperties Uruguay is the bridge between crypto wealth and Uruguayan real estate. We help digital asset holders and international investors buy, sell, and invest in Uruguayan property — legally, securely, and compliantly.",
  keywords: [
    "buy property in Uruguay with crypto",
    "crypto real estate Uruguay",
    "Bitcoin real estate Uruguay",
    "USDT property investment",
    "Uruguay tax residency",
    "Uruguay real estate for foreigners",
    "crypto wealth advisory",
  ],
  authors: [{ name: "CryptoProperties Uruguay" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CryptoProperties Uruguay",
    title: "CryptoProperties Uruguay | Crypto-Funded Real Estate Advisory",
    description:
      "The bridge between crypto wealth and Uruguayan real estate. Legal, secure, and built for the modern investor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoProperties Uruguay",
    description:
      "The bridge between crypto wealth and Uruguayan real estate.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "CryptoProperties Uruguay",
              description:
                "Advisory firm connecting cryptocurrency investors with Uruguayan real estate.",
              areaServed: "Uruguay",
              url: siteUrl,
            }),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
