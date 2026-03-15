import type { Locale } from "@/types/locale";
import type { ExperienceCategory } from "@/types/booking";
import { experiences } from "@/content/experiences";
import { ExperienceCard } from "@/components/sections/ExperienceCard";

interface ExperienceGridProps {
  locale: Locale;
  category?: ExperienceCategory;
}

export function ExperienceGrid({ locale, category }: ExperienceGridProps) {
  const rows = category ? experiences.filter((item) => item.category === category) : experiences;

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {rows.map((experience) => (
        <ExperienceCard key={experience.slug} locale={locale} experience={experience} />
      ))}
    </div>
  );
}
