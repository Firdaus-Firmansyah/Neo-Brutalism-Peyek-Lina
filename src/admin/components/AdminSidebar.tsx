import { useState } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Archive,
  Tag, BarChart2, Plug, LogOut, ChevronLeft, ChevronRight,
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
  const [isCollapsed, setIsCollapsed] = useState(false);
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
          justifyContent: isCollapsed ? "center" : "flex-start",
          gap: isCollapsed ? "0" : "12px",
          width: "100%",
          padding: isCollapsed ? "12px" : "12px 20px",
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
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = "#f0ede8"; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
        title={label}
      >
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        {!isCollapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{label}</span>}
      </button>
    );
  };

  return (
    <aside
      style={{
        width: isCollapsed ? "80px" : "220px",
        minWidth: isCollapsed ? "80px" : "220px",
        backgroundColor: "#FDFBF7",
        borderRight: "4px solid #000",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 100,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: "absolute",
          right: "-16px",
          top: "28px",
          backgroundColor: "#FDFBF7",
          border: "3px solid #000",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 110,
          boxShadow: "2px 2px 0px #000",
          padding: 0,
        }}
        title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo */}
      <div style={{
        padding: isCollapsed ? "22px 10px" : "22px 18px",
        borderBottom: "3px solid #e0ddd7",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        transition: "padding 0.3s",
      }}>
        <div style={{
          width: "42px", height: "42px",
          backgroundColor: "#FF8C00",
          border: "3px solid #000",
          boxShadow: "3px 3px 0px #000",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
          padding: "4px",
          margin: isCollapsed ? "0 auto" : "0",
        }}>
          <img src="/logo.svg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        {!isCollapsed && (
          <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", color: "#000", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
              Peyek Lina
            </p>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              COMMERCE ADMIN
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, paddingTop: "16px", overflowX: "hidden" }}>
        {!isCollapsed ? (
          <p style={{ padding: "6px 20px 4px", fontSize: "0.62rem", fontWeight: 800, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            MAIN
          </p>
        ) : (
          <div style={{ height: "24px" }} />
        )}
        {NAV_MAIN.map(({ key, label, icon }) => navBtn(key, label, icon))}

        <div style={{ borderTop: "1px solid #e0ddd7", margin: "14px 0" }} />

        {!isCollapsed ? (
          <p style={{ padding: "6px 20px 4px", fontSize: "0.62rem", fontWeight: 800, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            INSIGHTS
          </p>
        ) : (
          <div style={{ height: "24px" }} />
        )}
        {NAV_INSIGHTS.map(({ key, label, icon }) => navBtn(key, label, icon))}
      </div>

      {/* Logout */}
      <div style={{ borderTop: "3px solid #e0ddd7", padding: isCollapsed ? "14px 10px" : "14px", display: "flex", justifyContent: "center" }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            gap: isCollapsed ? "0" : "10px",
            backgroundColor: "#000",
            border: "3px solid #000",
            boxShadow: "3px 3px 0px #888",
            padding: isCollapsed ? "11px 0" : "11px 16px",
            cursor: "pointer",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
            color: "#fff",
            textTransform: "uppercase",
            transition: "all 0.1s",
          }}
          title="Logout"
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e53935"; e.currentTarget.style.borderColor = "#e53935"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#000"; e.currentTarget.style.borderColor = "#000"; }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogOut size={15} />
          </div>
          {!isCollapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>LOGOUT</span>}
        </button>
      </div>
    </aside>
  );
}
