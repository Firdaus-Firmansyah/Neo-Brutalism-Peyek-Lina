export interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  verified: boolean;
}

export interface RatingSummary {
  stars: number;
  pct: number;
  count: number;
}

export interface Product {
  id: string;
  slug: string;
  namePart1: string; // Teks warna hitam
  namePart2: string; // Teks warna oranye
  price: number;
  weight: string;
  rating: number;
  reviews: number;
  badgeText: string;
  description: string;
  features: string[];
  mainImage: string;
  thumbnails: string[];
  longDescription: string[];
  specs: { label: string; value: string }[];
  reviewsList: Review[];
  ratingSummary: RatingSummary[];
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "peyek-kacang-original",
    namePart1: "PEYEK KACANG",
    namePart2: "ORIGINAL",
    price: 90000,
    weight: "500gr",
    rating: 4.9,
    reviews: 157,
    badgeText: "FRESH DIGORENG HARI INI",
    description: "Rasakan sensasi gurih dan renyah tiada dua pada setiap gigitan Peyek Kacang Original. Dibuat dengan cinta menggunakan resep warisan keluarga.",
    features: [
      "Kacang tanah melimpah & besar-besar",
      "100% bahan alami tanpa pengawet",
      "Tekstur super renyah tahan lama",
      "Digoreng fresh setiap hari"
    ],
    mainImage: "/product-1.png",
    thumbnails: [
      "/product-1.png",
      "/product-2.png",
      "/product-3.png",
      "/product-6.png",
      "/product-7.png"
    ],
    longDescription: [
      "Rasakan sensasi gurih dan renyah yang tiada duanya dari Peyek Kacang Original buatan tangan kami. Dibuat dengan resep warisan keluarga yang telah dipercaya selama puluhan tahun, setiap peyek menggunakan kacang tanah pilihan yang dipadukan dengan bumbu rahasia khas Ibu Lina.",
      "Dikemas rapi dalam toples tebal yang kedap udara, produk kami tahan hingga 2 bulan dan tetap renyah dari pertama hingga peyek terakhir. Nikmati kapan saja sebagai teman makan atau camilan keluarga!"
    ],
    specs: [
      { label: "BERAT BERSIH", value: "±500 Gram" },
      { label: "KETAHANAN", value: "1–2 Bulan" },
      { label: "KEMASAN", value: "Toples Tebal Kedap Udara" },
      { label: "KOMPOSISI", value: "Tepung beras, kacang tanah, garam, rempah rahasia" },
      { label: "TANPA", value: "Pengawet, Pewarna, MSG Berlebih" }
    ],
    reviewsList: [
      { id: 1, name: "SITI RAHAYU", date: "12 April 2026", rating: 5, text: "Renyahnya luar biasa! Kacangnya banyak banget dan bumbunya pas. Sudah beli lebih dari 5x dan selalu puas!", verified: true },
      { id: 2, name: "BUDI SANTOSO", date: "8 April 2026", rating: 5, text: "Sampai dalam kondisi sempurna. Kemasannya rapi banget. Harga worth it, dijamin beli lagi!", verified: true },
      { id: 3, name: "DEWI KARTIKA", date: "1 April 2026", rating: 4, text: "Enak banget, fresh, aroma kacangnya harum. Kurang sedikit lebih renyah lagi tapi overall sangat memuaskan.", verified: true }
    ],
    ratingSummary: [
      { stars: 5, pct: 91, count: 143 },
      { stars: 4, pct: 7, count: 11 },
      { stars: 3, pct: 1, count: 2 },
      { stars: 2, pct: 1, count: 1 },
      { stars: 1, pct: 0, count: 0 },
    ]
  },
  {
    id: "p2",
    slug: "peyek-teri-medan",
    namePart1: "PEYEK TERI",
    namePart2: "MEDAN",
    price: 95000,
    weight: "500gr",
    rating: 4.8,
    reviews: 120,
    badgeText: "GURIH LAUT ASLI",
    description: "Peyek dengan taburan Teri Medan premium yang memberikan perpaduan rasa gurih dan asin yang pas. Sangat cocok dinikmati bersama nasi hangat.",
    features: [
      "Menggunakan Teri Medan premium pilihan",
      "Rasa gurih asin yang pas & tidak amis",
      "Potongan daun jeruk segar",
      "Renyah dan tidak keras saat digigit"
    ],
    mainImage: "/product-2.png",
    thumbnails: [
      "/product-2.png",
      "/product-3.png",
      "/product-1.png",
      "/product-4.png",
      "/product-6.png"
    ],
    longDescription: [
      "Bagi pecinta makanan gurih, Peyek Teri Medan adalah pilihan yang paling sempurna. Kami hanya menggunakan Teri Medan premium yang bersih dan tidak terlalu asin, sehingga berpadu sangat serasi dengan adonan peyek rempah khas kami.",
      "Aroma khas daun jeruk purut yang dipotong halus memberikan sensasi segar yang menghilangkan bau amis. Cocok sekali disajikan sebagai pelengkap makanan berkuah seperti soto atau rawon!"
    ],
    specs: [
      { label: "BERAT BERSIH", value: "±500 Gram" },
      { label: "KETAHANAN", value: "1–2 Bulan" },
      { label: "KEMASAN", value: "Toples Tebal Kedap Udara" },
      { label: "KOMPOSISI", value: "Tepung beras, teri medan premium, daun jeruk, rempah" },
      { label: "TANPA", value: "Pengawet, Pewarna, MSG Berlebih" }
    ],
    reviewsList: [
      { id: 1, name: "ANDI WIJAYA", date: "15 April 2026", rating: 5, text: "Teri medannya gak pelit sama sekali! Rasanya gurih banget dimakan pakai nasi panas mantap betul.", verified: true },
      { id: 2, name: "RINA KUSUMA", date: "10 April 2026", rating: 5, text: "Gak amis sama sekali, daun jeruknya wangi. Packagingnya juara, sampe Jkt utuh 100%.", verified: true },
      { id: 3, name: "HENDRA", date: "5 April 2026", rating: 4, text: "Gurih dan renyah. Cuma harganya lumayan premium ya, tapi ada harga ada rupa. Enak!", verified: true }
    ],
    ratingSummary: [
      { stars: 5, pct: 85, count: 102 },
      { stars: 4, pct: 10, count: 12 },
      { stars: 3, pct: 5, count: 6 },
      { stars: 2, pct: 0, count: 0 },
      { stars: 1, pct: 0, count: 0 },
    ]
  },
  {
    id: "p3",
    slug: "peyek-rebon",
    namePart1: "PEYEK",
    namePart2: "REBON",
    price: 85000,
    weight: "500gr",
    rating: 4.7,
    reviews: 95,
    badgeText: "AROMA KHAS MENGGUGAH",
    description: "Udang rebon berukuran kecil namun kaya akan rasa. Menghasilkan peyek dengan aroma khas yang sangat menggugah selera.",
    features: [
      "Udang rebon segar kaya kalsium",
      "Adonan tipis dan sangat garing",
      "Tidak menyerap banyak minyak",
      "Cocok sebagai camilan keluarga"
    ],
    mainImage: "/product-3.png",
    thumbnails: [
      "/product-3.png",
      "/product-2.png",
      "/product-1.png",
      "/product-5.png",
      "/product-7.png"
    ],
    longDescription: [
      "Peyek Rebon kami menggunakan udang rebon pilihan yang telah dicuci bersih dan dikeringkan secara higienis. Ini memastikan tidak ada rasa pahit saat digigit, melainkan rasa gurih khas laut yang menyebar di seluruh mulut.",
      "Ketebalan adonan untuk varian Rebon sengaja dibuat sedikit lebih tipis untuk memaksimalkan kerenyahan udang rebonnya. Sangat nikmat untuk camilan sore sambil minum teh manis."
    ],
    specs: [
      { label: "BERAT BERSIH", value: "±500 Gram" },
      { label: "KETAHANAN", value: "1–2 Bulan" },
      { label: "KEMASAN", value: "Toples Tebal Kedap Udara" },
      { label: "KOMPOSISI", value: "Tepung beras, udang rebon, rempah, ketumbar" },
      { label: "TANPA", value: "Pengawet, Pewarna, MSG Berlebih" }
    ],
    reviewsList: [
      { id: 1, name: "YUNI ARTI", date: "18 April 2026", rating: 5, text: "Aroma udangnya sedap banget, anak-anak pada suka karena ukurannya tipis dan renyah garing.", verified: true },
      { id: 2, name: "DIMAS", date: "14 April 2026", rating: 5, text: "Baru coba varian rebon dan ternyata luar biasa enak. Rebonnya merata di semua sisi.", verified: true },
      { id: 3, name: "LINA AMELIA", date: "2 April 2026", rating: 4, text: "Rasanya authentic banget kayak buatan nenek di kampung. Sangat mengobati rindu kampung halaman.", verified: false }
    ],
    ratingSummary: [
      { stars: 5, pct: 80, count: 76 },
      { stars: 4, pct: 15, count: 14 },
      { stars: 3, pct: 5, count: 5 },
      { stars: 2, pct: 0, count: 0 },
      { stars: 1, pct: 0, count: 0 },
    ]
  },
  {
    id: "p4",
    slug: "peyek-kacang-ijo",
    namePart1: "PEYEK KACANG",
    namePart2: "IJO",
    price: 85000,
    weight: "500gr",
    rating: 4.9,
    reviews: 88,
    badgeText: "ALTERNATIF SEHAT",
    description: "Inovasi peyek menggunakan kacang hijau utuh pilihan. Memberikan sensasi gurih dengan sentuhan manis alami dari kacang hijau.",
    features: [
      "Kacang hijau utuh yang empuk namun renyah",
      "Kaya akan serat dan vitamin",
      "Rasa unik perpaduan gurih dan manis alami",
      "Digoreng dadakan (Made to Order)"
    ],
    mainImage: "/product-4.png",
    thumbnails: [
      "/product-4.png",
      "/product-1.png",
      "/product-6.png",
      "/product-7.png"
    ],
    longDescription: [
      "Bosan dengan peyek biasa? Peyek Kacang Hijau (Kacang Ijo) adalah kreasi unik yang memberikan tekstur berbeda. Kacang hijau yang disangrai dengan presisi memberikan kerenyahan tersendiri yang lebih empuk ketimbang kacang tanah.",
      "Rasa dominan tetap gurih, namun di akhir gigitan akan terasa sedikit hint manis alami khas kacang hijau. Sangat direkomendasikan bagi Anda yang mencari alternatif camilan peyek yang lebih sehat dan berserat tinggi."
    ],
    specs: [
      { label: "BERAT BERSIH", value: "±500 Gram" },
      { label: "KETAHANAN", value: "1–2 Bulan" },
      { label: "KEMASAN", value: "Toples Tebal Kedap Udara" },
      { label: "KOMPOSISI", value: "Tepung beras, kacang hijau kupas pilihan, rempah" },
      { label: "TANPA", value: "Pengawet, Pewarna, MSG Berlebih" }
    ],
    reviewsList: [
      { id: 1, name: "FAHMI REZA", date: "20 April 2026", rating: 5, text: "Pertama kali nyoba peyek kacang ijo, ternyata enak banget! Gak sekeras kacang tanah, lebih ramah di gigi.", verified: true },
      { id: 2, name: "SARAH", date: "16 April 2026", rating: 5, text: "Unik rasanya, gurih dan ada sensasi manis sedikit. Cocok banget buat diet yang tetep pengen nyemil.", verified: true },
      { id: 3, name: "TINA", date: "11 April 2026", rating: 4, text: "Anak saya alergi kacang tanah, jadi ini life saver banget. Rasanya tetep enak kayak peyek normal.", verified: true }
    ],
    ratingSummary: [
      { stars: 5, pct: 93, count: 82 },
      { stars: 4, pct: 7, count: 6 },
      { stars: 3, pct: 0, count: 0 },
      { stars: 2, pct: 0, count: 0 },
      { stars: 1, pct: 0, count: 0 },
    ]
  },
  {
    id: "p5",
    slug: "peyek-mix-premium",
    namePart1: "PEYEK MIX",
    namePart2: "PREMIUM",
    price: 120000,
    weight: "600gr",
    rating: 5.0,
    reviews: 210,
    badgeText: "BEST SELLER - TOPLES BESAR",
    description: "Tidak bisa memilih? Dapatkan ketiga varian favorit kami (Kacang, Teri, Rebon) dalam satu toples berukuran ekstra besar.",
    features: [
      "Kombinasi 3 varian dalam 1 toples",
      "Ukuran toples lebih besar (600gr)",
      "Kemasan toples tebal cocok untuk hampers",
      "Garansi uang kembali jika hancur"
    ],
    mainImage: "/product-5.png",
    thumbnails: [
      "/product-5.png",
      "/product-1.png",
      "/product-2.png",
      "/product-3.png",
      "/product-6.png"
    ],
    longDescription: [
      "Edisi spesial bagi Anda yang ingin menikmati semuanya. Peyek Mix Premium menggabungkan tiga varian terlaris kami: Kacang Tanah Original, Teri Medan, dan Udang Rebon ke dalam satu toples berukuran ekstra besar (600 gram).",
      "Dikemas dengan desain yang lebih mewah, varian ini sangat cocok dijadikan buah tangan atau hampers untuk kolega dan keluarga tercinta. Anda tidak perlu repot memilih lagi!"
    ],
    specs: [
      { label: "BERAT BERSIH", value: "±600 Gram" },
      { label: "KETAHANAN", value: "1–2 Bulan" },
      { label: "KEMASAN", value: "Toples Premium Tebal (Cocok untuk Hadiah)" },
      { label: "KOMPOSISI", value: "Campuran Kacang, Teri Medan, dan Rebon" },
      { label: "TANPA", value: "Pengawet, Pewarna, MSG Berlebih" }
    ],
    reviewsList: [
      { id: 1, name: "MELISSA T.", date: "22 April 2026", rating: 5, text: "Solusi mantap buat keluarga yang seleranya beda-beda. 1 toples langsung ludes seketika hahaha.", verified: true },
      { id: 2, name: "KOKO ALVIN", date: "17 April 2026", rating: 5, text: "Beli ini buat hampers lebaran kemaren, mertua seneng banget. Packagingnya kokoh gak gampang pecah.", verified: true },
      { id: 3, name: "DIANA", date: "12 April 2026", rating: 5, text: "Super duper memuaskan. Teri dan rebonnya kerasa banget, kacangnya gede gede. Top markotop!", verified: true }
    ],
    ratingSummary: [
      { stars: 5, pct: 98, count: 205 },
      { stars: 4, pct: 2, count: 5 },
      { stars: 3, pct: 0, count: 0 },
      { stars: 2, pct: 0, count: 0 },
      { stars: 1, pct: 0, count: 0 },
    ]
  }
];
