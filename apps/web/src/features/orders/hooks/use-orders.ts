import { useQuery } from "@tanstack/react-query";
import { getOrders, getOrder } from "../api";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
}
