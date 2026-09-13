"use client";

import { useProducts } from "@/features/products/hooks/use-products";
import { useProductFilters } from "@/features/products/hooks/use-product-filters";
import { ProductFilters } from "@/features/products/components/product-filters";
import { ProductGrid } from "@/features/products/components/product-grid";

export function ProductsView() {
  const { data: products = [], isLoading } = useProducts();
  const {
    filteredProducts,
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useProductFilters(products);

  return (
    <div className="flex flex-col gap-6">
      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-white/[0.08] bg-[#0a0a0a]"
            >
              <div className="aspect-square bg-neutral-800 rounded-t-xl" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-16 rounded bg-neutral-800" />
                <div className="h-4 w-3/4 rounded bg-neutral-800" />
                <div className="h-5 w-1/3 rounded bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}
