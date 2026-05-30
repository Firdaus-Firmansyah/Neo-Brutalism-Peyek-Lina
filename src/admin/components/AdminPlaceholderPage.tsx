import { Construction } from "lucide-react";
interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  color?: string;
}

export function AdminPlaceholderPage({
  title, subtitle, color = "#FFE000",
}: PlaceholderPageProps) {
  return (
    <>
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: "400px", gap: "20px",
      }}>
        <div style={{
          backgroundColor: color,
          border: "4px solid #000",
          boxShadow: "8px 8px 0px #000",
          padding: "40px 60px",
          textAlign: "center",
        }}>
          <Construction size={48} color="#000" style={{ marginBottom: "16px" }} />
          <p style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "1.8rem",
            letterSpacing: "-0.02em",
            color: "#000",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}>
            {title}
          </p>
          <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#333" }}>
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
