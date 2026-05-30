import { useQuery } from "@tanstack/react-query";
import { Product } from "../types";

// Mock API endpoint for products
const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      id: "1",
      name: "Peyek Kacang Original",
      variant: "Toples 500gr",
      sku: "PK-ORIGINAL-500",
      price: 45000,
      stock: 150,
      status: "aktif",
      image: "/product-1.png",
    },
    {
      id: "2",
      name: "Peyek Teri Medan",
      variant: "Toples 500gr",
      sku: "PT-MEDAN-500",
      price: 55000,
      stock: 50,
      status: "aktif",
      image: "/product-2.png",
    },
    {
      id: "3",
      name: "Peyek Udang Rebon",
      variant: "Plastik 250gr",
      sku: "PU-REBON-250",
      price: 50000,
      stock: 0,
      status: "aktif",
      image: "/product-3.png",
    },
    {
      id: "4",
      name: "Peyek Kacang Hijau",
      variant: "Toples 500gr",
      sku: "PKH-500",
      price: 48000,
      stock: 80,
      status: "aktif",
      image: "/product-4.png",
    },
  ];
};

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}
