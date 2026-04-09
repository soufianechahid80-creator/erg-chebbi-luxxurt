import { useState, useEffect } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";

export default function Navbar({ currentPage, onNavigate }) {
  const { theme } = useTheme();
  const { t, isRTL } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { key: "home", label: t.nav.home },
    { key: "experiences", label: t.nav.experiences },
    { key: "camp", label: t.nav.camp },
    { key: "gallery", label: t.nav.gallery },
    { key: "about", label: t.nav.about },
    { key: "contact", label: t.nav.contact },
    { key: "faq", label: t.nav.faq },
  ];

  const handleNav = (key) => {
    onNavigate(key);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? theme.navBg : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? `1px solid ${theme.border}`
            : "1px solid transparent",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo size="md" />

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.key)}
                  className="font-instrument-sans transition-colors duration-200"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "none",
                    background:
                      currentPage === item.key
                        ? theme.accentMuted
                        : "transparent",
                    color:
                      currentPage === item.key
                        ? theme.accent
                        : scrolled
                          ? theme.textMuted
                          : "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: currentPage === item.key ? 500 : 400,
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                onClick={() => handleNav("booking")}
                className="hidden md:flex items-center font-instrument-sans"
                style={{
                  padding: "8px 20px",
                  borderRadius: 6,
                  border: "none",
                  background: theme.accent,
                  color: theme.accentText,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  transition: "all 0.2s ease",
                }}
              >
                {t.nav.bookNow}
              </button>
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: "transparent",
                  color: scrolled ? theme.text : "#fff",
                  cursor: "pointer",
                }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: theme.bg, paddingTop: 80 }}
        >
          <div className="flex flex-col px-6 py-8 gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className="font-instrument-sans text-left"
                style={{
                  padding: "14px 16px",
                  borderRadius: 8,
                  border: "none",
                  background:
                    currentPage === item.key
                      ? theme.accentMuted
                      : "transparent",
                  color: currentPage === item.key ? theme.accent : theme.text,
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: currentPage === item.key ? 500 : 400,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {item.label}
              </button>
            ))}
            <div
              style={{ height: 1, background: theme.border, margin: "12px 0" }}
            />
            <button
              onClick={() => handleNav("booking")}
              className="font-instrument-sans"
              style={{
                padding: "14px 16px",
                borderRadius: 8,
                border: "none",
                background: theme.accent,
                color: theme.accentText,
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {t.nav.bookNow}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
