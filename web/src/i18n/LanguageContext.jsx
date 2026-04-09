import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import en from "./en";
import fr from "./fr";
import es from "./es";
import ar from "./ar";

const translations = { en, fr, es, ar };

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇲🇦" },
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecl-lang");
      if (saved && translations[saved]) {
        setLang(saved);
      }
    } catch (e) {
      // localStorage unavailable
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ecl-lang", lang);
    } catch (e) {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", translations[lang].dir);
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  const switchLang = useCallback((code) => {
    if (translations[code]) setLang(code);
  }, []);

  const t = useMemo(() => translations[lang], [lang]);
  const dir = t.dir;
  const isRTL = dir === "rtl";

  return (
    <LanguageContext.Provider
      value={{ lang, t, dir, isRTL, switchLang, languages }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export default LanguageContext;
