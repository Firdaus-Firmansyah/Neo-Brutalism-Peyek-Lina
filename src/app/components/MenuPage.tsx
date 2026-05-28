import { useState, useEffect } from "react";
import { Star, ShoppingCart, Heart, Shield, CheckCircle, Flame, Minus, Plus, ChevronRight } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";

const MAIN_IMAGE = "/product-1.png";

const THUMBNAILS = [
  "/product-1.png",
  "/product-2.png",
  "/product-3.png",
  "/product-6.png",
  "/product-7.png",
];

const REVIEWS_DATA = [
  { id: 1, name: "SITI RAHAYU", date: "12 April 2025", rating: 5, text: "Renyahnya luar biasa! Kacangnya banyak banget dan bumbunya pas. Sudah beli lebih dari 5x dan selalu puas!", verified: true },
  { id: 2, name: "BUDI SANTOSO", date: "8 April 2025", rating: 5, text: "Sampai dalam kondisi sempurna. Kemasannya rapi banget. Harga worth it, dijamin beli lagi!", verified: true },
  { id: 3, name: "DEWI KARTIKA", date: "1 April 2025", rating: 4, text: "Enak banget, fresh, aroma kacangnya harum. Kurang sedikit lebih renyah lagi tapi overall sangat memuaskan.", verified: true },
];

export function MenuPage() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const PRICE = 90000;

  const formatRp = (n: number) => "Rp " + n.toLocaleString("id-ID");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FDFBF7",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <Navbar />

      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "24px 80px 0",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {[
          { label: "BERANDA", page: "home" },
          { label: "MENU", page: "menu" },
          { label: "PEYEK KACANG ORIGINAL", page: null },
        ].map((crumb, i, arr) => (
          <div key={crumb.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => crumb.page && navigate(crumb.page === "home" ? "/" : `/${crumb.page}`)}
              style={{
                background: "none",
                border: "none",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: i === arr.length - 1 ? "#FF8C00" : "#666",
                cursor: crumb.page ? "pointer" : "default",
                textDecoration: i < arr.length - 1 ? "underline" : "none",
                padding: 0,
              }}
            >
              {crumb.label}
            </button>
            {i < arr.length - 1 && <ChevronRight size={14} color="#999" />}
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          MAIN PRODUCT SECTION
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "40px 80px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* LEFT: Images */}
        <div style={{ display: "flex", gap: "16px" }}>
          {/* Thumbnails column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
            {THUMBNAILS.map((thumb, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                style={{
                  width: "88px",
                  height: "88px",
                  border: activeThumb === i ? "4px solid #FF8C00" : "3px solid #000",
                  boxShadow: activeThumb === i ? "4px 4px 0px #FF8C00" : "3px 3px 0px #000",
                  overflow: "hidden",
                  cursor: "pointer",
                  padding: 0,
                  background: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  flexShrink: 0,
                }}
              >
                <ImageWithFallback
                  src={thumb}
                  alt={`Thumbnail ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div
            style={{
              flex: 1,
              border: "4px solid #000",
              boxShadow: "10px 10px 0px #000",
              overflow: "hidden",
              aspectRatio: "1",
            }}
          >
            <ImageWithFallback
              src={THUMBNAILS[activeThumb]}
              alt="Peyek Kacang Original"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#FF8C00",
              border: "3px solid #000",
              padding: "6px 14px",
              marginBottom: "16px",
            }}
          >
            <Flame size={14} />
            <span style={{ fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              FRESH DIGORENG HARI INI
            </span>
          </div>

          {/* Product Name */}
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#000",
              marginBottom: "20px",
            }}
          >
            PEYEK KACANG
            <br />
            <span style={{ color: "#FF8C00" }}>ORIGINAL</span>
          </h1>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} fill="#FF8C00" color="#FF8C00" />
              ))}
            </div>
            <div
              style={{
                border: "2px solid #000",
                padding: "4px 12px",
                backgroundColor: "#FDFBF7",
              }}
            >
              <span style={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.08em" }}>
                4.9 / 5.0 — 157 REVIEWS
              </span>
            </div>
          </div>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            <p
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "3.5rem",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#000",
              }}
            >
              {formatRp(PRICE)}
            </p>
            <div
              style={{
                backgroundColor: "#2E8B57",
                border: "2px solid #000",
                padding: "4px 10px",
              }}
            >
              <span style={{ fontWeight: 800, fontSize: "0.75rem", color: "#FDFBF7", letterSpacing: "0.08em" }}>
                /500gr
              </span>
            </div>
          </div>

          {/* Keunggulan */}
          <div
            style={{
              border: "3px solid #000",
              boxShadow: "5px 5px 0px #000",
              padding: "20px 24px",
              backgroundColor: "#fff",
              marginBottom: "28px",
            }}
          >
            <p
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                marginBottom: "14px",
                borderBottom: "2px solid #000",
                paddingBottom: "10px",
              }}
            >
              KEUNGGULAN:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Kacang tanah melimpah & besar-besar",
                "100% bahan alami tanpa pengawet",
                "Tekstur super renyah tahan lama",
                "Digoreng fresh setiap hari",
              ].map((feat) => (
                <div
                  key={feat}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      backgroundColor: "#FF8C00",
                      border: "2px solid #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle size={12} strokeWidth={3} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Qty + Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
            {/* Quantity */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <p style={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.1em", color: "#555" }}>
                JUMLAH:
              </p>
              <div
                style={{
                  display: "inline-flex",
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0px #000",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: qty <= 1 ? "#eee" : "#FF8C00",
                    border: "none",
                    borderRight: "3px solid #000",
                    cursor: qty <= 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <div
                  style={{
                    width: "64px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1.4rem",
                    backgroundColor: "#FDFBF7",
                    borderRight: "3px solid #000",
                  }}
                >
                  {qty}
                </div>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#2E8B57",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
              <p style={{ fontFamily: "'Archivo Black'", fontSize: "1.2rem", color: "#FF8C00" }}>
                = {formatRp(PRICE * qty)}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={() => {
                  addToCart({
                    id: 1,
                    name: "PEYEK KACANG ORIGINAL",
                    variant: "500gr",
                    price: PRICE,
                    qty: qty,
                    image: MAIN_IMAGE,
                  });
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
                style={{
                  flex: 1,
                  backgroundColor: "#000",
                  border: "4px solid #000",
                  boxShadow: "6px 6px 0px #FF8C00",
                  padding: "20px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  color: "#FF8C00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-3px,-3px)";
                  e.currentTarget.style.boxShadow = "9px 9px 0px #FF8C00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0,0)";
                  e.currentTarget.style.boxShadow = "6px 6px 0px #FF8C00";
                }}
              >
                <ShoppingCart size={22} />
                KERANJANG
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: isWishlisted ? "#ff3333" : "#FDFBF7",
                  border: "4px solid #000",
                  boxShadow: "6px 6px 0px #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "background-color 0.15s",
                }}
              >
                <Heart
                  size={24}
                  fill={isWishlisted ? "#fff" : "none"}
                  color={isWishlisted ? "#fff" : "#000"}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Order button */}
            <button
              onClick={() => {
                addToCart({
                  id: 1,
                  name: "PEYEK KACANG ORIGINAL",
                  variant: "500gr",
                  price: PRICE,
                  qty: qty,
                  image: MAIN_IMAGE,
                });
                navigate("/verifikasi");
              }}
              style={{
                width: "100%",
                backgroundColor: "#FF8C00",
                border: "4px solid #000",
                boxShadow: "6px 6px 0px #000",
                padding: "20px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "#000",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px,-3px)";
                e.currentTarget.style.boxShadow = "9px 9px 0px #000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "6px 6px 0px #000";
              }}
            >
              BELI SEKARANG → VIA WHATSAPP
            </button>
          </div>

          {/* Trust Badges */}
          <div
            style={{
              border: "3px solid #000",
              backgroundColor: "#fff",
              overflow: "hidden",
            }}
          >
            {[
              { icon: <Shield size={20} />, label: "PENGIRIMAN AMAN", desc: "Dikemas double-wrap anti remuk" },
              { icon: <CheckCircle size={20} />, label: "100% PEMBAYARAN AMAN", desc: "Transfer langsung ke rekening resmi" },
              { icon: <Flame size={20} />, label: "DIGORENG FRESH", desc: "Proses produksi setiap hari" },
            ].map((badge, i) => (
              <div
                key={badge.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 20px",
                  borderBottom: i < 2 ? "2px solid #000" : "none",
                  backgroundColor: i === 1 ? "#FDFBF7" : "#fff",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#2E8B57",
                    border: "2px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#fff",
                  }}
                >
                  {badge.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.08em" }}>
                    {badge.label}
                  </p>
                  <p style={{ fontWeight: 500, fontSize: "0.8rem", color: "#666" }}>
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          backgroundColor: "#2E8B57",
          border: "4px solid #000",
          boxShadow: "8px 8px 0px #000",
          padding: "16px 24px",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          animation: "slideIn 0.3s ease-out forwards",
        }}>
          <CheckCircle size={24} color="#fff" />
          <div>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", color: "#fff", letterSpacing: "0.05em" }}>
              BERHASIL DITAMBAHKAN!
            </p>
            <p style={{ fontWeight: 600, fontSize: "0.75rem", color: "#FDFBF7" }}>
              Peyek Kacang Original masuk ke keranjang.
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          TABS: DESCRIPTION & REVIEWS
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 80px 80px",
        }}
      >
        {/* Tab Headers */}
        <div style={{ display: "flex", gap: "0", marginBottom: "-4px", position: "relative", zIndex: 1 }}>
          {[
            { id: "desc", label: "DESKRIPSI PRODUK" },
            { id: "reviews", label: "ULASAN (157)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "desc" | "reviews")}
              style={{
                padding: "16px 36px",
                border: "4px solid #000",
                borderBottom: activeTab === tab.id ? "4px solid #FDFBF7" : "4px solid #000",
                marginRight: "8px",
                backgroundColor: activeTab === tab.id ? "#FDFBF7" : "#ccc",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.9rem",
                letterSpacing: "0.06em",
                cursor: "pointer",
                color: "#000",
                boxShadow: activeTab === tab.id ? "none" : "4px 4px 0px #000",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          style={{
            border: "4px solid #000",
            boxShadow: "8px 8px 0px #000",
            backgroundColor: "#FDFBF7",
            padding: "48px",
          }}
        >
          {activeTab === "desc" ? (
            <div>
              <h3
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                TENTANG PRODUK INI
              </h3>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#333",
                  marginBottom: "24px",
                  maxWidth: "760px",
                }}
              >
                Rasakan sensasi gurih dan renyah yang tiada duanya dari Peyek Kacang Original buatan
                tangan kami. Dibuat dengan resep warisan keluarga yang telah dipercaya selama puluhan
                tahun, setiap peyek menggunakan kacang tanah pilihan yang dipadukan dengan bumbu rahasia
                khas Ibu Lina.
              </p>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#333",
                  marginBottom: "32px",
                  maxWidth: "760px",
                }}
              >
                Dikemas rapi dalam toples tebal yang kedap udara, produk kami tahan hingga 2 bulan
                dan tetap renyah dari pertama hingga peyek terakhir. Nikmati kapan saja sebagai teman
                makan atau camilan keluarga!
              </p>

              {/* Specs Table */}
              <div
                style={{
                  border: "4px solid #000",
                  boxShadow: "6px 6px 0px #000",
                  overflow: "hidden",
                  maxWidth: "600px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#000",
                    padding: "12px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "0.85rem",
                      letterSpacing: "0.1em",
                      color: "#FF8C00",
                    }}
                  >
                    SPESIFIKASI PRODUK
                  </p>
                </div>
                {[
                  { label: "BERAT BERSIH", value: "±500 Gram" },
                  { label: "KETAHANAN", value: "1–2 Bulan" },
                  { label: "KEMASAN", value: "Toples Tebal Kedap Udara" },
                  { label: "KOMPOSISI", value: "Tepung beras, kacang tanah, garam, bawang" },
                  { label: "TANPA", value: "Pengawet, Pewarna, MSG Berlebih" },
                ].map((spec, i) => (
                  <div
                    key={spec.label}
                    style={{
                      display: "flex",
                      borderBottom: i < 4 ? "2px solid #000" : "none",
                      backgroundColor: i % 2 === 0 ? "#fff" : "#FDFBF7",
                    }}
                  >
                    <div
                      style={{
                        width: "220px",
                        padding: "14px 20px",
                        borderRight: "3px solid #000",
                        flexShrink: 0,
                      }}
                    >
                      <p style={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.08em" }}>
                        {spec.label}
                      </p>
                    </div>
                    <div style={{ padding: "14px 20px" }}>
                      <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#333" }}>
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Rating Summary */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "280px 1fr",
                  gap: "48px",
                  marginBottom: "48px",
                  paddingBottom: "40px",
                  borderBottom: "3px solid #000",
                }}
              >
                <div
                  style={{
                    border: "4px solid #000",
                    boxShadow: "6px 6px 0px #000",
                    backgroundColor: "#FF8C00",
                    padding: "32px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "5rem",
                      lineHeight: 1,
                      letterSpacing: "-0.05em",
                      color: "#000",
                    }}
                  >
                    4.9
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "4px", margin: "8px 0" }}>
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={24} fill="#000" color="#000" />
                    ))}
                  </div>
                  <p style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", color: "#000" }}>
                    157 ULASAN
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}>
                  {[
                    { stars: 5, pct: 91, count: 143 },
                    { stars: 4, pct: 7, count: 11 },
                    { stars: 3, pct: 1, count: 2 },
                    { stars: 2, pct: 1, count: 1 },
                    { stars: 1, pct: 0, count: 0 },
                  ].map((row) => (
                    <div key={row.stars} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.8rem", width: "24px", textAlign: "right" }}>
                        {row.stars}★
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: "20px",
                          border: "2px solid #000",
                          backgroundColor: "#fff",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${row.pct}%`,
                            height: "100%",
                            backgroundColor: row.pct > 50 ? "#FF8C00" : row.pct > 5 ? "#FFD700" : "#ccc",
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: "0.75rem", color: "#666", width: "40px" }}>
                        ({row.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {REVIEWS_DATA.map((review) => (
                  <div
                    key={review.id}
                    style={{
                      border: "3px solid #000",
                      boxShadow: "5px 5px 0px #000",
                      backgroundColor: "#fff",
                      padding: "28px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "46px",
                            height: "46px",
                            backgroundColor: "#FF8C00",
                            border: "3px solid #000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span style={{ fontFamily: "'Archivo Black'", fontSize: "1.2rem", color: "#000" }}>
                            {review.name[0]}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Archivo Black'", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
                            {review.name}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <p style={{ fontWeight: 600, fontSize: "0.75rem", color: "#888" }}>{review.date}</p>
                            {review.verified && (
                              <div
                                style={{
                                  backgroundColor: "#2E8B57",
                                  border: "1px solid #000",
                                  padding: "2px 8px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <CheckCircle size={10} color="#fff" />
                                <span style={{ fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", color: "#fff" }}>
                                  TERVERIFIKASI
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "3px" }}>
                        {[1,2,3,4,5].map((s) => (
                          <Star
                            key={s}
                            size={16}
                            fill={s <= review.rating ? "#FF8C00" : "none"}
                            color={s <= review.rating ? "#FF8C00" : "#ccc"}
                          />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontWeight: 500, fontSize: "0.95rem", lineHeight: 1.7, color: "#333" }}>
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
