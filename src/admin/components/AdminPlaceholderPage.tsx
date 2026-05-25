import { Construction } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import type { AdminPage } from "../types";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
  color?: string;
}

export function AdminPlaceholderPage({
  title, subtitle, currentPage, onNavigate, onLogout, color = "#FFE000",
}: PlaceholderPageProps) {
  return (
    <AdminLayout
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      title={title}
      subtitle={subtitle}
    >
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
            SEGERA HADIR
          </p>
          <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#333" }}>
            Halaman ini sedang dalam pengembangan
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
