import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { MenuPage } from "./components/MenuPage";
import { AboutPage } from "./components/AboutPage";
import { KeranjangPage } from "./components/KeranjangPage";
import { VerifikasiPage } from "./components/VerifikasiPage";
import { DetailPemesananPage } from "./components/DetailPemesananPage";
import { KonfirmasiPesananPage } from "./components/KonfirmasiPesananPage";
import { StatusPesananPage } from "./components/StatusPesananPage";

type Page = "home" | "menu" | "about" | "keranjang" | "verifikasi" | "detail" | "konfirmasi" | "status-pesanan";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: string) => {
    if ((page === "status-pesanan" || page === "konfirmasi") && localStorage.getItem("hasOrder") !== "true") {
      page = "home";
    }

    const validPages: Page[] = ["home", "menu", "about", "keranjang", "verifikasi", "detail", "konfirmasi", "status-pesanan"];
    if (validPages.includes(page as Page)) {
      setCurrentPage(page as Page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} />
      )}
      {currentPage === "menu" && (
        <MenuPage onNavigate={handleNavigate} />
      )}
      {currentPage === "about" && (
        <AboutPage onNavigate={handleNavigate} />
      )}
      {currentPage === "keranjang" && (
        <KeranjangPage onNavigate={handleNavigate} />
      )}
      {currentPage === "verifikasi" && (
        <VerifikasiPage onNavigate={handleNavigate} />
      )}
      {currentPage === "detail" && (
        <DetailPemesananPage onNavigate={handleNavigate} />
      )}
      {currentPage === "konfirmasi" && (
        <KonfirmasiPesananPage onNavigate={handleNavigate} />
      )}
      {currentPage === "status-pesanan" && (
        <StatusPesananPage onNavigate={handleNavigate} />
      )}
    </div>
  );
}
