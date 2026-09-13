"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/use-cart";
import { Button } from "@/components/ui/button";

export function CartSummary() {
  const { totalItems, totalPrice } = useCart();
  const items = totalItems();
  const total = totalPrice();

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-base font-semibold text-card-foreground">Order summary</h2>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {items} {items === 1 ? "item" : "items"}
          </span>
          <span className="text-card-foreground">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-muted-foreground">Calculated at checkout</span>
        </div>
      </div>

      <div className="my-4 h-px bg-border" />

      <div className="flex justify-between text-base font-bold">
        <span className="text-card-foreground">Subtotal</span>
        <span className="text-card-foreground">${total.toFixed(2)}</span>
      </div>

      <Button
        render={<Link href="/checkout" />}
        nativeButton={false}
        size="lg"
        className="mt-5 w-full rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
      >
        Proceed to checkout
      </Button>
    </div>
  );
}
