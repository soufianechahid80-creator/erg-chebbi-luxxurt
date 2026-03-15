"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createSessionId } from "@/lib/utils";
import type { Locale } from "@/types/locale";

interface SessionTrackerProps {
  locale: Locale;
}

const KEY = "ergchebbi_session_id";

function getSessionId() {
  if (typeof window === "undefined") return "";

  const existing = window.localStorage.getItem(KEY);
  if (existing) return existing;

  const created = createSessionId();
  window.localStorage.setItem(KEY, created);
  return created;
}

export function SessionTracker({ locale }: SessionTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    const sessionId = getSessionId();
    if (!sessionId || !pathname) return;

    void fetch("/api/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionId,
        path: pathname,
        referrer: document.referrer,
        locale
      })
    }).catch(() => null);
  }, [locale, pathname]);

  return null;
}
