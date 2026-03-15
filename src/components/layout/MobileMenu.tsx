"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/types/locale";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  items: NavItem[];
  locale: Locale;
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value: boolean) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ivory"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute left-4 right-4 top-[84px] z-50 rounded-[28px] border border-white/10 bg-ink/95 p-5 shadow-panel backdrop-blur-xl"
          >
            <div className="grid gap-2">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm text-[#d9cdb9] transition hover:bg-white/[0.05] hover:text-ivory"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
