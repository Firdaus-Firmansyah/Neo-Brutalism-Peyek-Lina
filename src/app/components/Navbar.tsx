import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useCart } from "../contexts/CartContext";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  
  const path = location.pathname;
  const [hasOrder, setHasOrder] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      className="w-full px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      <div
        onClick={() => navigate("/")}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src="/logo.svg" alt="Peyek Lina Logo" style={{ height: "48px", objectFit: "contain" }} />
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { id: "home", path: "/", label: "BERANDA" },
          { id: "menu", path: "/menu", label: "MENU" },
          { id: "about", path: "/about", label: "TENTANG KAMI" }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.08em",
              color: (path === item.path || (item.id === "home" && path === "")) ? "#FF8C00" : "#FDFBF7",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
        {hasOrder && (
          <button
            onClick={() => navigate("/status-pesanan")}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.08em",
              color: (path.includes("pesanan") || path.includes("konfirmasi")) ? "#FF8C00" : "#FDFBF7",
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

      <div className="flex items-center gap-4 md:gap-6">
        {/* Cart Button */}
      <button
        onClick={() => navigate("/keranjang")}
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center p-2 bg-[#FDFBF7] border-2 border-black shadow-[2px_2px_0px_#FF8C00]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} color="#000" /> : <Menu size={24} color="#000" />}
        </button>
      </div>

      {/* Mobile Nav Links */}
      {isMobileMenuOpen && (
        <div 
          className="absolute top-[80px] left-0 w-full bg-[#000] border-b-4 border-black flex flex-col p-6 gap-6 md:hidden z-40"
        >
          {[
            { id: "home", path: "/", label: "BERANDA" },
            { id: "menu", path: "/menu", label: "MENU" },
            { id: "about", path: "/about", label: "TENTANG KAMI" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: (path === item.path || (item.id === "home" && path === "")) ? "#FF8C00" : "#FDFBF7",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              {item.label}
            </button>
          ))}
          {hasOrder && (
            <button
              onClick={() => {
                navigate("/status-pesanan");
                setIsMobileMenuOpen(false);
              }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: (path.includes("pesanan") || path.includes("konfirmasi")) ? "#FF8C00" : "#FDFBF7",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              PESANAN
            </button>
          )}
        </div>
      )}
    </nav>
  );
}