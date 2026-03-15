import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { PageHero } from "@/components/sections/PageHero";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/quad-atv",
    title: "Quad and ATV adventures",
    description:
      "Explore premium quad and ATV experiences in Merzouga with guided routes through the Erg Chebbi dunes."
  });
}

export default function QuadPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.nav.quad}
        title={dictionary.categoryPages.quad.title}
        intro={dictionary.categoryPages.quad.intro}
      />
      <section className="py-16">
        <Container>
          <ExperienceGrid locale={params.locale} category="quad" />
        </Container>
      </section>
    </>
  );
}
