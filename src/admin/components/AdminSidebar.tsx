import {
  LayoutDashboard, Package, ShoppingCart, Archive,
  Tag, BarChart2, Plug, LogOut,
} from "lucide-react";
import type { AdminPage } from "../types";

interface AdminSidebarProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

const NAV_MAIN: { key: AdminPage; label: string; icon: React.ReactNode }[] = [
  { key: "dashboard", label: "DASHBOARD", icon: <LayoutDashboard size={17} /> },
  { key: "produk", label: "PRODUK", icon: <Package size={17} /> },
  { key: "pesanan", label: "PESANAN", icon: <ShoppingCart size={17} /> },
  { key: "inventaris", label: "INVENTARIS", icon: <Archive size={17} /> },
  { key: "promo", label: "PROMO", icon: <Tag size={17} /> },
];

const NAV_INSIGHTS: { key: AdminPage; label: string; icon: React.ReactNode }[] = [
  { key: "laporan", label: "LAPORAN", icon: <BarChart2 size={17} /> },
  { key: "integrasi", label: "INTEGRASI", icon: <Plug size={17} /> },
];

// Pages that should highlight their parent nav
const PAGE_PARENT: Partial<Record<AdminPage, AdminPage>> = {
  "tambah-produk": "produk",
  "detail-pesanan": "pesanan",
};

export function AdminSidebar({ currentPage, onNavigate, onLogout }: AdminSidebarProps) {
  const activePage = PAGE_PARENT[currentPage] ?? currentPage;

  const navBtn = (key: AdminPage, label: string, icon: React.ReactNode) => {
    const active = activePage === key;
    return (
      <button
        key={key}
        onClick={() => onNavigate(key)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          padding: "12px 20px",
          backgroundColor: active ? "#FF8C00" : "transparent",
          border: "none",
          borderLeft: active ? "4px solid #000" : "4px solid transparent",
          cursor: "pointer",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "0.05em",
          color: active ? "#000" : "#333",
          textAlign: "left",
          transition: "background-color 0.1s",
        }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = "#f0ede8"; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        backgroundColor: "#FDFBF7",
        borderRight: "4px solid #000",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div style={{
        padding: "22px 18px",
        borderBottom: "3px solid #e0ddd7",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={{
          width: "42px", height: "42px",
          backgroundColor: "#FF8C00",
          border: "3px solid #000",
          boxShadow: "3px 3px 0px #000",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
          padding: "4px"
        }}>
          <img src="/logo.svg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div>
          <p style={{ fontFamily: "'Archivo Black', sans-serif", color: "#000", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
            Peyek Lina
          </p>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            COMMERCE ADMIN
          </p>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, paddingTop: "16px" }}>
        <p style={{ padding: "6px 20px 4px", fontSize: "0.62rem", fontWeight: 800, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          MAIN
        </p>
        {NAV_MAIN.map(({ key, label, icon }) => navBtn(key, label, icon))}

        <div style={{ borderTop: "1px solid #e0ddd7", margin: "14px 0" }} />

        <p style={{ padding: "6px 20px 4px", fontSize: "0.62rem", fontWeight: 800, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          INSIGHTS
        </p>
        {NAV_INSIGHTS.map(({ key, label, icon }) => navBtn(key, label, icon))}
      </div>

      {/* Logout */}
      <div style={{ borderTop: "3px solid #e0ddd7", padding: "14px" }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#000",
            border: "3px solid #000",
            boxShadow: "3px 3px 0px #888",
            padding: "11px 16px",
            cursor: "pointer",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
            color: "#fff",
            textTransform: "uppercase",
            transition: "all 0.1s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e53935"; e.currentTarget.style.borderColor = "#e53935"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#000"; e.currentTarget.style.borderColor = "#000"; }}
        >
          <LogOut size={15} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
}
