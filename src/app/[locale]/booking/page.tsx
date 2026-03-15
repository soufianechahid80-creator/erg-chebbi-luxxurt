import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { PageHero } from "@/components/sections/PageHero";
import { BookingForm } from "@/components/booking/BookingForm";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return buildMetadata({
    locale: params.locale,
    pathname: "/booking",
    title: "Book now",
    description:
      "Use the on-site booking flow to reserve luxury camp stays, camel rides, quad adventures, and private 4x4 tours."
  });
}

export default function BookingPage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams?: { experience?: string };
}) {
  const dictionary = getDictionary(params.locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.bookingPage.eyebrow}
        title={dictionary.bookingPage.title}
        intro={dictionary.bookingPage.intro}
      />
      <section className="py-16">
        <Container>
          <BookingForm locale={params.locale} defaultExperienceSlug={searchParams?.experience} />
        </Container>
      </section>
    </>
  );
}
