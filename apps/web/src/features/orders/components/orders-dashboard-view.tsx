"use client";

import { useOrders } from "@/features/orders/hooks/use-orders";
import { OrderTable } from "@/features/orders/components/order-table";

export function OrdersDashboardView() {
  const { data: orders = [], isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse rounded-xl border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No orders yet.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Orders will appear here once customers start purchasing.
        </p>
      </div>
    );
  }

  return <OrderTable orders={orders} />;
}
