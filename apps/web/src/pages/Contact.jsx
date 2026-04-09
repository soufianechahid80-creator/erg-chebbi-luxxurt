import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Contact() {
  const { theme } = useTheme();
  const { t, isRTL } = useLang();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setForm({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 6,
    border: `1px solid ${theme.border}`,
    background: theme.surface,
    color: theme.text,
    fontSize: "0.9rem",
    fontFamily: '"Instrument Sans", sans-serif',
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        paddingTop: 100,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
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
            {t.contact.title}
          </h1>
          <p
            className="font-instrument-sans mt-3 mx-auto"
            style={{ color: theme.textMuted, fontSize: "1rem", maxWidth: 500 }}
          >
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2
              className="font-instrument-sans mb-6"
              style={{ color: theme.text, fontSize: "1.1rem", fontWeight: 500 }}
            >
              {t.contact.info.title}
            </h2>
            <div className="space-y-4">
              <a
                href="https://wa.me/212691999897"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 transition-colors duration-200"
                style={{
                  borderRadius: 6,
                  border: `1px solid ${theme.border}`,
                  background: theme.card,
                  textDecoration: "none",
                  color: theme.text,
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    background: "rgba(37,211,102,0.1)",
                  }}
                >
                  <MessageCircle size={20} style={{ color: "#25D366" }} />
                </div>
                <div>
                  <p
                    className="font-instrument-sans"
                    style={{
                      fontSize: "0.8rem",
                      color: theme.textMuted,
                      margin: 0,
                    }}
                  >
                    {t.contact.info.whatsapp}
                  </p>
                  <p
                    className="font-instrument-sans"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      margin: 0,
                      color: theme.text,
                    }}
                  >
                    +212 691 999 897
                  </p>
                </div>
              </a>
              <a
                href="mailto:Soufianechahid30@gmail.com"
                className="flex items-center gap-4 p-4"
                style={{
                  borderRadius: 6,
                  border: `1px solid ${theme.border}`,
                  background: theme.card,
                  textDecoration: "none",
                  color: theme.text,
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    background: theme.accentMuted,
                  }}
                >
                  <Mail size={20} style={{ color: theme.accent }} />
                </div>
                <div>
                  <p
                    className="font-instrument-sans"
                    style={{
                      fontSize: "0.8rem",
                      color: theme.textMuted,
                      margin: 0,
                    }}
                  >
                    {t.contact.info.email}
                  </p>
                  <p
                    className="font-instrument-sans"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      margin: 0,
                      color: theme.text,
                    }}
                  >
                    Soufianechahid30@gmail.com
                  </p>
                </div>
              </a>
              <div
                className="flex items-center gap-4 p-4"
                style={{
                  borderRadius: 6,
                  border: `1px solid ${theme.border}`,
                  background: theme.card,
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    background: theme.accentMuted,
                  }}
                >
                  <MapPin size={20} style={{ color: theme.accent }} />
                </div>
                <div>
                  <p
                    className="font-instrument-sans"
                    style={{
                      fontSize: "0.8rem",
                      color: theme.textMuted,
                      margin: 0,
                    }}
                  >
                    {t.contact.info.location}
                  </p>
                  <p
                    className="font-instrument-sans"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      margin: 0,
                      color: theme.text,
                    }}
                  >
                    {t.contact.info.locationValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.contact.form.name}
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  required
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder={t.contact.form.email}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder={t.contact.form.phone}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder={t.contact.form.subject}
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  style={inputStyle}
                />
              </div>
              <textarea
                placeholder={t.contact.form.message}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                rows={6}
                style={{ ...inputStyle, resize: "vertical" }}
              />

              {status === "success" && (
                <div
                  className="flex items-center gap-2 p-3"
                  style={{
                    borderRadius: 6,
                    background: "rgba(6,95,70,0.1)",
                    color: "#065F46",
                  }}
                >
                  <CheckCircle size={16} />
                  <span
                    className="font-instrument-sans"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {t.contact.form.success}
                  </span>
                </div>
              )}
              {status === "error" && (
                <div
                  className="flex items-center gap-2 p-3"
                  style={{
                    borderRadius: 6,
                    background: "rgba(153,27,27,0.1)",
                    color: "#991B1B",
                  }}
                >
                  <AlertCircle size={16} />
                  <span
                    className="font-instrument-sans"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {t.contact.form.error}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="font-instrument-sans w-full sm:w-auto"
                style={{
                  padding: "12px 32px",
                  borderRadius: 6,
                  border: "none",
                  background: theme.accent,
                  color: theme.accentText,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? t.contact.form.sending : t.contact.form.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
