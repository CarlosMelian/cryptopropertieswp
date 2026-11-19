export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

/** BCP 47 tags for <html lang>, Intl formatting and Open Graph. */
export const localeTags: Record<Locale, { html: string; intl: string; og: string }> = {
  en: { html: "en", intl: "en-US", og: "en_US" },
  es: { html: "es", intl: "es-UY", og: "es_UY" },
  pt: { html: "pt-BR", intl: "pt-BR", og: "pt_BR" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Prefix an internal path with the locale: ("es", "/properties") -> "/es/properties". */
export function localePath(locale: Locale, path = "/") {
  if (path === "/" || path === "") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Replace the locale segment of a pathname. */
export function switchLocalePath(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = locale;
  else parts.splice(1, 0, locale);
  return parts.join("/") || `/${locale}`;
}

/** hreflang alternates for metadata. `path` excludes the locale, e.g. "/properties". */
export function languageAlternates(path = "") {
  const clean = path === "/" ? "" : path;
  return {
    ...Object.fromEntries(locales.map((l) => [localeTags[l].html, `/${l}${clean}`])),
    "x-default": `/${defaultLocale}${clean}`,
  };
}

/** Simple `{name}` interpolation. */
export function format(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));
}
