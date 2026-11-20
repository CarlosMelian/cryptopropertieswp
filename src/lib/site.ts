import type { Locale } from "@/i18n/config";

/**
 * Site-wide contact configuration. Values come from environment variables so
 * they can differ between preview and production deployments on Vercel.
 */
export const siteConfig = {
  name: "UyCrypto Real Estate",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cryptoproperties.uy").replace(/\/$/, ""),
  email: "contact@cryptoproperties.uy",
  /**
   * WhatsApp number in international format, digits only (e.g. 59899123456).
   * When empty, "Contact via WhatsApp" falls back to the inquiry form with
   * WhatsApp preselected as the preferred contact method.
   */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
} as const;

/** Parent company. Linked from the footer and home, and declared in structured data. */
export const parentCompany = {
  name: "UyCryptomonedas",
  url: "https://uycryptomonedas.com",
  /** Social profiles shown in the footer belong to the parent company. */
  sameAs: [
    "https://www.linkedin.com/company/uycryptomonedas",
    "https://www.instagram.com/uycryptomonedas",
  ],
  offices: ["Montevideo", "Punta del Este", "Mercedes"],
} as const;

export function propertyUrl(slug: string, locale: Locale) {
  return `${siteConfig.url}/${locale}/properties/${slug}`;
}

/** WhatsApp chat with a prefilled message, or an email fallback if no number is configured. */
export function contactLink(message: string) {
  return (
    whatsappLink(message) ??
    `mailto:${siteConfig.email}?body=${encodeURIComponent(message)}`
  );
}

export function whatsappLink(message: string) {
  if (!siteConfig.whatsappNumber) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
