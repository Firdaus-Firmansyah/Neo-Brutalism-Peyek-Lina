import { ArrowLeft, Truck, User, Phone, MapPin, CreditCard, Package } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { MOCK_ORDERS, getOrderStatusStyle, formatRp, PEYEK_IMAGE } from "../types";
import type { AdminPage, Order } from "../types";

interface AdminDetailPesananProps {
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
  selectedInvoice?: string;
}

const STATUS_SEQUENCE: Order["status"][] = ["baru", "diproses", "dikirim", "selesai"];

export function AdminDetailPesanan({ onNavigate, onLogout, selectedInvoice }: AdminDetailPesananProps) {
  const order = MOCK_ORDERS.find((o) => o.invoice === selectedInvoice) ?? MOCK_ORDERS[0];
  const st = getOrderStatusStyle(order.status);

  const statusIdx = STATUS_SEQUENCE.indexOf(order.status as Order["status"]);

  const TIMELINE = [
    { label: "Pesanan masuk", time: "09:50 WIB", done: true },
    { label: "Pembayaran terkonfirmasi", time: "10:00 WIB", done: statusIdx >= 1 },
    { label: "Sedang diproses penjual", time: "11:30 WIB", done: statusIdx >= 1 },
    { label: "Diserahkan ke kurir", time: "13:00 WIB", done: statusIdx >= 2 },
    { label: "Dalam pengiriman", time: "14:00 WIB", done: statusIdx >= 2 },
    { label: "Pesanan diterima", time: "16:00 WIB", done: statusIdx >= 3 },
  ];

  return (
    <AdminLayout
      currentPage="detail-pesanan"
      onNavigate={onNavigate}
      onLogout={onLogout}
      title="DETAIL PESANAN"
      subtitle={`Invoice: ${order.invoice}`}
    >
      <button
        onClick={() => onNavigate("pesanan")}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          border: "3px solid #000", boxShadow: "4px 4px 0px #000",
          backgroundColor: "#fff", padding: "9px 16px", marginBottom: "24px",
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "0.78rem", letterSpacing: "0.06em",
          cursor: "pointer", textTransform: "uppercase",
        }}
      >
        <ArrowLeft size={14} /> KEMBALI KE PESANAN
      </button>

      {/* Status Banner */}
      <div style={{
        backgroundColor: st.bg || "#FFE000",
        border: "4px solid #000", boxShadow: "6px 6px 0px #000",
        padding: "18px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "24px", flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", color: "#000", opacity: 0.6, marginBottom: "4px" }}>
            STATUS PESANAN
          </p>
          <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.5rem", color: "#000" }}>
            {st.label}
          </p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", color: "#000", opacity: 0.6, marginBottom: "2px" }}>INVOICE</p>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem", color: "#000" }}>{order.invoice}</p>
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", color: "#000", opacity: 0.6, marginBottom: "2px" }}>TANGGAL</p>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem", color: "#000" }}>{order.date}</p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Produk */}
          <div style={{ border: "4px solid #000", boxShadow: "6px 6px 0px #000", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#000", padding: "12px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Package size={16} color="#FF8C00" />
              <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", color: "#FDFBF7" }}>
                PRODUK DIPESAN ({order.items} item)
              </span>
            </div>
            {Array.from({ length: order.items }).map((_, i) => (
              <div key={i} style={{
                display: "flex", gap: "14px", padding: "16px 20px",
                borderTop: i > 0 ? "2px solid #eee" : "none",
              }}>
                <div style={{ width: "60px", height: "60px", border: "3px solid #000", overflow: "hidden", flexShrink: 0 }}>
                  <img src={PEYEK_IMAGE} alt="peyek" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.88rem", marginBottom: "3px" }}>
                    PEYEK KACANG ORIGINAL
                  </p>
                  <p style={{ fontWeight: 700, fontSize: "0.78rem", color: "#888" }}>Toples 500gr · 1x Rp 90.000</p>
                </div>
                <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", color: "#FF8C00", flexShrink: 0 }}>
                  Rp 90.000
                </p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ border: "4px solid #000", boxShadow: "6px 6px 0px #000", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#FFE000", padding: "12px 20px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "3px solid #000" }}>
              <Truck size={16} color="#000" />
              <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
                RIWAYAT PENGIRIMAN
              </span>
            </div>
            <div style={{ padding: "20px" }}>
              {TIMELINE.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", position: "relative" }}>
                  {i < TIMELINE.length - 1 && (
                    <div style={{
                      position: "absolute", left: "14px", top: "28px",
                      width: "2px", height: "calc(100% + 4px)",
                      backgroundColor: step.done ? "#00E676" : "#ddd",
                    }} />
                  )}
                  <div style={{
                    width: "28px", height: "28px", flexShrink: 0,
                    border: "3px solid #000",
                    backgroundColor: step.done ? "#00E676" : "#f0f0f0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 1, fontSize: "0.65rem", fontWeight: 800,
                  }}>
                    {step.done ? "✓" : ""}
                  </div>
                  <div style={{ paddingBottom: "18px" }}>
                    <p style={{ fontWeight: 700, fontSize: "0.85rem", color: step.done ? "#000" : "#bbb" }}>
                      {step.label}
                    </p>
                    <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#999" }}>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Info Pelanggan */}
          <div style={{ border: "4px solid #000", boxShadow: "6px 6px 0px #000", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#000", padding: "12px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <User size={16} color="#FF8C00" />
              <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", color: "#FDFBF7" }}>
                INFO PELANGGAN
              </span>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: <User size={15} color="#FF8C00" />, val: order.customer },
                { icon: <Phone size={15} color="#2E8B57" />, val: order.phone },
                { icon: <MapPin size={15} color="#FF8C00" />, val: "Jl. Sudirman No. 1, Kebayoran Baru, Jakarta Selatan, DKI Jakarta, 12180" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ backgroundColor: "#f5f5f5", border: "2px solid #000", padding: "5px", flexShrink: 0 }}>
                    {row.icon}
                  </div>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#000", paddingTop: "3px" }}>{row.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rincian Pembayaran */}
          <div style={{ border: "4px solid #000", boxShadow: "6px 6px 0px #000", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#000", padding: "12px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CreditCard size={16} color="#FF8C00" />
              <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", color: "#FDFBF7" }}>
                RINCIAN PEMBAYARAN
              </span>
            </div>
            <div style={{ padding: "20px" }}>
              {[
                { label: "Subtotal", val: formatRp(order.total - 20000 + 10000) },
                { label: "Ongkos Kirim", val: "Rp 20.000" },
                { label: "Diskon Promo", val: "– Rp 10.000", green: true },
                { label: "Biaya Layanan", val: "Rp 0" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#555" }}>{row.label}</p>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem", color: row.green ? "#2E8B57" : "#000" }}>{row.val}</p>
                </div>
              ))}
              <div style={{ borderTop: "3px solid #000", marginTop: "8px", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem" }}>TOTAL</p>
                <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.4rem", color: "#FF8C00" }}>
                  {formatRp(order.total)}
                </p>
              </div>
              <div style={{ backgroundColor: "#E8F5E9", border: "2px solid #2E8B57", padding: "8px 14px", marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#2E8B57", fontWeight: 800, fontSize: "0.72rem" }}>✓</span>
                <p style={{ fontWeight: 700, fontSize: "0.72rem", color: "#2E8B57" }}>PEMBAYARAN SUKSES · QRIS</p>
              </div>
            </div>
          </div>

          {/* Update Status */}
          <div style={{ border: "4px solid #000", boxShadow: "6px 6px 0px #000", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#FFE000", padding: "12px 20px", borderBottom: "3px solid #000" }}>
              <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
                UPDATE STATUS PESANAN
              </p>
            </div>
            <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {(["diproses", "dikirim", "selesai", "dibatalkan"] as Order["status"][]).map((s) => {
                const sst = getOrderStatusStyle(s);
                return (
                  <button key={s} style={{
                    backgroundColor: sst.bg || "#f0f0f0",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0px #000",
                    padding: "8px 16px",
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "0.75rem", letterSpacing: "0.06em",
                    cursor: "pointer", color: sst.color,
                  }}>
                    {sst.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
