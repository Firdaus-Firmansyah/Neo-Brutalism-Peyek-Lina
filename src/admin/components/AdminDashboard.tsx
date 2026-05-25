import { useState } from "react";
import { TrendingUp, ShoppingCart, Package, AlertTriangle, Tag, ExternalLink, X } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { MOCK_ORDERS, getOrderStatusStyle, formatRp } from "../types";
import type { AdminPage } from "../types";

interface AdminDashboardProps {
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

const STATS = [
  { label: "REVENUE", value: "Rp 1,24jt", sub: "↗ pemasukan terpantau", icon: <TrendingUp size={22} />, bg: "#fff" },
  { label: "ORDERS", value: "14", sub: "↗ order aktif", icon: <ShoppingCart size={22} />, bg: "#FFE000" },
  { label: "PRODUK AKTIF", value: "8", sub: "↗ katalog siap jual", icon: <Package size={22} />, bg: "#00E676" },
  { label: "STOK MENIPIS", value: "3", sub: "↘ perlu restock", icon: <AlertTriangle size={22} />, bg: "#FFB3B3" },
  { label: "PROMO AKTIF", value: "2", sub: "↗ kampanye berjalan", icon: <Tag size={22} />, bg: "#B3D9FF" },
];

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [showBanner, setShowBanner] = useState(true);
  const recentOrders = MOCK_ORDERS.slice(0, 5);

  return (
    <AdminLayout
      currentPage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      title="DASHBOARD"
      subtitle="Kelola operasi toko peyek secara real-time."
    >
      {/* Success Banner */}
      {showBanner && (
        <div style={{
          backgroundColor: "#00E676",
          border: "3px solid #000",
          boxShadow: "5px 5px 0px #000",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
        }}>
          <p style={{ fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.06em", color: "#000" }}>
            • ✓ LOGIN ADMIN BERHASIL. SELAMAT DATANG DI PANEL ADMIN PEYEK BU SRI!
          </p>
          <button
            onClick={() => setShowBanner(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#000" }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* High-Visibility Alerts */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
        {/* Pesanan Baru Alert */}
        <div style={{
          flex: 1, minWidth: "300px", backgroundColor: "#FFE000", border: "4px solid #000",
          boxShadow: "6px 6px 0px #000", padding: "20px", display: "flex",
          alignItems: "center", gap: "16px",
          animation: "slideIn 0.3s ease-out forwards",
        }}>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "2px solid #000" }}>
            <ShoppingCart size={24} color="#FFE000" />
          </div>
          <div>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.2rem", color: "#000", letterSpacing: "0.02em", marginBottom: "4px" }}>
              🚨 5 PESANAN BARU!
            </p>
            <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#333" }}>Ada pesanan menunggu untuk diproses segera.</p>
          </div>
        </div>

        {/* Stok Menipis Alert */}
        <div style={{
          flex: 1, minWidth: "300px", backgroundColor: "#FF3333", border: "4px solid #000",
          boxShadow: "6px 6px 0px #000", padding: "20px", display: "flex",
          alignItems: "center", gap: "16px",
          animation: "slideIn 0.4s ease-out forwards",
        }}>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "2px solid #000" }}>
            <AlertTriangle size={24} color="#FF3333" />
          </div>
          <div>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.2rem", color: "#fff", letterSpacing: "0.02em", marginBottom: "4px" }}>
              ⚠️ STOK MENIPIS!
            </p>
            <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#fff", opacity: 0.9 }}>3 produk butuh restock (Peyek Teri, dll).</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "16px",
        marginBottom: "32px",
      }}>
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: stat.bg,
              border: "4px solid #000",
              boxShadow: "6px 6px 0px #000",
              padding: "20px 18px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: stat.bg === "#fff" ? "#000" : "rgba(0,0,0,0.15)",
                color: stat.bg === "#fff" ? "#FF8C00" : "#000",
                padding: "8px",
              }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: "1.1rem", color: "#000", opacity: 0.4, cursor: "pointer" }}>···</span>
            </div>
            <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", color: "#000", opacity: 0.6, textTransform: "uppercase", marginBottom: "4px" }}>
              {stat.label}
            </p>
            <p style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "1.8rem",
              letterSpacing: "-0.02em",
              color: "#000",
              lineHeight: 1.1,
              marginBottom: "4px",
            }}>
              {stat.value}
            </p>
            <div style={{ borderTop: "2px solid rgba(0,0,0,0.2)", paddingTop: "8px" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#000", opacity: 0.6 }}>{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pesanan Terbaru */}
      <div style={{ border: "4px solid #000", boxShadow: "8px 8px 0px #000", overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          backgroundColor: "#000",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingCart size={20} color="#FF8C00" />
            <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem", letterSpacing: "0.08em", color: "#FDFBF7" }}>
              PESANAN TERBARU
            </span>
          </div>
          <button
            onClick={() => onNavigate("pesanan")}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              backgroundColor: "#FF8C00",
              border: "3px solid #FDFBF7",
              padding: "8px 16px",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              cursor: "pointer",
              color: "#000",
            }}
          >
            <ExternalLink size={14} /> LIHAT SEMUA
          </button>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#111" }}>
              {["ORDER", "PELANGGAN", "TOTAL", "STATUS", "TANGGAL"].map((h) => (
                <th key={h} style={{
                  padding: "12px 20px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  color: "#FF8C00",
                  textAlign: "left",
                  textTransform: "uppercase",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => {
              const st = getOrderStatusStyle(order.status);
              return (
                <tr
                  key={order.invoice}
                  style={{
                    borderTop: "2px solid #000",
                    backgroundColor: i % 2 === 0 ? "#FDFBF7" : "#fff",
                  }}
                >
                  <td style={{ padding: "16px 20px", fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem" }}>
                    {order.invoice}
                  </td>
                  <td style={{ padding: "16px 20px", fontWeight: 700, fontSize: "0.9rem" }}>{order.customer}</td>
                  <td style={{ padding: "16px 20px", fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", color: "#FF8C00" }}>
                    {formatRp(order.total)}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{
                      backgroundColor: st.bg,
                      border: `3px solid ${st.border}`,
                      padding: "4px 12px",
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      color: st.color,
                    }}>
                      {st.label}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", fontWeight: 700, fontSize: "0.85rem", color: "#555" }}>{order.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
