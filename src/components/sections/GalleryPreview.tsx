import type { Locale } from "@/types/locale";
import { galleryItems } from "@/content/gallery";
import { getDictionary } from "@/content/translations";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/shared/MediaFrame";
import { ButtonLink } from "@/components/ui/Button";
import { localizeHref } from "@/lib/locales";

interface GalleryPreviewProps {
  locale: Locale;
}

export function GalleryPreview({ locale }: GalleryPreviewProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={dictionary.gallery.eyebrow}
            title={dictionary.gallery.title}
            body={dictionary.gallery.intro}
          />
          <ButtonLink href={localizeHref(locale, "/gallery")} variant="secondary">
            {dictionary.common.viewAll}
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryItems.slice(0, 6).map((item) => (
            <div key={item.key} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
              <MediaFrame media={getMediaAsset(item.key)} className="aspect-[4/3]" />
              <div className="p-5">
                <p className="text-sm leading-7 text-[#d4c8b4]">{item.caption[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
