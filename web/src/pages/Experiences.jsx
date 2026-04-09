import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import ExperienceCard from "../components/ExperienceCard";
import experiences from "../data/experiences";

const categories = [
  {
    id: "all",
    label: { en: "All Experiences", fr: "Toutes", es: "Todas", ar: "الكل" },
  },
  {
    id: "camel",
    label: {
      en: "Camel Treks",
      fr: "Randonnées Chameau",
      es: "Paseos en Camello",
      ar: "ركوب الجمال",
    },
  },
  {
    id: "camp",
    label: {
      en: "Luxury Camp",
      fr: "Camp de Luxe",
      es: "Camp de Lujo",
      ar: "المخيم الفاخر",
    },
  },
  {
    id: "quad",
    label: {
      en: "Quad / ATV",
      fr: "Quad / ATV",
      es: "Quad / ATV",
      ar: "الكواد",
    },
  },
  {
    id: "4x4",
    label: {
      en: "4x4 Tours",
      fr: "Tours 4x4",
      es: "Tours 4x4",
      ar: "جولات 4x4",
    },
  },
  {
    id: "multi-day",
    label: {
      en: "Multi-Day",
      fr: "Multi-Jours",
      es: "Varios Días",
      ar: "عدة أيام",
    },
  },
  {
    id: "custom",
    label: { en: "Custom", fr: "Sur Mesure", es: "Personalizado", ar: "مخصص" },
  },
];

export default function Experiences({ onNavigate }) {
  const { theme } = useTheme();
  const { t, lang, isRTL } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? experiences
      : experiences.filter((e) => e.category === activeCategory);

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        paddingTop: 100,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="font-instrument-sans"
            style={{
              color: theme.text,
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {t.experiences.title}
          </h1>
          <p
            className="font-instrument-sans mt-3 mx-auto"
            style={{ color: theme.textMuted, fontSize: "1rem", maxWidth: 550 }}
          >
            {t.experiences.subtitle}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="font-instrument-sans transition-all duration-200"
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                border: `1px solid ${activeCategory === cat.id ? theme.accent : theme.border}`,
                background:
                  activeCategory === cat.id ? theme.accentMuted : "transparent",
                color:
                  activeCategory === cat.id ? theme.accent : theme.textMuted,
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: activeCategory === cat.id ? 500 : 400,
              }}
            >
              {cat.label[lang] || cat.label.en}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onBook={() => onNavigate("booking", exp)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
