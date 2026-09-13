"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
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

        <div className="flex flex-wrap items-center justify-center gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group relative flex h-72 w-64 flex-col items-center justify-center gap-3 border-white/[0.08] bg-[#0a0a0a] p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:border-white/[0.15]">
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
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
