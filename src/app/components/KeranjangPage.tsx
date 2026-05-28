import { useState, useEffect } from "react";
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, Tag } from "lucide-react";
import { Navbar } from "./Navbar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

import { useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";

export function KeranjangPage() {
  const navigate = useNavigate();
  const { cartItems: items, updateQty, removeFromCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 15000;
  const total = subtotal + shipping;

  const formatRp = (n: number) =>
    "Rp " + n.toLocaleString("id-ID");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FDFBF7",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <style>{`
        .neo-btn-qty {
          transition: background-color 0.1s, transform 0.05s;
        }
        .neo-btn-qty:active {
          transform: scale(0.92);
        }
        .neo-btn-hover:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 8px 8px 0px #000 !important;
        }
        .neo-btn-hover:active {
          transform: translate(2px, 2px) !important;
          box-shadow: 2px 2px 0px #000 !important;
        }
      `}</style>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: "1440px", margin: "0 auto", padding: "48px 80px" }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/menu")}
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
          KEMBALI BELANJA
        </button>

        {/* Page Title */}
        <div style={{ marginBottom: "48px" }}>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "4.5rem",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#000",
            }}
          >
            KERANJANG
          </h1>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "4.5rem",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#FF8C00",
              marginTop: "-8px",
            }}
          >
            BELANJA
          </h1>
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ShoppingBag size={18} />
            <span style={{ fontWeight: 600, fontSize: "1rem" }}>
              {items.reduce((s, i) => s + i.qty, 0)} ITEM DALAM KERANJANG
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div
            style={{
              border: "4px solid #000",
              boxShadow: "8px 8px 0px #000",
              backgroundColor: "#fff",
              padding: "80px",
              textAlign: "center",
            }}
          >
            <ShoppingBag size={80} style={{ margin: "0 auto 24px", color: "#ccc" }} />
            <p
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "2rem",
                color: "#000",
              }}
            >
              KERANJANG KOSONG!
            </p>
            <p style={{ fontWeight: 500, color: "#666", marginTop: "12px" }}>
              Belum ada produk di keranjang kamu.
            </p>
            <button
              onClick={() => navigate("/menu")}
              style={{
                marginTop: "32px",
                backgroundColor: "#FF8C00",
                border: "4px solid #000",
                boxShadow: "6px 6px 0px #000",
                padding: "16px 48px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              MULAI BELANJA →
            </button>
          </div>
        ) : (
          /* 2-Column Layout */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "32px", alignItems: "start" }}>
            {/* LEFT: Item List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Section header */}
              <div
                style={{
                  backgroundColor: "#000",
                  padding: "12px 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    color: "#FF8C00",
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  DAFTAR PRODUK
                </span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "4px solid #000",
                    boxShadow: "8px 8px 0px #000",
                    backgroundColor: "#fff",
                    padding: "28px",
                    display: "flex",
                    gap: "28px",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      width: "160px",
                      height: "160px",
                      border: "4px solid #000",
                      flexShrink: 0,
                      overflow: "hidden",
                      boxShadow: "4px 4px 0px #000",
                    }}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Archivo Black', sans-serif",
                          fontSize: "1.4rem",
                          letterSpacing: "-0.01em",
                          color: "#000",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.name}
                      </p>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          backgroundColor: "#FDFBF7",
                          border: "2px solid #000",
                          padding: "4px 10px",
                          marginTop: "6px",
                        }}
                      >
                        <Tag size={12} />
                        <span style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                          VARIAN: {item.variant}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "8px", color: "#666" }}>
                        JUMLAH
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
                          onClick={() => updateQty(item.id, item.variant, -1)}
                          className="neo-btn-qty"
                          style={{
                            width: "48px",
                            height: "48px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: item.qty <= 1 ? "#eee" : "#FF8C00",
                            border: "none",
                            borderRight: "3px solid #000",
                            cursor: item.qty <= 1 ? "not-allowed" : "pointer",
                            fontWeight: 900,
                            fontSize: "1.4rem",
                          }}
                        >
                          <Minus size={18} />
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
                          {item.qty}
                        </div>
                        <button
                          onClick={() => updateQty(item.id, item.variant, 1)}
                          className="neo-btn-qty"
                          style={{
                            width: "48px",
                            height: "48px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#2E8B57",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 900,
                            fontSize: "1.4rem",
                            color: "#fff",
                          }}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <p
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "2rem",
                        color: "#FF8C00",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {formatRp(item.price * item.qty)}
                    </p>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#666", marginTop: "-8px" }}>
                      {formatRp(item.price)} / pcs
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.variant)}
                    style={{
                      backgroundColor: "#fff",
                      border: "3px solid #000",
                      boxShadow: "4px 4px 0px #000",
                      padding: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background-color 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff3333")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              ))}

              {/* Continue Shopping */}
              <button
                onClick={() => navigate("/menu")}
                style={{
                  border: "3px solid #000",
                  backgroundColor: "#FDFBF7",
                  padding: "16px 28px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "flex-start",
                  boxShadow: "4px 4px 0px #000",
                }}
              >
                ← TAMBAH PRODUK LAIN
              </button>
            </div>

            {/* RIGHT: Summary Card */}
            <div style={{ position: "sticky", top: "120px" }}>
              <div
                style={{
                  backgroundColor: "#2E8B57",
                  border: "4px solid #000",
                  boxShadow: "10px 10px 0px #000",
                  padding: "36px",
                }}
              >
                {/* Title */}
                <div
                  style={{
                    backgroundColor: "#000",
                    padding: "10px 20px",
                    marginBottom: "28px",
                    display: "inline-block",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "1.1rem",
                      letterSpacing: "0.1em",
                      color: "#FF8C00",
                      textTransform: "uppercase",
                    }}
                  >
                    RINGKASAN
                  </span>
                </div>

                {/* Summary Lines */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em", color: "#FDFBF7" }}>
                      SUBTOTAL ({items.reduce((s, i) => s + i.qty, 0)} item)
                    </span>
                    <span
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "1.1rem",
                        color: "#FDFBF7",
                      }}
                    >
                      {formatRp(subtotal)}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em", color: "#FDFBF7" }}>
                      ONGKOS KIRIM
                    </span>
                    <div
                      style={{
                        backgroundColor: "#FDFBF7",
                        border: "2px solid #000",
                        padding: "4px 10px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Archivo Black', sans-serif",
                          fontSize: "0.9rem",
                          color: "#000",
                        }}
                      >
                        {formatRp(shipping)}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#FDFBF7",
                      border: "2px dashed #000",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Tag size={14} />
                    <span style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                      PROMO DAPAT DIISI DI CHECKOUT
                    </span>
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: "4px solid #000", margin: "4px 0" }} />

                  {/* Total */}
                  <div style={{
                    backgroundColor: "#fff",
                    border: "3px solid #000",
                    padding: "16px",
                    marginTop: "8px",
                    boxShadow: "4px 4px 0px #000"
                  }}>
                    <p style={{ fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.1em", color: "#000", marginBottom: "4px" }}>
                      TOTAL PEMBAYARAN
                    </p>
                    <p
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "2.4rem",
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        color: "#FF8C00",
                      }}
                    >
                      {formatRp(total)}
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate("/verifikasi")}
                    className="neo-btn-hover"
                    style={{
                      backgroundColor: "#FF8C00",
                      border: "4px solid #000",
                      boxShadow: "6px 6px 0px #000",
                      padding: "20px",
                      width: "100%",
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "1.2rem",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      color: "#000",
                      transition: "transform 0.1s, box-shadow 0.1s",
                      marginTop: "12px",
                    }}
                  >
                    LANJUT CHECKOUT →
                  </button>

                  <p style={{ fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.05em", textAlign: "center", color: "#FDFBF7", opacity: 0.8 }}>
                    🔒 PEMBAYARAN AMAN & TERENKRIPSI
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
