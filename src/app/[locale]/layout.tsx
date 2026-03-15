import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Locale } from "@/types/locale";
import { isLocale, locales } from "@/lib/locales";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { LocaleDocumentSync } from "@/components/shared/LocaleDocumentSync";
import { SessionTracker } from "@/components/shared/SessionTracker";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;

  return (
    <>
      <LocaleDocumentSync locale={locale} />
      <SessionTracker locale={locale} />
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <WhatsAppFloat />
    </>
  );
}
