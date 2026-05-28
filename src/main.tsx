import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App";
import { AdminApp } from "./admin/AdminApp";
import { CartProvider } from "./app/contexts/CartContext";
import { ScrollToTop } from "./app/components/ScrollToTop";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<App />} />
      </Routes>
      <ScrollToTop />
    </CartProvider>
  </BrowserRouter>
);
