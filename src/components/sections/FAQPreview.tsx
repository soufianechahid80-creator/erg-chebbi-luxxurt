import type { Locale } from "@/types/locale";
import { faqs } from "@/content/faqs";
import { getDictionary } from "@/content/translations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { localizeHref } from "@/lib/locales";

interface FAQPreviewProps {
  locale: Locale;
}

export function FAQPreview({ locale }: FAQPreviewProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="border-t border-white/10 py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={dictionary.faq.eyebrow}
            title={dictionary.faq.title}
            body={dictionary.faq.intro}
          />
          <ButtonLink href={localizeHref(locale, "/faq")} variant="secondary">
            {dictionary.common.viewAll}
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {faqs.slice(0, 4).map((item) => (
            <Card key={item.question.en}>
              <h3 className="font-display text-2xl text-ivory">{item.question[locale]}</h3>
              <p className="mt-3 text-sm leading-7 text-[#d0c4ae]">{item.answer[locale]}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
