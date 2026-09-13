"use client";

import Image from "next/image";
import { PinContainer } from "@/components/ui/3d-pin";
import type { Product } from "@/features/products/types";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="relative w-full bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Featured Products
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400">
            Hand-picked items from our catalog
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex h-[20rem] w-[20rem] items-center justify-center"
            >
              <PinContainer
                title={product.name}
                href={`/products/${product.id}`}
              >
                <div className="flex h-48 w-48 flex-col items-center justify-center gap-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={140}
                    height={140}
                    className="h-[10rem] w-[10rem] rounded-lg object-cover"
                  />
                  <p className="text-sm font-medium text-white">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
