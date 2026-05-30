import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app/App";
import { AdminApp } from "./admin/AdminApp";
import { CartProvider } from "./app/contexts/CartContext";
import { ScrollToTop } from "./app/components/ScrollToTop";
import "./styles/index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<App />} />
        </Routes>
        <ScrollToTop />
      </CartProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
