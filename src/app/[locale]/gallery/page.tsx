import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/gallery",
    title: "Gallery",
    description:
      "View the atmosphere of luxury desert stays, camel rides, quad adventures, and private Sahara touring."
  });
}

export default function GalleryPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero eyebrow={dictionary.gallery.eyebrow} title={dictionary.gallery.title} intro={dictionary.gallery.intro} />
      <section className="py-16">
        <Container>
          <GalleryGrid locale={params.locale} />
        </Container>
      </section>
    </>
  );
}
