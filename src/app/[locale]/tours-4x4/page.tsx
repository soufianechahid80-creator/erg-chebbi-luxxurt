import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { PageHero } from "@/components/sections/PageHero";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/tours-4x4",
    title: "Private 4x4 tours",
    description:
      "Reserve a private 4x4 Sahara tour in Merzouga for half-day, full-day, and custom multi-day journeys."
  });
}

export default function ToursPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.nav.tours}
        title={dictionary.categoryPages.tours.title}
        intro={dictionary.categoryPages.tours.intro}
      />
      <section className="py-16">
        <Container>
          <ExperienceGrid locale={params.locale} category="tour" />
        </Container>
      </section>
    </>
  );
}
