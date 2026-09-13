"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/features/products/hooks/use-products";
import { useCreateOrder } from "@/features/orders/hooks/use-order-mutations";
import { createOrderSchema, type CreateOrderInput } from "@/features/orders/schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, XIcon, SearchIcon } from "lucide-react";
import type { Product } from "@/features/products/types";
import type { OrderProduct } from "@/features/orders/types";

export function CreateOrderForm() {
  const router = useRouter();
  const { data: products = [], isLoading } = useProducts();
  const createOrder = useCreateOrder();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const availableProducts = filteredProducts.filter(
    (p) => !selectedProducts.some((sp) => sp.id === p.id),
  );

  const totalAmount = selectedProducts.reduce(
    (sum, p) => sum + p.rate * p.qty,
    0,
  );

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => [
      ...prev,
      { id: product.id, name: product.name, rate: product.price, qty: 1 },
    ]);
    setSearchQuery("");
  };

  const updateQuantity = (id: number, delta: number) => {
    setSelectedProducts((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p))
        .filter((p) => p.qty > 0),
    );
  };

  const removeProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }
    if (!customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    }
    if (selectedProducts.length === 0) {
      newErrors.products = "At least one product is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    createOrder.mutate(
      {
        customer: { name: customerName.trim(), phone: customerPhone.trim() },
        products: selectedProducts,
        totalAmount,
      },
      {
        onSuccess: (order) => {
          router.push(`/dashboard/orders/${order.id}`);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Customer Information */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-6">
        <h2 className="text-sm font-medium text-neutral-400">
          Customer information
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customerName" className="text-neutral-300">
              Name
            </Label>
            <Input
              id="customerName"
              placeholder="Customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20"
            />
            {errors.customerName && (
              <p className="text-xs text-red-400">{errors.customerName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customerPhone" className="text-neutral-300">
              Phone
            </Label>
            <Input
              id="customerPhone"
              placeholder="Phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20"
            />
            {errors.customerPhone && (
              <p className="text-xs text-red-400">{errors.customerPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-6">
        <h2 className="text-sm font-medium text-neutral-400">Products</h2>

        <div className="relative mt-4">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          <Input
            placeholder="Search products by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-white/[0.08] bg-[#0a0a0a] pl-9 text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20"
          />
          {searchQuery && availableProducts.length > 0 && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-white/[0.08] bg-[#1a1a1a]">
              {availableProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addProduct(product)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-white/[0.05]"
                >
                  <span className="text-white">{product.name}</span>
                  <span className="text-neutral-400">
                    ${product.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {errors.products && (
          <p className="mt-2 text-xs text-red-400">{errors.products}</p>
        )}

        {selectedProducts.length > 0 && (
          <div className="mt-4 space-y-2">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg border border-white/[0.08] p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-sm text-neutral-400">
                    ${product.rate.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantity(product.id, -1)}
                    className="border-white/[0.08] text-white"
                  >
                    <MinusIcon className="size-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium text-white">
                    {product.qty}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantity(product.id, 1)}
                    className="border-white/[0.08] text-white"
                  >
                    <PlusIcon className="size-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeProduct(product.id)}
                    className="ml-2 text-neutral-400 hover:text-red-400"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProducts.length === 0 && !searchQuery && (
          <p className="mt-4 text-sm text-neutral-500">
            Search and select products to add to this order.
          </p>
        )}
      </div>

      {/* Order Summary */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-6">
        <h2 className="text-sm font-medium text-neutral-400">Order summary</h2>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-neutral-400">
            {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""}
          </span>
          <span className="text-xl font-bold text-white">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={createOrder.isPending}
          className="rounded-lg bg-white text-neutral-950 font-semibold hover:bg-[#C8A2FF] hover:text-white transition-colors"
        >
          {createOrder.isPending ? "Creating..." : "Create order"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/orders")}
          className="border-white/[0.08] text-white"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}