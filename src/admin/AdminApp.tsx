import { Routes, Route, Navigate } from "react-router";
import { AdminLayout } from "./components/AdminLayout";
import { AdminLogin } from "./components/AdminLogin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminProduk } from "./components/AdminProduk";
import { AdminTambahProduk } from "./components/AdminTambahProduk";
import { AdminPesanan } from "./components/AdminPesanan";
import { AdminDetailPesanan } from "./components/AdminDetailPesanan";
import { AdminInventaris } from "./components/AdminInventaris";
import { AdminIntegrasi } from "./components/AdminIntegrasi";
import { AdminLaporan } from "./components/AdminLaporan";
import { AdminPromo } from "./components/AdminPromo";

export function AdminApp() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="produk" element={<AdminProduk />} />
        <Route path="tambah-produk" element={<AdminTambahProduk />} />
        <Route path="edit-produk" element={<AdminTambahProduk />} />
        <Route path="pesanan" element={<AdminPesanan />} />
        <Route path="detail-pesanan" element={<AdminDetailPesanan invoice="INV/2026/PL/0000" />} />
        <Route path="inventaris" element={<AdminInventaris />} />
        <Route path="promo" element={<AdminPromo />} />
        <Route path="laporan" element={<AdminLaporan />} />
        <Route path="integrasi" element={<AdminIntegrasi />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
