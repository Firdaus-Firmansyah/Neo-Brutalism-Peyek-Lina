import { useQuery } from "@tanstack/react-query";
import { Order } from "../types";

// Mock API endpoint for orders
const fetchOrders = async (): Promise<Order[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      invoice: "GK-123456789",
      customer: "Budi Santoso",
      phone: "081234567890",
      date: "04 Mei 2026",
      status: "baru",
      total: 190000,
      items: 2,
    },
    {
      invoice: "GK-987654321",
      customer: "Siti Aminah",
      phone: "081234567891",
      date: "03 Mei 2026",
      status: "diproses",
      total: 85000,
      items: 1,
    },
    {
      invoice: "GK-456789123",
      customer: "Andi Wijaya",
      phone: "081234567892",
      date: "02 Mei 2026",
      status: "dikirim",
      total: 250000,
      items: 5,
    },
    {
      invoice: "GK-321654987",
      customer: "Rina Kusuma",
      phone: "081234567893",
      date: "01 Mei 2026",
      status: "selesai",
      total: 120000,
      items: 2,
    },
  ];
};

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1 * 60 * 1000, // 1 minute cache
  });
}
