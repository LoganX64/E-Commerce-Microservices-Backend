"use client";

import Image from "next/image";
import { Minus, Package, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/features/cart/hooks/use-cart";
import type { CartItem as CartItemType } from "@/features/cart/types";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4">
      {/* Thumbnail */}
      {item.image ? (
        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Package className="size-8 stroke-[1.5]" />
        </div>
      )}

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="truncate text-sm font-semibold text-card-foreground">
            {item.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-card-foreground">
            ${item.rate.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="inline-flex items-center rounded-lg border border-border">
            <button
              onClick={() => updateQuantity(item.id, item.qty - 1)}
              className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-medium text-card-foreground">
              {item.qty}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.qty + 1)}
              className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.id)}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
