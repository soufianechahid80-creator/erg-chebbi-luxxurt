import type { Locale } from "@/types/locale";
import { getDictionary } from "@/content/translations";
import { getFeaturedExperiences } from "@/content/experiences";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ExperienceCard } from "@/components/sections/ExperienceCard";

interface FeaturedExperiencesProps {
  locale: Locale;
}

export function FeaturedExperiences({ locale }: FeaturedExperiencesProps) {
  const dictionary = getDictionary(locale);
  const featured = getFeaturedExperiences();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={dictionary.home.featuredTitle}
          title={dictionary.categoryPages.experiences.title}
          body={dictionary.home.featuredIntro}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((experience, index) => (
            <Reveal key={experience.slug} delay={index * 0.08}>
              <ExperienceCard locale={locale} experience={experience} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
