export type AdminPage =
  | "dashboard"
  | "produk"
  | "tambah-produk"
  | "edit-produk"
  | "pesanan"
  | "detail-pesanan"
  | "inventaris"
  | "promo"
  | "laporan"
  | "integrasi";

export interface Promo {
  id: string;
  type: "diskon_nominal" | "gratis_ongkir" | "persentase";
  title: string;
  description: string;
  value: string;
  code: string;
  validUntil: string;
  active: boolean;
  color: string;
}

export const MOCK_PROMOS: Promo[] = [
  { id: "1", type: "diskon_nominal", title: "PAKET KELUARGA BAHAGIA", description: "Min. beli 3 produk", value: "Diskon Rp 20.000", code: "KELUARGA20", validUntil: "30 Jun 2026", active: true, color: "#00E676" },
  { id: "2", type: "gratis_ongkir", title: "GRATIS ONGKIR SEJABODETABEK", description: "Area Jabodetabek", value: "Maks. Potongan Rp 15.000", code: "OYEK20", validUntil: "30 Jul 2026", active: true, color: "#B3D9FF" },
  { id: "3", type: "persentase", title: "DISKON PENGGUNA BARU", description: "First order only", value: "15% Off", code: "NEWUSER20", validUntil: "30 Mei 2026", active: false, color: "#E0E0E0" },
  { id: "4", type: "gratis_ongkir", title: "GRATIS ONGKIR SEJABODETABEK", description: "Area Jabodetabek", value: "Maks. Potongan Rp 15.000", code: "OYEK20", validUntil: "30 Jul 2026", active: true, color: "#B3D9FF" },
  { id: "5", type: "persentase", title: "DISKON PENGGUNA BARU", description: "First order only", value: "15% Off", code: "NEWUSER20", validUntil: "30 Mei 2026", active: true, color: "#E0E0E0" },
  { id: "6", type: "diskon_nominal", title: "PAKET KELUARGA BAHAGIA", description: "Min. beli 3 produk", value: "Diskon Rp 20.000", code: "KELUARGA20", validUntil: "30 Jun 2026", active: true, color: "#00E676" },
];

export interface Product {
  id: string;
  name: string;
  variant: string;
  sku: string;
  price: number;
  stock: number;
  status: "aktif" | "nonaktif";
  image: string;
}

export interface Order {
  invoice: string;
  customer: string;
  phone: string;
  total: number;
  items: number;
  status: "baru" | "diproses" | "dikirim" | "selesai" | "dibatalkan";
  date: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  variant: string;
  sku: string;
  stock: number;
  image: string;
}

export const PEYEK_IMAGE = "/product-1.png";

export const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "PEYEK KACANG ORIGINAL", variant: "Toples 500gr", sku: "SKU-001", price: 90000, stock: 24, status: "aktif", image: "/product-1.png" },
  { id: "2", name: "PEYEK TERI MEDAN", variant: "Toples 500gr", sku: "SKU-002", price: 100000, stock: 12, status: "aktif", image: "/product-2.png" },
  { id: "3", name: "PEYEK REBON", variant: "Bungkus 500gr", sku: "SKU-003", price: 95000, stock: 0, status: "nonaktif", image: "/product-3.png" },
  { id: "4", name: "PEYEK KACANG IJO", variant: "Toples 500gr", sku: "SKU-004", price: 95000, stock: 5, status: "aktif", image: "/product-4.png" },
  { id: "5", name: "PEYEK MIX PREMIUM", variant: "Toples 500gr", sku: "SKU-005", price: 120000, stock: 18, status: "aktif", image: "/product-5.png" },
];

export const MOCK_ORDERS: Order[] = [
  { invoice: "INV/2026/PL/0014", customer: "Budi Santoso", phone: "+62 812-3456-789", total: 190000, items: 2, status: "dikirim", date: "04 Mei 2026" },
  { invoice: "INV/2026/PL/0013", customer: "Siti Rahayu", phone: "+62 879-1234-5679", total: 135000, items: 1, status: "diproses", date: "04 Mei 2026" },
  { invoice: "INV/2026/PL/0012", customer: "Ahmad Fauzi", phone: "+62 857-9678-5432", total: 90000, items: 1, status: "baru", date: "03 Mei 2026" },
  { invoice: "INV/2026/PL/0011", customer: "Diana Putri", phone: "+62 821-5555-6666", total: 270000, items: 3, status: "selesai", date: "03 Mei 2026" },
  { invoice: "INV/2026/PL/0010", customer: "Rizki Pratama", phone: "+62 813-7777-8888", total: 180000, items: 2, status: "selesai", date: "02 Mei 2026" },
  { invoice: "INV/2026/PL/0009", customer: "Nuri Handayani", phone: "+62 896-4444-3333", total: 65000, items: 1, status: "baru", date: "02 Mei 2026" },
  { invoice: "INV/2026/PL/0008", customer: "Hendra Kusuma", phone: "+62 831-2222-1111", total: 340000, items: 4, status: "dikirim", date: "01 Mei 2026" },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: "1", name: "PEYEK KACANG ORIGINAL", variant: "Toples 500gr", sku: "SKU-001", stock: 12, image: "/product-1.png" },
  { id: "2", name: "PEYEK TERI MEDAN", variant: "Toples 500gr", sku: "SKU-002", stock: 3, image: "/product-2.png" },
  { id: "3", name: "PEYEK REBON", variant: "Bungkus 500gr", sku: "SKU-003", stock: 0, image: "/product-3.png" },
  { id: "4", name: "PEYEK KACANG IJO", variant: "Toples 500gr", sku: "SKU-004", stock: 28, image: "/product-4.png" },
  { id: "5", name: "PEYEK MIX PREMIUM", variant: "Toples 500gr", sku: "SKU-005", stock: 7, image: "/product-5.png" },
];

export function getStockStatus(stock: number): { label: string; color: string; bg: string } {
  if (stock === 0) return { label: "HABIS", color: "#fff", bg: "#e53935" };
  if (stock <= 5) return { label: "STOK MENIPIS", color: "#000", bg: "#FF8C00" };
  if (stock <= 10) return { label: "PERLU RESTOCK", color: "#000", bg: "#FFE000" };
  return { label: "AMAN", color: "#000", bg: "#00E676" };
}

export function getOrderStatusStyle(status: Order["status"]): { label: string; color: string; bg: string; border: string } {
  switch (status) {
    case "baru": return { label: "BARU", color: "#000", bg: "#FFE000", border: "#000" };
    case "diproses": return { label: "DIPROSES", color: "#000", bg: "transparent", border: "#000" };
    case "dikirim": return { label: "DIKIRIM", color: "#000", bg: "#FF8C00", border: "#000" };
    case "selesai": return { label: "SELESAI", color: "#000", bg: "#00E676", border: "#000" };
    case "dibatalkan": return { label: "BATAL", color: "#fff", bg: "#e53935", border: "#e53935" };
  }
}

export function formatRp(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}
