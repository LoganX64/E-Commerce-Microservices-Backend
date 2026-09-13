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
        nativeButton={false}
        variant="ghost"
        size="sm"
      >
        <ArrowLeftIcon className="size-4" />
        Back to orders
      </Button>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Order #{order.id}
            </h2>
            <p className="text-sm text-muted-foreground">
              Customer: {order.customer.name} ({order.customer.phone})
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-xl font-bold text-card-foreground">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Products</h3>
          <div className="mt-4 space-y-3">
            {order.products.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium text-card-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${product.rate.toFixed(2)} × {product.qty}
                  </p>
                </div>
                <p className="font-medium text-card-foreground">
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
