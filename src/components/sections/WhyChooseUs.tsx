import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

interface WhyChooseUsProps {
  locale: Locale;
}

export function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-20">
      <Container>
        <SectionHeading
          eyebrow={dictionary.home.whyTitle}
          title={dictionary.home.whyTitle}
          body={dictionary.home.whyIntro}
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {dictionary.home.whyCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <Card className="h-full">
                <h3 className="font-display text-2xl text-ivory">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#d0c4ae]">{card.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
