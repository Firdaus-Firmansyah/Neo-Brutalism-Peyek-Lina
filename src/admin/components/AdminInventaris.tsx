import { useState } from "react";
import { Search, RefreshCw, Pencil, Check, X } from "lucide-react";
import { MOCK_INVENTORY, getStockStatus } from "../types";
import type { InventoryItem } from "../types";

export function AdminInventaris() {
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const filtered = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase())
  );

  const totalSku = inventory.length;
  const aman = inventory.filter((i) => i.stock > 10).length;
  const perluRestock = inventory.filter((i) => i.stock > 0 && i.stock <= 10).length;
  const kritis = inventory.filter((i) => i.stock === 0).length;

  const handleBulkUpdate = () => {
    setBulkLoading(true);
    setTimeout(() => {
      // Add +20 to all kritis items
      setInventory((prev) =>
        prev.map((item) => (item.stock === 0 ? { ...item, stock: item.stock + 20 } : item))
      );
      setBulkLoading(false);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 4000);
    }, 1800);
  };

  const startEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValue(item.stock);
  };

  const saveEdit = (id: string) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: editValue } : item))
    );
    setEditingId(null);
  };

  const SUMMARY_CARDS = [
    { label: "TOTAL SKU", value: totalSku, bg: "#fff" },
    { label: "AMAN", value: aman, bg: "#00E676" },
    { label: "PERLU RESTOCK", value: perluRestock, bg: "#FFE000" },
    { label: "KRITIS", value: kritis, bg: "#FF6B6B" },
  ];

  return (
    <>
      {/* Success Notification */}
      {showNotif && (
        <div style={{
          backgroundColor: "#00E676",
          border: "3px solid #000",
          boxShadow: "5px 5px 0px #000",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          animation: "slideDown 0.3s ease",
        }}>
          <p style={{ fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.06em", color: "#000" }}>
            ✓ STOK MASSAL BERHASIL DIPERBARUI! PRODUK KRITIS TELAH DITAMBAH +20 UNIT.
          </p>
          <button
            onClick={() => setShowNotif(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#000" }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {SUMMARY_CARDS.map((card) => (
          <div key={card.label} style={{
            backgroundColor: card.bg,
            border: "4px solid #000",
            boxShadow: "6px 6px 0px #000",
            padding: "20px 24px",
          }}>
            <p style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "2.2rem",
              letterSpacing: "-0.03em",
              color: "#000",
              lineHeight: 1,
              marginBottom: "6px",
            }}>
              {card.value}
            </p>
            <p style={{ fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em", color: "#000", textTransform: "uppercase" }}>
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <div style={{
          flex: 1,
          display: "flex", alignItems: "center", gap: "12px",
          border: "3px solid #000", boxShadow: "5px 5px 0px #000",
          backgroundColor: "#fff", padding: "0 16px",
        }}>
          <Search size={18} color="#888" />
          <input
            type="text"
            placeholder="Cari SKU atau Produk..."
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

        <button
          onClick={handleBulkUpdate}
          disabled={bulkLoading}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            backgroundColor: bulkLoading ? "#ccc" : "#FF8C00",
            border: "3px solid #000",
            boxShadow: bulkLoading ? "none" : "5px 5px 0px #000",
            padding: "14px 22px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "0.82rem", letterSpacing: "0.08em",
            cursor: bulkLoading ? "not-allowed" : "pointer", color: "#000",
            transition: "all 0.2s",
          }}
        >
          <RefreshCw size={16} style={{ animation: bulkLoading ? "spin 0.8s linear infinite" : "none" }} />
          {bulkLoading ? "MEMPERBARUI..." : "UPDATE STOK MASSAL"}
        </button>
      </div>

      {/* Loading bar */}
      {bulkLoading && (
        <div style={{ height: "6px", backgroundColor: "#f0f0f0", border: "2px solid #000", marginBottom: "16px", overflow: "hidden" }}>
          <div style={{
            height: "100%", backgroundColor: "#FF8C00",
            animation: "progress 1.8s ease forwards",
          }} />
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Table */}
      <div style={{ border: "4px solid #000", boxShadow: "8px 8px 0px #000", overflow: "hidden" }}>
        <div style={{
          backgroundColor: "#000",
          padding: "14px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.1rem" }}>♻️</span>
            <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", letterSpacing: "0.08em", color: "#FDFBF7" }}>
              DATA STOK PRODUK
            </span>
          </div>
          <span style={{
            backgroundColor: "#FF8C00", border: "2px solid #FDFBF7",
            padding: "3px 12px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "0.72rem", letterSpacing: "0.08em", color: "#000",
          }}>
            {filtered.length} ITEM
          </span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#FDFBF7", borderBottom: "2px solid #000" }}>
              {["PRODUK", "SKU", "STOK SAAT INI", "STATUS", "AKSI"].map((h) => (
                <th key={h} style={{
                  padding: "12px 20px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "0.1em",
                  color: "#000", textAlign: "left", textTransform: "uppercase",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const stockSt = getStockStatus(item.stock);
              const isEditing = editingId === item.id;
              return (
                <tr key={item.id} style={{
                  borderTop: "2px solid #000",
                  backgroundColor: i % 2 === 0 ? "#fff" : "#FDFBF7",
                }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "52px", height: "52px", border: "3px solid #000", overflow: "hidden", flexShrink: 0 }}>
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.85rem", lineHeight: 1.3 }}>{item.name}</p>
                        <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#888" }}>{item.variant}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{
                      backgroundColor: "#000", padding: "5px 10px",
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "0.72rem", letterSpacing: "0.06em", color: "#FFE000",
                    }}>{item.sku}</span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {isEditing ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="number" value={editValue} min={0}
                          onChange={(e) => setEditValue(Number(e.target.value))}
                          style={{
                            width: "70px", border: "3px solid #000",
                            padding: "6px 10px", fontFamily: "'Archivo Black', sans-serif",
                            fontSize: "0.9rem", outline: "none",
                          }}
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(item.id)}
                          style={{ backgroundColor: "#00E676", border: "2px solid #000", padding: "7px", cursor: "pointer" }}
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <p style={{
                          fontFamily: "'Archivo Black', sans-serif", fontSize: "1.1rem",
                          color: item.stock === 0 ? "#e53935" : item.stock <= 5 ? "#FF8C00" : "#000",
                        }}>{item.stock}</p>
                        <span style={{ fontWeight: 700, fontSize: "0.75rem", color: "#888" }}>pcs</span>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{
                      backgroundColor: stockSt.bg, border: "3px solid #000",
                      padding: "5px 10px",
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "0.7rem", letterSpacing: "0.06em", color: stockSt.color,
                    }}>{stockSt.label}</span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <button
                      onClick={() => startEdit(item)}
                      style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        backgroundColor: "#FFE000", border: "3px solid #000",
                        boxShadow: "3px 3px 0px #000", padding: "10px 16px",
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "0.75rem", letterSpacing: "0.06em",
                        cursor: "pointer", color: "#000",
                      }}
                    >
                      EDIT STOK <Pencil size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
