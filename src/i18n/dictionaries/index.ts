import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { es } from "./es";
import { pt } from "./pt";

const dictionaries: Record<Locale, Dictionary> = { en, es, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary, CommonDict, PropertiesDict, HomeDict, LegalDoc } from "./en";
