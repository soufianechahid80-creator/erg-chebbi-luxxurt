import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { PageHero } from "@/components/sections/PageHero";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/camel-trekking",
    title: "Camel trekking in Merzouga",
    description:
      "Book sunrise and sunset camel trekking in Erg Chebbi with photo stops and premium desert timing."
  });
}

export default function CamelPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.nav.camel}
        title={dictionary.categoryPages.camel.title}
        intro={dictionary.categoryPages.camel.intro}
      />
      <section className="py-16">
        <Container>
          <ExperienceGrid locale={params.locale} category="camel" />
        </Container>
      </section>
    </>
  );
}
