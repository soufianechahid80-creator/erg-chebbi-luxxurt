import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { PageHero } from "@/components/sections/PageHero";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/camp",
    title: "Luxury desert camp stays",
    description:
      "Discover premium desert camp stays in Merzouga with elegant tents, dinner, breakfast, and private atmosphere."
  });
}

export default function CampPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.nav.camp}
        title={dictionary.categoryPages.camp.title}
        intro={dictionary.categoryPages.camp.intro}
      />
      <section className="py-16">
        <Container>
          <ExperienceGrid locale={params.locale} category="camp" />
        </Container>
      </section>
    </>
  );
}
