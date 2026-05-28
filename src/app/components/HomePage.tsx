import { useState, useEffect } from "react";
import { Plus, Star, ChevronDown, ChevronUp, Truck, Shield, Flame, Award, CheckCircle } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";

const PRODUCTS = [
  {
    id: 1,
    name: "PEYEK KACANG ORIGINAL",
    price: 90000,
    badge: "BEST SELLER",
    badgeColor: "#FF8C00",
    image: "/product-1.png",
  },
  {
    id: 2,
    name: "PEYEK TERI MEDAN",
    price: 100000,
    badge: "GURIH",
    badgeColor: "#2E8B57",
    image: "/product-2.png",
  },
  {
    id: 3,
    name: "PEYEK REBON",
    price: 95000,
    badge: "RENYAH",
    badgeColor: "#FFD700",
    image: "/product-3.png",
  },
  {
    id: 4,
    name: "PEYEK KACANG IJO",
    price: 95000,
    badge: "BARU",
    badgeColor: "#FF8C00",
    image: "/product-4.png",
  },
  {
    id: 5,
    name: "PEYEK MIX PREMIUM",
    price: 120000,
    badge: "TERLARIS",
    badgeColor: "#000",
    image: "/product-5.png",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "SITI RAHAYU",
    location: "Jakarta Selatan",
    rating: 5,
    text: "Renyahnya luar biasa! Udah langganan tiap bulan. Kacangnya banyak banget dan bumbunya pas sekali. Recommended!",
    image: "https://images.unsplash.com/photo-1758600587880-1d11b8a08b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMHdvbWFuJTIwc21pbGluZyUyMGhhcHB5JTIwY3VzdG9tZXIlMjByZXZpZXd8ZW58MXx8fHwxNzc3Nzg3MzMxfDA&ixlib=rb-4.1.0&q=80&w=100",
    bgColor: "#FFD700",
    rotate: "-1deg",
  },
  {
    id: 2,
    name: "BUDI SANTOSO",
    location: "Surabaya",
    rating: 5,
    text: "Pesan buat arisan keluarga, semua suka! Kemasannya rapi, sampai dalam kondisi sempurna. Harga worth it banget.",
    image: "",
    bgColor: "#FDFBF7",
    rotate: "1.5deg",
  },
  {
    id: 3,
    name: "DEWI KARTIKA",
    location: "Bandung",
    rating: 5,
    text: "Ini peyek terenak yang pernah saya coba! Fresh banget, aroma kacangnya harum. Packaging juga anti-remuk!",
    image: "",
    bgColor: "#FF8C00",
    rotate: "-0.5deg",
  },
];

const FAQS = [
  {
    id: 1,
    q: "BERAPA LAMA KETAHANAN PRODUK?",
    a: "Produk kami tahan 1–2 bulan dalam kondisi kemasan tersegel rapat dan disimpan di tempat sejuk dan kering, jauh dari sinar matahari langsung.",
  },
  {
    id: 2,
    q: "APAKAH ADA PENGAWET?",
    a: "TIDAK! Semua produk kami 100% bebas pengawet buatan. Kami menggunakan bahan-bahan alami pilihan dan proses penggorengan yang hygienis.",
  },
  {
    id: 3,
    q: "BISA PESAN DALAM JUMLAH BANYAK?",
    a: "Tentu bisa! Kami melayani pesanan grosir mulai dari 10 toples dengan harga khusus. Hubungi kami via WhatsApp untuk penawaran terbaik.",
  },
  {
    id: 4,
    q: "AREA PENGIRIMAN?",
    a: "Kami mengirim ke seluruh wilayah Indonesia melalui berbagai jasa pengiriman terpercaya. Gratis ongkir untuk pembelian di atas Rp 300.000.",
  },
  {
    id: 5,
    q: "CARA PEMBAYARAN?",
    a: "Kami menerima transfer bank (BCA, BRI, Mandiri), dompet digital (GoPay, OVO, Dana), dan QRIS. Konfirmasi melalui WhatsApp setelah pembayaran.",
  },
];

export function HomePage() {
  const [ongkirInput, setOngkirInput] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const { cartCount } = useCart();

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
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
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

      {/* Marquee Promo */}
      <div style={{ backgroundColor: "#FFE000", color: "#000", padding: "12px 0", overflow: "hidden", borderBottom: "4px solid #000" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee 20s linear infinite" }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em", paddingRight: "40px" }}>
              🔥 PROMO BUNDLING LEBARAN - DISKON 20% UNTUK PEMBELIAN DI ATAS RP 200.000! 🔥
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section
        className="max-w-[1440px] mx-auto px-6 py-10 md:px-[80px] md:pt-[80px] md:pb-[60px] grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-[60px] items-center"
      >
        {/* LEFT: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#2E8B57",
              border: "3px solid #000",
              boxShadow: "4px 4px 0px #000",
              padding: "8px 16px",
              marginBottom: "28px",
            }}
          >
            <Flame size={16} color="#FDFBF7" />
            <span
              style={{
                fontWeight: 800,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                color: "#FDFBF7",
                textTransform: "uppercase",
              }}
            >
              FRESH DARI WAJAN SETIAP HARI
            </span>
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(3rem, 5vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#000",
              marginBottom: "8px",
            }}
          >
            RENYAHNYA
          </h1>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(3rem, 5vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#FF8C00",
              marginBottom: "8px",
            }}
          >
            JUARA,
          </h1>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(3rem, 5vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#000",
              marginBottom: "28px",
            }}
          >
            FRESH DARI
            <br />
            WAJAN.
          </h1>

          <p
            style={{
              fontWeight: 500,
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#444",
              maxWidth: "480px",
              marginBottom: "40px",
            }}
          >
            Peyek buatan tangan dengan resep warisan keluarga Ibu Lina sejak
            1985. Tanpa pengawet, tanpa bahan kimia — hanya gurih asli yang
            nyata.
          </p>

          {/* Ongkir Input */}
          <div style={{ display: "flex", gap: "0" }}>
            <input
              type="text"
              placeholder="Masukkan kecamatan Anda..."
              value={ongkirInput}
              onChange={(e) => setOngkirInput(e.target.value)}
              style={{
                flex: 1,
                border: "4px solid #000",
                borderRight: "none",
                padding: "18px 20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                backgroundColor: "#fff",
                outline: "none",
                boxShadow: "6px 6px 0px #000",
              }}
            />
            <button
              className="neo-btn-hover"
              style={{
                backgroundColor: "#FF8C00",
                border: "4px solid #000",
                padding: "18px 28px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "#000",
                whiteSpace: "nowrap",
                boxShadow: "4px 4px 0px #000",
              }}
              onClick={() => navigate("/menu")}
            >
              CEK ONGKIR & PESAN →
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 md:gap-[32px] mt-8 md:mt-[40px]">
            {[
              { num: "5.000+", label: "PELANGGAN" },
              { num: "4.9★", label: "RATING" },
              { num: "100%", label: "ALAMI" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  borderLeft: "4px solid #FF8C00",
                  paddingLeft: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1.8rem",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.num}
                </p>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    color: "#666",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Image + Floating Cards */}
        <motion.div 
          style={{ position: "relative" }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {/* Main Hero Image */}
          <div
            style={{
              border: "4px solid #000",
              boxShadow: "10px 10px 0px #000",
              overflow: "hidden",
              aspectRatio: "1",
              position: "relative",
            }}
          >
            <ImageWithFallback
              src="/hero-image.png"
              alt="Keluarga menikmati hidangan dan Peyek Lina bersama"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Orange diagonal stripe overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, transparent 70%, rgba(255,140,0,0.25) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Floating Card 1 – Pesanan Masuk */}
          <div
            className="absolute -top-4 -left-4 md:-top-[24px] md:-left-[40px] p-3 md:p-[14px_20px] min-w-[150px] md:min-w-[180px] bg-[#FDFBF7]"
            style={{
              border: "3px solid #000",
              boxShadow: "6px 6px 0px #000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#2E8B57",
                  border: "2px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CheckCircle size={18} color="#fff" />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "#2E8B57",
                  }}
                >
                  PESANAN MASUK
                </p>
                <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                  #ORD-2025-089
                </p>
              </div>
            </div>
          </div>

          {/* Floating Card 2 – Sedang Digoreng */}
          <div
            className="absolute bottom-[20%] -left-4 md:bottom-[30%] md:-left-[56px] p-3 md:p-[14px_20px] min-w-[160px] md:min-w-[190px] bg-[#FF8C00]"
            style={{
              border: "3px solid #000",
              boxShadow: "6px 6px 0px #000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#000",
                  border: "2px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Flame size={18} color="#FF8C00" />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "#000",
                  }}
                >
                  SEDANG DIGORENG
                </p>
                <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#000" }}>
                  FRESH HARI INI 🔥
                </p>
              </div>
            </div>
          </div>

          {/* Floating Card 3 – Meluncur */}
          <div
            className="absolute -bottom-4 -right-4 md:-bottom-[24px] md:-right-[32px] p-3 md:p-[14px_20px] min-w-[160px] md:min-w-[190px] bg-black"
            style={{
              border: "3px solid #000",
              boxShadow: "6px 6px 0px #FF8C00",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#FF8C00",
                  border: "2px solid #FF8C00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Truck size={18} color="#000" />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "#FF8C00",
                  }}
                >
                  MELUNCUR KE ANDA
                </p>
                <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#FDFBF7" }}>
                  EST. 2-3 HARI
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURES BAR
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-6 pb-12 md:px-[80px] md:pb-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 border-4 border-black overflow-hidden"
          style={{
            boxShadow: "8px 8px 0px #000",
          }}
        >
          {[
            {
              icon: <Shield size={32} />,
              title: "BEBAS PENGAWET",
              desc: "100% bahan alami, tanpa kimia berbahaya",
              bg: "#2E8B57",
              color: "#FDFBF7",
            },
            {
              icon: <Award size={32} />,
              title: "RENYAH TAHAN LAMA",
              desc: "Tekstur tetap renyah hingga 2 bulan",
              bg: "#FFD700",
              color: "#000",
            },
            {
              icon: <Truck size={32} />,
              title: "PENGIRIMAN AMAN",
              desc: "Dikemas double-wrap anti remuk",
              bg: "#FDFBF7",
              color: "#000",
            },
          ].map((feat, i) => (
            <div
              key={feat.title}
              className={`p-6 md:p-[40px_36px] flex flex-col sm:flex-row items-start gap-4 md:gap-[20px] ${i < 2 ? 'border-b-4 md:border-b-0 md:border-r-4 border-black' : ''}`}
              style={{
                backgroundColor: feat.bg,
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: feat.color === "#FDFBF7" ? "#000" : "#000",
                  border: "3px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#FF8C00",
                }}
              >
                {feat.icon}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1.2rem",
                    letterSpacing: "0.02em",
                    color: feat.color,
                    marginBottom: "8px",
                  }}
                >
                  {feat.title}
                </p>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: feat.color,
                    opacity: 0.85,
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BEST SELLER GRID
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-6 pb-12 md:px-[80px] md:pb-[80px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-[48px]">
          <div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#FF8C00",
                border: "3px solid #000",
                padding: "6px 16px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                }}
              >
                PILIHAN TERBAIK
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "4rem",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#000",
              }}
            >
              BEST
              <br />
              <span style={{ color: "#FF8C00" }}>SELLER</span>
            </h2>
          </div>
          <button
            className="neo-btn-hover"
            onClick={() => navigate("/menu")}
            style={{
              border: "3px solid #000",
              boxShadow: "4px 4px 0px #000",
              backgroundColor: "#FDFBF7",
              padding: "14px 28px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            LIHAT SEMUA MENU →
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-[24px]">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
              key={product.id}
              style={{
                border: "4px solid #000",
                boxShadow: "8px 8px 0px #000",
                backgroundColor: "#fff",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onClick={() => navigate("/menu")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translate(-3px, -3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "11px 11px 0px #000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "8px 8px 0px #000";
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  aspectRatio: "1",
                  overflow: "hidden",
                  position: "relative",
                  borderBottom: "4px solid #000",
                }}
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    backgroundColor: product.badgeColor,
                    border: "2px solid #000",
                    padding: "4px 10px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div style={{ padding: "20px" }}>
                <p
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "0.95rem",
                    letterSpacing: "0.01em",
                    color: "#000",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  {product.name}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "16px" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} fill="#FF8C00" color="#FF8C00" />
                  ))}
                  <span style={{ fontWeight: 700, fontSize: "0.75rem", color: "#666", marginLeft: "4px" }}>
                    (100+)
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "1.4rem",
                      letterSpacing: "-0.02em",
                      color: "#000",
                    }}
                  >
                    {formatRp(product.price)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/menu");
                    }}
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#FF8C00",
                      border: "3px solid #000",
                      boxShadow: "4px 4px 0px #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <Plus size={22} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROMO BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="px-6 pb-12 md:px-[80px] md:pb-[80px] max-w-[1440px] mx-auto">
        <div
          className="p-8 md:p-[64px_80px] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 md:gap-[60px] items-center bg-[#FF8C00]"
          style={{
            border: "4px solid #000",
            boxShadow: "10px 10px 0px #000",
          }}
        >
          {/* Left Text */}
          <div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#000",
                padding: "6px 16px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  color: "#FF8C00",
                }}
              >
                ⚡ PENAWARAN TERBATAS
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "3.5rem",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#000",
                marginBottom: "16px",
              }}
            >
              PROMO SPESIAL:
              <br />
              PAKET KELUARGA
              <br />
              BAHAGIA
            </h2>
            <p
              style={{
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "#000",
                marginBottom: "8px",
                opacity: 0.8,
              }}
            >
              Beli 3 toples, gratis 1 toples + gratis ongkos kirim ke seluruh Indonesia!
            </p>
            <p
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "2rem",
                color: "#000",
                marginBottom: "32px",
              }}
            >
              HEMAT Rp 90.000!
            </p>
            <button
              onClick={() => navigate("/menu")}
              style={{
                backgroundColor: "#000",
                border: "4px solid #000",
                boxShadow: "6px 6px 0px #FDFBF7",
                padding: "20px 48px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "#FF8C00",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px,-3px)";
                e.currentTarget.style.boxShadow = "9px 9px 0px #FDFBF7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "6px 6px 0px #FDFBF7";
              }}
            >
              AMBIL PROMO SEKARANG →
            </button>
          </div>

          {/* Right: Family Photo */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "340px",
                height: "380px",
                border: "4px solid #000",
                boxShadow: "8px 8px 0px #000",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <ImageWithFallback
                src="/hero-image.png"
                alt="Keluarga bahagia menikmati Peyek"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Sticker */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "90px",
                height: "90px",
                backgroundColor: "#FFD700",
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(12deg)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.05em",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                BELI 3
                <br />
                GRATIS 1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          REVIEWS
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-6 pb-12 md:px-[80px] md:pb-[80px]">
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#2E8B57",
              border: "3px solid #000",
              padding: "6px 16px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                color: "#FDFBF7",
              }}
            >
              KATA MEREKA
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "3.5rem",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#000",
            }}
          >
            PELANGGAN
            <br />
            <span style={{ color: "#FF8C00" }}>SETIA KAMI</span>
          </h2>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[32px] items-start">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              style={{
                backgroundColor: review.bgColor,
                border: "4px solid #000",
                boxShadow: "8px 8px 0px #000",
                padding: "32px",
                transform: `rotate(${review.rotate})`,
                marginTop: i === 1 ? "24px" : "0",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={20} fill="#FF8C00" color="#FF8C00" />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: review.bgColor === "#FF8C00" ? "#000" : "#333",
                  marginBottom: "24px",
                  borderLeft: "4px solid #000",
                  paddingLeft: "16px",
                }}
              >
                "{review.text}"
              </p>

              {/* Reviewer */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "3px solid #000",
                    backgroundColor: "#FF8C00",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {review.image ? (
                    <ImageWithFallback
                      src={review.image}
                      alt={review.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "1.2rem",
                        color: "#000",
                      }}
                    >
                      {review.name[0]}
                    </span>
                  )}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "0.9rem",
                      letterSpacing: "0.05em",
                      color: "#000",
                    }}
                  >
                    {review.name}
                  </p>
                  <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "#555" }}>
                    📍 {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-6 pb-12 md:px-[80px] md:pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 md:gap-[60px] items-start">
          {/* Left: Title */}
          <div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#FFD700",
                border: "3px solid #000",
                padding: "6px 16px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                }}
              >
                TANYA JAWAB
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "3rem",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#000",
                marginBottom: "20px",
              }}
            >
              PERTANYAAN
              <br />
              YANG SERING
              <br />
              <span style={{ color: "#FF8C00" }}>DIAJUKAN</span>
            </h2>
            <p style={{ fontWeight: 500, fontSize: "0.95rem", color: "#555", lineHeight: 1.6 }}>
              Masih ada pertanyaan? Hubungi kami di WhatsApp dan kami siap
              membantu kamu!
            </p>
            <button
              onClick={() => { }}
              style={{
                marginTop: "24px",
                backgroundColor: "#2E8B57",
                border: "3px solid #000",
                boxShadow: "5px 5px 0px #000",
                padding: "14px 24px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "#FDFBF7",
              }}
            >
              HUBUNGI KAMI →
            </button>
          </div>

          {/* Right: Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FAQS.map((faq, i) => (
              <div
                key={faq.id}
                style={{
                  border: "3px solid #000",
                  borderTop: i === 0 ? "3px solid #000" : "none",
                  backgroundColor: openFaq === faq.id ? "#FF8C00" : "#FDFBF7",
                  transition: "background-color 0.15s",
                }}
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === faq.id ? null : faq.id)
                  }
                  style={{
                    width: "100%",
                    padding: "22px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "1rem",
                      letterSpacing: "0.03em",
                      textTransform: "uppercase",
                      textAlign: "left",
                      color: "#000",
                    }}
                  >
                    {faq.q}
                  </span>
                  {openFaq === faq.id ? (
                    <ChevronUp size={24} strokeWidth={3} style={{ flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={24} strokeWidth={3} style={{ flexShrink: 0 }} />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div
                    style={{
                      padding: "0 28px 24px",
                      borderTop: "2px dashed #000",
                      paddingTop: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "#000",
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
