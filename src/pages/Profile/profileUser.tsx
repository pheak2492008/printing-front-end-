import { useState } from "react";

const orders = [
  {
    id: "#ORD-2841",
    date: "Mar 22, 2026",
    status: "Delivered",
    items: 3,
    total: "$124.00",
    color: "#22c55e",
  },
  {
    id: "#ORD-2790",
    date: "Mar 10, 2026",
    status: "In Production",
    items: 1,
    total: "$58.50",
    color: "#f59e0b",
  },
  {
    id: "#ORD-2754",
    date: "Feb 28, 2026",
    status: "Delivered",
    items: 5,
    total: "$210.00",
    color: "#22c55e",
  },
  {
    id: "#ORD-2701",
    date: "Feb 12, 2026",
    status: "Cancelled",
    items: 2,
    total: "$89.00",
    color: "#ef4444",
  },
];

const languages = ["English", "Khmer", "French", "Chinese", "Japanese"];

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<
    "overview" | "orders" | "settings" | "language"
  >("overview");
  const [selectedLang, setSelectedLang] = useState("English");
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("Sok Samnang");
  const [email, setEmail] = useState("sok.samnang@email.com");
  const [phone, setPhone] = useState("+855 12 345 678");

  const navItems = [
    {
      key: "overview",
      label: "Overview",
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      key: "orders",
      label: "My Orders",
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      key: "settings",
      label: "Account Settings",
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      key: "language",
      label: "Language",
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ] as const;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#f7f4f2",
        color: "#1a1a1a",
      }}
    >
      {/* Top banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 60%, #3a2e2e 100%)",
          height: 180,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 50%, rgba(201,169,110,0.12) 0%, transparent 50%)",
          }}
        />
        <div
          style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px 0" }}
        >
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
            Account / <span style={{ color: "#c9a96e" }}>Profile</span>
          </p>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#fff",
              marginTop: 8,
              letterSpacing: "-0.02em",
            }}
          >
            My Profile
          </h1>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "-60px auto 0",
          padding: "0 32px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Left sidebar */}
          <div>
            {/* Avatar card */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "32px 24px",
                border: "1px solid #ede9e5",
                textAlign: "center",
                marginBottom: 16,
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #c9a96e, #e8c98a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#fff",
                    boxShadow: "0 0 0 4px #fff, 0 0 0 6px #c9a96e33",
                  }}
                >
                  SS
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#22c55e",
                    border: "2px solid #fff",
                  }}
                />
              </div>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: 19,
                  color: "#1a1a1a",
                  marginBottom: 4,
                }}
              >
                {name}
              </h2>
              <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>
                {email}
              </p>
              <div
                style={{ display: "flex", justifyContent: "center", gap: 16 }}
              >
                {[
                  ["3", "Orders"],
                  ["2", "Active"],
                ].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#1a1a1a",
                      }}
                    >
                      {n}
                    </div>
                    <div style={{ fontSize: 12, color: "#999" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #ede9e5",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              {navItems.map((item, idx) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  style={{
                    width: "100%",
                    background:
                      activeSection === item.key ? "#f9f5f0" : "transparent",
                    border: "none",
                    borderTop: idx > 0 ? "1px solid #f0ece8" : "none",
                    padding: "15px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    color: activeSection === item.key ? "#1a1a1a" : "#666",
                    fontWeight: activeSection === item.key ? 600 : 400,
                    fontSize: 14,
                    transition: "all 0.15s",
                    borderLeft:
                      activeSection === item.key
                        ? "3px solid #c9a96e"
                        : "3px solid transparent",
                  }}
                >
                  <span
                    style={{
                      color: activeSection === item.key ? "#c9a96e" : "#aaa",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="#ccc"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    style={{ marginLeft: "auto" }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
              {/* Logout */}
              <button
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderTop: "1px solid #f0ece8",
                  padding: "15px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  color: "#ef4444",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Right content */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #ede9e5",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            {/* Overview */}
            {activeSection === "overview" && (
              <div style={{ padding: "32px" }}>
                <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 28 }}>
                  Overview
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 16,
                    marginBottom: 32,
                  }}
                >
                  {[
                    ["$392.50", "Total Spent", "#c9a96e"],
                    ["4", "Total Orders", "#3b82f6"],
                    ["2", "Completed", "#22c55e"],
                  ].map(([val, lbl, clr]) => (
                    <div
                      key={lbl}
                      style={{
                        background: "#fafaf9",
                        borderRadius: 14,
                        padding: "20px",
                        border: "1px solid #ede9e5",
                      }}
                    >
                      <p
                        style={{
                          color: "#999",
                          fontSize: 12,
                          marginBottom: 8,
                          fontWeight: 500,
                        }}
                      >
                        {lbl}
                      </p>
                      <p
                        style={{
                          fontWeight: 800,
                          fontSize: 26,
                          color: clr as string,
                        }}
                      >
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
                <h4
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    marginBottom: 16,
                    color: "#555",
                  }}
                >
                  Recent Orders
                </h4>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {orders.slice(0, 3).map((o) => (
                    <div
                      key={o.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 18px",
                        background: "#fafaf9",
                        borderRadius: 12,
                        border: "1px solid #f0ece8",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>{o.id}</p>
                        <p
                          style={{ color: "#999", fontSize: 12, marginTop: 2 }}
                        >
                          {o.date} · {o.items} item{o.items > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>
                          {o.total}
                        </p>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: o.color,
                            background: o.color + "18",
                            padding: "2px 10px",
                            borderRadius: 20,
                          }}
                        >
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders */}
            {activeSection === "orders" && (
              <div style={{ padding: "32px" }}>
                <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 28 }}>
                  My Orders
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        border: "1.5px solid #ede9e5",
                        borderRadius: 14,
                        padding: "20px 22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "border-color 0.2s",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            background: o.color + "18",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            fill="none"
                            stroke={o.color}
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                          </svg>
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: 15 }}>
                            {o.id}
                          </p>
                          <p
                            style={{
                              color: "#999",
                              fontSize: 13,
                              marginTop: 2,
                            }}
                          >
                            {o.date} · {o.items} item{o.items > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontWeight: 700, fontSize: 16 }}>
                          {o.total}
                        </p>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: o.color,
                            background: o.color + "18",
                            padding: "3px 12px",
                            borderRadius: 20,
                          }}
                        >
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeSection === "settings" && (
              <div style={{ padding: "32px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 28,
                  }}
                >
                  <h3 style={{ fontWeight: 700, fontSize: 20 }}>
                    Account Settings
                  </h3>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    style={{
                      background: editMode ? "#1a1a1a" : "transparent",
                      color: editMode ? "#fff" : "#1a1a1a",
                      border: "1.5px solid #1a1a1a",
                      borderRadius: 10,
                      padding: "8px 18px",
                      fontFamily: "inherit",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    {editMode ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {[
                    { label: "Full Name", value: name, setter: setName },
                    { label: "Email Address", value: email, setter: setEmail },
                    { label: "Phone Number", value: phone, setter: setPhone },
                  ].map(({ label, value, setter }) => (
                    <div key={label}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#999",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                        }}
                      >
                        {label}
                      </label>
                      <input
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        disabled={!editMode}
                        style={{
                          width: "100%",
                          padding: "13px 16px",
                          borderRadius: 12,
                          border: editMode
                            ? "1.5px solid #1a1a1a"
                            : "1.5px solid #ede9e5",
                          background: editMode ? "#fff" : "#fafaf9",
                          fontFamily: "inherit",
                          fontSize: 15,
                          color: "#1a1a1a",
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "all 0.2s",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language */}
            {activeSection === "language" && (
              <div style={{ padding: "32px" }}>
                <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
                  Language
                </h3>
                <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>
                  Choose your preferred display language.
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      style={{
                        background:
                          selectedLang === lang ? "#1a1a1a" : "#fafaf9",
                        color: selectedLang === lang ? "#fff" : "#1a1a1a",
                        border: `1.5px solid ${selectedLang === lang ? "#1a1a1a" : "#ede9e5"}`,
                        borderRadius: 12,
                        padding: "16px 20px",
                        fontFamily: "inherit",
                        fontSize: 15,
                        fontWeight: selectedLang === lang ? 600 : 400,
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.2s",
                      }}
                    >
                      {lang}
                      {selectedLang === lang && (
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="#c9a96e"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
