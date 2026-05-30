// Consolidated Types and Interfaces untuk seluruh aplikasi

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

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

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

export interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  qty: number;
  image: string;
}
