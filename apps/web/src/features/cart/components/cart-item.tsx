"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/features/cart/hooks/use-cart";
import type { CartItem as CartItemType } from "@/features/cart/types";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-4">
      {/* Thumbnail */}
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-neutral-900">
        <Image
          src={`https://picsum.photos/seed/${item.id}`}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="truncate text-sm font-semibold text-white">
            {item.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-white">
            ${item.rate.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="inline-flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
            <button
              onClick={() => updateQuantity(item.id, item.qty - 1)}
              className="flex size-7 items-center justify-center text-neutral-400 hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-medium text-white">
              {item.qty}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.qty + 1)}
              className="flex size-7 items-center justify-center text-neutral-400 hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.id)}
            className="flex size-7 items-center justify-center rounded-md text-neutral-500 hover:bg-white/[0.06] hover:text-red-400 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
