import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { loginApi, setToken } from "../../utils/auth";

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = await loginApi(email, password);
      setToken(token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "3px solid #000",
    boxShadow: "5px 5px 0px #000",
    padding: "14px 16px",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 500,
    fontSize: "1rem",
    backgroundColor: "#fff",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#FFE000",
      fontFamily: "'Space Grotesk', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative Squares */}
      <div style={{ position: "absolute", top: "60px", left: "80px", width: "72px", height: "72px", backgroundColor: "#FF8C00", border: "4px solid #000", boxShadow: "6px 6px 0px #000" }} />
      <div style={{ position: "absolute", top: "80px", right: "100px", width: "32px", height: "32px", backgroundColor: "#000" }} />
      <div style={{ position: "absolute", bottom: "80px", right: "120px", width: "56px", height: "56px", backgroundColor: "#00E676", border: "4px solid #000", boxShadow: "5px 5px 0px #000" }} />
      <div style={{ position: "absolute", bottom: "120px", left: "60px", width: "24px", height: "24px", backgroundColor: "#000" }} />
      <div style={{ position: "absolute", top: "40%", left: "5%", width: "16px", height: "16px", backgroundColor: "#000", opacity: 0.3 }} />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          backgroundColor: "#FDFBF7",
          border: "4px solid #000",
          boxShadow: "12px 12px 0px #000",
          padding: "48px 52px",
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px", height: "64px",
            backgroundColor: "#FF8C00",
            border: "4px solid #000",
            boxShadow: "5px 5px 0px #000",
            marginBottom: "20px",
            overflow: "hidden",
          }}>
            <img src="/logo.svg" alt="Peyek Lina" style={{ width: "42px", height: "42px", objectFit: "contain" }} />
          </div>

          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "2.4rem",
            letterSpacing: "-0.02em",
            color: "#000",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: "10px",
          }}>
            ADMIN LOGIN
          </h1>
          <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#666", lineHeight: 1.5 }}>
            Masuk untuk mengelola produk, pesanan,<br />promo, dan integrasi.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Email */}
          <div>
            <label style={{
              display: "block",
              fontWeight: 800,
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "#000",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}>
              EMAIL
            </label>
            <input
              type="email"
              placeholder="admin@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: "block",
              fontWeight: 800,
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "#000",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}>
              PASSWORD
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ ...inputStyle, paddingRight: "48px" }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#666",
                  display: "flex", alignItems: "center",
                }}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: "#fde8e8",
              border: "3px solid #e53935",
              padding: "10px 14px",
              fontWeight: 700,
              fontSize: "0.82rem",
              color: "#e53935",
            }}>
              ✗ {error}
            </div>
          )}

          {/* Hint */}
          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#aaa", textAlign: "center" }}>
            Demo: admin@business.com / admin123
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#ccc" : "#FF8C00",
              border: "4px solid #000",
              boxShadow: loading ? "none" : "6px 6px 0px #000",
              padding: "18px",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "1.1rem",
              letterSpacing: "0.06em",
              cursor: loading ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              color: "#000",
              transition: "transform 0.1s, box-shadow 0.1s",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = "9px 9px 0px #000";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "6px 6px 0px #000";
              }
            }}
          >
            {loading ? "MEMPROSES..." : "MASUK KE DASHBOARD →"}
          </button>
        </form>

        {/* Footer note */}
        <p style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "0.72rem",
          color: "#999",
          letterSpacing: "0.08em",
          marginTop: "20px",
        }}>
          🔒 HANYA UNTUK ADMIN TERDAFTAR
        </p>
      </motion.div>
    </div>
  );
}
