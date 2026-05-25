import { useState } from "react";
import { Tag, Pencil, X, Plus } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { MOCK_PROMOS } from "../types";
import type { AdminPage, Promo } from "../types";

interface AdminPromoProps {
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

type FilterTab = "semua" | "aktif" | "nonaktif";

const TYPE_LABELS: Record<Promo["type"], string> = {
  diskon_nominal: "DISKON NOMINAL",
  gratis_ongkir: "GRATIS ONGKIR",
  persentase: "PERSENTASE",
};

export function AdminPromo({ onNavigate, onLogout }: AdminPromoProps) {
  const [promos, setPromos] = useState<Promo[]>(MOCK_PROMOS);
  const [filter, setFilter] = useState<FilterTab>("semua");
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const filtered = filter === "semua" ? promos : promos.filter((p) => (filter === "aktif" ? p.active : !p.active));
  const activeCount = promos.filter((p) => p.active).length;

  const toggleActive = (id: string) => {
    setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const deletePromo = (id: string) => {
    setPromos((prev) => prev.filter((p) => p.id !== id));
  };

  const saveEdit = () => {
    if (!editingPromo) return;
    
    if (!editingPromo.title || !editingPromo.value || !editingPromo.code) {
      alert("⚠️ Harap lengkapi Judul Promo, Nilai Diskon, dan Kode Promo sebelum menyimpan!");
      return;
    }
    
    if (isCreating) {
      setPromos((prev) => [{ ...editingPromo, id: Date.now().toString() }, ...prev]);
      setIsCreating(false);
      alert("✅ Promo baru berhasil dibuat!");
    } else {
      setPromos((prev) => prev.map((p) => (p.id === editingPromo.id ? editingPromo : p)));
      alert("✅ Perubahan promo berhasil disimpan!");
    }
    setEditingPromo(null);
  };

  const startCreate = () => {
    setEditingPromo({
      id: "",
      type: "diskon_nominal",
      title: "",
      description: "",
      value: "",
      code: "",
      validUntil: "",
      active: true,
      color: "#00E676"
    });
    setIsCreating(true);
  };

  const FILTER_TABS: { key: FilterTab; label: string }[] = [
    { key: "semua", label: "SEMUA" },
    { key: "aktif", label: "AKTIF" },
    { key: "nonaktif", label: "NONAKTIF" },
  ];

  return (
    <AdminLayout
      currentPage="promo"
      onNavigate={onNavigate}
      onLogout={onLogout}
      title={`PROMO AKTIF`}
      subtitle="Kelola diskon, voucher, dan kampanye promosi toko."
      notifCount={activeCount}
    >
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", gap: "0" }}>
          {FILTER_TABS.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: "10px 20px",
                border: "3px solid #000",
                borderRight: i < FILTER_TABS.length - 1 ? "none" : "3px solid #000",
                backgroundColor: filter === tab.key ? "#000" : "#fff",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.82rem", letterSpacing: "0.06em",
                cursor: "pointer",
                color: filter === tab.key ? "#FF8C00" : "#000",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={startCreate}
          style={{
          display: "flex", alignItems: "center", gap: "8px",
          backgroundColor: "#FFE000", border: "3px solid #000",
          boxShadow: "5px 5px 0px #000",
          padding: "11px 22px",
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "0.85rem", letterSpacing: "0.06em",
          cursor: "pointer",
        }}>
          <Plus size={16} /> BUAT PROMO BARU
        </button>
      </div>

      {/* Promo Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filtered.map((promo) => (
          <div
            key={promo.id}
            style={{
              backgroundColor: promo.active ? promo.color : "#E8E8E8",
              border: "4px solid #000",
              boxShadow: "8px 8px 0px #000",
              overflow: "hidden",
              opacity: promo.active ? 1 : 0.75,
              transition: "opacity 0.2s",
            }}
          >
            {/* Card Top */}
            <div style={{
              padding: "14px 16px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Tag size={14} color="#000" />
                <span style={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: "0.1em", color: "#000" }}>
                  {TYPE_LABELS[promo.type]}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  backgroundColor: promo.active ? "#00C853" : "#999",
                  border: "1px solid rgba(0,0,0,0.3)",
                }} />
                <span style={{ fontWeight: 800, fontSize: "0.65rem", color: "#000" }}>
                  {promo.active ? "AKTIF" : "NONAKTIF"}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: "12px 16px 16px" }}>
              <p style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1rem", color: "#000",
                textTransform: "uppercase",
                lineHeight: 1.2,
                marginBottom: "8px",
              }}>
                {promo.title}
              </p>
              <p style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1.4rem", color: "#000",
                lineHeight: 1.1,
                marginBottom: "4px",
              }}>
                {promo.value}
              </p>
              <p style={{ fontWeight: 600, fontSize: "0.75rem", color: "rgba(0,0,0,0.65)", marginBottom: "12px" }}>
                {promo.description}
              </p>

              {/* Code Badge */}
              <div style={{
                display: "inline-block",
                backgroundColor: "#000",
                padding: "5px 12px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.8rem", letterSpacing: "0.06em",
                color: "#FFE000",
                marginBottom: "8px",
              }}>
                {promo.code}
              </div>

              <p style={{ fontWeight: 600, fontSize: "0.72rem", color: "rgba(0,0,0,0.6)", marginBottom: "14px" }}>
                Berlaku s/d {promo.validUntil}
              </p>

              {/* Action Row */}
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                borderTop: "2px solid rgba(0,0,0,0.2)",
                paddingTop: "12px",
              }}>
                {/* Toggle ON/OFF */}
                <button
                  onClick={() => toggleActive(promo.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    backgroundColor: promo.active ? "#fff" : "#E0E0E0",
                    border: "3px solid #000",
                    padding: "7px 12px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {/* Toggle switch visual */}
                  <div style={{
                    width: "28px", height: "16px",
                    backgroundColor: promo.active ? "#00E676" : "#bbb",
                    border: "2px solid #000",
                    borderRadius: "8px",
                    position: "relative",
                    transition: "background-color 0.2s",
                  }}>
                    <div style={{
                      position: "absolute",
                      width: "10px", height: "10px",
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      top: "1px",
                      left: promo.active ? "14px" : "2px",
                      transition: "left 0.2s",
                    }} />
                  </div>
                  <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.7rem" }}>
                    {promo.active ? "ON" : "OFF"}
                  </span>
                </button>

                {/* Edit */}
                <button
                  onClick={() => setEditingPromo({ ...promo })}
                  style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    backgroundColor: "#FFE000",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0px #000",
                    padding: "7px 12px",
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "0.7rem", cursor: "pointer",
                  }}
                >
                  <Pencil size={12} /> EDIT
                </button>

                {/* Delete */}
                <button
                  onClick={() => deletePromo(promo.id)}
                  style={{
                    backgroundColor: "#FFB3B3",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0px #000",
                    padding: "7px 10px",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: "center", padding: "60px 20px",
          border: "4px dashed #ccc", marginTop: "20px",
        }}>
          <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.2rem", color: "#999" }}>
            TIDAK ADA PROMO {filter.toUpperCase()}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {editingPromo && (
        <div style={{
          position: "fixed", inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100, padding: "20px",
        }}>
          <div style={{
            backgroundColor: "#FDFBF7",
            border: "4px solid #000",
            boxShadow: "12px 12px 0px #000",
            padding: "32px",
            width: "100%", maxWidth: "500px",
            maxHeight: "90vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.2rem", textTransform: "uppercase" }}>
                {isCreating ? "BUAT PROMO BARU" : "EDIT PROMO"}
              </p>
              <button onClick={() => { setEditingPromo(null); setIsCreating(false); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em", marginBottom: "6px" }}>
                TIPE PROMO
              </label>
              <select
                value={editingPromo.type}
                onChange={(e) => {
                  const type = e.target.value as Promo["type"];
                  const color = type === "diskon_nominal" ? "#00E676" : type === "gratis_ongkir" ? "#B3D9FF" : "#E0E0E0";
                  setEditingPromo({ ...editingPromo, type, color });
                }}
                style={{
                  width: "100%", border: "3px solid #000",
                  boxShadow: "4px 4px 0px #000",
                  padding: "10px 14px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800, fontSize: "0.95rem",
                  backgroundColor: "#fff", outline: "none",
                  boxSizing: "border-box", cursor: "pointer",
                }}
              >
                <option value="diskon_nominal">DISKON NOMINAL</option>
                <option value="gratis_ongkir">GRATIS ONGKIR</option>
                <option value="persentase">PERSENTASE</option>
              </select>
            </div>

            {[
              { label: "JUDUL PROMO (Wajib)", field: "title" as const },
              { label: "NILAI DISKON (Wajib)", field: "value" as const },
              { label: "KODE PROMO (Wajib)", field: "code" as const },
              { label: "DESKRIPSI", field: "description" as const },
              { label: "BERLAKU S/D", field: "validUntil" as const },
            ].map(({ label, field }) => (
              <div key={field} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em", marginBottom: "6px" }}>
                  {label}
                </label>
                <input
                  type="text"
                  value={editingPromo[field]}
                  onChange={(e) => setEditingPromo({ ...editingPromo, [field]: e.target.value })}
                  style={{
                    width: "100%", border: "3px solid #000",
                    boxShadow: "4px 4px 0px #000",
                    padding: "10px 14px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500, fontSize: "0.95rem",
                    backgroundColor: "#fff", outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}

            <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
              <button
                onClick={saveEdit}
                style={{
                  flex: 1, backgroundColor: "#FF8C00",
                  border: "3px solid #000", boxShadow: "5px 5px 0px #000",
                  padding: "14px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.9rem", letterSpacing: "0.06em",
                  cursor: "pointer", textTransform: "uppercase",
                }}
              >
                {isCreating ? "BUAT PROMO" : "SIMPAN PERUBAHAN"}
              </button>
              <button
                onClick={() => { setEditingPromo(null); setIsCreating(false); }}
                style={{
                  padding: "14px 20px",
                  border: "3px solid #000",
                  backgroundColor: "#fff",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.82rem", cursor: "pointer",
                }}
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
