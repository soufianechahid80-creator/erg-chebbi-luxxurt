import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const { theme } = useTheme();
  const { t, isRTL } = useLang();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        paddingTop: 100,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
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
            {t.faq.title}
          </h1>
          <p
            className="font-instrument-sans mt-3"
            style={{ color: theme.textMuted, fontSize: "1rem" }}
          >
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-2">
          {t.faq.items.map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: 6,
                border: `1px solid ${openIndex === i ? theme.accent : theme.border}`,
                background: theme.card,
                overflow: "hidden",
                transition: "border-color 0.2s ease",
              }}
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between font-instrument-sans"
                style={{
                  padding: "16px 20px",
                  border: "none",
                  background: "transparent",
                  color: theme.text,
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                <span style={{ flex: 1 }}>{item.q}</span>
                <ChevronDown
                  size={18}
                  style={{
                    color: theme.textMuted,
                    flexShrink: 0,
                    marginLeft: isRTL ? 0 : 12,
                    marginRight: isRTL ? 12 : 0,
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>
              {openIndex === i && (
                <div
                  className="font-instrument-sans"
                  style={{
                    padding: "0 20px 16px",
                    color: theme.textMuted,
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
