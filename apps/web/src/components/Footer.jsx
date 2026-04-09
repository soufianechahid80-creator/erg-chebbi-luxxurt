import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import Logo from "./Logo";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/positano_store1",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/18MJ4h2CHG/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.125-5.864 10.125-11.854z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@soufiane_ft10",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48 6.3 6.3 0 001.86-4.49V8.76a8.26 8.26 0 004.87 1.58V6.89a4.85 4.85 0 01-1.15-.2z" />
      </svg>
    ),
  },
];

export default function Footer({ onNavigate }) {
  const { theme } = useTheme();
  const { t, isRTL } = useLang();
  const [email, setEmail] = useState("");

  const quickLinks = [
    { key: "home", label: t.nav.home },
    { key: "experiences", label: t.nav.experiences },
    { key: "camp", label: t.nav.camp },
    { key: "gallery", label: t.nav.gallery },
    { key: "about", label: t.nav.about },
    { key: "booking", label: t.nav.bookNow },
  ];

  return (
    <footer
      style={{
        background: theme.footerBg,
        borderTop: `1px solid ${theme.border}`,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="md" />
            <p
              className="mt-4 font-instrument-sans leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.875rem",
                maxWidth: 280,
              }}
            >
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-colors duration-200"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-instrument-sans mb-4"
              style={{
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t.footer.quickLinks}
            </h4>
            <ul
              className="space-y-2.5"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onNavigate(link.key)}
                    className="font-instrument-sans transition-colors duration-200"
                    style={{
                      border: "none",
                      background: "none",
                      color: "rgba(255,255,255,0.45)",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      padding: 0,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-instrument-sans mb-4"
              style={{
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t.footer.contact}
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/212691999897"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-instrument-sans"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                <Phone size={15} />
                <span>+212 691 999 897</span>
              </a>
              <a
                href="mailto:Soufianechahid30@gmail.com"
                className="flex items-center gap-2.5 font-instrument-sans"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                <Mail size={15} />
                <span>Soufianechahid30@gmail.com</span>
              </a>
              <div
                className="flex items-start gap-2.5 font-instrument-sans"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.875rem",
                }}
              >
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span>{t.contact.info.locationValue}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="font-instrument-sans mb-4"
              style={{
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t.footer.newsletter}
            </h4>
            <p
              className="font-instrument-sans mb-4"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}
            >
              {t.footer.newsletterDesc}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.emailPlaceholder}
                className="font-instrument-sans flex-1"
                style={{
                  padding: "10px 14px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  fontSize: "0.85rem",
                  outline: "none",
                  width: "100%",
                  minWidth: 0,
                }}
              />
              <button
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 6,
                  border: "none",
                  background: theme.accent,
                  color: theme.accentText,
                  cursor: "pointer",
                }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="font-instrument-sans"
            style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}
          >
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <button
              className="font-instrument-sans"
              style={{
                border: "none",
                background: "none",
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {t.footer.privacy}
            </button>
            <button
              className="font-instrument-sans"
              style={{
                border: "none",
                background: "none",
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
