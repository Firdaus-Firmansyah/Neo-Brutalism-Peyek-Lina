# Neo-Brutalism Peyek Lina

![Project Status](https://img.shields.io/badge/status-active-success.svg)

## Deskripsi Proyek
**Neo-Brutalism Peyek Lina** adalah sebuah aplikasi web e-commerce dan sistem manajemen toko (admin dashboard) yang dirancang khusus untuk bisnis "Peyek Lina". Aplikasi ini mengadopsi gaya desain UI/UX **Neo-Brutalism** yang menonjolkan warna-warna berani, garis tepi yang tegas, dan elemen antarmuka yang sangat mencolok, memberikan pengalaman visual yang unik dan modern bagi pengguna.

Proyek ini awalnya didesain melalui Figma dan diimplementasikan ke dalam bentuk aplikasi web interaktif.

## Tujuan Proyek
Tujuan utama dari proyek ini adalah:
1. **Digitalisasi Penjualan:** Menyediakan platform online bagi pelanggan untuk melihat produk, menambahkan ke keranjang (cart), dan melakukan checkout atau pemesanan secara langsung.
2. **Manajemen Toko yang Efisien:** Memberikan antarmuka khusus (Admin Dashboard) bagi pemilik/pengelola toko untuk:
   - Mengelola katalog produk (menambah, mengedit, memperbarui stok).
   - Melacak dan mengelola pesanan masuk dari pelanggan.
   - Mengatur konten promosi toko.
   - Melihat laporan penjualan (sales reporting) dengan filter periode tertentu untuk analisis bisnis.
3. **Meningkatkan Pengalaman Pengguna (UX):** Menggunakan desain yang modern, interaktif, serta dioptimalkan untuk perangkat mobile maupun desktop, untuk mempermudah alur belanja pelanggan.

## Fitur Utama

### 🛒 Sisi Pelanggan (Customer-Facing Storefront)
- **Katalog Produk:** Menampilkan daftar produk Peyek Lina dengan antarmuka yang menarik.
- **Keranjang Belanja (Cart):** Menyimpan produk yang dipilih beserta jumlah (quantity) sebelum checkout.
- **Proses Checkout & Pemesanan:** Alur pemesanan yang jelas, integrasi detail pengiriman, dan estimasi biaya.
- **Verifikasi Pesanan:** Halaman khusus untuk konfirmasi pembayaran dan pesanan.

### ⚙️ Sisi Admin (Admin Dashboard)
- **Manajemen Produk:** Fitur CRUD (Create, Read, Update, Delete) untuk informasi produk dan harga.
- **Manajemen Pesanan:** Melacak status pemesanan pelanggan (menunggu konfirmasi, diproses, dikirim, dll).
- **Manajemen Promo:** Mengatur banner promosi atau diskon yang sedang berlangsung di halaman depan.
- **Laporan Penjualan:** Visualisasi data laporan penjualan yang disajikan dalam bentuk grafik dan tabel.

## Teknologi yang Digunakan (Tech Stack)

Aplikasi ini dibangun menggunakan *stack* teknologi web modern untuk menjamin performa tinggi, kemudahan pengembangan, dan *user experience* yang halus:

* **Framework & Build Tool:** 
  * [React 18/19](https://react.dev/) - Library utama untuk membangun antarmuka pengguna berbasis komponen.
  * [Vite](https://vitejs.dev/) - Build tool super cepat untuk pengembangan aplikasi web frontend modern.
* **Routing:** 
  * [React Router (v7)](https://reactrouter.com/) - Menangani navigasi antar halaman (*Single Page Application*).
* **Styling & UI Components:**
  * [Tailwind CSS (v4)](https://tailwindcss.com/) - Framework CSS *utility-first* untuk *styling* antarmuka.
  * [Radix UI](https://www.radix-ui.com/) - Kumpulan komponen UI primitif yang sangat mudah diakses (*accessible*) dan dikustomisasi (seperti Dialog, Select, Dropdown, dll).
  * [Lucide React](https://lucide.dev/) & [@mui/icons](https://mui.com/) - Kumpulan aset ikon vektor.
  * `class-variance-authority` (CVA) & `clsx` - Utilitas untuk manajemen *class* CSS yang kompleks pada komponen.
* **Animasi:**
  * [Motion](https://motion.dev/) (Framer Motion) - Library animasi untuk memberikan *micro-animations* dan transisi perpindahan halaman yang mulus.
* **Form & Manajemen State:**
  * [React Hook Form](https://react-hook-form.com/) - Digunakan untuk penanganan form (seperti form tambah produk atau checkout) dengan performa tinggi.
* **Visualisasi Data:**
  * [Recharts](https://recharts.org/) - Komponen diagram (*charts*) interaktif untuk memvisualisasikan laporan pendapatan di Dashboard Admin.
* **Lainnya:**
  * `sonner` - Komponen untuk menampilkan *toast notifications* (pesan notifikasi).
  * `date-fns` - Library utilitas untuk memanipulasi format tanggal dan waktu.

## Cara Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di komputer Anda:

### 1. Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di sistem Anda.

### 2. Instalasi Dependensi
Buka terminal di direktori root proyek (`Neo-Brutalism Peyek Lina`) dan jalankan perintah berikut:

```bash
npm install
```

Atau jika Anda menggunakan `npm i`, hasilnya akan sama.

### 3. Menjalankan Server Development
Setelah semua dependensi terinstal, jalankan perintah ini untuk memulai server Vite:

```bash
npm run dev
```

Server lokal akan berjalan dan aplikasi biasanya dapat diakses melalui browser di alamat `http://localhost:5173/`.

### 4. Build untuk Production (Opsional)
Jika Anda ingin me-render versi produksi yang dioptimalkan, jalankan:

```bash
npm run build
```
Hasil build akan berada di dalam direktori `dist/`.

---
*Referensi Desain UI Asli (Figma): [Neo-Brutalism Peyek Lina Figma Design](https://www.figma.com/design/swWRjOZKUkkHbSDE0ioLkS/Neo-Brutalism-Peyek-Lina)*