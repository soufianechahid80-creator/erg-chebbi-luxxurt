import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import galleryImages, { galleryCategories } from "../data/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const { theme } = useTheme();
  const { lang, t, isRTL } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
  const nextImage = () =>
    setLightboxIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        paddingTop: 100,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
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
            {t.gallery.title}
          </h1>
          <p
            className="font-instrument-sans mt-3 mx-auto"
            style={{ color: theme.textMuted, fontSize: "1rem", maxWidth: 500 }}
          >
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="font-instrument-sans transition-all duration-200"
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                border: `1px solid ${activeCategory === cat.id ? theme.accent : theme.border}`,
                background:
                  activeCategory === cat.id ? theme.accentMuted : "transparent",
                color:
                  activeCategory === cat.id ? theme.accent : theme.textMuted,
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: activeCategory === cat.id ? 500 : 400,
              }}
            >
              {cat.label[lang] || cat.label.en}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className="overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(i)}
              style={{
                borderRadius: 6,
                aspectRatio: i % 5 === 0 ? "1" : i % 3 === 0 ? "3/4" : "4/3",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-6 right-6 flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 md:left-8 flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 md:right-8 flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={20} />
          </button>
          <img
            src={filtered[lightboxIndex]?.src}
            alt={filtered[lightboxIndex]?.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: 4 }}
          />
          <p
            className="absolute bottom-6 text-center font-instrument-sans"
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}
          >
            {lightboxIndex + 1} / {filtered.length}
          </p>
        </div>
      )}
    </div>
  );
}
