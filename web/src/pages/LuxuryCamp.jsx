import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import { CheckCircle, ArrowRight, Star } from "lucide-react";

const campImages = [
  "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&q=80",
  "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800&q=80",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
  "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
];

export default function LuxuryCamp({ onNavigate }) {
  const { theme } = useTheme();
  const { t, isRTL } = useLang();

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Hero banner */}
      <div className="relative" style={{ height: 400 }}>
        <img
          src="https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=1920&q=80"
          alt="Luxury Camp"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <span
              className="inline-flex items-center gap-2 font-instrument-sans mb-3"
              style={{
                padding: "4px 14px",
                borderRadius: 999,
                background: "rgba(200,164,90,0.2)",
                border: "1px solid rgba(200,164,90,0.3)",
                color: "#C8A45A",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <Star size={11} fill="#C8A45A" />
              Premium Desert Accommodation
            </span>
            <h1
              className="font-instrument-sans"
              style={{
                color: "#F5F0E8",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {t.camp.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Description */}
        <div className="max-w-3xl">
          <p
            className="font-instrument-sans"
            style={{
              color: theme.textMuted,
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            {t.camp.subtitle}
          </p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {campImages.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{ borderRadius: 6, aspectRatio: i === 0 ? "1" : "3/4" }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="mt-16">
          <h2
            className="font-instrument-sans mb-8"
            style={{
              color: theme.text,
              fontSize: "1.5rem",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            {t.camp.features.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.camp.features.list.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4"
                style={{
                  borderRadius: 6,
                  border: `1px solid ${theme.border}`,
                  background: theme.card,
                }}
              >
                <CheckCircle
                  size={18}
                  style={{ color: theme.accent, flexShrink: 0 }}
                />
                <span
                  className="font-instrument-sans"
                  style={{ color: theme.text, fontSize: "0.9rem" }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking CTA */}
        <div
          className="mt-16 p-8 md:p-12 text-center"
          style={{
            borderRadius: 6,
            border: `1px solid ${theme.border}`,
            background: theme.accentMuted,
          }}
        >
          <h3
            className="font-instrument-sans"
            style={{ color: theme.text, fontSize: "1.3rem", fontWeight: 400 }}
          >
            Ready to experience the desert in luxury?
          </h3>
          <p
            className="font-instrument-sans mt-2"
            style={{ color: theme.textMuted, fontSize: "0.9rem" }}
          >
            Choose from our 1-night or 2-night packages, or create a custom
            stay.
          </p>
          <button
            onClick={() => onNavigate("booking")}
            className="mt-6 font-instrument-sans inline-flex items-center gap-2"
            style={{
              padding: "12px 32px",
              borderRadius: 6,
              border: "none",
              background: theme.accent,
              color: theme.accentText,
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            {t.camp.cta}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
