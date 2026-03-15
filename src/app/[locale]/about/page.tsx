import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/about",
    title: "About Erg Chebbi Luxury",
    description:
      "Learn how Erg Chebbi Luxury positions itself as a premium Merzouga-based desert travel brand."
  });
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero eyebrow={dictionary.about.eyebrow} title={dictionary.about.title} intro={dictionary.about.intro} />
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <h2 className="font-display text-3xl text-ivory">{dictionary.about.storyTitle}</h2>
            <p className="mt-5 text-base leading-8 text-[#d0c4ae]">{dictionary.about.storyBody}</p>
          </Card>
          <div className="grid gap-5">
            {dictionary.about.values.map((value) => (
              <Card key={value.title}>
                <h3 className="font-display text-2xl text-ivory">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#d0c4ae]">{value.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
