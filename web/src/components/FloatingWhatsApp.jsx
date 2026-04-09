import { useTheme } from "../theme/ThemeContext";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const { theme } = useTheme();

  return (
    <a
      href="https://wa.me/212691999897"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-40 flex items-center justify-center transition-transform duration-200 hover:scale-110"
      style={{
        bottom: 24,
        left: 24,
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "#25D366",
        color: "#fff",
        boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
        textDecoration: "none",
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
