import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { faqs } from "@/content/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/faq",
    title: "FAQ",
    description:
      "Find answers about booking, pricing, private experiences, and luxury desert camp stays in Merzouga."
  });
}

export default function FAQPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero eyebrow={dictionary.faq.eyebrow} title={dictionary.faq.title} intro={dictionary.faq.intro} />
      <section className="py-16">
        <Container className="grid gap-5">
          {faqs.map((item) => (
            <Card key={item.question.en}>
              <h2 className="font-display text-2xl text-ivory">{item.question[params.locale]}</h2>
              <p className="mt-4 text-sm leading-7 text-[#d0c4ae]">{item.answer[params.locale]}</p>
            </Card>
          ))}
        </Container>
      </section>
    </>
  );
}
