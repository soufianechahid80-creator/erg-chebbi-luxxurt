import type { Locale } from "@/types/locale";
import type { Experience } from "@/types/booking";
import { formatCurrency } from "@/lib/utils";
import { getMediaAsset } from "@/content/media";
import { getDictionary } from "@/content/translations";
import { getTranslatedExperience } from "@/content/experiences";
import { localizeHref } from "@/lib/locales";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MediaFrame } from "@/components/shared/MediaFrame";

interface ExperienceCardProps {
  locale: Locale;
  experience: Experience;
}

export function ExperienceCard({ locale, experience }: ExperienceCardProps) {
  const translated = getTranslatedExperience(experience, locale);
  const dictionary = getDictionary(locale);

  const pricingSuffix =
    experience.pricingModel === "per_night_per_adult"
      ? dictionary.common.perNight
      : experience.pricingModel === "per_booking"
        ? "per booking"
        : dictionary.common.perPerson;

  return (
    <Card className="overflow-hidden p-0">
      <MediaFrame media={getMediaAsset(experience.featuredImageKey)} className="aspect-[4/2.8]" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge>{translated.badge}</Badge>
            <h3 className="mt-4 font-display text-2xl text-ivory">{translated.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#d0c4ae]">{translated.shortDescription}</p>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sand">{dictionary.common.startingFrom}</p>
            <p className="mt-2 text-2xl font-semibold text-ivory">
              {formatCurrency(experience.basePrice, "EUR", locale)}{" "}
              <span className="text-sm font-normal text-[#cbbfa9]">{pricingSuffix}</span>
            </p>
          </div>
          <ButtonLink href={localizeHref(locale, `/experiences/${experience.slug}`)} variant="secondary">
            {dictionary.common.learnMore}
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
