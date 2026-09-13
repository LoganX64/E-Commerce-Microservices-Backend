import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../api";
import type { CreateOrderPayload } from "../types";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderPayload) => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
