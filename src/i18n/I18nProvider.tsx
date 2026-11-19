"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { CommonDict, PropertiesDict } from "./dictionaries/en";

interface I18nValue {
  lang: Locale;
  common: CommonDict;
  properties: PropertiesDict;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Only the dictionary slices that client components need are passed here,
 * so long-form content (home, legal) never ships to the browser.
 */
export function I18nProvider({ value, children }: { value: I18nValue; children: React.ReactNode }) {
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
