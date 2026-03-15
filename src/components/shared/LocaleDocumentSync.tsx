"use client";

import { useEffect } from "react";
import type { Locale } from "@/types/locale";
import { getDirection } from "@/lib/locales";

interface LocaleDocumentSyncProps {
  locale: Locale;
}

export function LocaleDocumentSync({ locale }: LocaleDocumentSyncProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
    document.body.dir = getDirection(locale);
  }, [locale]);

  return null;
}
