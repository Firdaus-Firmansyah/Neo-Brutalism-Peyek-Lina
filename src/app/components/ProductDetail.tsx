import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Star, CheckCircle, ShoppingCart, Heart, Shield, Flame, Minus, Plus, ChevronRight } from "lucide-react";
import { products } from "../../data/products";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";

export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] font-['Space_Grotesk'] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-12 text-center max-w-lg">
            <h1 className="text-4xl font-black uppercase mb-4 text-[#FF8C00]">404</h1>
            <h2 className="text-2xl font-black uppercase mb-8">PRODUK TIDAK DITEMUKAN</h2>
            <Link 
              to="/menu"
              className="inline-block bg-[#FF8C00] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-8 py-4 font-['Archivo_Black'] text-lg uppercase transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              KEMBALI KE MENU
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Formatting price to Rp
  const formatRp = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleAddToCart = () => {
    addToCart({
      id: parseInt(product.id.replace("p", "")),
      name: `${product.namePart1} ${product.namePart2}`,
      variant: product.weight,
      price: product.price,
      image: product.mainImage,
      qty: qty
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const images = [product.mainImage, ...product.thumbnails];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Space_Grotesk'] flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 py-12 md:py-16">
        {/* Breadcrumbs */}
        <div className="mb-8 font-bold text-sm tracking-widest uppercase">
          <Link to="/" className="hover:underline">BERANDA</Link>
          <span className="mx-2">{'>'}</span>
          <Link to="/menu" className="hover:underline">MENU</Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-[#FF8C00]">{product.namePart1} {product.namePart2}</span>
        </div>

        {/* Layout Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Bagian Kiri (Galeri) */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible order-2 md:order-1">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 flex-shrink-0 cursor-pointer overflow-hidden transition-all ${activeImage === idx ? 'border-4 border-[#FF8C00] shadow-[4px_4px_0px_0px_rgba(255,140,0,1)]' : 'border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  <ImageWithFallback src={img} alt={`${product.namePart1} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Gambar Utama */}
            <div className="flex-1 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white h-[300px] md:h-[500px] overflow-hidden order-1 md:order-2">
              <ImageWithFallback src={images[activeImage]} alt={`${product.namePart1} main`} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bagian Kanan (Info Produk) */}
          <div>
            {/* Badge Atas */}
            <div className="bg-[#FF8C00] border-2 border-black inline-block px-3 py-1 font-bold mb-4 uppercase text-sm tracking-wide">
              {product.badgeText}
            </div>

            {/* Judul Produk */}
            <h1 className="text-5xl font-black uppercase font-['Archivo_Black'] leading-tight mb-4">
              <span className="text-black">{product.namePart1}</span> <br/> 
              <span className="text-[#FF8C00]">{product.namePart2}</span>
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-[#FF8C00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 2} color={i < Math.floor(product.rating) ? undefined : "#000"} />
                ))}
              </div>
              <div className="border-2 border-black px-2 py-1 text-sm font-bold bg-white inline-block">
                {product.rating} / 5.0 - {product.reviews} REVIEWS
              </div>
            </div>

            {/* Harga & Berat */}
            <div className="mb-6 flex items-baseline flex-wrap">
              <span className="text-6xl font-black text-black font-['Archivo_Black']">
                {formatRp(product.price)}
              </span>
              <div className="bg-[#2E8B57] text-white border-2 border-black px-2 py-1 font-bold text-lg inline-block align-middle ml-2 mt-2 md:mt-0">
                {product.weight}
              </div>
            </div>

            {/* Kotak Keunggulan (Feature Box) */}
            <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white mb-8 p-6">
              <h3 className="font-['Archivo_Black'] text-xl uppercase border-b-4 border-black pb-2 mb-4">
                KEUNGGULAN:
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#FF8C00] border-2 border-black flex-shrink-0 mt-0.5 flex justify-center items-center">
                      <CheckCircle size={12} strokeWidth={3} />
                    </div>
                    <span className="font-bold text-[0.95rem]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Action Area */}
            <div className="flex flex-col gap-4 mb-8">
              {/* Selector Jumlah */}
              <div className="flex items-center gap-4">
                <p className="font-extrabold text-xs tracking-widest text-gray-600">JUMLAH:</p>
                <div className="inline-flex border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className={`w-12 h-12 flex items-center justify-center border-r-3 border-black ${qty <= 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#FF8C00] cursor-pointer'}`}
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center font-['Archivo_Black'] text-xl bg-[#FDFBF7] border-r-3 border-black">
                    {qty}
                  </div>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-[#2E8B57] text-white cursor-pointer"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
                <p className="font-['Archivo_Black'] text-xl text-[#FF8C00]">
                  = {formatRp(product.price * qty)}
                </p>
              </div>

              {/* Cart & Wishlist Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-[#FF8C00] border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,140,0,1)] p-5 font-['Archivo_Black'] text-lg uppercase flex items-center justify-center gap-2 transition-transform hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_rgba(255,140,0,1)]"
                >
                  <ShoppingCart size={22} />
                  KERANJANG
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-16 h-16 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0 transition-colors ${isWishlisted ? 'bg-red-500' : 'bg-[#FDFBF7]'}`}
                >
                  <Heart size={24} fill={isWishlisted ? "#fff" : "none"} color={isWishlisted ? "#fff" : "#000"} strokeWidth={2.5} />
                </button>
              </div>

              {/* Beli Sekarang WhatsApp */}
              <button
                onClick={() => {
                  addToCart({
                    id: parseInt(product.id.replace("p", "")),
                    name: `${product.namePart1} ${product.namePart2}`,
                    variant: product.weight,
                    price: product.price,
                    image: product.mainImage,
                    qty: qty
                  });
                  navigate("/verifikasi");
                }}
                className="w-full bg-[#FF8C00] text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 font-['Archivo_Black'] text-lg uppercase transition-transform hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)]"
              >
                BELI SEKARANG → VIA WHATSAPP
              </button>
            </div>

            {/* 3. Trust Badges */}
            <div className="border-3 border-black bg-white overflow-hidden">
              {[
                { icon: <Shield size={20} />, label: "PENGIRIMAN AMAN", desc: "Dikemas double wrap anti remuk" },
                { icon: <CheckCircle size={20} />, label: "100% PEMBAYARAN AMAN", desc: "Transfer langsung ke rekening resmi" },
                { icon: <Flame size={20} />, label: "DIGORENG FRESH", desc: "Proses produksi setiap hari" },
              ].map((badge, i) => (
                <div key={badge.label} className={`flex items-center gap-4 py-3 px-5 ${i < 2 ? 'border-b-2 border-black' : ''} ${i === 1 ? 'bg-[#FDFBF7]' : 'bg-white'}`}>
                  <div className="w-10 h-10 bg-[#2E8B57] border-2 border-black flex items-center justify-center shrink-0 text-white">
                    {badge.icon}
                  </div>
                  <div>
                    <p className="font-extrabold text-xs tracking-widest">{badge.label}</p>
                    <p className="font-medium text-xs text-gray-600">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>

      {/* 4. Tabs & Deskripsi Produk Lengkap */}
      <section className="max-w-[1440px] w-full mx-auto px-6 md:px-[80px] pb-20">
        {/* Tab Headers */}
        <div className="flex gap-0 mb-[-4px] relative z-10 overflow-x-auto">
          {[
            { id: "desc", label: "DESKRIPSI PRODUK" },
            { id: "reviews", label: `ULASAN (${product.reviews})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "desc" | "reviews")}
              className={`px-6 py-4 border-4 border-black whitespace-nowrap font-['Archivo_Black'] text-sm tracking-wide transition-colors ${
                activeTab === tab.id 
                  ? 'border-b-[#FDFBF7] bg-[#FDFBF7] shadow-none' 
                  : 'bg-[#ccc] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mr-2'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FDFBF7] p-6 md:p-12">
          {activeTab === "desc" ? (
            <div>
              <h3 className="font-['Archivo_Black'] text-2xl md:text-3xl uppercase mb-6 tracking-tight">
                TENTANG PRODUK INI
              </h3>
              {product.longDescription.map((desc, i) => (
                <p key={i} className="font-medium text-base md:text-lg leading-relaxed text-gray-800 mb-6 max-w-3xl">
                  {desc}
                </p>
              ))}

              {/* Specs Table */}
              <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-2xl mt-8">
                <div className="bg-black py-3 px-6">
                  <p className="font-['Archivo_Black'] text-sm tracking-widest text-[#FF8C00]">
                    SPESIFIKASI PRODUK
                  </p>
                </div>
                {product.specs.map((spec, i) => (
                  <div 
                    key={spec.label} 
                    className={`flex flex-col sm:flex-row ${i < product.specs.length - 1 ? 'border-b-2 border-black' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFBF7]'}`}
                  >
                    <div className="w-full sm:w-56 py-3 px-5 sm:border-r-3 border-black shrink-0">
                      <p className="font-extrabold text-sm tracking-wide">{spec.label}</p>
                    </div>
                    <div className="py-3 px-5">
                      <p className="font-semibold text-[0.9rem] text-gray-800">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Rating Summary */}
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 mb-12 pb-10 border-b-3 border-black">
                <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#FF8C00] p-8 text-center flex flex-col justify-center">
                  <p className="font-['Archivo_Black'] text-7xl leading-none tracking-tighter text-black">
                    {product.rating}
                  </p>
                  <div className="flex justify-center gap-1 my-3">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={24} fill="#000" color="#000" />
                    ))}
                  </div>
                  <p className="font-bold text-sm tracking-widest text-black">
                    {product.reviews} ULASAN
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 justify-center">
                  {product.ratingSummary.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="font-bold text-sm w-6 text-right">
                        {row.stars}★
                      </span>
                      <div className="flex-1 h-5 border-2 border-black bg-white overflow-hidden">
                        <div 
                          className="h-full"
                          style={{ 
                            width: `${row.pct}%`, 
                            backgroundColor: row.pct > 50 ? "#FF8C00" : row.pct > 5 ? "#FFD700" : "#ccc" 
                          }}
                        />
                      </div>
                      <span className="font-bold text-xs text-gray-600 w-10">
                        ({row.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              <div className="flex flex-col gap-6">
                {product.reviewsList.map((review) => (
                  <div key={review.id} className="border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-white p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FF8C00] border-3 border-black flex items-center justify-center shrink-0">
                          <span className="font-['Archivo_Black'] text-xl text-black">
                            {review.name[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-['Archivo_Black'] text-[0.95rem] tracking-wide mb-1">
                            {review.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-xs text-gray-500">{review.date}</p>
                            {review.verified && (
                              <div className="bg-[#2E8B57] border border-black px-2 py-0.5 flex items-center gap-1">
                                <CheckCircle size={10} color="#fff" />
                                <span className="font-bold text-[0.65rem] tracking-widest text-white">
                                  TERVERIFIKASI
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((s) => (
                          <Star
                            key={s}
                            size={16}
                            fill={s <= review.rating ? "#FF8C00" : "none"}
                            color={s <= review.rating ? "#FF8C00" : "#ccc"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="font-medium text-[0.95rem] leading-relaxed text-gray-800">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Section: PILIHAN PRODUK LAINNYA */}
      <section className="max-w-[1440px] w-full mx-auto px-6 md:px-[80px] pb-32">
        <div className="flex justify-between items-end mb-10 border-b-4 border-black pb-4">
          <h2 className="font-['Archivo_Black'] text-4xl tracking-tight uppercase m-0">
            PILIHAN PRODUK <span className="text-[#FF8C00]">LAINNYA</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.filter(p => p.slug !== product.slug).slice(0,4).map(related => (
            <Link 
              to={`/menu/${related.slug}`} 
              key={related.id}
              className="flex flex-col border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white text-inherit transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="border-b-4 border-black aspect-square overflow-hidden">
                <ImageWithFallback src={related.mainImage} alt={related.namePart1} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="inline-block bg-[#FF8C00] border-2 border-black px-2 py-1 self-start mb-3 font-extrabold text-[0.65rem] tracking-widest">
                  {related.badgeText.substring(0, 20)}{related.badgeText.length > 20 ? '...' : ''}
                </div>
                <h3 className="font-['Archivo_Black'] text-lg leading-tight mb-2 uppercase">
                  {related.namePart1} <span className="text-[#FF8C00]">{related.namePart2}</span>
                </h3>
                <div className="flex items-center gap-1 mb-4">
                  <Star size={14} fill="#FF8C00" color="#FF8C00" />
                  <span className="font-extrabold text-sm">{related.rating}</span>
                </div>
                <div className="mt-auto flex justify-between items-end">
                  <p className="font-['Archivo_Black'] text-xl">
                    {formatRp(related.price)}
                  </p>
                  <div className="bg-black w-10 h-10 flex items-center justify-center">
                    <ChevronRight color="#fff" size={24} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 right-10 bg-[#2E8B57] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 px-6 z-50 flex items-center gap-3 animate-[slideIn_0.3s_ease-out_forwards]">
          <CheckCircle size={24} color="#fff" />
          <div>
            <p className="font-['Archivo_Black'] text-sm text-white tracking-widest">
              BERHASIL DITAMBAHKAN!
            </p>
            <p className="font-semibold text-xs text-[#FDFBF7]">
              {product.namePart1} {product.namePart2} masuk ke keranjang.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
