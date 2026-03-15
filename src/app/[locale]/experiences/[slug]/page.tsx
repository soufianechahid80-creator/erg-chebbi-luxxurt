import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types/locale";
import { experiences, getAddOnsForExperience, getExperienceBySlug, getTranslatedExperience } from "@/content/experiences";
import { getDictionary } from "@/content/translations";
import { getMediaAsset } from "@/content/media";
import { MediaFrame } from "@/components/shared/MediaFrame";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { localizeHref } from "@/lib/locales";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return experiences.flatMap((experience) => [
    { slug: experience.slug, locale: "en" },
    { slug: experience.slug, locale: "fr" },
    { slug: experience.slug, locale: "es" },
    { slug: experience.slug, locale: "ar" }
  ]);
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale; slug: string };
}) {
  const experience = getExperienceBySlug(params.slug);

  if (!experience) {
    return {};
  }

  const translated = getTranslatedExperience(experience, params.locale);

  return buildMetadata({
    locale: params.locale,
    pathname: `/experiences/${params.slug}`,
    title: translated.title,
    description: translated.metaDescription
  });
}

export default function ExperienceDetailPage({
  params
}: {
  params: { locale: Locale; slug: string };
}) {
  const experience = getExperienceBySlug(params.slug);
  if (!experience) {
    notFound();
  }

  const resolvedExperience = experience;
  const dictionary = getDictionary(params.locale);
  const translated = getTranslatedExperience(resolvedExperience, params.locale);
  const addOns = getAddOnsForExperience(resolvedExperience);

  const priceSuffix =
    resolvedExperience.pricingModel === "per_night_per_adult"
      ? dictionary.common.perNight
      : resolvedExperience.pricingModel === "per_booking"
        ? "per booking"
        : dictionary.common.perPerson;

  return (
    <>
      <PageHero
        eyebrow={translated.badge}
        title={translated.title}
        intro={translated.longDescription}
        actions={
          <>
            <ButtonLink href={localizeHref(params.locale, `/booking?experience=${resolvedExperience.slug}`)}>
              {dictionary.common.bookNow}
            </ButtonLink>
            <ButtonLink variant="secondary" href={localizeHref(params.locale, "/experiences")}>
              {dictionary.common.backToExperiences}
            </ButtonLink>
          </>
        }
      />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="grid gap-6">
            <MediaFrame media={getMediaAsset(resolvedExperience.featuredImageKey)} className="aspect-[16/10]" />
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <p className="text-xs uppercase tracking-[0.22em] text-sand">{dictionary.common.startingFrom}</p>
                <p className="mt-3 font-display text-4xl text-ivory">
                  {formatCurrency(resolvedExperience.basePrice, "EUR", params.locale)}
                </p>
                <p className="mt-2 text-sm text-[#d0c4ae]">{priceSuffix}</p>
                {resolvedExperience.seasonalNote ? (
                  <p className="mt-5 text-sm leading-7 text-[#d0c4ae]">{resolvedExperience.seasonalNote[params.locale]}</p>
                ) : null}
              </Card>
              <Card>
                <p className="text-xs uppercase tracking-[0.22em] text-sand">Ideal for</p>
                <p className="mt-4 text-sm leading-7 text-[#d0c4ae]">{translated.idealFor}</p>
              </Card>
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="prose-gold">
              <h2 className="font-display text-3xl text-ivory">{dictionary.common.included}</h2>
              <ul className="mt-5">
                {translated.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card className="prose-gold">
              <h2 className="font-display text-3xl text-ivory">Highlights</h2>
              <ul className="mt-5">
                {translated.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>

            {addOns.length ? (
              <Card className="prose-gold">
                <h2 className="font-display text-3xl text-ivory">Available add-ons</h2>
                <ul className="mt-5">
                  {addOns.map((addon) => (
                    <li key={addon.id}>
                      {addon.translations[params.locale].label} — {formatCurrency(addon.price, "EUR", params.locale)}
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  );
}
