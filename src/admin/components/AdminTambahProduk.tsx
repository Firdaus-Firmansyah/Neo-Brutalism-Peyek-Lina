import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import type { AdminPage } from "../types";

interface AdminTambahProdukProps {
  currentPage?: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

interface Varian {
  id: string;
  nama: string;
  sku: string;
  harga: string;
  stok: string;
  berat: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "3px solid #000",
  boxShadow: "4px 4px 0px #000",
  padding: "12px 14px",
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 500,
  fontSize: "0.95rem",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 800,
  fontSize: "0.72rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#000",
  marginBottom: "7px",
};

export function AdminTambahProduk({ currentPage = "tambah-produk", onNavigate, onLogout }: AdminTambahProdukProps) {
  const [nama, setNama] = useState("");
  const [slug, setSlug] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [unggulan, setUnggulan] = useState(false);
  const [aktif, setAktif] = useState(false);
  const [variants, setVariants] = useState<Varian[]>([
    { id: "1", nama: "", sku: "", harga: "90000", stok: "0", berat: "500" },
  ]);
  const [saved, setSaved] = useState(false);

  const toSlug = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleNamaChange = (val: string) => {
    setNama(val);
    setSlug(toSlug(val));
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: String(Date.now()), nama: "", sku: "", harga: "90000", stok: "0", berat: "500" },
    ]);
  };

  const removeVariant = (id: string) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVariant = (id: string, field: keyof Varian, value: string) => {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  };

  const handleSave = () => {
    if (!nama) return;
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onNavigate("produk");
    }, 1200);
  };

  return (
    <AdminLayout
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      title={currentPage === "edit-produk" ? "EDIT PRODUK" : "TAMBAH PRODUK"}
      subtitle={currentPage === "edit-produk" ? "Ubah detail produk dan varian yang sudah ada." : "Isi detail produk dan varian untuk ditambahkan ke katalog."}
    >
      {/* Back button in header */}
      <div style={{ marginBottom: "28px" }}>
        <button
          onClick={() => onNavigate("produk")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            border: "3px solid #000", boxShadow: "4px 4px 0px #000",
            backgroundColor: "#fff", padding: "9px 16px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "0.78rem", letterSpacing: "0.06em",
            cursor: "pointer", textTransform: "uppercase",
          }}
        >
          <ArrowLeft size={14} /> KEMBALI
        </button>
      </div>

      {/* SECTION 1: Informasi Produk */}
      <div style={{
        border: "4px solid #000",
        boxShadow: "8px 8px 0px #000",
        backgroundColor: "#fff",
        overflow: "hidden",
        marginBottom: "28px",
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: "#000",
          padding: "14px 24px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{ color: "#FF8C00", fontSize: "1rem" }}>+</span>
          <span style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "0.9rem", letterSpacing: "0.1em",
            color: "#FDFBF7", textTransform: "uppercase",
          }}>INFORMASI PRODUK</span>
        </div>

        <div style={{ padding: "28px 28px 24px" }}>
          {/* Nama + Slug row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>NAMA PRODUK *</label>
              <input
                type="text"
                placeholder="Contoh: Peyek Kacang Original"
                value={nama}
                onChange={(e) => handleNamaChange(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>SLUG (URL)</label>
              <input
                type="text"
                placeholder="peyek-kacang-original"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                style={{ ...inputStyle, backgroundColor: "#f8f6f1", color: "#666" }}
              />
              <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#999", marginTop: "5px" }}>
                Auto-generate dari nama produk
              </p>
            </div>
          </div>

          {/* Deskripsi */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>DESKRIPSI PRODUK</label>
            <textarea
              placeholder="Tulis deskripsi produk yang menarik dan informatif..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            />
          </div>

          {/* URL Gambar */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>URL GAMBAR PRODUK</label>
            <div style={{ display: "flex", gap: "0" }}>
              <input
                type="text"
                placeholder="https://example.com/gambar-produk.jpg"
                value={imageUrl}
                onChange={(e) => { setImageUrl(e.target.value); setShowPreview(false); }}
                style={{ ...inputStyle, borderRight: "none", flex: 1 }}
              />
              <button
                onClick={() => setShowPreview(true)}
                style={{
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0px #000",
                  backgroundColor: "#FFE000",
                  padding: "12px 18px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.78rem", letterSpacing: "0.08em",
                  cursor: "pointer", flexShrink: 0,
                }}
              >
                PREVIEW
              </button>
            </div>
            {showPreview && imageUrl && (
              <div style={{ marginTop: "10px", border: "3px solid #000", display: "inline-block" }}>
                <img src={imageUrl} alt="preview" style={{ width: "120px", height: "120px", objectFit: "cover", display: "block" }} />
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {[
              { label: "JADIKAN PRODUK UNGGULAN", val: unggulan, set: setUnggulan },
              { label: "PRODUK AKTIF", val: aktif, set: setAktif },
            ].map(({ label, val, set }) => (
              <button
                key={label}
                onClick={() => set(!val)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  border: "3px solid #000",
                  boxShadow: val ? "4px 4px 0px #000" : "3px 3px 0px #000",
                  backgroundColor: val ? "#FFE000" : "#fff",
                  padding: "10px 18px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.78rem", letterSpacing: "0.06em",
                  cursor: "pointer", textTransform: "uppercase",
                }}
              >
                <div style={{
                  width: "18px", height: "18px",
                  border: "2px solid #000",
                  backgroundColor: val ? "#000" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {val && <span style={{ color: "#FFE000", fontSize: "0.7rem", fontWeight: 800 }}>✓</span>}
                </div>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Varian Produk */}
      <div style={{
        border: "4px solid #000",
        boxShadow: "8px 8px 0px #000",
        backgroundColor: "#fff",
        overflow: "hidden",
        marginBottom: "28px",
      }}>
        <div style={{ padding: "20px 28px 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
            <div>
              <p style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1rem", letterSpacing: "0.06em", color: "#000",
                textTransform: "uppercase",
              }}>VARIAN PRODUK</p>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#888", marginTop: "3px" }}>
                Isi minimal satu varian produk (nama, SKU, harga, stok, dan berat).
              </p>
            </div>
            <button
              onClick={addVariant}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                backgroundColor: "#B3D9FF",
                border: "3px solid #000",
                boxShadow: "4px 4px 0px #000",
                padding: "10px 16px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.78rem", letterSpacing: "0.06em",
                cursor: "pointer",
              }}
            >
              <Plus size={14} /> TAMBAH VARIAN
            </button>
          </div>
        </div>

        <div style={{ padding: "0 28px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {variants.map((v, i) => (
            <div key={v.id} style={{
              border: "3px solid #000",
              boxShadow: "5px 5px 0px #000",
              padding: "18px",
              backgroundColor: "#FDFBF7",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{
                  backgroundColor: "#000",
                  color: "#FFE000",
                  padding: "3px 10px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "0.08em",
                }}>VARIAN {i + 1}</span>
                {variants.length > 1 && (
                  <button
                    onClick={() => removeVariant(v.id)}
                    style={{
                      marginLeft: "auto",
                      background: "none", border: "2px solid #e53935",
                      padding: "4px 8px", cursor: "pointer", color: "#e53935",
                      display: "flex", alignItems: "center",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 1fr 1fr", gap: "12px" }}>
                {[
                  { label: "NAMA VARIAN", field: "nama" as const, placeholder: "Contoh: Toples 500gr" },
                  { label: "SKU", field: "sku" as const, placeholder: "SKU-001" },
                  { label: "HARGA (RP)", field: "harga" as const, placeholder: "90000" },
                  { label: "STOK", field: "stok" as const, placeholder: "0" },
                  { label: "BERAT (GR)", field: "berat" as const, placeholder: "500" },
                ].map(({ label, field, placeholder }) => (
                  <div key={field}>
                    <label style={{ ...labelStyle, fontSize: "0.65rem" }}>{label}</label>
                    <input
                      type={["harga", "stok", "berat"].includes(field) ? "number" : "text"}
                      placeholder={placeholder}
                      value={v[field]}
                      onChange={(e) => updateVariant(v.id, field, e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "14px" }}>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: saved ? "#00E676" : "#FF8C00",
            border: "4px solid #000",
            boxShadow: "6px 6px 0px #000",
            padding: "20px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "1.1rem",
            letterSpacing: "0.08em",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "#000",
            transition: "background-color 0.2s",
          }}
        >
          {saved ? "✓ TERSIMPAN!" : currentPage === "edit-produk" ? "SIMPAN PERUBAHAN" : "SIMPAN PRODUK"}
        </button>
        <button
          onClick={() => onNavigate("produk")}
          style={{
            backgroundColor: "#fff",
            border: "4px solid #000",
            boxShadow: "6px 6px 0px #000",
            padding: "20px",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.06em",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          BATAL
        </button>
      </div>
    </AdminLayout>
  );
}
