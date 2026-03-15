import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { siteConfig } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/contact",
    title: "Contact",
    description:
      "Contact Erg Chebbi Luxury for private itineraries, transfers, special occasions, and premium desert stays."
  });
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero eyebrow={dictionary.contact.eyebrow} title={dictionary.contact.title} intro={dictionary.contact.intro} />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <h2 className="font-display text-3xl text-ivory">{dictionary.contact.formTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#d0c4ae]">{dictionary.contact.responsePromise}</p>
            <div className="mt-8 grid gap-4 text-sm text-[#d0c4ae]">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-sand">Email</div>
                <div className="mt-2">{siteConfig.email}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-sand">WhatsApp</div>
                <div className="mt-2">{siteConfig.whatsapp}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-sand">Location</div>
                <div className="mt-2">{siteConfig.location}</div>
              </div>
            </div>
          </Card>
          <ContactForm locale={params.locale} />
        </Container>
      </section>
    </>
  );
}
