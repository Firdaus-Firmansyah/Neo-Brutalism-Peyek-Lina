import { useState } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  CreditCard,
  Tag,
  CheckCircle2,
  QrCode,
  Building2,
  Wallet,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DetailPemesananPageProps {
  onNavigate: (page: string) => void;
}

type PaymentMethod = "QRIS" | "TRANSFER_BANK" | "E_WALLET";

const PRODUCT_PRICE = 90000;
const SHIPPING = 15000;
const DISCOUNT_CODES: Record<string, number> = {
  PEYEK10: 18000,
  HEMAT20: 36000,
};

export function DetailPemesananPage({ onNavigate }: DetailPemesananPageProps) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: 1,
        name: "PEYEK KACANG ORIGINAL",
        variant: "500gr",
        price: PRODUCT_PRICE,
        qty: 2,
        image:
          "/product-1.png",
      },
    ];
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("QRIS");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    alamat: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.qty, 0);
  const discount = appliedPromo ? DISCOUNT_CODES[appliedPromo] : 0;
  const total = subtotal + SHIPPING - discount;

  const formatRp = (n: number) => "Rp " + n.toLocaleString("id-ID");

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (DISCOUNT_CODES[code]) {
      setAppliedPromo(code);
      setPromoError(false);
    } else {
      setPromoError(true);
      setAppliedPromo(null);
    }
  };

  const handleSubmit = () => {
    if (formData.nama && formData.whatsapp && formData.alamat) {
      localStorage.setItem("hasOrder", "true");
      onNavigate("konfirmasi");
    } else {
      alert("⚠️ Harap lengkapi Nama, WhatsApp, dan Alamat Pengiriman!");
    }
  };

  const paymentOptions: { key: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
    { key: "QRIS", label: "QRIS", icon: <QrCode size={24} />, desc: "Scan & Bayar Instan" },
    { key: "TRANSFER_BANK", label: "TRANSFER BANK", icon: <Building2 size={24} />, desc: "BCA / Mandiri / BNI" },
    { key: "E_WALLET", label: "E-WALLET", icon: <Wallet size={24} />, desc: "GoPay / OVO / Dana" },
  ];

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FDFBF7", fontFamily: "'Space Grotesk', sans-serif" }}>
        <Navbar currentPage="detail" onNavigate={onNavigate} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 80px)",
            flexDirection: "column",
            gap: "24px",
            padding: "48px",
          }}
        >
          <div
            style={{
              backgroundColor: "#2E8B57",
              border: "4px solid #000",
              boxShadow: "10px 10px 0px #000",
              padding: "64px 80px",
              textAlign: "center",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <CheckCircle2 size={80} color="#FDFBF7" style={{ margin: "0 auto 24px" }} strokeWidth={2.5} />
            <h1
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "3rem",
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#FDFBF7",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              PESANAN
              <br />
              DIKONFIRMASI!
            </h1>
            <p style={{ fontWeight: 700, color: "#FDFBF7", opacity: 0.85, fontSize: "1rem", letterSpacing: "0.03em" }}>
              CEK WHATSAPP KAMU UNTUK DETAIL PEMBAYARAN
            </p>
            <button
              onClick={() => onNavigate("keranjang")}
              style={{
                marginTop: "32px",
                backgroundColor: "#FF8C00",
                border: "4px solid #000",
                boxShadow: "6px 6px 0px #000",
                padding: "18px 40px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "#000",
              }}
            >
              KEMBALI KE BERANDA →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FDFBF7", fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navbar currentPage="detail" onNavigate={onNavigate} cartCount={items.reduce((s: number, i: any) => s + i.qty, 0)} />

      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "48px 80px" }}>
        {/* Back Button */}
        <button
          onClick={() => onNavigate("keranjang")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "3px solid #000",
            padding: "8px 16px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.05em",
            cursor: "pointer",
            marginBottom: "32px",
            boxShadow: "4px 4px 0px #000",
          }}
        >
          <ArrowLeft size={16} />
          KEMBALI KE KERANJANG
        </button>

        {/* Page Title */}
        <div style={{ marginBottom: "48px" }}>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "4rem",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#000",
            }}
          >
            SELESAIKAN
          </h1>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "4rem",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#FF8C00",
              marginTop: "-6px",
            }}
          >
            PESANAN
          </h1>
        </div>

        {/* 60/40 Split Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: "40px", alignItems: "start" }}>
          {/* ===== LEFT COLUMN ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* CARD 1: INFORMASI PENERIMA */}
            <div
              style={{
                border: "4px solid #000",
                boxShadow: "8px 8px 0px #000",
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  backgroundColor: "#000",
                  padding: "14px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <User size={20} color="#FF8C00" />
                <span
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    color: "#FDFBF7",
                    textTransform: "uppercase",
                  }}
                >
                  INFORMASI PENERIMA
                </span>
              </div>

              <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Nama Lengkap */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      color: "#000",
                    }}
                  >
                    NAMA LENGKAP *
                  </label>
                  <div style={{ position: "relative" }}>
                    <User size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#666" }} />
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap kamu"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      style={{
                        width: "100%",
                        border: "3px solid #000",
                        boxShadow: "4px 4px 0px #000",
                        padding: "14px 14px 14px 46px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        backgroundColor: "#FDFBF7",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      color: "#000",
                    }}
                  >
                    NOMOR WHATSAPP (AKTIF) *
                  </label>
                  <div style={{ position: "relative" }}>
                    <Phone size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#2E8B57" }} />
                    <input
                      type="tel"
                      placeholder="+62 812-XXXX-XXXX"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      style={{
                        width: "100%",
                        border: "3px solid #000",
                        boxShadow: "4px 4px 0px #000",
                        padding: "14px 14px 14px 46px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        backgroundColor: "#FDFBF7",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {/* Alamat */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      color: "#000",
                    }}
                  >
                    ALAMAT PENGIRIMAN LENGKAP *
                  </label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={18} style={{ position: "absolute", left: "14px", top: "18px", color: "#FF8C00" }} />
                    <textarea
                      placeholder="Jl. Contoh No. 1, RT 01/RW 02, Kelurahan, Kecamatan, Kota, Provinsi, 12345"
                      value={formData.alamat}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      rows={3}
                      style={{
                        width: "100%",
                        border: "3px solid #000",
                        boxShadow: "4px 4px 0px #000",
                        padding: "14px 14px 14px 46px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        backgroundColor: "#FDFBF7",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <p style={{ fontWeight: 600, fontSize: "0.75rem", color: "#666", marginTop: "6px" }}>
                    * Sertakan RT/RW, Kelurahan, dan Kecamatan untuk pengiriman yang akurat
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2: METODE PEMBAYARAN */}
            <div
              style={{
                border: "4px solid #000",
                boxShadow: "8px 8px 0px #000",
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  backgroundColor: "#000",
                  padding: "14px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <CreditCard size={20} color="#FF8C00" />
                <span
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    color: "#FDFBF7",
                    textTransform: "uppercase",
                  }}
                >
                  METODE PEMBAYARAN
                </span>
              </div>

              <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {paymentOptions.map((option) => {
                  const isSelected = paymentMethod === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => setPaymentMethod(option.key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        padding: "20px 24px",
                        border: isSelected ? "4px solid #000" : "3px solid #000",
                        backgroundColor: isSelected ? "#2E8B57" : "#FDFBF7",
                        boxShadow: isSelected ? "6px 6px 0px #000" : "3px 3px 0px #000",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.1s",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: isSelected ? "#FDFBF7" : "#000",
                          border: "2px solid #000",
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isSelected ? "#2E8B57" : "#FDFBF7",
                          flexShrink: 0,
                        }}
                      >
                        {option.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontFamily: "'Archivo Black', sans-serif",
                            fontSize: "1.05rem",
                            letterSpacing: "0.05em",
                            color: isSelected ? "#FDFBF7" : "#000",
                          }}
                        >
                          {option.label}
                        </p>
                        <p style={{ fontWeight: 600, fontSize: "0.8rem", color: isSelected ? "#fff" : "#666", opacity: isSelected ? 0.85 : 1, marginTop: "2px" }}>
                          {option.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={28} color="#FDFBF7" strokeWidth={2.5} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: ORDER SUMMARY ===== */}
          <div style={{ position: "sticky", top: "120px" }}>
            <div
              style={{
                backgroundColor: "#FFF3E0",
                border: "4px solid #000",
                boxShadow: "10px 10px 0px #000",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  backgroundColor: "#FF8C00",
                  padding: "18px 28px",
                  borderBottom: "4px solid #000",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1.2rem",
                    letterSpacing: "0.1em",
                    color: "#000",
                    textTransform: "uppercase",
                  }}
                >
                  DETAIL ORDER
                </span>
              </div>

              <div style={{ padding: "28px" }}>
                {/* Product Items */}
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      border: "3px solid #000",
                      backgroundColor: "#fff",
                      padding: "16px",
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      marginBottom: "24px",
                      boxShadow: "4px 4px 0px #000",
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        border: "3px solid #000",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontFamily: "'Archivo Black', sans-serif",
                          fontSize: "0.85rem",
                          letterSpacing: "0.02em",
                          color: "#000",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name} ({item.variant})
                      </p>
                      <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "#666", marginTop: "4px" }}>
                        {item.qty}x · {formatRp(item.price)}/pcs
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "1rem",
                        color: "#FF8C00",
                        flexShrink: 0,
                      }}
                    >
                      {formatRp(item.price * item.qty)}
                    </p>
                  </div>
                ))}

                {/* Promo Code */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Tag size={14} />
                    KODE PROMO
                  </label>
                  <div style={{ display: "flex", gap: "0" }}>
                    <input
                      type="text"
                      placeholder="MASUKKAN KODE"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError(false);
                      }}
                      style={{
                        flex: 1,
                        border: promoError ? "3px solid #ff3333" : "3px solid #000",
                        borderRight: "none",
                        padding: "12px 14px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        letterSpacing: "0.1em",
                        backgroundColor: appliedPromo ? "#e8f5e9" : "#FDFBF7",
                        outline: "none",
                        textTransform: "uppercase",
                        color: "#000",
                      }}
                    />
                    <button
                      onClick={handleApplyPromo}
                      style={{
                        backgroundColor: "#000",
                        border: "3px solid #000",
                        padding: "12px 18px",
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        color: "#FF8C00",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        flexShrink: 0,
                      }}
                    >
                      TERAPKAN
                    </button>
                  </div>
                  {promoError && (
                    <p style={{ fontWeight: 700, fontSize: "0.75rem", color: "#ff3333", marginTop: "4px" }}>
                      ✗ KODE PROMO TIDAK VALID
                    </p>
                  )}
                  {appliedPromo && (
                    <p style={{ fontWeight: 700, fontSize: "0.75rem", color: "#2E8B57", marginTop: "4px" }}>
                      ✓ KODE "{appliedPromo}" BERHASIL DITERAPKAN!
                    </p>
                  )}
                  <p style={{ fontWeight: 600, fontSize: "0.72rem", color: "#888", marginTop: "4px" }}>
                    Coba: PEYEK10 atau HEMAT20
                  </p>
                </div>

                {/* Totals */}
                <div
                  style={{
                    border: "3px solid #000",
                    backgroundColor: "#fff",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginBottom: "24px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.03em", color: "#444" }}>
                      SUBTOTAL
                    </span>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#000" }}>
                      {formatRp(subtotal)}
                    </span>
                  </div>

                  {appliedPromo && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.03em", color: "#2E8B57" }}>
                        DISKON PROMO ({appliedPromo})
                      </span>
                      <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#2E8B57" }}>
                        -{formatRp(discount)}
                      </span>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.03em", color: "#444" }}>
                      ONGKOS KIRIM
                    </span>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#000" }}>
                      {formatRp(SHIPPING)}
                    </span>
                  </div>

                  {/* Thick Divider */}
                  <div style={{ borderTop: "4px solid #000", margin: "4px 0" }} />

                  {/* Grand Total */}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", color: "#666", marginBottom: "4px", textTransform: "uppercase" }}>
                      TOTAL BAYAR
                    </p>
                    <p
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "2.4rem",
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        color: "#000",
                      }}
                    >
                      {formatRp(total)}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleSubmit}
                  style={{
                    width: "100%",
                    backgroundColor: "#2E8B57",
                    border: "4px solid #000",
                    boxShadow: "8px 8px 0px #000",
                    padding: "24px",
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1.3rem",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "#FDFBF7",
                    transition: "transform 0.1s, box-shadow 0.1s",
                    lineHeight: 1.2,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-3px, -3px)";
                    e.currentTarget.style.boxShadow = "11px 11px 0px #000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = "8px 8px 0px #000";
                  }}
                >
                  KONFIRMASI
                  <br />
                  PESANAN ✓
                </button>

                {/* Security Note */}
                <p style={{ fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.05em", textAlign: "center", color: "#888", marginTop: "16px", textTransform: "uppercase" }}>
                  🔒 Pesananmu aman & dilindungi enkripsi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}