import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { experiences } from "@/content/experiences";
import { siteConfig } from "@/lib/site";

const staticPaths = [
  "",
  "/experiences",
  "/camp",
  "/camel-trekking",
  "/quad-atv",
  "/tours-4x4",
  "/about",
  "/gallery",
  "/faq",
  "/contact",
  "/booking"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.baseUrl}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    }))
  );

  const experiencePages = locales.flatMap((locale) =>
    experiences.map((experience) => ({
      url: `${siteConfig.baseUrl}/${locale}/experiences/${experience.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  );

  return [...pages, ...experiencePages];
}
