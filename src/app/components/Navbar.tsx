import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  cartCount?: number;
}

export function Navbar({ currentPage, onNavigate, cartCount = 0 }: NavbarProps) {
  const [hasOrder, setHasOrder] = useState(false);

  useEffect(() => {
    setHasOrder(localStorage.getItem("hasOrder") === "true");
  }, []);

  return (
    <nav
      style={{
        backgroundColor: "#000000",
        borderBottom: "4px solid #000000",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
      className="w-full px-8 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      {/* Logo */}
      <div
        onClick={() => onNavigate?.("home")}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src="/logo.svg" alt="Peyek Lina Logo" style={{ height: "48px", objectFit: "contain" }} />
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-8">
        {["home", "menu", "about"].map((item) => (
          <button
            key={item}
            onClick={() => onNavigate?.(item)}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.08em",
              color: currentPage === item ? "#FF8C00" : "#FDFBF7",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {item === "home" ? "BERANDA" : item === "menu" ? "MENU" : "TENTANG KAMI"}
          </button>
        ))}
        {hasOrder && (
          <button
            onClick={() => onNavigate?.("status-pesanan")}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.08em",
              color: (currentPage === "pesanan" || currentPage === "konfirmasi" || currentPage === "status-pesanan") ? "#FF8C00" : "#FDFBF7",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            PESANAN
          </button>
        )}
      </div>

      {/* Cart Button */}
      <button
        onClick={() => onNavigate?.("keranjang")}
        style={{
          backgroundColor: "#FF8C00",
          border: "3px solid #FDFBF7",
          boxShadow: "4px 4px 0px #FDFBF7",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "0.05em",
          color: "#000000",
          cursor: "pointer",
          textTransform: "uppercase",
          position: "relative",
        }}
      >
        <ShoppingCart size={18} />
        KERANJANG
        {cartCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: "#2E8B57",
              border: "2px solid #000",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}