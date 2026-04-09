import { useState, useEffect } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import { Calendar } from "lucide-react";

export default function FloatingBookCTA({ onNavigate }) {
  const { theme } = useTheme();
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => onNavigate("booking")}
      className="fixed z-40 flex items-center gap-2 font-instrument-sans transition-all duration-300"
      style={{
        bottom: 24,
        right: 24,
        padding: "12px 24px",
        borderRadius: 999,
        border: "none",
        background: theme.accent,
        color: theme.accentText,
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: 500,
        boxShadow: "0 4px 20px rgba(200,164,90,0.4)",
      }}
    >
      <Calendar size={16} />
      {t.cta.floating}
    </button>
  );
}
