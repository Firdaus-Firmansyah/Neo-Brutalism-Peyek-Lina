import { Award, Heart, Leaf, Users, ChevronRight } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const MILESTONES = [
  { year: "1985", title: "LAHIRNYA RESEP", desc: "Ibu Lina menciptakan resep peyek kacang pertamanya di dapur kecil Yogyakarta." },
  { year: "2000", title: "PRODUKSI RUMAHAN", desc: "Memulai produksi kecil-kecilan dan menjual ke tetangga & pasar tradisional." },
  { year: "2015", title: "TOKO ONLINE", desc: "Masuk ke dunia digital dan mulai melayani pelanggan dari seluruh Indonesia." },
  { year: "2025", title: "5.000+ PELANGGAN", desc: "Dipercaya lebih dari 5.000 pelanggan setia di 34 provinsi Indonesia." },
];

const VALUES = [
  {
    icon: <Leaf size={28} />,
    title: "100% ALAMI",
    desc: "Tidak ada pengawet, tidak ada pewarna buatan. Hanya bahan-bahan segar pilihan yang masuk ke dalam produk kami.",
    bg: "#2E8B57",
    color: "#FDFBF7",
  },
  {
    icon: <Heart size={28} />,
    title: "DIBUAT DENGAN CINTA",
    desc: "Setiap toples dibuat dengan tangan dan penuh perhatian, seperti memasak untuk keluarga sendiri.",
    bg: "#FF8C00",
    color: "#000",
  },
  {
    icon: <Award size={28} />,
    title: "KUALITAS TERJAMIN",
    desc: "Melalui proses seleksi bahan baku yang ketat dan penggorengan higienis setiap harinya.",
    bg: "#FFD700",
    color: "#000",
  },
  {
    icon: <Users size={28} />,
    title: "UNTUK SEMUA",
    desc: "Dari anak-anak hingga lansia, produk kami hadir untuk menemani momen kebersamaan keluarga.",
    bg: "#FDFBF7",
    color: "#000",
  },
];

export function AboutPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FDFBF7",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          HERO / ABOUT SECTION
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "80px 80px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* LEFT: Text Block */}
        <div>
          {/* Label */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#FF8C00",
              border: "3px solid #000",
              boxShadow: "4px 4px 0px #000",
              padding: "8px 18px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              SIAPA KAMI?
            </span>
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#000",
              marginBottom: "32px",
            }}
          >
            MELESTARIKAN
            <br />
            RESEP WARISAN
            <br />
            <span style={{ color: "#FF8C00" }}>DALAM SETIAP</span>
            <br />
            GIGITAN.
          </h1>

          {/* Paragraph */}
          <p
            style={{
              fontWeight: 500,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#444",
              marginBottom: "20px",
              maxWidth: "520px",
            }}
          >
            Berawal dari dapur kecil dan resep rahasia keluarga Ibu Lina, PeyekStore hadir
            untuk membawa cita rasa autentik makanan ringan tradisional Indonesia ke seluruh
            penjuru negeri.
          </p>
          <p
            style={{
              fontWeight: 500,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#444",
              marginBottom: "40px",
              maxWidth: "520px",
            }}
          >
            Kami percaya bahwa makanan yang dibuat dengan tangan, menggunakan bahan-bahan
            alami terbaik, adalah bentuk cinta yang sesungguhnya. Setiap toples yang sampai
            di tangan Anda adalah hasil kerja keras dan dedikasi tim kami.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/menu")}
            style={{
              backgroundColor: "#FF8C00",
              border: "4px solid #000",
              boxShadow: "6px 6px 0px #000",
              padding: "20px 40px",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.06em",
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
            JELAJAHI MENU KAMI →
          </button>

          {/* Quick Stats */}
          <div style={{ display: "flex", gap: "0", marginTop: "48px", border: "3px solid #000", boxShadow: "5px 5px 0px #000", overflow: "hidden" }}>
            {[
              { num: "40+", label: "TAHUN RESEP" },
              { num: "5K+", label: "PELANGGAN" },
              { num: "34", label: "PROVINSI" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  padding: "20px",
                  borderRight: i < 2 ? "3px solid #000" : "none",
                  backgroundColor: i === 1 ? "#FF8C00" : "#fff",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "2.2rem",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.num}
                </p>
                <p style={{ fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", color: "#555", marginTop: "4px" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image Block + Overlapping Card */}
        <div style={{ position: "relative" }}>
          {/* Kitchen/Business Photo */}
          <div
            style={{
              border: "4px solid #000",
              boxShadow: "10px 10px 0px #000",
              overflow: "hidden",
              aspectRatio: "4/5",
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1771967525910-dff5b7dc5e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhvbWUlMjBraXRjaGVuJTIwY29va2luZyUyMGZyeWluZ3xlbnwxfHx8fDE3Nzc3ODczMjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dapur produksi PeyekStore"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Overlapping Card – Pesanan Acara Spesial */}
          <div
            style={{
              position: "absolute",
              bottom: "-36px",
              left: "-40px",
              backgroundColor: "#FF8C00",
              border: "4px solid #000",
              boxShadow: "8px 8px 0px #000",
              padding: "28px 32px",
              maxWidth: "340px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#000",
                padding: "5px 12px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#FF8C00",
                }}
              >
                🎉 LAYANAN KHUSUS
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1.2rem",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "#000",
                marginBottom: "12px",
                lineHeight: 1.2,
              }}
            >
              PESANAN UNTUK
              <br />
              ACARA SPESIAL?
            </p>
            <p
              style={{
                fontWeight: 500,
                fontSize: "0.9rem",
                lineHeight: 1.6,
                color: "#000",
                marginBottom: "16px",
                opacity: 0.85,
              }}
            >
              Selain pesanan satuan, kami juga melayani pesanan dalam jumlah
              besar untuk acara pernikahan, ulang tahun, dan acara kantor!
            </p>
            <button
              onClick={() => {}}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#000",
                border: "2px solid #000",
                padding: "10px 20px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                cursor: "pointer",
                color: "#FF8C00",
              }}
            >
              HUBUNGI KAMI <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          TIMELINE / MILESTONES
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundColor: "#000",
          padding: "80px 0",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 80px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "56px" }}>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#FF8C00",
                border: "3px solid #FF8C00",
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
                PERJALANAN KAMI
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "3.5rem",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#FDFBF7",
              }}
            >
              DARI DAPUR KECIL
              <br />
              <span style={{ color: "#FF8C00" }}>KE SELURUH INDONESIA</span>
            </h2>
          </div>

          {/* Timeline Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "4px",
            }}
          >
            {MILESTONES.map((ms, i) => (
              <div
                key={ms.year}
                style={{
                  border: "3px solid #FF8C00",
                  padding: "36px 28px",
                  backgroundColor: i % 2 === 0 ? "#FF8C00" : "#000",
                  position: "relative",
                }}
              >
                {/* Year */}
                <p
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "3rem",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: i % 2 === 0 ? "#000" : "#FF8C00",
                    marginBottom: "12px",
                  }}
                >
                  {ms.year}
                </p>
                {/* Title */}
                <p
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: i % 2 === 0 ? "#000" : "#FDFBF7",
                    marginBottom: "10px",
                    borderBottom: `2px solid ${i % 2 === 0 ? "#000" : "#FF8C00"}`,
                    paddingBottom: "10px",
                  }}
                >
                  {ms.title}
                </p>
                {/* Desc */}
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    color: i % 2 === 0 ? "#000" : "#FDFBF7",
                    opacity: 0.85,
                  }}
                >
                  {ms.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          OUR VALUES
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "80px 80px 0",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
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
              NILAI-NILAI KAMI
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
            APA YANG MEMBUAT
            <br />
            <span style={{ color: "#FF8C00" }}>KAMI BERBEDA</span>
          </h2>
        </div>

        {/* Values Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "4px solid #000",
            boxShadow: "10px 10px 0px #000",
            overflow: "hidden",
          }}
        >
          {VALUES.map((val, i) => (
            <div
              key={val.title}
              style={{
                backgroundColor: val.bg,
                borderRight: i < 3 ? "4px solid #000" : "none",
                padding: "40px 32px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#000",
                  border: "3px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  color: "#FF8C00",
                }}
              >
                {val.icon}
              </div>
              <p
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color: val.color,
                  marginBottom: "12px",
                }}
              >
                {val.title}
              </p>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: val.color,
                  opacity: 0.85,
                }}
              >
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          CTA BAND
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          maxWidth: "1440px",
          margin: "80px auto 0",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            border: "4px solid #000",
            boxShadow: "10px 10px 0px #000",
            backgroundColor: "#2E8B57",
            padding: "60px 80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "2.8rem",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#FDFBF7",
                marginBottom: "12px",
              }}
            >
              SIAP MERASAKAN
              <br />
              <span style={{ color: "#FF8C00" }}>RENYAHNYA?</span>
            </p>
            <p
              style={{
                fontWeight: 600,
                fontSize: "1.05rem",
                color: "#FDFBF7",
                opacity: 0.9,
              }}
            >
              Pesan sekarang dan nikmati gurihnya warisan keluarga Ibu Lina.
            </p>
          </div>
          <button
            onClick={() => navigate("/menu")}
            style={{
              backgroundColor: "#FF8C00",
              border: "4px solid #000",
              boxShadow: "6px 6px 0px #000",
              padding: "22px 48px",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
              cursor: "pointer",
              textTransform: "uppercase",
              color: "#000",
              whiteSpace: "nowrap",
              flexShrink: 0,
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
            PESAN SEKARANG →
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
