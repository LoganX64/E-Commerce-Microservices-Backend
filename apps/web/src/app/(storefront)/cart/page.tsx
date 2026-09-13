"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/use-cart";
import { CartItem } from "@/features/cart/components/cart-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Your cart is empty
        </h1>
        <p className="mt-2 text-neutral-400">
          Find something you like and add it to your cart.
        </p>
        <Button
          render={<Link href="/products" />}
          size="lg"
          className="mt-6 rounded-lg bg-white text-neutral-950 font-semibold hover:bg-[#C8A2FF] hover:text-white transition-colors"
        >
          Browse products
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-500 hover:text-red-400 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Items */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </section>
  );
}
