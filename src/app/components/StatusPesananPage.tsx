import { useState, useEffect } from "react";
import {
  ArrowLeft, Package, Truck, CheckCircle2, RefreshCw,
  Copy, MessageCircle, ShoppingBag, MapPin, Phone, User,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

import { useNavigate } from "react-router";

type OrderStatus = "dikirim" | "diterima";

const S: React.CSSProperties & Record<string, unknown> = {};
void S;

const card = (extra?: React.CSSProperties): React.CSSProperties => ({
  border: "4px solid #000",
  boxShadow: "8px 8px 0px #000",
  backgroundColor: "#fff",
  overflow: "hidden",
  ...extra,
});

const cardHeader = (bg: string): React.CSSProperties => ({
  backgroundColor: bg,
  padding: "12px 20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderBottom: "3px solid #000",
});

const label = (color = "#888"): React.CSSProperties => ({
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color,
  marginBottom: "4px",
});

const archivoBold = (size: string, color = "#000"): React.CSSProperties => ({
  fontFamily: "'Archivo Black', sans-serif",
  fontSize: size,
  color,
  letterSpacing: "-0.01em",
  lineHeight: 1.1,
});

export function StatusPesananPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<OrderStatus>("dikirim");
  const [copied, setCopied] = useState(false);

  const isDikirim = status === "dikirim";

  const handleCopy = () => {
    navigator.clipboard.writeText("GK-123456789");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tracking = [
    {
      time: "14:00 WIB",
      icon: <Truck size={18} color="#000" />,
      bg: "#FFE000",
      title: "Kurir sedang membawa paket menuju alamat tujuan.",
      sub: "GoSend Instant · Kurir: Andi (081234567890)",
    },
    {
      time: "13:00 WIB",
      icon: <Package size={18} color="#000" />,
      bg: "#FFE000",
      title: "Pesanan telah diserahkan ke kurir (GoSend).",
      sub: "No. Resi: GK-123456789",
    },
    {
      time: "10:00 WIB",
      icon: <RefreshCw size={18} color="#000" />,
      bg: "#FFE000",
      title: "Pesanan sedang digoreng / diproses penjual.",
      sub: "Estimasi selesai 30–45 menit",
    },
    {
      time: "09:50 WIB",
      icon: <CheckCircle2 size={18} color="#000" />,
      bg: "#FFE000",
      title: "Pembayaran terverifikasi.",
      sub: "Metode: QRIS · Rp 190.000",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FDFBF7", fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        .neo-btn-hover {
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .neo-btn-hover:hover {
          transform: translate(-3px, -3px) !important;
          box-shadow: 6px 6px 0px #000 !important;
        }
        .neo-btn-hover:active {
          transform: translate(2px, 2px) !important;
          box-shadow: 2px 2px 0px #000 !important;
        }
      `}</style>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "36px 24px 60px" }}
      >
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "3px solid #000", padding: "8px 14px",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: "0.8rem", letterSpacing: "0.05em", cursor: "pointer",
            marginBottom: "24px", boxShadow: "4px 4px 0px #000", textTransform: "uppercase",
          }}
        >
          <ArrowLeft size={14} /> KEMBALI
        </button>

        {/* Page Title */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ ...archivoBold("3.2rem"), textTransform: "uppercase" }}>DETAIL</h1>
          <h1 style={{ ...archivoBold("3.2rem", "#FF8C00"), textTransform: "uppercase", marginTop: "-6px" }}>PESANAN</h1>
        </div>

        {/* Demo Toggle */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          {(["dikirim", "diterima"] as OrderStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: "8px 20px",
                border: "3px solid #000",
                boxShadow: status === s ? "4px 4px 0px #000" : "2px 2px 0px #000",
                backgroundColor: status === s ? "#000" : "#FDFBF7",
                color: status === s ? "#FF8C00" : "#000",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {s === "dikirim" ? "SEDANG DIKIRIM" : "PESANAN DITERIMA"}
            </button>
          ))}
        </div>

        {/* Progress Bar Neo-Brutalism */}
        <div style={{
          display: "flex",
          border: "4px solid #000",
          boxShadow: "8px 8px 0px #000",
          backgroundColor: "#fff",
          marginBottom: "28px",
          overflow: "hidden"
        }}>
          {["PEMBAYARAN", "DIPROSES", "DIKIRIM", "SELESAI"].map((step, idx) => {
            const isActive = isDikirim ? idx <= 2 : idx <= 3; 
            return (
              <div key={step} style={{
                flex: 1,
                padding: "16px",
                borderRight: idx < 3 ? "4px solid #000" : "none",
                backgroundColor: isActive ? "#FF8C00" : "#FDFBF7",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                transition: "background-color 0.3s"
              }}>
                <div style={{
                  width: "24px", height: "24px",
                  backgroundColor: isActive ? "#000" : "#fff",
                  border: "2px solid #000",
                  color: isActive ? "#FF8C00" : "#000",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.8rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "8px",
                  transition: "all 0.3s"
                }}>
                  {isActive ? "✓" : idx + 1}
                </div>
                <p style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.75rem",
                  color: isActive ? "#000" : "#888",
                  letterSpacing: "0.05em"
                }}>{step}</p>
              </div>
            )
          })}
        </div>

        {/* Status Banner */}
        <div
          style={{
            backgroundColor: isDikirim ? "#2E8B57" : "#FF8C00",
            border: "4px solid #000",
            boxShadow: "8px 8px 0px #000",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {isDikirim
              ? <Truck size={32} color="#FDFBF7" />
              : <CheckCircle2 size={32} color="#000" />}
            <div>
              <p style={{ ...label(isDikirim ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)") }}>STATUS PESANAN</p>
              <p style={{
                ...archivoBold("1.6rem", isDikirim ? "#FDFBF7" : "#000"),
                textTransform: "uppercase",
              }}>
                {isDikirim ? "SEDANG DIKIRIM" : "PESANAN DITERIMA ✓"}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <p style={{ ...label(isDikirim ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)") }}>NO. INVOICE</p>
              <p style={{ ...archivoBold("1rem", isDikirim ? "#FDFBF7" : "#000") }}>INV/2026/PL/9981</p>
            </div>
            <div>
              <p style={{ ...label(isDikirim ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)") }}>TANGGAL</p>
              <p style={{ ...archivoBold("1rem", isDikirim ? "#FDFBF7" : "#000") }}>04 Mei 2026</p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>

          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Produk Card */}
            <div style={card()}>
              <div style={cardHeader("#FFE000")}>
                <ShoppingBag size={18} color="#000" />
                <span style={{ ...archivoBold("0.85rem"), textTransform: "uppercase" }}>PRODUK YANG DIPESAN</span>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{
                  display: "flex", gap: "14px", alignItems: "flex-start",
                  border: "3px solid #000", padding: "14px", boxShadow: "4px 4px 0px #000",
                  marginBottom: "14px",
                }}>
                  <div style={{ width: "72px", height: "72px", border: "3px solid #000", flexShrink: 0, overflow: "hidden" }}>
                    <ImageWithFallback
                      src="/product-1.png"
                      alt="Peyek Kacang"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ ...archivoBold("1rem"), textTransform: "uppercase", marginBottom: "6px" }}>
                      PEYEK KACANG ORIGINAL
                    </p>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      border: "2px solid #000", padding: "4px 10px", marginBottom: "10px",
                      backgroundColor: "#FDFBF7", fontSize: "0.72rem", fontWeight: 700,
                    }}>
                      <Package size={12} /> VARIAN: TOPLES 500GR
                    </div>
                    <button
                      onClick={() => navigate("/menu")}
                      style={{
                        float: "right",
                        backgroundColor: "#FF8C00", border: "3px solid #000",
                        boxShadow: "3px 3px 0px #000", padding: "8px 14px",
                        fontFamily: "'Archivo Black', sans-serif", fontSize: "0.75rem",
                        cursor: "pointer", textTransform: "uppercase",
                      }}
                    >
                      BELI LAGI
                    </button>
                    <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "#555" }}>2× Rp 90.000</p>
                    <div style={{ marginTop: "4px" }}>
                      <p style={{ ...label(), marginBottom: "2px" }}>SUBTOTAL</p>
                      <p style={{ ...archivoBold("1.4rem", "#FF8C00") }}>Rp 180.000</p>
                    </div>
                  </div>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  borderTop: "2px dashed #ccc", paddingTop: "12px",
                  fontSize: "0.78rem", fontWeight: 700, color: "#555",
                }}>
                  <span>PEYEK LINA</span>
                  <span>Jakarta Selatan, DKI Jakarta</span>
                </div>
              </div>
            </div>

            {/* Riwayat Pelacakan */}
            <div style={card()}>
              <div style={{
                ...cardHeader("#FFE000"),
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <RefreshCw size={18} color="#000" />
                  <span style={{ ...archivoBold("0.85rem"), textTransform: "uppercase" }}>RIWAYAT PELACAKAN</span>
                </div>
                <button
                  style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    border: "2px solid #000", padding: "4px 10px",
                    backgroundColor: "#FDFBF7", fontSize: "0.72rem", fontWeight: 700,
                    cursor: "pointer", textTransform: "uppercase",
                  }}
                >
                  <RefreshCw size={12} /> REFRESH
                </button>
              </div>

              {/* Last Updated */}
              <div style={{
                backgroundColor: "#000", padding: "8px 20px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <p style={{ color: "#FDFBF7", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                  PEMBARUAN TERAKHIR: HARI INI, 14:00 WIB
                </p>
                <span style={{
                  backgroundColor: "#2E8B57", border: "2px solid #FDFBF7",
                  padding: "2px 10px", fontSize: "0.65rem", fontWeight: 800,
                  color: "#fff", letterSpacing: "0.08em",
                }}>
                  GOSEND INSTANT
                </span>
              </div>

              {/* Timeline */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "0" }}>
                {tracking.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", position: "relative" }}>
                    {/* Line */}
                    {i < tracking.length - 1 && (
                      <div style={{
                        position: "absolute", left: "17px", top: "36px",
                        width: "2px", height: "calc(100% - 4px)",
                        backgroundColor: i === 0 ? "#FFE000" : "#ddd",
                      }} />
                    )}
                    {/* Icon */}
                    <div style={{
                      backgroundColor: i === 0 ? "#FFE000" : "#F0F0F0",
                      border: "3px solid #000",
                      width: "36px", height: "36px", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 1,
                    }}>
                      {item.icon}
                    </div>
                    {/* Content */}
                    <div style={{ paddingBottom: "20px" }}>
                      <p style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "0.78rem", color: "#000",
                        marginBottom: "2px",
                      }}>{item.time}</p>
                      <p style={{ fontWeight: 700, fontSize: "0.82rem", color: "#000", marginBottom: "2px" }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#666", fontWeight: 600 }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Catatan Penjual */}
            <div style={{
              border: "3px solid #000", boxShadow: "6px 6px 0px #000",
              backgroundColor: "#FFFBEA", padding: "16px 20px",
              display: "flex", gap: "12px", alignItems: "flex-start",
            }}>
              <div style={{
                backgroundColor: "#FFE000", border: "2px solid #000",
                padding: "6px", flexShrink: 0,
              }}>
                <MessageCircle size={18} color="#000" />
              </div>
              <div>
                <p style={{ ...label("#000"), marginBottom: "6px" }}>CATATAN PENJUAL:</p>
                <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#000", fontStyle: "italic" }}>
                  "Terima kasih sudah memesan! Produk dikemas ekstra aman. Semoga suka 🙏"
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Info Pengiriman */}
            <div style={card()}>
              <div style={cardHeader("#FFE000")}>
                <Truck size={18} color="#000" />
                <span style={{ ...archivoBold("0.85rem"), textTransform: "uppercase" }}>INFO PENGIRIMAN</span>
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Kurir */}
                <div>
                  <p style={label()}>KURIR</p>
                  <div style={{
                    border: "3px solid #000", padding: "12px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    boxShadow: "4px 4px 0px #000",
                  }}>
                    <p style={{ ...archivoBold("1.1rem"), textTransform: "uppercase" }}>GOSEND INSTANT</p>
                    <span style={{
                      backgroundColor: "#2E8B57", border: "2px solid #000",
                      padding: "3px 10px", fontSize: "0.65rem", fontWeight: 800,
                      color: "#fff", letterSpacing: "0.08em",
                    }}>AKTIF</span>
                  </div>
                </div>

                {/* Resi */}
                <div>
                  <p style={label()}>NO. RESI / AWB</p>
                  <div style={{
                    border: "3px solid #000", padding: "12px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    boxShadow: "4px 4px 0px #000", backgroundColor: "#FDFBF7",
                  }}>
                    <p style={{ ...archivoBold("1.1rem"), letterSpacing: "0.04em" }}>GK-123456789</p>
                    <button
                      onClick={handleCopy}
                      style={{
                        display: "flex", alignItems: "center", gap: "4px",
                        backgroundColor: "#FFE000", border: "2px solid #000",
                        padding: "6px 12px", fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "0.7rem", cursor: "pointer", textTransform: "uppercase",
                      }}
                    >
                      <Copy size={12} />
                      {copied ? "COPIED!" : "SALIN"}
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "2px dashed #ccc" }} />

                {/* Penerima */}
                <div>
                  <p style={label()}>PENERIMA</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { icon: <User size={16} color="#FF8C00" />, text: "Budi Santoso" },
                      { icon: <Phone size={16} color="#2E8B57" />, text: "+62 812-3456-789" },
                      { icon: <MapPin size={16} color="#FF8C00" />, text: "Jl. Sudirman No. 1, Kebayoran Baru, Jakarta Selatan, DKI Jakarta, 12180" },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <div style={{
                          backgroundColor: "#F0F0F0", border: "2px solid #000",
                          padding: "5px", flexShrink: 0,
                        }}>{row.icon}</div>
                        <p style={{ fontWeight: 700, fontSize: "0.82rem", color: "#000", paddingTop: "4px" }}>
                          {row.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimasi */}
                <div style={{
                  backgroundColor: "#FFE000", border: "3px solid #000",
                  padding: "12px 16px", textAlign: "center", boxShadow: "4px 4px 0px #000",
                }}>
                  <p style={label("#000")}>ESTIMASI TIBA</p>
                  <p style={{ ...archivoBold("1rem"), textTransform: "uppercase" }}>HARI INI, 15:00 – 16:00 WIB</p>
                </div>
              </div>
            </div>

            {/* Rincian Pembayaran */}
            <div style={card()}>
              <div style={cardHeader("#FFE000")}>
                <ShoppingBag size={18} color="#000" />
                <span style={{ ...archivoBold("0.85rem"), textTransform: "uppercase" }}>RINCIAN PEMBAYARAN</span>
              </div>
              <div style={{ padding: "20px" }}>
                {/* Metode */}
                <div style={{ marginBottom: "16px" }}>
                  <p style={label()}>METODE PEMBAYARAN</p>
                  <div style={{
                    border: "3px solid #000", padding: "10px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#666", letterSpacing: "0.05em" }}>
                      METODE PEMBAYARAN
                    </p>
                    <span style={{
                      backgroundColor: "#000", border: "2px solid #000",
                      padding: "4px 12px", fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "0.75rem", color: "#FF8C00", letterSpacing: "0.08em",
                    }}>QRIS</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                  {[
                    { label: "Total Harga Barang (2 item)", value: "Rp 180.000", color: "#000" },
                    { label: "Ongkos Kirim", value: "Rp 20.000", color: "#000" },
                    { label: "Diskon Promo", value: "– Rp 10.000", color: "#2E8B57" },
                    { label: "Biaya Layanan", value: "Rp 0", color: "#000" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#555" }}>{row.label}</p>
                      <p style={{ fontWeight: 700, fontSize: "0.82rem", color: row.color }}>{row.value}</p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{
                  backgroundColor: "#000", border: "3px solid #000",
                  padding: "16px 20px", marginBottom: "12px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div>
                    <p style={label("rgba(255,255,255,0.6)")}>TOTAL BELANJA</p>
                    <p style={{ color: "#FDFBF7", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.85rem" }}>
                      Rp
                    </p>
                  </div>
                  <p style={{ ...archivoBold("2rem", "#FF8C00") }}>190.000</p>
                </div>

                {/* Payment Success Badge */}
                <div style={{
                  backgroundColor: "#E8F5E9", border: "2px solid #2E8B57",
                  padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px",
                  marginBottom: "20px",
                }}>
                  <CheckCircle2 size={16} color="#2E8B57" />
                  <p style={{ fontWeight: 700, fontSize: "0.72rem", color: "#2E8B57", letterSpacing: "0.05em" }}>
                    PEMBAYARAN SUKSES — 04 MEI 2026, 09:50 WIB
                  </p>
                </div>

                {/* CTA based on status */}
                {isDikirim ? (
                  <button
                    onClick={() => setStatus("diterima")}
                    className="neo-btn-hover"
                    style={{
                      width: "100%",
                      backgroundColor: "#FF8C00",
                      border: "4px solid #000",
                      boxShadow: "6px 6px 0px #000",
                      padding: "18px",
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "1rem",
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      color: "#000",
                      marginBottom: "12px",
                    }}
                  >
                    KONFIRMASI PESANAN DITERIMA
                  </button>
                ) : (
                  <div style={{
                    backgroundColor: "#2E8B57", border: "4px solid #000",
                    boxShadow: "6px 6px 0px #000", padding: "18px",
                    textAlign: "center", marginBottom: "12px",
                  }}>
                    <p style={{ ...archivoBold("1rem", "#FDFBF7"), textTransform: "uppercase", marginBottom: "4px" }}>
                      ✓ PESANAN SUDAH DITERIMA!
                    </p>
                    <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                      Terima kasih sudah berbelanja di PeyekStore!
                    </p>
                  </div>
                )}

                {/* Bottom Actions */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => navigate("/")}
                    style={{
                      flex: 1, border: "3px solid #000", backgroundColor: "#FDFBF7",
                      boxShadow: "4px 4px 0px #000", padding: "12px",
                      fontFamily: "'Archivo Black', sans-serif", fontSize: "0.78rem",
                      cursor: "pointer", textTransform: "uppercase",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    }}
                  >
                    <MessageCircle size={14} /> BANTUAN
                  </button>
                  <button
                    onClick={() => navigate("/menu")}
                    style={{
                      flex: 1, border: "3px solid #000", backgroundColor: "#FFE000",
                      boxShadow: "4px 4px 0px #000", padding: "12px",
                      fontFamily: "'Archivo Black', sans-serif", fontSize: "0.78rem",
                      cursor: "pointer", textTransform: "uppercase",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    }}
                  >
                    <ShoppingBag size={14} /> BELANJA LAGI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
