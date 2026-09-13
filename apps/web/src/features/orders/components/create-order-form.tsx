"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/features/products/hooks/use-products";
import { useCreateOrder } from "@/features/orders/hooks/use-order-mutations";
import { createOrderSchema, type CreateOrderInput } from "@/features/orders/schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-medium text-muted-foreground">
          Customer information
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customerName">Name</Label>
            <Input
              id="customerName"
              placeholder="Customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            {errors.customerName && (
              <p className="text-xs text-destructive">{errors.customerName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customerPhone">Phone</Label>
            <Input
              id="customerPhone"
              placeholder="Phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
            {errors.customerPhone && (
              <p className="text-xs text-destructive">{errors.customerPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-medium text-muted-foreground">Products</h2>

        <div className="relative mt-4">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && availableProducts.length > 0 && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-popover">
              {availableProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addProduct(product)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-accent"
                >
                  <span className="text-popover-foreground">{product.name}</span>
                  <span className="text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {errors.products && (
          <p className="mt-2 text-xs text-destructive">{errors.products}</p>
        )}

        {selectedProducts.length > 0 && (
          <div className="mt-4 space-y-2">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${product.rate.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantity(product.id, -1)}
                  >
                    <MinusIcon className="size-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium text-card-foreground">
                    {product.qty}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    <PlusIcon className="size-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeProduct(product.id)}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProducts.length === 0 && !searchQuery && (
          <p className="mt-4 text-sm text-muted-foreground">
            Search and select products to add to this order.
          </p>
        )}
      </div>

      {/* Order Summary */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-medium text-muted-foreground">Order summary</h2>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-muted-foreground">
            {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""}
          </span>
          <span className="text-xl font-bold text-card-foreground">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={createOrder.isPending}
          className="rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
        >
          {createOrder.isPending ? "Creating..." : "Create order"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/orders")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
