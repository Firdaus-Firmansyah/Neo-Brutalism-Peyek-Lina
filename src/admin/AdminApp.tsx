import { useState } from "react";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminProduk } from "./components/AdminProduk";
import { AdminTambahProduk } from "./components/AdminTambahProduk";
import { AdminPesanan } from "./components/AdminPesanan";
import { AdminDetailPesanan } from "./components/AdminDetailPesanan";
import { AdminInventaris } from "./components/AdminInventaris";
import { AdminIntegrasi } from "./components/AdminIntegrasi";
import { AdminPlaceholderPage } from "./components/AdminPlaceholderPage";
import { AdminLaporan } from "./components/AdminLaporan";
import { AdminPromo } from "./components/AdminPromo";
import type { AdminPage } from "./types";

export function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const sharedProps = {
    currentPage,
    onNavigate: setCurrentPage,
    onLogout: handleLogout,
  };

  switch (currentPage) {
    case "dashboard":
      return <AdminDashboard {...sharedProps} />;
    case "produk":
      return <AdminProduk {...sharedProps} />;
    case "tambah-produk":
    case "edit-produk":
      return <AdminTambahProduk {...sharedProps} />;
    case "pesanan":
      return <AdminPesanan {...sharedProps} onSelectOrder={setSelectedOrder} />;
    case "detail-pesanan":
      return <AdminDetailPesanan {...sharedProps} invoice={selectedOrder || "INV/2026/PL/0000"} />;
    case "inventaris":
      return <AdminInventaris {...sharedProps} />;
    case "promo":
      return <AdminPromo {...sharedProps} />;
    case "laporan":
      return <AdminLaporan {...sharedProps} />;
    case "integrasi":
      return <AdminIntegrasi {...sharedProps} />;
    default:
      return <AdminDashboard {...sharedProps} />;
  }
}
