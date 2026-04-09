import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../theme/ThemeContext";
import {
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
  Eye,
  Search,
  LogOut,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
} from "lucide-react";

const statusColors = {
  pending: { bg: "#FEF3C7", text: "#92400E" },
  confirmed: { bg: "#D1FAE5", text: "#065F46" },
  cancelled: { bg: "#FEE2E2", text: "#991B1B" },
  completed: { bg: "#DBEAFE", text: "#1E40AF" },
};

function AdminLogin({ onLogin }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }
      const data = await res.json();
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#F8FAFC" }}
    >
      <div style={{ maxWidth: 400, width: "100%", padding: "0 16px" }}>
        <div className="text-center mb-8">
          <h1
            className="font-instrument-sans"
            style={{
              fontSize: "1.5rem",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#0F172A",
            }}
          >
            Erg Chebbi Luxury
          </h1>
          <p
            className="font-instrument-sans mt-1"
            style={{
              fontSize: "0.8rem",
              color: "#64748B",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Admin Dashboard
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: 8,
            border: "1px solid #E2E8F0",
            padding: 32,
          }}
        >
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="font-instrument-sans"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 6,
                border: "1px solid #E2E8F0",
                fontSize: "0.9rem",
                outline: "none",
                color: "#0F172A",
                background: "#F8FAFC",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="font-instrument-sans"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 6,
                border: "1px solid #E2E8F0",
                fontSize: "0.9rem",
                outline: "none",
                color: "#0F172A",
                background: "#F8FAFC",
              }}
            />
          </div>
          {error && (
            <p
              className="font-instrument-sans mt-3"
              style={{ color: "#991B1B", fontSize: "0.8rem" }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 font-instrument-sans"
            style={{
              padding: "10px",
              borderRadius: 6,
              border: "none",
              background: "#0F172A",
              color: "#fff",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p
          className="text-center font-instrument-sans mt-4"
          style={{ fontSize: "0.75rem", color: "#94A3B8" }}
        >
          Default: Soufianechahid30@gmail.com / admin123
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        border: "1px solid #E2E8F0",
        padding: 20,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {sub && (
          <span
            className="font-instrument-sans"
            style={{
              fontSize: "0.7rem",
              color: "#64748B",
              padding: "3px 8px",
              borderRadius: 999,
              background: "#F1F5F9",
            }}
          >
            {sub}
          </span>
        )}
      </div>
      <p
        className="font-instrument-sans"
        style={{
          fontSize: "1.5rem",
          fontWeight: 500,
          color: "#0F172A",
          margin: 0,
        }}
      >
        {value}
      </p>
      <p
        className="font-instrument-sans mt-1"
        style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}
      >
        {label}
      </p>
    </div>
  );
}

function Dashboard({ token, onLogout }) {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [tab, setTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, bookingsRes, contactsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch(`/api/bookings?status=${statusFilter}&search=${searchQuery}`),
        fetch("/api/contact"),
      ]);
      if (!statsRes.ok || !bookingsRes.ok || !contactsRes.ok)
        throw new Error("Failed to fetch");
      setStats(await statsRes.json());
      setBookings(await bookingsRes.json());
      setContacts(await contactsRes.json());
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateBookingStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "bookings", label: "Bookings" },
    { key: "messages", label: "Messages" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <meta name="robots" content="noindex, nofollow" />
      {/* Header */}
      <header
        className="sticky top-0 z-30"
        style={{ background: "#fff", borderBottom: "1px solid #E2E8F0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1
              className="font-instrument-sans"
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#0F172A",
                margin: 0,
              }}
            >
              Erg Chebbi Luxury
            </h1>
            <span
              style={{
                fontSize: "0.7rem",
                padding: "2px 8px",
                borderRadius: 999,
                background: "#F1F5F9",
                color: "#64748B",
                fontWeight: 500,
              }}
            >
              Admin
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 font-instrument-sans"
            style={{
              border: "none",
              background: "none",
              color: "#64748B",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {error && (
          <div
            className="mb-4 p-3"
            style={{
              background: "#FEE2E2",
              color: "#991B1B",
              borderRadius: 6,
              fontSize: "0.85rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Tabs */}
        <div
          className="flex items-center gap-1 mb-6"
          style={{ borderBottom: "1px solid #E2E8F0" }}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="font-instrument-sans"
              style={{
                padding: "10px 16px",
                border: "none",
                background: "none",
                color: tab === t.key ? "#0F172A" : "#64748B",
                fontSize: "0.85rem",
                fontWeight: tab === t.key ? 500 : 400,
                cursor: "pointer",
                borderBottom:
                  tab === t.key ? "2px solid #0F172A" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === "overview" && stats && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={Calendar}
                label="Total Bookings"
                value={stats.bookings.total_count}
                sub={`${stats.bookings.pending_count} pending`}
                color="#C8A45A"
              />
              <StatCard
                icon={DollarSign}
                label="Estimated Revenue"
                value={`€${Number(stats.revenue.total_revenue).toLocaleString()}`}
                sub={`€${Number(stats.revenue.confirmed_revenue).toLocaleString()} confirmed`}
                color="#065F46"
              />
              <StatCard
                icon={Eye}
                label="Total Visitors"
                value={stats.visitors.total_count}
                sub={`${stats.visitors.today_count} today`}
                color="#2563EB"
              />
              <StatCard
                icon={MessageSquare}
                label="Messages"
                value={stats.contacts.total_count}
                sub={`${stats.contacts.unread_count} unread`}
                color="#7C3AED"
              />
            </div>
            {/* Recent bookings */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                border: "1px solid #E2E8F0",
              }}
            >
              <div
                className="p-4"
                style={{ borderBottom: "1px solid #E2E8F0" }}
              >
                <h3
                  className="font-instrument-sans"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#0F172A",
                    margin: 0,
                  }}
                >
                  Recent Bookings
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                      {["Guest", "Experience", "Date", "Total", "Status"].map(
                        (h) => (
                          <th
                            key={h}
                            className="font-instrument-sans"
                            style={{
                              padding: "10px 16px",
                              textAlign: "left",
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              color: "#64748B",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(stats.recentBookings || []).map((b) => {
                      const sc =
                        statusColors[b.booking_status] || statusColors.pending;
                      return (
                        <tr
                          key={b.id}
                          style={{ borderBottom: "1px solid #F1F5F9" }}
                        >
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "12px 16px",
                              fontSize: "0.85rem",
                              color: "#0F172A",
                              fontWeight: 500,
                            }}
                          >
                            {b.full_name}
                          </td>
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "12px 16px",
                              fontSize: "0.85rem",
                              color: "#64748B",
                            }}
                          >
                            {b.experience}
                          </td>
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "12px 16px",
                              fontSize: "0.85rem",
                              color: "#64748B",
                            }}
                          >
                            {b.check_in || "—"}
                          </td>
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "12px 16px",
                              fontSize: "0.85rem",
                              color: "#0F172A",
                              fontWeight: 500,
                            }}
                          >
                            €{b.estimated_total}
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <span
                              style={{
                                padding: "3px 10px",
                                borderRadius: 999,
                                background: sc.bg,
                                color: sc.text,
                                fontSize: "0.7rem",
                                fontWeight: 500,
                              }}
                            >
                              {b.booking_status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {(!stats.recentBookings ||
                  stats.recentBookings.length === 0) && (
                  <p
                    className="text-center font-instrument-sans py-8"
                    style={{ color: "#94A3B8", fontSize: "0.85rem" }}
                  >
                    No bookings yet
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Bookings tab */}
        {tab === "bookings" && (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94A3B8",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="font-instrument-sans"
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 36px",
                    borderRadius: 6,
                    border: "1px solid #E2E8F0",
                    fontSize: "0.85rem",
                    outline: "none",
                    color: "#0F172A",
                    background: "#fff",
                  }}
                />
              </div>
              <div className="flex gap-2">
                {["all", "pending", "confirmed", "cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className="font-instrument-sans"
                    style={{
                      padding: "6px 14px",
                      borderRadius: 999,
                      border: `1px solid ${statusFilter === s ? "#0F172A" : "#E2E8F0"}`,
                      background: statusFilter === s ? "#0F172A" : "#fff",
                      color: statusFilter === s ? "#fff" : "#64748B",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                border: "1px solid #E2E8F0",
              }}
            >
              <div className="overflow-x-auto">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                      {[
                        "#",
                        "Guest",
                        "Experience",
                        "Check-in",
                        "Guests",
                        "Total",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="font-instrument-sans"
                          style={{
                            padding: "10px 12px",
                            textAlign: "left",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            color: "#64748B",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => {
                      const sc =
                        statusColors[b.booking_status] || statusColors.pending;
                      return (
                        <tr
                          key={b.id}
                          style={{ borderBottom: "1px solid #F1F5F9" }}
                        >
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "10px 12px",
                              fontSize: "0.8rem",
                              color: "#94A3B8",
                            }}
                          >
                            #{b.id}
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            <p
                              className="font-instrument-sans"
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                color: "#0F172A",
                                margin: 0,
                              }}
                            >
                              {b.full_name}
                            </p>
                            <p
                              className="font-instrument-sans"
                              style={{
                                fontSize: "0.75rem",
                                color: "#94A3B8",
                                margin: 0,
                              }}
                            >
                              {b.email}
                            </p>
                          </td>
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "10px 12px",
                              fontSize: "0.8rem",
                              color: "#64748B",
                              maxWidth: 150,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {b.experience}
                          </td>
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "10px 12px",
                              fontSize: "0.8rem",
                              color: "#64748B",
                            }}
                          >
                            {b.check_in || "—"}
                          </td>
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "10px 12px",
                              fontSize: "0.8rem",
                              color: "#64748B",
                            }}
                          >
                            {b.adults}A {b.children > 0 ? `${b.children}C` : ""}
                          </td>
                          <td
                            className="font-instrument-sans"
                            style={{
                              padding: "10px 12px",
                              fontSize: "0.85rem",
                              fontWeight: 500,
                              color: "#0F172A",
                            }}
                          >
                            €{b.estimated_total}
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            <span
                              style={{
                                padding: "3px 10px",
                                borderRadius: 999,
                                background: sc.bg,
                                color: sc.text,
                                fontSize: "0.7rem",
                                fontWeight: 500,
                              }}
                            >
                              {b.booking_status}
                            </span>
                          </td>
                          <td style={{ padding: "10px 12px" }}>
                            <div className="flex items-center gap-1">
                              {b.booking_status === "pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      updateBookingStatus(b.id, "confirmed")
                                    }
                                    title="Confirm"
                                    style={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: 4,
                                      border: "1px solid #D1FAE5",
                                      background: "#D1FAE5",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <CheckCircle size={14} color="#065F46" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateBookingStatus(b.id, "cancelled")
                                    }
                                    title="Cancel"
                                    style={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: 4,
                                      border: "1px solid #FEE2E2",
                                      background: "#FEE2E2",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <XCircle size={14} color="#991B1B" />
                                  </button>
                                </>
                              )}
                              {b.booking_status === "confirmed" && (
                                <button
                                  onClick={() =>
                                    updateBookingStatus(b.id, "completed")
                                  }
                                  title="Complete"
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 4,
                                    border: "1px solid #DBEAFE",
                                    background: "#DBEAFE",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <CheckCircle size={14} color="#1E40AF" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {bookings.length === 0 && (
                  <p
                    className="text-center font-instrument-sans py-8"
                    style={{ color: "#94A3B8", fontSize: "0.85rem" }}
                  >
                    No bookings found
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Messages tab */}
        {tab === "messages" && (
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #E2E8F0",
            }}
          >
            {contacts.map((c) => (
              <div
                key={c.id}
                className="p-4"
                style={{ borderBottom: "1px solid #F1F5F9" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="font-instrument-sans"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "#0F172A",
                        margin: 0,
                      }}
                    >
                      {c.full_name}
                      {!c.is_read && (
                        <span
                          style={{
                            marginLeft: 8,
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#C8A45A",
                            display: "inline-block",
                          }}
                        />
                      )}
                    </p>
                    <p
                      className="font-instrument-sans"
                      style={{
                        fontSize: "0.75rem",
                        color: "#94A3B8",
                        margin: "2px 0 0",
                      }}
                    >
                      {c.email} {c.phone ? `• ${c.phone}` : ""}
                    </p>
                  </div>
                  <span
                    className="font-instrument-sans flex-shrink-0"
                    style={{ fontSize: "0.7rem", color: "#94A3B8" }}
                  >
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
                {c.subject && (
                  <p
                    className="font-instrument-sans mt-2"
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#0F172A",
                      margin: 0,
                    }}
                  >
                    {c.subject}
                  </p>
                )}
                <p
                  className="font-instrument-sans mt-1"
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748B",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {c.message}
                </p>
              </div>
            ))}
            {contacts.length === 0 && (
              <p
                className="text-center font-instrument-sans py-8"
                style={{ color: "#94A3B8", fontSize: "0.85rem" }}
              >
                No messages yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecl-admin-token");
      if (saved) setToken(saved);
    } catch (e) {
      // SSR or localStorage unavailable
    }
  }, []);

  const handleLogin = (t) => {
    setToken(t);
    try {
      localStorage.setItem("ecl-admin-token", t);
    } catch (e) {}
  };

  const handleLogout = () => {
    setToken(null);
    try {
      localStorage.removeItem("ecl-admin-token");
    } catch (e) {}
  };

  if (!token) return <AdminLogin onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} />;
}
