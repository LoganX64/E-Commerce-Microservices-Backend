"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/features/orders/types";

export function OrderDetail({ order }: { order: Order }) {
  return (
    <div className="space-y-6">
      <Button
        render={<Link href="/dashboard/orders" />}
        variant="ghost"
        size="sm"
        className="text-neutral-400 hover:text-white"
      >
        <ArrowLeftIcon className="size-4" />
        Back to orders
      </Button>

      <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Order #{order.id}
            </h2>
            <p className="text-sm text-neutral-400">
              Customer: {order.customer.name} ({order.customer.phone})
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-400">Total</p>
            <p className="text-xl font-bold text-white">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <Separator className="my-6 bg-white/[0.08]" />

        <div>
          <h3 className="text-sm font-medium text-neutral-400">Products</h3>
          <div className="mt-4 space-y-3">
            {order.products.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex items-center justify-between rounded-lg border border-white/[0.08] p-4"
              >
                <div>
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-sm text-neutral-400">
                    ${product.rate.toFixed(2)} × {product.qty}
                  </p>
                </div>
                <p className="font-medium text-white">
                  ${(product.rate * product.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}