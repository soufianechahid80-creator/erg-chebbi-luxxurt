import { useTheme } from "../theme/ThemeContext";

export default function Logo({ size = "md", showText = true }) {
  const { theme } = useTheme();

  const sizes = {
    sm: { icon: 28, text: "text-base" },
    md: { icon: 36, text: "text-lg" },
    lg: { icon: 48, text: "text-2xl" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <a
      href="/"
      className="flex items-center gap-2 no-underline"
      style={{ textDecoration: "none" }}
    >
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desert dune silhouette */}
        <path
          d="M4 36C4 36 10 20 18 24C26 28 22 16 30 18C38 20 44 28 44 28V36H4Z"
          fill={theme.accent}
          opacity="0.3"
        />
        <path
          d="M4 38C4 38 12 26 20 28C28 30 26 20 34 22C42 24 44 32 44 32V38H4Z"
          fill={theme.accent}
          opacity="0.6"
        />
        {/* Star */}
        <circle cx="36" cy="12" r="2" fill={theme.accent} />
        <circle cx="30" cy="8" r="1.2" fill={theme.accent} opacity="0.6" />
        <circle cx="40" cy="16" r="1" fill={theme.accent} opacity="0.4" />
        {/* Frame */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="6"
          stroke={theme.accent}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`${s.text} font-instrument-sans tracking-tight`}
            style={{
              color: theme.text,
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Erg Chebbi
          </span>
          <span
            className="text-xs font-instrument-sans tracking-widest uppercase"
            style={{
              color: theme.accent,
              fontWeight: 500,
              letterSpacing: "0.15em",
              fontSize: "0.6rem",
            }}
          >
            Luxury
          </span>
        </div>
      )}
    </a>
  );
}
