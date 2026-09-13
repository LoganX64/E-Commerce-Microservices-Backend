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
            className="h-12 animate-pulse rounded-xl border border-white/[0.08] bg-[#0a0a0a]"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-[#0a0a0a] py-16 text-center">
        <p className="text-lg font-medium text-neutral-400">
          No products yet.
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Add your first product to get started.
        </p>
      </div>
    );
  }

  return <ProductTable products={products} />;
}
