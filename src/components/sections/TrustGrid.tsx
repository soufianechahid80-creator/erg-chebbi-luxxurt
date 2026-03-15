import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

interface TrustGridProps {
  locale: Locale;
}

export function TrustGrid({ locale }: TrustGridProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeading
            eyebrow={dictionary.home.trustTitle}
            title={dictionary.home.trustTitle}
            body={dictionary.home.trustIntro}
          />
          <div className="grid gap-5">
            {dictionary.home.trustCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <Card>
                  <h3 className="font-display text-2xl text-ivory">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#d0c4ae]">{card.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
