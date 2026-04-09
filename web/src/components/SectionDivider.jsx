import { useTheme } from "../theme/ThemeContext";

export default function SectionDivider() {
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center py-8">
      <div style={{ width: 40, height: 1, background: theme.border }} />
      <div
        className="mx-3"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          border: `1px solid ${theme.accent}`,
          opacity: 0.4,
        }}
      />
      <div style={{ width: 40, height: 1, background: theme.border }} />
    </div>
  );
}
