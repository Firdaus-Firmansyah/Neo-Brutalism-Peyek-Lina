import { useState } from "react";
import { Phone, Zap, Truck, Copy, Eye, EyeOff, Save } from "lucide-react";


type StatusBadge = "terhubung" | "belum_diset" | "aktif" | "nonaktif";

function StatusPill({ status }: { status: StatusBadge }) {
  const cfg: Record<StatusBadge, { label: string; bg: string; color: string }> = {
    terhubung: { label: "TERHUBUNG", bg: "#00E676", color: "#000" },
    belum_diset: { label: "BELUM DISET", bg: "#FFE000", color: "#000" },
    aktif: { label: "AKTIF", bg: "#00E676", color: "#000" },
    nonaktif: { label: "NONAKTIF", bg: "#e53935", color: "#fff" },
  };
  const c = cfg[status];
  return (
    <span style={{
      backgroundColor: c.bg, color: c.color,
      padding: "3px 10px",
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: "0.68rem", letterSpacing: "0.08em",
      border: "2px solid #000",
    }}>
      {c.label}
    </span>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "3px solid #000",
  boxShadow: "4px 4px 0px #000",
  padding: "13px 14px",
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 500,
  fontSize: "0.9rem",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const PROVIDERS = ["RajaOngkir Pro", "RajaOngkir Starter", "JNE Direct", "JT Express"];

export function AdminIntegrasi() {
  const [waNumber, setWaNumber] = useState("");
  const [midtransKey, setMidtransKey] = useState("SB-Mid-server-xxxxxxxxxxxxxxxxxxxxxx");
  const [showKey, setShowKey] = useState(false);
  const [kotaAsal, setKotaAsal] = useState("Jakarta Selatan");
  const [provider, setProvider] = useState("RajaOngkir Pro");
  const [rajaKey, setRajaKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const webhookUrl = "https://toko.peyek-busri.id/api/webhook";

  const waStatus: StatusBadge = waNumber.length > 6 ? "terhubung" : "belum_diset";
  const midtransStatus: StatusBadge = "terhubung";
  const ongkirStatus: StatusBadge = rajaKey.length > 4 ? "aktif" : "aktif";

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const SECTION_HEADER = (icon: React.ReactNode, title: string, status: StatusBadge) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
      <div style={{
        backgroundColor: "#FFE000",
        border: "3px solid #000",
        padding: "8px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.05rem", letterSpacing: "0.06em", color: "#000", textTransform: "uppercase" }}>
        {title}
      </p>
      <StatusPill status={status} />
    </div>
  );

  return (
    <>
      {/* Status Overview Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
        {[
          { label: "MIDTRANS", status: midtransStatus as StatusBadge },
          { label: "WHATSAPP", status: waStatus },
          { label: "RAJAONGKIR", status: ongkirStatus },
        ].map(({ label, status }) => {
          const colors: Record<StatusBadge, string> = {
            terhubung: "#00E676", belum_diset: "#FFE000", aktif: "#00E676", nonaktif: "#e53935"
          };
          return (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "8px",
              border: "3px solid #000", boxShadow: "4px 4px 0px #000",
              backgroundColor: colors[status],
              padding: "10px 18px",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#000" }} />
              <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.82rem", letterSpacing: "0.06em" }}>
                {label}
              </span>
              <span style={{
                backgroundColor: "#000", color: "#FDFBF7",
                padding: "2px 8px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.65rem", letterSpacing: "0.08em",
              }}>
                {status === "belum_diset" ? "BELUM DISET" : "TERHUBUNG"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Config Card */}
      <div style={{
        border: "4px solid #000",
        boxShadow: "8px 8px 0px #000",
        backgroundColor: "#fff",
        overflow: "hidden",
        marginBottom: "24px",
      }}>
        {/* Card Header */}
        <div style={{
          backgroundColor: "#000",
          padding: "14px 24px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <Zap size={18} color="#FFE000" />
          <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", letterSpacing: "0.1em", color: "#FDFBF7" }}>
            KONFIGURASI API & INTEGRASI
          </span>
        </div>

        <div style={{ padding: "28px" }}>
          {/* === WHATSAPP GATEWAY === */}
          {SECTION_HEADER(<Phone size={18} />, "WHATSAPP GATEWAY", waStatus)}
          <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#666", marginBottom: "16px" }}>
            Sambungkan nomor WhatsApp bisnis untuk notifikasi pesanan otomatis ke pelanggan.
          </p>
          <div style={{ marginBottom: "6px" }}>
            <label style={{ display: "block", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "7px", textTransform: "uppercase" }}>
              NOMOR WHATSAPP BISNIS
            </label>
            <input
              type="tel"
              placeholder="+62 812-XXXX-XXXX"
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              style={inputStyle}
            />
            <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#999", marginTop: "5px" }}>
              Gunakan format internasional: +628xxxxxxxxx (tanpa spasi atau tanda hubung)
            </p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "2px dashed #ccc", margin: "24px 0" }} />

          {/* === MIDTRANS === */}
          {SECTION_HEADER(<Zap size={18} />, "PAYMENT GATEWAY — MIDTRANS", midtransStatus)}
          <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#666", marginBottom: "16px" }}>
            Server Key digunakan untuk autentikasi transaksi pembayaran dari backend toko.
          </p>

          {/* Server Key */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "7px", textTransform: "uppercase" }}>
              MIDTRANS SERVER KEY
            </label>
            <div style={{ display: "flex", gap: "0" }}>
              <input
                type={showKey ? "text" : "password"}
                value={midtransKey}
                onChange={(e) => setMidtransKey(e.target.value)}
                style={{ ...inputStyle, borderRight: "none", flex: 1 }}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                style={{
                  border: "3px solid #000", borderRight: "none",
                  backgroundColor: "#f8f6f1",
                  padding: "0 14px", cursor: "pointer",
                  display: "flex", alignItems: "center",
                }}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                onClick={() => handleCopy(midtransKey, "midtrans")}
                style={{
                  border: "3px solid #000",
                  boxShadow: "3px 3px 0px #000",
                  backgroundColor: "#FFE000",
                  padding: "0 16px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.75rem", letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                <Copy size={14} />
                {copied === "midtrans" ? "COPIED!" : "COPY"}
              </button>
            </div>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#999", marginTop: "5px" }}>
              Tersedia di Dashboard Midtrans → Settings → Access Keys → Server Key
            </p>
          </div>

          {/* Webhook URL */}
          <div style={{ marginBottom: "6px" }}>
            <label style={{ display: "block", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "7px", textTransform: "uppercase" }}>
              WEBHOOK URL (MIDTRANS NOTIFICATION)
            </label>
            <div style={{ display: "flex", gap: "0" }}>
              <input
                type="text"
                value={webhookUrl}
                readOnly
                style={{ ...inputStyle, borderRight: "none", flex: 1, backgroundColor: "#f8f6f1", color: "#555" }}
              />
              <button
                onClick={() => handleCopy(webhookUrl, "webhook")}
                style={{
                  border: "3px solid #000",
                  boxShadow: "3px 3px 0px #000",
                  backgroundColor: "#000",
                  padding: "0 16px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "0.75rem", letterSpacing: "0.06em",
                  color: "#FDFBF7", whiteSpace: "nowrap",
                }}
              >
                <Copy size={14} />
                {copied === "webhook" ? "COPIED!" : "COPY URL"}
              </button>
            </div>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#999", marginTop: "5px" }}>
              Tempel URL ini di kolom Notification URL pada dashboard Midtrans.
            </p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "2px dashed #ccc", margin: "24px 0" }} />

          {/* === PENGIRIMAN & TRACKING === */}
          {SECTION_HEADER(<Truck size={18} />, "PENGIRIMAN & TRACKING", ongkirStatus)}
          <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#666", marginBottom: "16px" }}>
            Konfigurasi lokasi asal dan penyedia layanan tracking pengiriman.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "16px" }}>
            {/* Kota Asal */}
            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "7px", textTransform: "uppercase" }}>
                📍 KOTA ASAL PENGIRIMAN
              </label>
              <input
                type="text"
                placeholder="Contoh: Yogyakarta"
                value={kotaAsal}
                onChange={(e) => setKotaAsal(e.target.value)}
                style={inputStyle}
              />
              <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#999", marginTop: "5px" }}>
                Nama kota sesuai database RajaOngkir
              </p>
            </div>

            {/* Provider */}
            <div>
              <label style={{ display: "block", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "7px", textTransform: "uppercase" }}>
                🚚 PROVIDER TRACKING
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                style={{
                  ...inputStyle,
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight: "36px",
                  cursor: "pointer",
                }}
              >
                {PROVIDERS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* RajaOngkir API Key */}
          <div>
            <label style={{ display: "block", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.1em", marginBottom: "7px", textTransform: "uppercase" }}>
              RAJAONGKIR API KEY
            </label>
            <input
              type="text"
              placeholder="Masukkan API Key Ongkir"
              value={rajaKey}
              onChange={(e) => setRajaKey(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          backgroundColor: saved ? "#00E676" : "#FF8C00",
          border: "4px solid #000",
          boxShadow: "8px 8px 0px #000",
          padding: "20px",
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "1.1rem", letterSpacing: "0.08em",
          cursor: "pointer", textTransform: "uppercase",
          transition: "background-color 0.2s",
        }}
      >
        <Save size={20} />
        {saved ? "✓ TERSIMPAN!" : "SIMPAN INTEGRASI"}
      </button>
    </>
  );
}
