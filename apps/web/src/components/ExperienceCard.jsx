import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import { Clock, ArrowRight } from "lucide-react";

export default function ExperienceCard({
  experience,
  onBook,
  compact = false,
}) {
  const { theme } = useTheme();
  const { lang, t, isRTL } = useLang();

  const title = experience.title[lang] || experience.title.en;
  const subtitle = experience.subtitle[lang] || experience.subtitle.en;

  return (
    <div
      className="group overflow-hidden transition-all duration-300"
      style={{
        borderRadius: 6,
        border: `1px solid ${theme.border}`,
        background: theme.card,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: compact ? 180 : 220 }}
      >
        <img
          src={
            experience.image ||
            "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&q=80"
          }
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
          }}
        />
        {/* Category pill */}
        <span
          className="absolute top-3 left-3 font-instrument-sans"
          style={{
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            color: "#C8A45A",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {experience.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-instrument-sans"
          style={{
            color: theme.text,
            fontSize: "1.1rem",
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          className="mt-1 font-instrument-sans"
          style={{
            color: theme.textMuted,
            fontSize: "0.85rem",
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-4">
          <span
            className="flex items-center gap-1.5 font-instrument-sans"
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: theme.accentMuted,
              color: theme.accent,
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            <Clock size={12} />
            {experience.duration}
          </span>
          {experience.price && (
            <span
              className="font-instrument-sans"
              style={{
                color: theme.text,
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              €{experience.price}
              <span
                style={{
                  color: theme.textMuted,
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                {" "}
                {experience.priceUnit === "night"
                  ? t.experiences.perNight
                  : t.experiences.perPerson}
              </span>
            </span>
          )}
          {!experience.price && (
            <span
              className="font-instrument-sans"
              style={{
                color: theme.accent,
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              Custom
            </span>
          )}
        </div>

        {/* Includes preview */}
        {!compact && experience.includes && (
          <div
            className="mt-4 pt-4"
            style={{ borderTop: `1px solid ${theme.border}` }}
          >
            <p
              className="font-instrument-sans mb-2"
              style={{
                color: theme.textMuted,
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {t.experiences.includes}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(experience.includes[lang] || experience.includes.en)
                .slice(0, 4)
                .map((item, i) => (
                  <span
                    key={i}
                    className="font-instrument-sans"
                    style={{
                      padding: "3px 8px",
                      borderRadius: 999,
                      border: `1px solid ${theme.border}`,
                      color: theme.textMuted,
                      fontSize: "0.7rem",
                    }}
                  >
                    {item}
                  </span>
                ))}
              {(experience.includes[lang] || experience.includes.en).length >
                4 && (
                <span
                  className="font-instrument-sans"
                  style={{
                    padding: "3px 8px",
                    color: theme.textSubtle,
                    fontSize: "0.7rem",
                  }}
                >
                  +
                  {(experience.includes[lang] || experience.includes.en)
                    .length - 4}{" "}
                  more
                </span>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => onBook && onBook(experience)}
          className="mt-4 w-full flex items-center justify-center gap-2 font-instrument-sans transition-all duration-200"
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            border: `1px solid ${theme.border}`,
            background: "transparent",
            color: theme.text,
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 500,
          }}
        >
          {t.experiences.bookThis}
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
