import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { siteConfig } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { FeaturedExperiences } from "@/components/sections/FeaturedExperiences";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TrustGrid } from "@/components/sections/TrustGrid";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { JsonLd } from "@/components/shared/JsonLd";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/",
    title: "Luxury desert experiences in Merzouga",
    description:
      "Book refined desert camp stays, camel trekking, quad rides, and private 4x4 tours in Erg Chebbi, Merzouga."
  });
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: siteConfig.name,
          areaServed: "Merzouga, Morocco",
          email: siteConfig.email,
          telephone: siteConfig.whatsapp,
          url: siteConfig.baseUrl,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Merzouga",
            addressCountry: "MA"
          }
        }}
      />
      <Hero locale={params.locale} />

      <section className="py-12">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dictionary.home.stats.map((stat) => (
              <Card key={stat.label}>
                <div className="text-xs uppercase tracking-[0.22em] text-sand">{stat.label}</div>
                <div className="mt-4 font-display text-4xl text-ivory">{stat.value}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <FeaturedExperiences locale={params.locale} />
      <WhyChooseUs locale={params.locale} />
      <TrustGrid locale={params.locale} />
      <GalleryPreview locale={params.locale} />
      <FAQPreview locale={params.locale} />
      <ContactStrip locale={params.locale} />
    </>
  );
}
