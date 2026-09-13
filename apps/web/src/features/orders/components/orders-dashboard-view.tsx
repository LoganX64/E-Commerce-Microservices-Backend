"use client";

import { useOrders } from "@/features/orders/hooks/use-orders";
import { OrderTable } from "@/features/orders/components/order-table";

export function OrdersDashboardView() {
  const { data: orders = [], isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="space-y-2 border-t border-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse border-b border-border/40 bg-muted/20"
          />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-border p-12 text-center">
        <p className="text-base font-semibold text-foreground">
          No orders found
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Orders will appear here once customers start purchasing.
        </p>
      </div>
    );
  }

  return <OrderTable orders={orders} />;
}
