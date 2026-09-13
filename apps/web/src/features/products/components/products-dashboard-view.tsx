"use client";

import { useProducts } from "@/features/products/hooks/use-products";
import { ProductTable } from "@/features/products/components/product-table";

export function ProductsDashboardView() {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse rounded-xl border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No products yet.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first product to get started.
        </p>
      </div>
    );
  }

  return <ProductTable products={products} />;
}
