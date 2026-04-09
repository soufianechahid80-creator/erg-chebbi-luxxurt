import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../theme/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import FloatingBookCTA from "../components/FloatingBookCTA";
import Home from "../pages/Home";
import Experiences from "../pages/Experiences";
import LuxuryCamp from "../pages/LuxuryCamp";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import Booking from "../pages/Booking";
import Admin from "../pages/Admin";

export default function App() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Handle hash-based routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setCurrentPage(hash);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigate = useCallback((page, experience) => {
    if (experience) setSelectedExperience(experience);
    else setSelectedExperience(null);
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Track visitor
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const sessionId =
        sessionStorage.getItem("ecl-session") ||
        `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem("ecl-session", sessionId);
      fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          page_visited: currentPage,
          referrer: document.referrer || null,
        }),
      }).catch(() => {});
    } catch (e) {
      // Ignore tracking errors
    }
  }, [currentPage]);

  // Admin page — completely separate
  if (currentPage === "admin") {
    return <Admin />;
  }

  const isHome = currentPage === "home";

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={navigate} />;
      case "experiences":
        return <Experiences onNavigate={navigate} />;
      case "camp":
        return <LuxuryCamp onNavigate={navigate} />;
      case "gallery":
        return <Gallery />;
      case "about":
        return <About />;
      case "faq":
        return <FAQ />;
      case "contact":
        return <Contact />;
      case "booking":
        return (
          <Booking
            onNavigate={navigate}
            selectedExperience={selectedExperience}
          />
        );
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div
      style={{ background: theme.bg, minHeight: "100vh", color: theme.text }}
    >
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigate} />
      <FloatingWhatsApp />
      <FloatingBookCTA onNavigate={navigate} />
    </div>
  );
}
