"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LOCALE_COOKIE, localeNames, locales, switchLocalePath, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

function useSwitchLocale() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useI18n();

  const hrefFor = (locale: Locale) => switchLocalePath(pathname, locale);

  const switchTo = (locale: Locale, e?: React.MouseEvent) => {
    e?.preventDefault();
    // Remember the choice so the proxy honors it on future visits to "/".
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    if (locale === lang) return;
    // Keep filters (?type=...) and anchors when switching.
    router.push(`${hrefFor(locale)}${window.location.search}${window.location.hash}`, { scroll: false });
  };

  return { lang, hrefFor, switchTo };
}

/** Compact dropdown for the desktop navbar. */
export function LanguageDropdown() {
  const { lang, hrefFor, switchTo } = useSwitchLocale();
  const { common } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${common.nav.language}: ${localeNames[lang]}`}
        className="flex h-9 items-center gap-1.5 rounded-full border border-graphite-border px-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:border-gold/40 hover:text-gold-bright"
      >
        <Globe className="h-3.5 w-3.5" aria-hidden />
        {lang}
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 min-w-[11rem] overflow-hidden rounded-2xl border border-graphite-border bg-graphite/95 p-1.5 shadow-glass backdrop-blur-xl"
          >
            {locales.map((l) => (
              <li key={l} role="none">
                <a
                  role="menuitemradio"
                  aria-checked={l === lang}
                  href={hrefFor(l)}
                  hrefLang={l}
                  lang={l}
                  onClick={(e) => {
                    switchTo(l, e);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 font-body text-sm transition-colors",
                    l === lang ? "text-gold-bright" : "text-ink-muted hover:bg-white/5 hover:text-ink"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-5 font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint">{l}</span>
                    {localeNames[l]}
                  </span>
                  {l === lang && <Check className="h-3.5 w-3.5" aria-hidden />}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Segmented control for the mobile menu. */
export function LanguageSegmented({ onSelect }: { onSelect?: () => void }) {
  const { lang, hrefFor, switchTo } = useSwitchLocale();
  const { common } = useI18n();

  return (
    <div>
      <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint">{common.nav.language}</p>
      <div className="grid grid-cols-3 gap-2">
        {locales.map((l) => (
          <a
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            onClick={(e) => {
              switchTo(l, e);
              onSelect?.();
            }}
            className={cn(
              "flex h-11 items-center justify-center rounded-xl border font-body text-sm transition-colors",
              l === lang
                ? "border-gold/60 bg-gold/10 text-gold-bright"
                : "border-graphite-border text-ink-muted hover:border-white/15 hover:text-ink"
            )}
          >
            {localeNames[l]}
          </a>
        ))}
      </div>
    </div>
  );
}
