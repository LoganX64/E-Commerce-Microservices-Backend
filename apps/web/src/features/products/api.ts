import { apiClient } from "@/lib/api-client";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "./types";

export function getProducts(): Promise<Product[]> {
  return apiClient.get("/products").then((r) => r.data);
}

export function getProduct(id: number): Promise<Product> {
  return apiClient.get(`/products/${id}`).then((r) => r.data);
}

export function createProduct(data: CreateProductPayload): Promise<Product> {
  return apiClient.post("/products", data).then((r) => r.data);
}

export function updateProduct(
  id: number,
  data: UpdateProductPayload,
): Promise<Product> {
  return apiClient.patch(`/products/${id}`, data).then((r) => r.data);
}

export function deleteProduct(
  id: number,
): Promise<{ deleted: true }> {
  return apiClient.delete(`/products/${id}`).then((r) => r.data);
}
