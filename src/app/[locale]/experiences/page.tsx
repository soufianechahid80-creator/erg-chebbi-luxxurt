import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { PageHero } from "@/components/sections/PageHero";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { localizeHref } from "@/lib/locales";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/experiences",
    title: "Desert experiences",
    description:
      "Explore premium camp stays, camel rides, quad adventures, and private 4x4 tours in Merzouga."
  });
}

export default function ExperiencesPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.common.luxuryService}
        title={dictionary.categoryPages.experiences.title}
        intro={dictionary.categoryPages.experiences.intro}
        actions={<ButtonLink href={localizeHref(params.locale, "/booking")}>{dictionary.common.bookNow}</ButtonLink>}
      />
      <section className="py-16">
        <Container>
          <ExperienceGrid locale={params.locale} />
        </Container>
      </section>
    </>
  );
}
