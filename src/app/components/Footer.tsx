import { Instagram, MessageCircle, Mail } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      style={{
        backgroundColor: "#FDFBF7",
        borderTop: "4px solid #000",
        fontFamily: "'Space Grotesk', sans-serif",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "64px 80px 40px",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: "48px",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              marginBottom: "16px",
              cursor: "pointer",
              display: "inline-block",
            }}
            onClick={() => onNavigate?.("home")}
          >
            <img src="/logo.svg" alt="Peyek Lina Logo" style={{ height: "120px", objectFit: "contain" }} />
          </div>
          <p
            style={{
              fontWeight: 600,
              fontSize: "0.85rem",
              lineHeight: 1.6,
              color: "#555",
              maxWidth: "250px",
              marginBottom: "24px",
            }}
          >
            Makanan ringan tradisional Indonesia yang renyah, gurih, dan dibuat
            dengan resep warisan keluarga sejak tahun 1985.
          </p>
          {/* Social Icons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: <Instagram size={18} />, label: "IG" },
              { icon: <MessageCircle size={18} />, label: "WA" },
              { icon: <Mail size={18} />, label: "Email" },
            ].map((s) => (
              <button
                key={s.label}
                style={{
                  width: "44px",
                  height: "44px",
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0px #000",
                  backgroundColor: "#FF8C00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div>
          <p
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
              borderBottom: "3px solid #000",
              paddingBottom: "10px",
            }}
          >
            NAVIGASI
          </p>
          {[
            { label: "Beranda", page: "home" },
            { label: "Menu Produk", page: "menu" },
            { label: "Tentang Kami", page: "about" },
            { label: "Keranjang", page: "keranjang" },
          ].map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate?.(link.page)}
              style={{
                display: "block",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#000",
                marginBottom: "12px",
                textAlign: "left",
                padding: 0,
              }}
            >
              → {link.label}
            </button>
          ))}
        </div>

        {/* Products */}
        <div>
          <p
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
              borderBottom: "3px solid #000",
              paddingBottom: "10px",
            }}
          >
            PRODUK
          </p>
          {[
            "Peyek Kacang Original",
            "Peyek Teri Medan",
            "Peyek Rebon",
            "Peyek Kacang Ijo",
            "Paket Mix",
          ].map((p) => (
            <button
              key={p}
              onClick={() => onNavigate?.("menu")}
              style={{
                display: "block",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#000",
                marginBottom: "12px",
                textAlign: "left",
                padding: 0,
              }}
            >
              → {p}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "1rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
              borderBottom: "3px solid #000",
              paddingBottom: "10px",
            }}
          >
            KONTAK
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div
              style={{
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #000",
                padding: "12px 16px",
                backgroundColor: "#fff",
              }}
            >
              <p style={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "4px" }}>
                WHATSAPP
              </p>
              <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>+62 812-1892-9336</p>
            </div>
            <div
              style={{
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #000",
                padding: "12px 16px",
                backgroundColor: "#fff",
              }}
            >
              <p style={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "4px" }}>
                EMAIL
              </p>
              <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>peyeklina22@gmail.com</p>
            </div>
            <div
              style={{
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #000",
                padding: "12px 16px",
                backgroundColor: "#2E8B57",
              }}
            >
              <p style={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "4px", color: "#FDFBF7" }}>
                BUKA SETIAP HARI
              </p>
              <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#FDFBF7" }}>08.00 - 16.00 WIB</p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
