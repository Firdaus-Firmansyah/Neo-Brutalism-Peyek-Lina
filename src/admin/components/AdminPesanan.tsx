import { useState } from "react";
import { SlidersHorizontal, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import { MOCK_ORDERS, getOrderStatusStyle, formatRp } from "../types";
import type { Order } from "../types";

type StatusFilter = "semua" | Order["status"];

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "semua", label: "SEMUA STATUS" },
  { key: "baru", label: "BARU" },
  { key: "diproses", label: "DIPROSES" },
  { key: "dikirim", label: "DIKIRIM" },
  { key: "selesai", label: "SELESAI" },
];

export function AdminPesanan() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<StatusFilter>("semua");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const filtered = filter === "semua"
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter((o) => o.status === filter);

  const toggleSelectAll = () => {
    if (selectedOrders.length === filtered.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filtered.map(o => o.invoice));
    }
  };

  const toggleSelect = (invoice: string) => {
    setSelectedOrders(prev => 
      prev.includes(invoice) ? prev.filter(i => i !== invoice) : [...prev, invoice]
    );
  };

  return (
    <>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
        {/* Status Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowFilter(!showFilter)}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              border: "3px solid #000", boxShadow: "4px 4px 0px #000",
              backgroundColor: "#fff", padding: "12px 20px",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "0.82rem", letterSpacing: "0.06em",
              cursor: "pointer", minWidth: "200px",
              justifyContent: "space-between",
            }}
          >
            <span>{STATUS_FILTERS.find((f) => f.key === filter)?.label}</span>
            <span style={{ fontSize: "0.6rem" }}>{showFilter ? "▲" : "▼"}</span>
          </button>
          {showFilter && (
            <div style={{
              position: "absolute", top: "calc(100% + 4px)", left: 0,
              backgroundColor: "#fff", border: "3px solid #000",
              boxShadow: "6px 6px 0px #000", zIndex: 50, minWidth: "200px",
            }}>
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => { setFilter(f.key); setShowFilter(false); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "10px 16px", border: "none",
                    backgroundColor: filter === f.key ? "#FFE000" : "transparent",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700, fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button style={{
          display: "flex", alignItems: "center", gap: "8px",
          border: "3px solid #000", boxShadow: "4px 4px 0px #000",
          backgroundColor: "#fff", padding: "12px 18px",
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "0.82rem", letterSpacing: "0.08em", cursor: "pointer",
        }}>
          <SlidersHorizontal size={16} /> FILTER
        </button>

        <div style={{ marginLeft: "auto" }}>
          <div style={{
            backgroundColor: "#000", border: "3px solid #000",
            padding: "10px 18px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "0.82rem", letterSpacing: "0.08em",
            color: "#FF8C00",
          }}>
            {filtered.length} PESANAN
          </div>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedOrders.length > 0 && (
        <div style={{
          backgroundColor: "#FFE000", border: "4px solid #000", boxShadow: "6px 6px 0px #000",
          padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "24px"
        }}>
          <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem", color: "#000" }}>
            {selectedOrders.length} PESANAN TERPILIH
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="neo-btn-hover" style={{
              backgroundColor: "#2E8B57", border: "3px solid #000", boxShadow: "4px 4px 0px #000",
              padding: "10px 16px", fontFamily: "'Archivo Black', sans-serif", fontSize: "0.8rem", color: "#fff", cursor: "pointer", transition: "transform 0.1s"
            }}>PROSES SEMUA</button>
            <button className="neo-btn-hover" style={{
              backgroundColor: "#FF8C00", border: "3px solid #000", boxShadow: "4px 4px 0px #000",
              padding: "10px 16px", fontFamily: "'Archivo Black', sans-serif", fontSize: "0.8rem", color: "#000", cursor: "pointer", transition: "transform 0.1s"
            }}>KIRIM SEMUA</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ border: "4px solid #000", boxShadow: "8px 8px 0px #000", overflow: "hidden", marginBottom: "32px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#000" }}>
              <th style={{ padding: "13px 16px", width: "40px" }}>
                <input type="checkbox" 
                  checked={selectedOrders.length === filtered.length && filtered.length > 0} 
                  onChange={toggleSelectAll} 
                  style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#FF8C00" }} 
                />
              </th>
              {["ORDER", "PELANGGAN", "TOTAL", "ITEM", "STATUS", "TANGGAL", "AKSI"].map((h) => (
                <th key={h} style={{
                  padding: "13px 16px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "0.1em",
                  color: ["TOTAL", "STATUS"].includes(h) ? "#FF8C00" : "#FDFBF7",
                  textAlign: "left", textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => {
              const st = getOrderStatusStyle(order.status);
              return (
                <tr key={order.invoice} style={{
                  borderTop: "2px solid #000",
                  backgroundColor: selectedOrders.includes(order.invoice) ? "#FFFBEA" : (i % 2 === 0 ? "#FDFBF7" : "#fff"),
                }}>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    <input type="checkbox" 
                      checked={selectedOrders.includes(order.invoice)} 
                      onChange={() => toggleSelect(order.invoice)} 
                      style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#FF8C00" }} 
                    />
                  </td>
                  <td style={{ padding: "14px 16px", fontFamily: "'Archivo Black', sans-serif", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                    {order.invoice}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <p style={{ fontWeight: 700, fontSize: "0.88rem" }}>{order.customer}</p>
                    <p style={{ fontSize: "0.75rem", color: "#888", fontWeight: 600 }}>{order.phone}</p>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", color: "#FF8C00", whiteSpace: "nowrap" }}>
                      {formatRp(order.total)}
                    </p>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, fontSize: "0.9rem", textAlign: "center" }}>
                    {order.items}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      backgroundColor: st.bg,
                      border: `3px solid ${st.border}`,
                      padding: "4px 10px",
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "0.7rem", letterSpacing: "0.06em",
                      color: st.color, whiteSpace: "nowrap",
                    }}>
                      {st.label}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, fontSize: "0.82rem", color: "#555", whiteSpace: "nowrap" }}>
                    {order.date}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button
                      onClick={() => navigate("/admin/detail-pesanan")}
                      style={{
                        display: "flex", alignItems: "center", gap: "5px",
                        backgroundColor: "#FFE000", border: "3px solid #000",
                        boxShadow: "3px 3px 0px #000", padding: "7px 12px",
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: "0.7rem", cursor: "pointer", whiteSpace: "nowrap",
                      }}>
                      <ExternalLink size={12} /> DETAIL
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
