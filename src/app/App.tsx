import { Routes, Route, Navigate } from "react-router";
import { HomePage } from "./components/HomePage";
import { MenuPage } from "./components/MenuPage";
import { AboutPage } from "./components/AboutPage";
import { KeranjangPage } from "./components/KeranjangPage";
import { VerifikasiPage } from "./components/VerifikasiPage";
import { DetailPemesananPage } from "./components/DetailPemesananPage";
import { KonfirmasiPesananPage } from "./components/KonfirmasiPesananPage";
import { StatusPesananPage } from "./components/StatusPesananPage";
import { SmoothScroll } from "./components/SmoothScroll";

export default function App() {
  return (
    <SmoothScroll>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/keranjang" element={<KeranjangPage />} />
          <Route path="/verifikasi" element={<VerifikasiPage />} />
          <Route path="/detail" element={<DetailPemesananPage />} />
          <Route path="/konfirmasi" element={<KonfirmasiPesananPage />} />
          <Route path="/status-pesanan" element={<StatusPesananPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </SmoothScroll>
  );
}
