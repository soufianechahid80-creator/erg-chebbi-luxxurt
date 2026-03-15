"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/types/locale";
import { galleryItems } from "@/content/gallery";
import { getMediaAsset } from "@/content/media";
import { MediaFrame } from "@/components/shared/MediaFrame";
import { GalleryLightbox } from "@/components/gallery/Lightbox";

interface GalleryGridProps {
  locale: Locale;
}

export function GalleryGrid({ locale }: GalleryGridProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const items = useMemo(() => galleryItems, []);

  const selectedItem = items.find((item) => item.key === selectedKey) || null;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setSelectedKey(item.key)}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] text-left transition hover:-translate-y-1"
          >
            <MediaFrame media={getMediaAsset(item.key)} className="aspect-[4/3]" />
            <div className="p-5">
              <p className="text-sm leading-7 text-[#d4c8b4]">{item.caption[locale]}</p>
            </div>
          </button>
        ))}
      </div>

      <GalleryLightbox
        open={Boolean(selectedItem)}
        onClose={() => setSelectedKey(null)}
        item={
          selectedItem
            ? {
                caption: selectedItem.caption[locale],
                media: getMediaAsset(selectedItem.key)
              }
            : null
        }
      />
    </>
  );
}
