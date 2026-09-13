import { apiClient } from "@/lib/api-client";
import type { Order, CreateOrderPayload } from "./types";

export function getOrders(): Promise<Order[]> {
  return apiClient.get("/orders").then((r) => r.data);
}

export function getOrder(id: number): Promise<Order> {
  return apiClient.get(`/orders/${id}`).then((r) => r.data);
}

export function createOrder(data: CreateOrderPayload): Promise<Order> {
  return apiClient.post("/orders", data).then((r) => r.data);
}
