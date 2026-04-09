import { useState, useRef, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { useTheme } from "../theme/ThemeContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { lang, switchLang, languages } = useLang();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = languages.find((l) => l.code === lang);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5"
        style={{
          padding: "6px 12px",
          borderRadius: 999,
          border: `1px solid ${theme.border}`,
          background: "transparent",
          color: theme.textMuted,
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: 500,
          transition: "all 0.2s ease",
        }}
      >
        <Globe size={14} />
        <span>{current?.flag}</span>
        <span className="hidden sm:inline">{current?.code.toUpperCase()}</span>
      </button>
      {open && (
        <div
          className="absolute top-full mt-2 z-50"
          style={{
            right: 0,
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            padding: 4,
            minWidth: 140,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                switchLang(l.code);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full"
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                background: lang === l.code ? theme.accentMuted : "transparent",
                color: lang === l.code ? theme.accent : theme.text,
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: lang === l.code ? 500 : 400,
                textAlign: "left",
                transition: "background 0.15s ease",
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
