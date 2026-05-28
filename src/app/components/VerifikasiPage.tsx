import { useState, useRef, useEffect } from "react";
import { MessageCircle, ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { Navbar } from "./Navbar";
import { motion } from "motion/react";

import { useNavigate } from "react-router";

export function VerifikasiPage() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every((d) => d !== "")) {
      setVerified(true);
      setTimeout(() => navigate("/detail"), 1500);
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setResendCooldown(30);
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FF8C00",
        fontFamily: "'Space Grotesk', sans-serif",
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 41px)",
      }}
    >
      <Navbar />

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
          position: "relative",
        }}
      >
        {/* Decorative blocks */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "80px",
            width: "120px",
            height: "120px",
            backgroundColor: "#000",
            opacity: 0.1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "100px",
            width: "80px",
            height: "80px",
            backgroundColor: "#000",
            opacity: 0.1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "120px",
            right: "200px",
            width: "40px",
            height: "40px",
            backgroundColor: "#000",
            opacity: 0.1,
          }}
        />

        {/* Main Card */}
        <div
          style={{
            backgroundColor: "#FDFBF7",
            border: "4px solid #000",
            boxShadow: "12px 12px 0px #000",
            padding: "56px 64px",
            width: "100%",
            maxWidth: "600px",
            position: "relative",
          }}
        >
          {/* Back button */}
          <button
            onClick={() => navigate("/keranjang")}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
              cursor: "pointer",
              textTransform: "uppercase",
              color: "#666",
            }}
          >
            <ArrowLeft size={14} />
            KEMBALI
          </button>

          {verified ? (
            /* Success State */
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <CheckCircle2 size={80} style={{ color: "#2E8B57", margin: "0 auto 24px" }} strokeWidth={2.5} />
              <h1
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "2.5rem",
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "#2E8B57",
                  marginBottom: "12px",
                }}
              >
                TERVERIFIKASI!
              </h1>
              <p style={{ fontWeight: 600, fontSize: "1rem", color: "#000" }}>
                Mengalihkan ke halaman checkout...
              </p>
            </div>
          ) : (
            <>
              {/* WhatsApp Icon + Branding */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#2E8B57",
                    border: "3px solid #000",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <MessageCircle size={32} color="#fff" strokeWidth={2.5} />
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#FF8C00",
                      border: "2px solid #000",
                      padding: "4px 12px",
                      display: "inline-block",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        color: "#000",
                      }}
                    >
                      WHATSAPP OTP
                    </span>
                  </div>
                  <p style={{ fontWeight: 600, fontSize: "0.8rem", color: "#666", marginTop: "2px" }}>
                    Kode verifikasi dikirim via WhatsApp
                  </p>
                </div>
              </div>

              {/* Heading */}
              <h1
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "2.8rem",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "#000",
                  marginBottom: "20px",
                }}
              >
                VERIFIKASI
                <br />
                <span style={{ color: "#2E8B57" }}>WHATSAPP</span>
              </h1>

              {/* Subheading */}
              <div
                style={{
                  backgroundColor: "#000",
                  padding: "14px 20px",
                  marginBottom: "40px",
                  border: "3px solid #000",
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    letterSpacing: "0.04em",
                    color: "#FF8C00",
                    textTransform: "uppercase",
                    lineHeight: 1.5,
                  }}
                >
                  MASUKKAN 4 DIGIT KODE OTP
                  <br />
                  <span style={{ color: "#FDFBF7" }}>
                    YANG DIKIRIM KE +62 812-XXXX-XXXX
                  </span>
                </p>
              </div>

              {/* OTP Inputs */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "40px", justifyContent: "center" }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{
                      width: "96px",
                      height: "96px",
                      border: "4px solid #000",
                      boxShadow: digit ? "6px 6px 0px #000" : "4px 4px 0px #000",
                      backgroundColor:
                        index === 0 && !digit
                          ? "#2E8B57"
                          : digit
                            ? "#FF8C00"
                            : "#FDFBF7",
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "3rem",
                      textAlign: "center",
                      outline: "none",
                      color: digit ? "#000" : index === 0 ? "#fff" : "#ccc",
                      transition: "all 0.1s",
                    }}
                    onFocus={(e) => {
                      if (!digit) {
                        e.currentTarget.style.backgroundColor = "#2E8B57";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onBlur={(e) => {
                      if (!digit) {
                        e.currentTarget.style.backgroundColor = index === 0 && !digit ? "#2E8B57" : "#FDFBF7";
                        e.currentTarget.style.color = "#ccc";
                      }
                    }}
                  />
                ))}
              </div>

              {/* Progress indicator */}
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "32px" }}>
                {otp.map((digit, i) => (
                  <div
                    key={i}
                    style={{
                      width: "48px",
                      height: "6px",
                      backgroundColor: digit ? "#2E8B57" : "#ddd",
                      border: "2px solid #000",
                      transition: "background-color 0.2s",
                    }}
                  />
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={handleVerify}
                disabled={!isComplete}
                style={{
                  width: "100%",
                  backgroundColor: isComplete ? "#FF8C00" : "#ccc",
                  border: "4px solid #000",
                  boxShadow: isComplete ? "6px 6px 0px #000" : "none",
                  padding: "22px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "1.3rem",
                  letterSpacing: "0.08em",
                  cursor: isComplete ? "pointer" : "not-allowed",
                  textTransform: "uppercase",
                  color: "#000",
                  marginBottom: "24px",
                  transition: "transform 0.1s, box-shadow 0.1s",
                }}
                onMouseEnter={(e) => {
                  if (isComplete) {
                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                    e.currentTarget.style.boxShadow = "8px 8px 0px #000";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0, 0)";
                  e.currentTarget.style.boxShadow = isComplete ? "6px 6px 0px #000" : "none";
                }}
              >
                VERIFIKASI SEKARANG ✓
              </button>

              {/* Resend Link */}
              <div
                style={{
                  textAlign: "center",
                  border: "3px solid #000",
                  padding: "14px",
                  backgroundColor: resendCooldown > 0 ? "#eee" : "#FDFBF7",
                }}
              >
                {resendCooldown > 0 ? (
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", color: "#666" }}>
                    KIRIM ULANG DALAM {resendCooldown}s
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "0 auto",
                    }}
                  >
                    <RefreshCw size={14} />
                    TIDAK MENERIMA KODE? KIRIM ULANG
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
