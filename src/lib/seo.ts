import type { Metadata } from "next";
import type { Locale } from "@/types/locale";
import { locales } from "@/lib/locales";
import { siteConfig, siteKeywords } from "@/lib/site";

interface PageMetaInput {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  image?: string;
}

export function buildMetadata({
  locale,
  pathname,
  title,
  description,
  image = "/favicon.svg"
}: PageMetaInput): Metadata {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const url = `${siteConfig.baseUrl}/${locale}${cleanPath === "/" ? "" : cleanPath}`;

  const languageAlternates = Object.fromEntries(
    locales.map((entry) => [entry, `${siteConfig.baseUrl}/${entry}${cleanPath === "/" ? "" : cleanPath}`])
  );

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title,
    description,
    keywords: siteKeywords,
    alternates: {
      canonical: url,
      languages: languageAlternates
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}
