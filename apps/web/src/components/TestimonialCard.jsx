import { useTheme } from "../theme/ThemeContext";
import { Star, Quote } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col h-full"
      style={{
        padding: 28,
        borderRadius: 6,
        border: `1px solid ${theme.border}`,
        background: theme.card,
      }}
    >
      <Quote
        size={24}
        style={{ color: theme.accent, opacity: 0.3, marginBottom: 16 }}
      />
      <p
        className="font-instrument-sans flex-1"
        style={{
          color: theme.text,
          fontSize: "0.95rem",
          fontWeight: 400,
          lineHeight: 1.7,
          fontStyle: "italic",
        }}
      >
        "{testimonial.comment_text}"
      </p>
      <div
        className="mt-6 pt-4"
        style={{ borderTop: `1px solid ${theme.border}` }}
      >
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={13} fill="#C8A45A" color="#C8A45A" />
          ))}
        </div>
        <p
          className="font-instrument-sans"
          style={{
            color: theme.text,
            fontSize: "0.9rem",
            fontWeight: 500,
            margin: 0,
          }}
        >
          {testimonial.author_name}
        </p>
        <p
          className="font-instrument-sans"
          style={{ color: theme.textMuted, fontSize: "0.8rem", margin: 0 }}
        >
          {testimonial.country}
        </p>
      </div>
    </div>
  );
}
