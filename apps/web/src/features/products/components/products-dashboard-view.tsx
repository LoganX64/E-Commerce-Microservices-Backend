"use client";

import { useProducts } from "@/features/products/hooks/use-products";
import { ProductTable } from "@/features/products/components/product-table";

export function ProductsDashboardView() {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="space-y-2 border-t border-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse border-b border-border/40 bg-muted/20"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-border p-12 text-center">
        <p className="text-base font-semibold text-foreground">
          No products found
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Your inventory is currently empty. Add your first product to get started.
        </p>
      </div>
    );
  }

  return <ProductTable products={products} />;
}
