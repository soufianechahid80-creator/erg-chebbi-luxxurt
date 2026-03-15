"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/types/locale";
import { localeLabel, locales, localizeHref } from "@/lib/locales";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  locale: Locale;
}

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1">
      {locales.map((entry) => {
        const active = entry === locale;
        return (
          <a
            key={entry}
            href={localizeHref(entry, pathname || "/")}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition",
              active ? "bg-dune text-ink" : "text-[#d9cdb9] hover:text-ivory"
            )}
          >
            {localeLabel(entry).slice(0, 2)}
          </a>
        );
      })}
    </div>
  );
}
