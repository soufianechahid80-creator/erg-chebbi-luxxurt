import { useState, useMemo } from "react";
import { useTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LanguageContext";
import experiences from "../data/experiences";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Users,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";

const STEPS = ["experience", "dates", "details", "review"];

export default function Booking({ onNavigate, selectedExperience }) {
  const { theme } = useTheme();
  const { t, lang, isRTL } = useLang();
  const [step, setStep] = useState(selectedExperience ? 1 : 0);
  const [form, setForm] = useState({
    experience: selectedExperience?.id || "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    full_name: "",
    email: "",
    phone: "",
    country: "",
    preferred_language: lang,
    special_requests: "",
    payment_method: "stripe",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedExp = experiences.find((e) => e.id === form.experience);
  const isAccommodation = selectedExp?.isAccommodation;

  const nights = useMemo(() => {
    if (!isAccommodation || !form.checkIn || !form.checkOut) return 0;
    const diff = new Date(form.checkOut) - new Date(form.checkIn);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [form.checkIn, form.checkOut, isAccommodation]);

  const estimatedTotal = useMemo(() => {
    if (!selectedExp || !selectedExp.price) return 0;
    if (isAccommodation) {
      return (
        (nights || 1) * selectedExp.price * (form.adults + form.children * 0.5)
      );
    }
    return selectedExp.price * (form.adults + form.children * 0.5);
  }, [selectedExp, nights, form.adults, form.children, isAccommodation]);

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          nights,
          estimated_total: estimatedTotal,
          experience: selectedExp?.title?.en || form.experience,
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      const data = await res.json();
      setBookingRef(data.id || "ECL-" + Date.now());
      setStatus("success");
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
  };

  const stepIcons = [FileText, Calendar, Users, CreditCard];

  if (status === "success") {
    return (
      <div
        style={{
          background: theme.bg,
          minHeight: "100vh",
          paddingTop: 100,
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-6">
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: theme.accentMuted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={36} style={{ color: theme.accent }} />
            </div>
          </div>
          <h1
            className="font-instrument-sans"
            style={{
              color: theme.text,
              fontSize: "1.8rem",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            {t.booking.success.title}
          </h1>
          <p
            className="font-instrument-sans mt-3"
            style={{
              color: theme.textMuted,
              fontSize: "0.95rem",
              lineHeight: 1.7,
            }}
          >
            {t.booking.success.message}
          </p>
          <div
            className="mt-6 inline-block"
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: theme.accentMuted,
              color: theme.accent,
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            {t.booking.success.ref}: #{bookingRef}
          </div>
          <div className="mt-8">
            <button
              onClick={() => onNavigate("home")}
              className="font-instrument-sans"
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
              {t.booking.success.backHome}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        paddingTop: 100,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="font-instrument-sans"
            style={{
              color: theme.text,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {t.booking.title}
          </h1>
          <p
            className="font-instrument-sans mt-2"
            style={{ color: theme.textMuted, fontSize: "0.9rem" }}
          >
            {t.booking.subtitle}
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const Icon = stepIcons[i];
            const active = i === step;
            const completed = i < step;
            return (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    background: active
                      ? theme.accentMuted
                      : completed
                        ? theme.accentMuted
                        : "transparent",
                    border: `1px solid ${active ? theme.accent : completed ? theme.accent : theme.border}`,
                  }}
                >
                  {completed ? (
                    <Check size={14} style={{ color: theme.accent }} />
                  ) : (
                    <Icon
                      size={14}
                      style={{
                        color: active ? theme.accent : theme.textSubtle,
                      }}
                    />
                  )}
                  <span
                    className="hidden sm:inline font-instrument-sans"
                    style={{
                      color: active ? theme.accent : theme.textSubtle,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {t.booking.steps[s]}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{ width: 20, height: 1, background: theme.border }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form area */}
          <div className="lg:col-span-2">
            <div
              style={{
                borderRadius: 6,
                border: `1px solid ${theme.border}`,
                background: theme.card,
                padding: 24,
              }}
            >
              {/* Step 0: Select Experience */}
              {step === 0 && (
                <div className="space-y-3">
                  <h3
                    className="font-instrument-sans mb-4"
                    style={{
                      color: theme.text,
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    {t.booking.fields.selectExperience}
                  </h3>
                  {experiences.map((exp) => {
                    const isSelected = form.experience === exp.id;
                    return (
                      <button
                        key={exp.id}
                        onClick={() => update("experience", exp.id)}
                        className="w-full flex items-center gap-4 transition-all duration-200"
                        style={{
                          padding: "14px 16px",
                          borderRadius: 6,
                          border: `1px solid ${isSelected ? theme.accent : theme.border}`,
                          background: isSelected
                            ? theme.accentMuted
                            : "transparent",
                          cursor: "pointer",
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        <div
                          className="flex-shrink-0"
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            border: `2px solid ${isSelected ? theme.accent : theme.border}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {isSelected && (
                            <div
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: theme.accent,
                              }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className="font-instrument-sans"
                            style={{
                              color: theme.text,
                              fontSize: "0.9rem",
                              fontWeight: 500,
                              margin: 0,
                            }}
                          >
                            {exp.title[lang] || exp.title.en}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span
                              className="font-instrument-sans flex items-center gap-1"
                              style={{
                                color: theme.textMuted,
                                fontSize: "0.75rem",
                              }}
                            >
                              <Clock size={11} /> {exp.duration}
                            </span>
                            {exp.price && (
                              <span
                                className="font-instrument-sans"
                                style={{
                                  color: theme.accent,
                                  fontSize: "0.8rem",
                                  fontWeight: 500,
                                }}
                              >
                                €{exp.price}{" "}
                                {exp.priceUnit === "night"
                                  ? t.experiences.perNight
                                  : t.experiences.perPerson}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 1: Dates & Guests */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3
                    className="font-instrument-sans mb-4"
                    style={{
                      color: theme.text,
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    {t.booking.steps.dates}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="font-instrument-sans block mb-2"
                        style={{
                          color: theme.textMuted,
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        {isAccommodation
                          ? t.booking.fields.checkIn
                          : t.booking.fields.activityDate}
                      </label>
                      <input
                        type="date"
                        value={form.checkIn}
                        onChange={(e) => update("checkIn", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    {isAccommodation && (
                      <div>
                        <label
                          className="font-instrument-sans block mb-2"
                          style={{
                            color: theme.textMuted,
                            fontSize: "0.8rem",
                            fontWeight: 500,
                          }}
                        >
                          {t.booking.fields.checkOut}
                        </label>
                        <input
                          type="date"
                          value={form.checkOut}
                          onChange={(e) => update("checkOut", e.target.value)}
                          min={form.checkIn}
                          style={inputStyle}
                        />
                      </div>
                    )}
                  </div>
                  {isAccommodation && nights > 0 && (
                    <div
                      style={{
                        padding: "10px 16px",
                        borderRadius: 999,
                        background: theme.accentMuted,
                        color: theme.accent,
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        display: "inline-block",
                      }}
                    >
                      {nights} {t.booking.fields.nights}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label
                        className="font-instrument-sans block mb-2"
                        style={{
                          color: theme.textMuted,
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        {t.booking.fields.adults}
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            update("adults", Math.max(1, form.adults - 1))
                          }
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 6,
                            border: `1px solid ${theme.border}`,
                            background: "transparent",
                            color: theme.text,
                            cursor: "pointer",
                            fontSize: "1.2rem",
                          }}
                        >
                          −
                        </button>
                        <span
                          className="font-instrument-sans"
                          style={{
                            color: theme.text,
                            fontSize: "1rem",
                            fontWeight: 500,
                            minWidth: 24,
                            textAlign: "center",
                          }}
                        >
                          {form.adults}
                        </span>
                        <button
                          onClick={() => update("adults", form.adults + 1)}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 6,
                            border: `1px solid ${theme.border}`,
                            background: "transparent",
                            color: theme.text,
                            cursor: "pointer",
                            fontSize: "1.2rem",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label
                        className="font-instrument-sans block mb-2"
                        style={{
                          color: theme.textMuted,
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        {t.booking.fields.children}
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            update("children", Math.max(0, form.children - 1))
                          }
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 6,
                            border: `1px solid ${theme.border}`,
                            background: "transparent",
                            color: theme.text,
                            cursor: "pointer",
                            fontSize: "1.2rem",
                          }}
                        >
                          −
                        </button>
                        <span
                          className="font-instrument-sans"
                          style={{
                            color: theme.text,
                            fontSize: "1rem",
                            fontWeight: 500,
                            minWidth: 24,
                            textAlign: "center",
                          }}
                        >
                          {form.children}
                        </span>
                        <button
                          onClick={() => update("children", form.children + 1)}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 6,
                            border: `1px solid ${theme.border}`,
                            background: "transparent",
                            color: theme.text,
                            cursor: "pointer",
                            fontSize: "1.2rem",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Customer Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3
                    className="font-instrument-sans mb-4"
                    style={{
                      color: theme.text,
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    {t.booking.steps.details}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={t.booking.fields.fullName}
                      value={form.full_name}
                      onChange={(e) => update("full_name", e.target.value)}
                      required
                      style={inputStyle}
                    />
                    <input
                      type="email"
                      placeholder={t.booking.fields.email}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                      style={inputStyle}
                    />
                    <input
                      type="tel"
                      placeholder={t.booking.fields.phone}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder={t.booking.fields.country}
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <select
                    value={form.preferred_language}
                    onChange={(e) =>
                      update("preferred_language", e.target.value)
                    }
                    style={inputStyle}
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="ar">العربية</option>
                  </select>
                  <textarea
                    placeholder={t.booking.fields.specialRequests}
                    value={form.special_requests}
                    onChange={(e) => update("special_requests", e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                  <div>
                    <label
                      className="font-instrument-sans block mb-3"
                      style={{
                        color: theme.textMuted,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      {t.booking.fields.paymentMethod}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["stripe", "paypal", "bank", "cash"].map((method) => (
                        <button
                          key={method}
                          onClick={() => update("payment_method", method)}
                          className="font-instrument-sans"
                          style={{
                            padding: "10px 14px",
                            borderRadius: 6,
                            border: `1px solid ${form.payment_method === method ? theme.accent : theme.border}`,
                            background:
                              form.payment_method === method
                                ? theme.accentMuted
                                : "transparent",
                            color:
                              form.payment_method === method
                                ? theme.accent
                                : theme.textMuted,
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                          }}
                        >
                          {t.booking.payment[method]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3
                    className="font-instrument-sans mb-4"
                    style={{
                      color: theme.text,
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    {t.booking.steps.review}
                  </h3>
                  {[
                    {
                      label: t.booking.summary.experience,
                      value:
                        selectedExp?.title?.[lang] || selectedExp?.title?.en,
                    },
                    {
                      label: t.booking.summary.dates,
                      value: isAccommodation
                        ? `${form.checkIn} → ${form.checkOut}`
                        : form.checkIn,
                    },
                    isAccommodation
                      ? { label: t.booking.summary.nights, value: nights }
                      : null,
                    {
                      label: t.booking.summary.guests,
                      value: `${form.adults} adults${form.children > 0 ? `, ${form.children} children` : ""}`,
                    },
                    { label: t.booking.fields.fullName, value: form.full_name },
                    { label: t.booking.fields.email, value: form.email },
                    { label: t.booking.fields.phone, value: form.phone },
                    {
                      label: t.booking.fields.paymentMethod,
                      value: t.booking.payment[form.payment_method],
                    },
                  ]
                    .filter(Boolean)
                    .map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3"
                        style={{ borderBottom: `1px solid ${theme.border}` }}
                      >
                        <span
                          className="font-instrument-sans"
                          style={{
                            color: theme.textMuted,
                            fontSize: "0.85rem",
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="font-instrument-sans"
                          style={{
                            color: theme.text,
                            fontSize: "0.9rem",
                            fontWeight: 500,
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  {form.special_requests && (
                    <div className="py-3">
                      <span
                        className="font-instrument-sans block mb-1"
                        style={{ color: theme.textMuted, fontSize: "0.85rem" }}
                      >
                        {t.booking.fields.specialRequests}
                      </span>
                      <span
                        className="font-instrument-sans"
                        style={{ color: theme.text, fontSize: "0.85rem" }}
                      >
                        {form.special_requests}
                      </span>
                    </div>
                  )}

                  {status === "error" && (
                    <div
                      className="p-3"
                      style={{
                        borderRadius: 6,
                        background: "rgba(153,27,27,0.1)",
                        color: "#991B1B",
                        fontSize: "0.85rem",
                      }}
                    >
                      {t.booking.error}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div
                className="flex items-center justify-between mt-8 pt-6"
                style={{ borderTop: `1px solid ${theme.border}` }}
              >
                {step > 0 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="font-instrument-sans flex items-center gap-2"
                    style={{
                      padding: "10px 20px",
                      borderRadius: 6,
                      border: `1px solid ${theme.border}`,
                      background: "transparent",
                      color: theme.text,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    <ArrowLeft size={14} />
                    {t.booking.back}
                  </button>
                ) : (
                  <div />
                )}
                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 0 && !form.experience}
                    className="font-instrument-sans flex items-center gap-2"
                    style={{
                      padding: "10px 24px",
                      borderRadius: 6,
                      border: "none",
                      background: theme.accent,
                      color: theme.accentText,
                      cursor:
                        step === 0 && !form.experience
                          ? "not-allowed"
                          : "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      opacity: step === 0 && !form.experience ? 0.5 : 1,
                    }}
                  >
                    {t.booking.next}
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="font-instrument-sans flex items-center gap-2"
                    style={{
                      padding: "12px 28px",
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
                    {loading ? t.booking.confirming : t.booking.cta}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24"
              style={{
                borderRadius: 6,
                border: `1px solid ${theme.border}`,
                background: theme.card,
                padding: 20,
              }}
            >
              <h4
                className="font-instrument-sans mb-4"
                style={{
                  color: theme.text,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              >
                {t.booking.summary.title}
              </h4>
              {selectedExp && (
                <>
                  <div
                    className="overflow-hidden mb-4"
                    style={{ borderRadius: 6, height: 120 }}
                  >
                    <img
                      src={
                        selectedExp.image ||
                        "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&q=80"
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
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
                    {selectedExp.title[lang] || selectedExp.title.en}
                  </p>
                  <p
                    className="font-instrument-sans mt-1"
                    style={{ color: theme.textMuted, fontSize: "0.8rem" }}
                  >
                    {selectedExp.duration}
                  </p>
                </>
              )}
              {form.checkIn && (
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: `1px solid ${theme.border}` }}
                >
                  <div className="flex justify-between">
                    <span
                      className="font-instrument-sans"
                      style={{ color: theme.textMuted, fontSize: "0.8rem" }}
                    >
                      {t.booking.summary.dates}
                    </span>
                    <span
                      className="font-instrument-sans"
                      style={{ color: theme.text, fontSize: "0.8rem" }}
                    >
                      {form.checkIn}
                    </span>
                  </div>
                  {isAccommodation && nights > 0 && (
                    <div className="flex justify-between mt-2">
                      <span
                        className="font-instrument-sans"
                        style={{ color: theme.textMuted, fontSize: "0.8rem" }}
                      >
                        {t.booking.summary.nights}
                      </span>
                      <span
                        className="font-instrument-sans"
                        style={{ color: theme.text, fontSize: "0.8rem" }}
                      >
                        {nights}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {estimatedTotal > 0 && (
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: `1px solid ${theme.border}` }}
                >
                  <div className="flex justify-between">
                    <span
                      className="font-instrument-sans"
                      style={{
                        color: theme.text,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      {t.booking.summary.total}
                    </span>
                    <span
                      className="font-instrument-sans"
                      style={{
                        color: theme.accent,
                        fontSize: "1.1rem",
                        fontWeight: 500,
                      }}
                    >
                      €{estimatedTotal.toFixed(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
