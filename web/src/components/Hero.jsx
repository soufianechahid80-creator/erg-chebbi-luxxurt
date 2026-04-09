import { useEffect, useState, useRef } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import { Play, ChevronDown } from "lucide-react";

const heroVideo =
  "https://raw.createusercontent.com/0ce5b49c-205a-46c2-ac9c-30875a668bec/";

const heroImages = [
  "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1920&q=80",
  "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1920&q=80",
  "https://images.unsplash.com/photo-1504195698793-21e4fd54f2f8?w=1920&q=80",
];

export default function Hero({ onNavigate }) {
  const { theme } = useTheme();
  const { t, isRTL } = useLang();
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "100vh",
        minHeight: 600,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Background video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 1s ease" }}
      />

      {/* Fallback images (visible until video loads) */}
      {!videoLoaded &&
        heroImages.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[2000ms]"
            style={{ opacity: currentImage === i ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ transform: "scale(1.05)" }}
            />
          </div>
        ))}

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            maxWidth: 800,
          }}
        >
          {/* Tagline pill */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 font-instrument-sans"
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                border: "1px solid rgba(200,164,90,0.4)",
                background: "rgba(200,164,90,0.1)",
                color: "#C8A45A",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#C8A45A",
                }}
              />
              {t.hero.tagline}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-instrument-sans"
            style={{
              color: "#F5F0E8",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 font-instrument-sans mx-auto"
            style={{
              color: "rgba(245,240,232,0.7)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: 600,
            }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <button
              onClick={() => onNavigate("booking")}
              className="font-instrument-sans"
              style={{
                padding: "14px 32px",
                borderRadius: 6,
                border: "none",
                background: "#C8A45A",
                color: "#0A0A0A",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                transition: "all 0.3s ease",
              }}
            >
              {t.hero.cta}
            </button>
            <button
              onClick={() => onNavigate("experiences")}
              className="font-instrument-sans flex items-center gap-2"
              style={{
                padding: "14px 28px",
                borderRadius: 6,
                border: "1px solid rgba(245,240,232,0.25)",
                background: "rgba(255,255,255,0.05)",
                color: "#F5F0E8",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 400,
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
            >
              <Play size={16} />
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.5 }}
        >
          <ChevronDown size={20} color="#F5F0E8" className="animate-bounce" />
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            style={{
              width: currentImage === i ? 24 : 8,
              height: 3,
              borderRadius: 999,
              border: "none",
              background:
                currentImage === i ? "#C8A45A" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
