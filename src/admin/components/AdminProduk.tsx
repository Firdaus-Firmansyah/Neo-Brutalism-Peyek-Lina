import { useState } from "react";
import { Search, SlidersHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { MOCK_PRODUCTS, formatRp } from "../types";
import type { AdminPage, Product } from "../types";

interface AdminProdukProps {
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

export function AdminProduk({ onNavigate, onLogout }: AdminProdukProps) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "aktif" ? "nonaktif" : "aktif" } : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("Hapus produk ini?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminLayout
      currentPage="produk"
      onNavigate={onNavigate}
      onLogout={onLogout}
      title="PRODUK"
      subtitle="Kelola katalog produk peyek secara real-time."
    >
      <style>{`
        .neo-btn-hover {
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .neo-btn-hover:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 5px 5px 0px #000 !important;
        }
        .neo-btn-hover:active {
          transform: translate(1px, 1px) !important;
          box-shadow: 2px 2px 0px #000 !important;
        }
      `}</style>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{
          flex: 1, minWidth: "240px",
          display: "flex", alignItems: "center", gap: "12px",
          border: "3px solid #000", boxShadow: "5px 5px 0px #000",
          backgroundColor: "#fff", padding: "0 16px",
        }}>
          <Search size={18} color="#888" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, border: "none", outline: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.95rem", fontWeight: 500,
              padding: "14px 0", backgroundColor: "transparent",
            }}
          />
        </div>

        <button style={{
          display: "flex", alignItems: "center", gap: "8px",
          border: "3px solid #000", boxShadow: "5px 5px 0px #000",
          backgroundColor: "#fff", padding: "14px 20px",
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "0.82rem", letterSpacing: "0.08em", cursor: "pointer",
        }}>
          <SlidersHorizontal size={16} /> FILTER
        </button>

        <button
          className="neo-btn-hover"
          onClick={() => onNavigate("tambah-produk")}
          style={{
          display: "flex", alignItems: "center", gap: "8px",
          border: "3px solid #000", boxShadow: "3px 3px 0px #000",
          backgroundColor: "#FF8C00", padding: "14px 22px",
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "0.82rem", letterSpacing: "0.08em", cursor: "pointer",
          color: "#000",
        }}>
          <Plus size={16} /> TAMBAH PRODUK
        </button>
      </div>

      {/* Count badge */}
      <div style={{
        display: "inline-block",
        backgroundColor: "#000", border: "3px solid #000",
        padding: "5px 14px",
        fontFamily: "'Archivo Black', sans-serif",
        fontSize: "0.78rem", letterSpacing: "0.08em",
        color: "#FF8C00", marginBottom: "14px",
      }}>
        {filtered.length} PRODUK
      </div>

      {/* Table */}
      <div style={{ border: "4px solid #000", boxShadow: "8px 8px 0px #000", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#000" }}>
              {["PRODUK", "VARIAN / SKU", "HARGA", "STOK", "STATUS", "AKSI"].map((h, i) => (
                <th key={h} style={{
                  padding: "14px 20px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.75rem", letterSpacing: "0.1em",
                  color: i === 0 ? "#FDFBF7" : i === 1 ? "#FF8C00" : i === 2 ? "#FF8C00" : "#FDFBF7",
                  textAlign: "left", textTransform: "uppercase",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{
                borderTop: "2px solid #000",
                backgroundColor: i % 2 === 0 ? "#FDFBF7" : "#fff",
              }}>
                {/* Produk */}
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "52px", height: "52px",
                      border: "3px solid #000", overflow: "hidden", flexShrink: 0,
                    }}>
                      <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem", lineHeight: 1.3 }}>
                      {p.name}
                    </p>
                  </div>
                </td>

                {/* Varian / SKU */}
                <td style={{ padding: "16px 20px" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#000" }}>{p.variant}</p>
                  <p style={{ fontWeight: 600, fontSize: "0.75rem", color: "#888", marginTop: "2px" }}>{p.sku}</p>
                </td>

                {/* Harga */}
                <td style={{ padding: "16px 20px" }}>
                  <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", color: "#FF8C00" }}>
                    {formatRp(p.price)}
                  </p>
                </td>

                {/* Stok */}
                <td style={{ padding: "16px 20px" }}>
                  {p.stock === 0 ? (
                    <div>
                      <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem", color: "#e53935" }}>0</p>
                      <p style={{ fontSize: "0.68rem", fontWeight: 800, color: "#e53935", letterSpacing: "0.08em" }}>HABIS</p>
                    </div>
                  ) : p.stock <= 5 ? (
                    <div>
                      <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem", color: "#FF8C00" }}>{p.stock}</p>
                      <p style={{ fontSize: "0.68rem", fontWeight: 800, color: "#FF8C00", letterSpacing: "0.08em" }}>HAMPIR HABIS</p>
                    </div>
                  ) : (
                    <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem" }}>{p.stock}</p>
                  )}
                </td>

                {/* Status */}
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      onClick={() => toggleStatus(p.id)}
                      style={{
                        width: "56px",
                        height: "30px",
                        backgroundColor: p.status === "aktif" ? "#00E676" : "#ccc",
                        border: "3px solid #000",
                        boxShadow: "3px 3px 0px #000",
                        position: "relative",
                        cursor: "pointer",
                        transition: "background-color 0.2s"
                      }}
                    >
                      <div style={{
                        position: "absolute",
                        top: "2px",
                        left: p.status === "aktif" ? "28px" : "2px",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#fff",
                        border: "3px solid #000",
                        transition: "left 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                      }} />
                    </div>
                    <span style={{ 
                      fontFamily: "'Archivo Black', sans-serif", 
                      fontSize: "0.75rem",
                      color: p.status === "aktif" ? "#00E676" : "#888" 
                    }}>
                      {p.status === "aktif" ? "AKTIF" : "NONAKTIF"}
                    </span>
                  </div>
                </td>

                {/* Aksi */}
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button 
                      className="neo-btn-hover"
                      onClick={() => onNavigate("edit-produk")}
                      style={{
                      display: "flex", alignItems: "center", gap: "5px",
                      backgroundColor: "#FFE000", border: "3px solid #000",
                      boxShadow: "3px 3px 0px #000", padding: "8px 14px",
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "0.72rem", cursor: "pointer",
                    }}>
                      <Pencil size={12} /> EDIT
                    </button>
                    <button
                      className="neo-btn-hover"
                      onClick={() => deleteProduct(p.id)}
                      style={{
                        backgroundColor: "#FFB3B3", border: "3px solid #000",
                        boxShadow: "3px 3px 0px #000", padding: "8px 10px",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
