import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { localizeHref } from "@/lib/locales";
import { Badge } from "@/components/ui/Badge";

interface ContactStripProps {
  locale: Locale;
}

export function ContactStrip({ locale }: ContactStripProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-20">
      <Container>
        <div className="rounded-[32px] border border-dune/20 bg-gradient-to-br from-[#171419] to-[#0d0b10] p-8 shadow-panel md:p-12">
          <Badge>{dictionary.contact.eyebrow}</Badge>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
                {dictionary.home.finalTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#d4c8b4]">
                {dictionary.home.finalBody}
              </p>
              <div className="mt-6 text-sm text-[#eadfca]">
                <div>{siteConfig.whatsapp}</div>
                <div>{siteConfig.email}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={localizeHref(locale, "/booking")}>{dictionary.common.bookNow}</ButtonLink>
              <ButtonLink href={siteConfig.whatsappUrl} variant="secondary">
                {dictionary.common.whatsapp}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
