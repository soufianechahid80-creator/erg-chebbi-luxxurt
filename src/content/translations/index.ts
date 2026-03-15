import { ar } from "./ar";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import type { Dictionary } from "./types";
import type { Locale } from "@/types/locale";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  fr,
  es,
  ar
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
