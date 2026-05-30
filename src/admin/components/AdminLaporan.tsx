import { useState } from "react";
import { Download, Calendar } from "lucide-react";


type Period = "mei" | "apr" | "q1" | "6bulan" | "1tahun";

const PERIOD_DATA: Record<Period, {
  label: string;
  revenue: string;
  orders: number;
  avgOrder: string;
  bars: { label: string; value: number; highlight?: boolean }[];
  topProducts: { rank: number; name: string; units: number; revenue: string; color: string }[];
}> = {
  mei: {
    label: "MEI 2026", revenue: "Rp 12.500.000", orders: 108, avgOrder: "Rp 115.000",
    bars: [
      { label: "DES '25", value: 62 }, { label: "JAN '26", value: 78 }, { label: "FEB '26", value: 76 },
      { label: "MAR '26", value: 91 }, { label: "APR '26", value: 84 }, { label: "MEI '26", value: 125, highlight: true },
    ],
    topProducts: [
      { rank: 1, name: "PEYEK KACANG ORIGINAL", units: 342, revenue: "Rp 3.078.000", color: "#FF8C00" },
      { rank: 2, name: "PEYEK UDANG RENYAH", units: 218, revenue: "Rp 1.417.000", color: "#FFE000" },
      { rank: 3, name: "PEYEK MIX REMPAH", units: 187, revenue: "Rp 1.589.500", color: "#00E676" },
      { rank: 4, name: "PEYEK BAYAM CRISPY", units: 144, revenue: "Rp 1.080.000", color: "#B3D9FF" },
      { rank: 5, name: "PEYEK WIJEN GURIH", units: 98, revenue: "Rp 343.000", color: "#FFB3B3" },
    ],
  },
  apr: {
    label: "APR 2026", revenue: "Rp 8.400.000", orders: 73, avgOrder: "Rp 115.000",
    bars: [
      { label: "NOV '25", value: 55 }, { label: "DES '25", value: 62 }, { label: "JAN '26", value: 78 },
      { label: "FEB '26", value: 76 }, { label: "MAR '26", value: 91 }, { label: "APR '26", value: 84, highlight: true },
    ],
    topProducts: [
      { rank: 1, name: "PEYEK KACANG ORIGINAL", units: 280, revenue: "Rp 2.520.000", color: "#FF8C00" },
      { rank: 2, name: "PEYEK MIX REMPAH", units: 154, revenue: "Rp 1.309.000", color: "#FFE000" },
      { rank: 3, name: "PEYEK UDANG RENYAH", units: 120, revenue: "Rp 780.000", color: "#00E676" },
      { rank: 4, name: "PEYEK WIJEN GURIH", units: 88, revenue: "Rp 308.000", color: "#B3D9FF" },
      { rank: 5, name: "PEYEK BAYAM CRISPY", units: 67, revenue: "Rp 502.500", color: "#FFB3B3" },
    ],
  },
  q1: {
    label: "Q1 2026 (JAN–MAR)", revenue: "Rp 24.500.000", orders: 213, avgOrder: "Rp 115.000",
    bars: [
      { label: "OKT '25", value: 48 }, { label: "NOV '25", value: 55 }, { label: "DES '25", value: 62 },
      { label: "JAN '26", value: 78, highlight: true }, { label: "FEB '26", value: 76, highlight: true }, { label: "MAR '26", value: 91, highlight: true },
    ],
    topProducts: [
      { rank: 1, name: "PEYEK KACANG ORIGINAL", units: 820, revenue: "Rp 7.380.000", color: "#FF8C00" },
      { rank: 2, name: "PEYEK UDANG RENYAH", units: 610, revenue: "Rp 3.965.000", color: "#FFE000" },
      { rank: 3, name: "PEYEK MIX REMPAH", units: 498, revenue: "Rp 4.233.000", color: "#00E676" },
      { rank: 4, name: "PEYEK BAYAM CRISPY", units: 375, revenue: "Rp 2.812.500", color: "#B3D9FF" },
      { rank: 5, name: "PEYEK WIJEN GURIH", units: 280, revenue: "Rp 980.000", color: "#FFB3B3" },
    ],
  },
  "6bulan": {
    label: "6 BULAN TERAKHIR", revenue: "Rp 54.200.000", orders: 471, avgOrder: "Rp 115.000",
    bars: [
      { label: "DES '25", value: 62 }, { label: "JAN '26", value: 78 }, { label: "FEB '26", value: 76 },
      { label: "MAR '26", value: 91 }, { label: "APR '26", value: 84 }, { label: "MEI '26", value: 125, highlight: true },
    ],
    topProducts: [
      { rank: 1, name: "PEYEK KACANG ORIGINAL", units: 1820, revenue: "Rp 16.380.000", color: "#FF8C00" },
      { rank: 2, name: "PEYEK UDANG RENYAH", units: 1240, revenue: "Rp 8.060.000", color: "#FFE000" },
      { rank: 3, name: "PEYEK MIX REMPAH", units: 980, revenue: "Rp 8.330.000", color: "#00E676" },
      { rank: 4, name: "PEYEK BAYAM CRISPY", units: 740, revenue: "Rp 5.550.000", color: "#B3D9FF" },
      { rank: 5, name: "PEYEK WIJEN GURIH", units: 580, revenue: "Rp 2.030.000", color: "#FFB3B3" },
    ],
  },
  "1tahun": {
    label: "1 TAHUN TERAKHIR", revenue: "Rp 98.700.000", orders: 857, avgOrder: "Rp 115.000",
    bars: [
      { label: "JUN '25", value: 44 }, { label: "AGS '25", value: 58 }, { label: "OKT '25", value: 65 },
      { label: "DES '25", value: 62 }, { label: "FEB '26", value: 76 }, { label: "MEI '26", value: 125, highlight: true },
    ],
    topProducts: [
      { rank: 1, name: "PEYEK KACANG ORIGINAL", units: 3420, revenue: "Rp 30.780.000", color: "#FF8C00" },
      { rank: 2, name: "PEYEK UDANG RENYAH", units: 2180, revenue: "Rp 14.170.000", color: "#FFE000" },
      { rank: 3, name: "PEYEK MIX REMPAH", units: 1870, revenue: "Rp 15.895.000", color: "#00E676" },
      { rank: 4, name: "PEYEK BAYAM CRISPY", units: 1440, revenue: "Rp 10.800.000", color: "#B3D9FF" },
      { rank: 5, name: "PEYEK WIJEN GURIH", units: 980, revenue: "Rp 3.430.000", color: "#FFB3B3" },
    ],
  },
};

const PERIOD_BUTTONS: { key: Period; label: string }[] = [
  { key: "mei", label: "MEI 2026" },
  { key: "apr", label: "APR 2026" },
  { key: "q1", label: "Q1 2026" },
  { key: "6bulan", label: "6 BULAN" },
  { key: "1tahun", label: "1 TAHUN" },
];

export function AdminLaporan() {
  const [period, setPeriod] = useState<Period>("mei");
  const data = PERIOD_DATA[period];
  const maxBar = Math.max(...data.bars.map((b) => b.value));
  const CHART_HEIGHT = 180;

  const STATS = [
    { label: "TOTAL REVENUE", value: data.revenue, sub: `${data.label} · semua produk`, bg: "#FFE000", growth: "+12.3%" },
    { label: "AVERAGE ORDER", value: data.avgOrder, sub: `per transaksi · ${data.label}`, bg: "#FF8C00", growth: "+5.7%" },
    { label: "COMPLETED ORDERS", value: String(data.orders), sub: `transaksi selesai · ${data.label}`, bg: "#00E676", growth: "+19.8%" },
  ];

  return (
    <>
      {/* Period Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
        <Calendar size={18} color="#888" />
        {PERIOD_BUTTONS.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setPeriod(btn.key)}
            style={{
              padding: "10px 18px",
              border: "3px solid #000",
              backgroundColor: period === btn.key ? "#FFE000" : "#fff",
              boxShadow: period === btn.key ? "4px 4px 0px #000" : "2px 2px 0px #000",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "0.8rem", letterSpacing: "0.06em",
              cursor: "pointer",
              transition: "all 0.1s",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "28px" }}>
        {STATS.map((stat) => (
          <div key={stat.label} style={{
            backgroundColor: stat.bg,
            border: "4px solid #000",
            boxShadow: "8px 8px 0px #000",
            padding: "24px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{
                backgroundColor: "rgba(0,0,0,0.15)",
                padding: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: "1.2rem" }}>
                  {stat.label === "TOTAL REVENUE" ? "📈" : stat.label === "AVERAGE ORDER" ? "🛒" : "✅"}
                </span>
              </div>
              <span style={{
                backgroundColor: "rgba(0,0,0,0.15)",
                padding: "3px 8px",
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "0.68rem", letterSpacing: "0.06em", color: "#000",
              }}>
                ↗ {stat.growth}
              </span>
            </div>
            <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", color: "rgba(0,0,0,0.6)", marginBottom: "6px", textTransform: "uppercase" }}>
              {stat.label}
            </p>
            <p style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "1.8rem",
              letterSpacing: "-0.02em",
              color: "#000",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}>
              {stat.value}
            </p>
            <p style={{ fontWeight: 600, fontSize: "0.75rem", color: "rgba(0,0,0,0.55)" }}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Bottom Grid: Chart + Top Products */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Bar Chart */}
        <div style={{ border: "4px solid #000", boxShadow: "8px 8px 0px #000", backgroundColor: "#fff", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#000" }}>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", letterSpacing: "0.06em", color: "#FFE000" }}>
              GRAFIK PENJUALAN BULAN INI
            </p>
            <p style={{ fontWeight: 700, fontSize: "0.72rem", color: "#888", letterSpacing: "0.08em" }}>REVENUE (Rp)</p>
          </div>

          <div style={{ padding: "24px 24px 16px", position: "relative", flex: 1, display: "flex", alignItems: "flex-end" }}>
            {/* Background Grid */}
            <div style={{ position: "absolute", top: "40px", left: "24px", right: "24px", bottom: "36px", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 0 }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ borderTop: "2px dashed #eee", width: "100%" }} />
              ))}
            </div>

            {/* Y axis label */}
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", height: `${CHART_HEIGHT + 40}px`, width: "100%", zIndex: 1 }}>
              {data.bars.map((bar, i) => {
                const barH = (bar.value / maxBar) * CHART_HEIGHT;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%", justifyContent: "flex-end" }}>
                    <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.68rem", color: bar.highlight ? "#FF8C00" : "#000", whiteSpace: "nowrap" }}>
                      Rp {(bar.value / 10).toLocaleString('id-ID')}jt
                    </p>
                    <div style={{
                      width: "100%",
                      height: `${barH}px`,
                      backgroundColor: bar.highlight ? "#FF8C00" : "#000",
                      border: "2px solid #000",
                      transition: "height 0.4s ease",
                    }} />
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, color: bar.highlight ? "#FF8C00" : "#888", whiteSpace: "nowrap" }}>
                      {bar.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div style={{ border: "4px solid #000", boxShadow: "8px 8px 0px #000", backgroundColor: "#fff", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 24px", backgroundColor: "#000" }}>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.9rem", letterSpacing: "0.06em", color: "#FFE000" }}>
              TOP PRODUK TERLARIS
            </p>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "18px", flex: 1 }}>
            {data.topProducts.map((prod) => {
              const maxUnits = data.topProducts[0].units;
              const pct = (prod.units / maxUnits) * 100;
              return (
                <div key={prod.rank}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <span style={{
                      backgroundColor: prod.color, color: "#000",
                      width: "24px", height: "24px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Archivo Black', sans-serif", fontSize: "0.75rem",
                      flexShrink: 0, border: "2px solid #000",
                    }}>
                      {prod.rank}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.8rem", color: "#000", lineHeight: 1.2, marginBottom: "2px" }}>
                        {prod.name}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontSize: "0.65rem", fontWeight: 600, color: "#888" }}>{prod.units} unit terjual</p>
                        <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.75rem", color: "#FF8C00" }}>{prod.revenue}</p>
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: "8px", backgroundColor: "#fff", border: "2px solid #000" }}>
                    <div style={{
                      width: `${pct}%`, height: "100%",
                      backgroundColor: prod.color,
                      borderRight: pct < 100 ? "2px solid #000" : "none",
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Download CSV */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{
          display: "flex", alignItems: "center", gap: "10px",
          backgroundColor: "#000",
          color: "#FF8C00",
          border: "4px solid #000",
          boxShadow: "6px 6px 0px #FF8C00",
          padding: "16px 28px",
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "1rem", letterSpacing: "0.06em",
          cursor: "pointer", textTransform: "uppercase",
        }}>
          <Download size={18} /> DOWNLOAD CSV
        </button>
      </div>
    </>
  );
}
