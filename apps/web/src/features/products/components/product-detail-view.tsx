"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useProduct } from "@/features/products/hooks/use-products";
import { useCart } from "@/features/cart/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/ui/text-reveal-card";

export function ProductDetailView({ productId }: { productId: number }) {
  const { data: product, isLoading, error } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      rate: product.price,
      image: product.image,
      qty: quantity,
    });
    setQuantity(1);
  }, [addItem, product, quantity]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <div className="animate-pulse">
          <div className="mb-6 h-4 w-32 rounded bg-muted" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="aspect-square rounded-xl bg-muted" />
            <div className="space-y-4">
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="h-8 w-3/4 rounded bg-muted" />
              <div className="h-6 w-1/4 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to products
        </Link>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Product not found.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            This item may have been removed or the link is incorrect.
          </p>
          <Button
            render={<Link href="/products" />}
            nativeButton={false}
            variant="outline"
            className="mt-6"
          >
            Browse products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="mb-2 font-mono text-[11px] tracking-wider text-primary/70">
            {product.code}
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {product.name}
          </h1>

          <p className="mt-3 text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>

          {/* Description reveal */}
          {product.description && (
            <div className="mt-6">
              <TextRevealCard
                text={product.description}
                revealText={product.description}
                className="w-full bg-card border border-border"
              >
                <TextRevealCardTitle>Details</TextRevealCardTitle>
                <TextRevealCardDescription>
                  Hover to reveal the full description
                </TextRevealCardDescription>
              </TextRevealCard>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-8">
            <p className="mb-2 text-sm text-muted-foreground">Quantity</p>
            <div className="inline-flex items-center rounded-lg border border-border bg-card">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-12 text-center text-sm font-medium text-card-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="mt-6 w-full rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
          >
            Add to cart
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
