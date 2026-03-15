import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteConfig, siteKeywords } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "Erg Chebbi Luxury",
    template: "%s | Erg Chebbi Luxury"
  },
  description:
    "Luxury desert experiences in Merzouga, Morocco — premium camp stays, camel trekking, quad adventures, and private 4x4 tours.",
  keywords: siteKeywords,
  openGraph: {
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
