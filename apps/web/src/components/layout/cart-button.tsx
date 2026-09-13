"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/features/cart/hooks/use-cart";
import { Badge } from "@/components/ui/badge";

const emptySubscribe = () => () => {};

export function CartButton() {
  const count = useCart().totalItems();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <Link
      href="/cart"
      className="relative inline-flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-muted"
    >
      <ShoppingCartIcon className="size-4" />
      {mounted && count > 0 && (
        <Badge
          variant="default"
          className="absolute -right-1 -top-1 size-4 justify-center rounded-full p-0 text-[10px] font-semibold"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {count}
        </Badge>
      )}
      <span className="sr-only" suppressHydrationWarning>Cart</span>
    </Link>
  );
}
