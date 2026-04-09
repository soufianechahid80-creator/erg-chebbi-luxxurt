import { useEffect, useState, useRef } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import Hero from "../components/Hero";
import ExperienceCard from "../components/ExperienceCard";
import TestimonialCard from "../components/TestimonialCard";
import SectionDivider from "../components/SectionDivider";
import experiences from "../data/experiences";
import {
  Shield,
  Compass,
  Users,
  Star,
  Mountain,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const whyUsIcons = [Heart, Mountain, Users, Shield, Compass, Star];

const testimonialsData = [
  {
    id: 1,
    author_name: "Sophie Laurent",
    country: "France",
    rating: 5,
    comment_text:
      "An unforgettable night beneath the Saharan stars. The camp was exquisite — every detail from the Berber carpets to the candlelit dinner exceeded our expectations. Truly a once-in-a-lifetime experience.",
  },
  {
    id: 2,
    author_name: "James & Emily Carter",
    country: "United Kingdom",
    rating: 5,
    comment_text:
      "We have travelled extensively across North Africa, but nothing compares to our stay at Erg Chebbi Luxury. The sunrise camel trek was magical, and the staff made us feel like royalty.",
  },
  {
    id: 3,
    author_name: "Marco Bianchi",
    country: "Italy",
    rating: 5,
    comment_text:
      "Exceptional hospitality in the most breathtaking setting imaginable. The luxury tents were stunning, the food was incredible, and the silence of the desert at night was profoundly moving.",
  },
];

export default function Home({ onNavigate }) {
  const { theme } = useTheme();
  const { t, lang, isRTL } = useLang();
  const featuredExperiences = experiences.slice(0, 4);

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Hero onNavigate={onNavigate} />

      {/* Featured Experiences */}
      <section style={{ background: theme.bg, padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block font-instrument-sans mb-4"
              style={{
                padding: "5px 16px",
                borderRadius: 999,
                border: `1px solid ${theme.border}`,
                background: theme.accentMuted,
                color: theme.accent,
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t.experiences.title}
            </span>
            <h2
              className="font-instrument-sans"
              style={{
                color: theme.text,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {t.experiences.subtitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredExperiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                compact
                onBook={() => onNavigate("booking", exp)}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate("experiences")}
              className="font-instrument-sans inline-flex items-center gap-2 transition-all duration-200"
              style={{
                padding: "12px 28px",
                borderRadius: 6,
                border: `1px solid ${theme.border}`,
                background: "transparent",
                color: theme.text,
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              {t.experiences.viewAll}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Luxury Camp Preview */}
      <section style={{ background: theme.bg, padding: "60px 0 80px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&q=80"
                alt="Luxury desert tent"
                className="w-full rounded-md object-cover"
                style={{ height: 420, borderRadius: 6 }}
              />
              <div
                className="absolute -bottom-4 -right-4 hidden lg:block"
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: `3px solid ${theme.bg}`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559599746-8823b38544c6?w=400&q=80"
                  alt="Camp detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <span
                className="inline-block font-instrument-sans mb-4"
                style={{
                  padding: "5px 16px",
                  borderRadius: 999,
                  border: `1px solid ${theme.border}`,
                  background: theme.accentMuted,
                  color: theme.accent,
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {t.camp.title}
              </span>
              <h2
                className="font-instrument-sans mb-4"
                style={{
                  color: theme.text,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                }}
              >
                {t.camp.subtitle.split(".")[0]}.
              </h2>
              <div className="space-y-3 mt-6">
                {t.camp.features.list.slice(0, 6).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      style={{ color: theme.accent, flexShrink: 0 }}
                    />
                    <span
                      className="font-instrument-sans"
                      style={{ color: theme.textMuted, fontSize: "0.9rem" }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate("camp")}
                className="mt-8 font-instrument-sans inline-flex items-center gap-2"
                style={{
                  padding: "12px 28px",
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
      </section>

      <SectionDivider />

      {/* Why Choose Us */}
      <section style={{ background: theme.bg, padding: "60px 0 80px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block font-instrument-sans mb-4"
              style={{
                padding: "5px 16px",
                borderRadius: 999,
                border: `1px solid ${theme.border}`,
                background: theme.accentMuted,
                color: theme.accent,
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t.whyUs.title}
            </span>
            <p
              className="font-instrument-sans mx-auto"
              style={{
                color: theme.textMuted,
                fontSize: "1rem",
                maxWidth: 500,
                marginTop: 8,
              }}
            >
              {t.whyUs.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whyUs.items.map((item, i) => {
              const Icon = whyUsIcons[i] || Star;
              return (
                <div
                  key={i}
                  className="p-6 transition-colors duration-200"
                  style={{
                    borderRadius: 6,
                    border: `1px solid ${theme.border}`,
                    background: theme.card,
                  }}
                >
                  <div
                    className="flex items-center justify-center mb-4"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 999,
                      background: theme.accentMuted,
                    }}
                  >
                    <Icon size={20} style={{ color: theme.accent }} />
                  </div>
                  <h3
                    className="font-instrument-sans mb-2"
                    style={{
                      color: theme.text,
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-instrument-sans"
                    style={{
                      color: theme.textMuted,
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Testimonials */}
      <section style={{ background: theme.bg, padding: "60px 0 80px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block font-instrument-sans mb-4"
              style={{
                padding: "5px 16px",
                borderRadius: 999,
                border: `1px solid ${theme.border}`,
                background: theme.accentMuted,
                color: theme.accent,
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t.testimonials.title}
            </span>
            <p
              className="font-instrument-sans mx-auto"
              style={{
                color: theme.textMuted,
                fontSize: "1rem",
                maxWidth: 500,
                marginTop: 8,
              }}
            >
              {t.testimonials.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section style={{ background: theme.bgAlt, padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2
                className="font-instrument-sans"
                style={{
                  color: theme.text,
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {t.gallery.title}
              </h2>
              <p
                className="font-instrument-sans mt-1"
                style={{ color: theme.textMuted, fontSize: "0.9rem" }}
              >
                {t.gallery.subtitle}
              </p>
            </div>
            <button
              onClick={() => onNavigate("gallery")}
              className="font-instrument-sans flex items-center gap-2"
              style={{
                padding: "8px 20px",
                borderRadius: 6,
                border: `1px solid ${theme.border}`,
                background: "transparent",
                color: theme.text,
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              {t.gallery.viewFull}
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&q=80",
              "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=400&q=80",
              "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400&q=80",
              "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer"
                onClick={() => onNavigate("gallery")}
                style={{
                  borderRadius: 6,
                  aspectRatio: "1",
                  position: "relative",
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="relative overflow-hidden"
        style={{ padding: "100px 0" }}
      >
        <img
          src="https://images.unsplash.com/photo-1504195698793-21e4fd54f2f8?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.65)" }}
        />
        <div className="relative z-10 text-center px-4">
          <h2
            className="font-instrument-sans"
            style={{
              color: "#F5F0E8",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Your Desert Story Begins Here
          </h2>
          <p
            className="font-instrument-sans mt-4 mx-auto"
            style={{
              color: "rgba(245,240,232,0.6)",
              fontSize: "1rem",
              maxWidth: 500,
            }}
          >
            Reserve your experience in the Sahara and discover why travellers
            from around the world call this unforgettable.
          </p>
          <button
            onClick={() => onNavigate("booking")}
            className="mt-8 font-instrument-sans"
            style={{
              padding: "14px 36px",
              borderRadius: 6,
              border: "none",
              background: "#C8A45A",
              color: "#0A0A0A",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            {t.hero.cta}
          </button>
        </div>
      </section>
    </div>
  );
}
