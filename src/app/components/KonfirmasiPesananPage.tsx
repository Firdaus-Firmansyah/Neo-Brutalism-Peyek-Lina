import { CheckCircle2, MessageCircle } from "lucide-react";
import { Navbar } from "./Navbar";
import { motion } from "motion/react";

import { useNavigate } from "react-router";

interface KonfirmasiPesananPageProps {
  orderData?: {
    invoiceNo?: string;
    customerName?: string;
    whatsapp?: string;
    total?: number;
  };
}

export function KonfirmasiPesananPage({ orderData }: KonfirmasiPesananPageProps) {
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

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 80px)",
          padding: "48px 24px",
        }}
      >
        {/* Confirmation Card */}
        <div
          style={{
            backgroundColor: "#2E8B57",
            border: "4px solid #000",
            boxShadow: "12px 12px 0px #000",
            padding: "64px 80px",
            textAlign: "center",
            maxWidth: "620px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Checkmark Icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                border: "3px solid #FDFBF7",
                borderRadius: "50%",
                padding: "14px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={52} color="#FDFBF7" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "3.2rem",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#FDFBF7",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            PESANAN
            <br />
            DIKONFIRMASI!
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontWeight: 700,
              color: "#FDFBF7",
              opacity: 0.85,
              fontSize: "0.9rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            CEK WHATSAPP KAMU UNTUK DETAIL PEMBAYARAN
          </p>

          {/* Invoice info if available */}
          {orderData?.invoiceNo && (
            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "2px solid rgba(255,255,255,0.3)",
                padding: "12px 20px",
                marginBottom: "16px",
                marginTop: "8px",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                NO. INVOICE
              </p>
              <p
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "1rem",
                  color: "#FDFBF7",
                  letterSpacing: "0.05em",
                }}
              >
                {orderData.invoiceNo}
              </p>
            </div>
          )}

          {/* WhatsApp hint */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.15)",
              border: "2px solid rgba(255,255,255,0.25)",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "32px",
              marginTop: "8px",
            }}
          >
            <MessageCircle size={20} color="#FDFBF7" />
            <p
              style={{
                fontWeight: 600,
                fontSize: "0.82rem",
                color: "#FDFBF7",
                opacity: 0.9,
              }}
            >
              Tim kami akan segera menghubungi kamu via WhatsApp
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "#FF8C00",
                border: "4px solid #000",
                boxShadow: "6px 6px 0px #000",
                padding: "20px 40px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.06em",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "#000",
                transition: "transform 0.1s, box-shadow 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = "9px 9px 0px #000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "6px 6px 0px #000";
              }}
            >
              KEMBALI KE BERANDA →
            </button>

            <button
              onClick={() => navigate("/status-pesanan")}
              style={{
                backgroundColor: "transparent",
                border: "3px solid rgba(255,255,255,0.6)",
                padding: "14px 40px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "#FDFBF7",
                transition: "all 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              LIHAT STATUS PESANAN
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
