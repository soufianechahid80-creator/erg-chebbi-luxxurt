export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatCurrency(value: number, currency = "EUR", locale = "en") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-MA" : locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function clamp(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}

export function slugToTitle(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}

export function normalizePath(pathname: string) {
  if (!pathname.startsWith("/")) {
    return `/${pathname}`;
  }

  return pathname;
}
