import type { Locale } from "@/types/locale";
import { locales } from "@/types/locale";

export { locales };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function stripLocaleFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (isLocale(parts[0])) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname;
}

export function localizeHref(locale: Locale, pathname: string) {
  const clean = stripLocaleFromPath(pathname);
  if (clean === "/") {
    return `/${locale}`;
  }

  return `/${locale}${clean}`;
}

export function localeLabel(locale: Locale) {
  return {
    en: "English",
    fr: "Français",
    es: "Español",
    ar: "العربية"
  }[locale];
}
