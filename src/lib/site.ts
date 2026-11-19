import type { Locale } from "@/i18n/config";

/**
 * Site-wide contact configuration. Values come from environment variables so
 * they can differ between preview and production deployments on Vercel.
 */
export const siteConfig = {
  name: "CryptoProperties Uruguay",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cryptoproperties.uy").replace(/\/$/, ""),
  email: "contact@cryptoproperties.uy",
  /**
   * WhatsApp number in international format, digits only (e.g. 59899123456).
   * When empty, "Contact via WhatsApp" falls back to the inquiry form with
   * WhatsApp preselected as the preferred contact method.
   */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
} as const;

export function propertyUrl(slug: string, locale: Locale) {
  return `${siteConfig.url}/${locale}/properties/${slug}`;
}

export function whatsappLink(message: string) {
  if (!siteConfig.whatsappNumber) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
