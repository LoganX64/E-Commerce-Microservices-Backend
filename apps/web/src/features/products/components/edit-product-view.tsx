"use client";

import { useProduct } from "@/features/products/hooks/use-products";
import { ProductForm } from "@/features/products/components/product-form";

export function EditProductView({ productId }: { productId: number }) {
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-64 animate-pulse rounded bg-muted" />
        <div className="mt-6 max-w-lg space-y-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-8 w-full animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Edit product
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Update &ldquo;{product.name}&rdquo;
      </p>
      <div className="mt-6 max-w-lg">
        <ProductForm product={product} />
      </div>
    </>
  );
}
