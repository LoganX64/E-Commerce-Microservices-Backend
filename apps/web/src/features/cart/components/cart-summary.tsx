"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/use-cart";
import { Button } from "@/components/ui/button";

export function CartSummary() {
  const { totalItems, totalPrice } = useCart();
  const items = totalItems();
  const total = totalPrice();

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-5">
      <h2 className="text-base font-semibold text-white">Order summary</h2>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-400">
            {items} {items === 1 ? "item" : "items"}
          </span>
          <span className="text-white">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-400">Shipping</span>
          <span className="text-neutral-500">Calculated at checkout</span>
        </div>
      </div>

      <div className="my-4 h-px bg-white/[0.08]" />

      <div className="flex justify-between text-base font-bold">
        <span className="text-white">Subtotal</span>
        <span className="text-white">${total.toFixed(2)}</span>
      </div>

      <Button
        render={<Link href="/checkout" />}
        size="lg"
        className="mt-5 w-full rounded-lg bg-white text-neutral-950 font-semibold hover:bg-[#C8A2FF] hover:text-white transition-colors"
      >
        Proceed to checkout
      </Button>
    </div>
  );
}
