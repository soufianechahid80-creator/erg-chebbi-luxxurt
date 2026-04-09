import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import SectionDivider from "../components/SectionDivider";

export default function About() {
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
      {/* Hero */}
      <div className="relative" style={{ height: 360 }}>
        <img
          src="https://images.unsplash.com/photo-1504195698793-21e4fd54f2f8?w=1920&q=80"
          alt="Sahara Desert"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
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
              {t.about.title}
            </h1>
            <p
              className="font-instrument-sans mt-2"
              style={{ color: "rgba(245,240,232,0.6)", fontSize: "1rem" }}
            >
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <div className="space-y-6">
          {t.about.story.map((paragraph, i) => (
            <p
              key={i}
              className="font-instrument-sans"
              style={{
                color: theme.textMuted,
                fontSize: "1.05rem",
                lineHeight: 1.8,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <SectionDivider />

        {/* Values */}
        <div className="mt-4">
          <h2
            className="font-instrument-sans mb-8"
            style={{
              color: theme.text,
              fontSize: "1.5rem",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            {t.about.values.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.about.values.list.map((value, i) => (
              <div
                key={i}
                className="p-6"
                style={{
                  borderRadius: 6,
                  border: `1px solid ${theme.border}`,
                  background: theme.card,
                }}
              >
                <h3
                  className="font-instrument-sans mb-2"
                  style={{
                    color: theme.text,
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="font-instrument-sans"
                  style={{
                    color: theme.textMuted,
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team image */}
        <div className="mt-16 overflow-hidden" style={{ borderRadius: 6 }}>
          <img
            src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&q=80"
            alt="Our team"
            className="w-full object-cover"
            style={{ height: 320 }}
          />
        </div>
      </div>
    </div>
  );
}
