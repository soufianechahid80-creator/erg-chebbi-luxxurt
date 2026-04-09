import { useTheme } from "../theme/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { mode, toggle, theme } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative flex items-center justify-center"
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: `1px solid ${theme.border}`,
        background: "transparent",
        color: theme.textMuted,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      aria-label={
        mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
