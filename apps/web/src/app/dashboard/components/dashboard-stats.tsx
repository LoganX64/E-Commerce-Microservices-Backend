"use client";

import { useProducts } from "@/features/products/hooks/use-products";
import { useOrders } from "@/features/orders/hooks/use-orders";
import { PackageIcon, ShoppingCartIcon, DollarSignIcon } from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <p className="mt-2 text-2xl font-bold text-card-foreground">{value}</p>
    </div>
  );
}

export function DashboardStats() {
  const { data: products = [] } = useProducts();
  const { data: orders = [] } = useOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Products"
        value={String(products.length)}
        icon={PackageIcon}
      />
      <StatCard
        label="Orders"
        value={String(orders.length)}
        icon={ShoppingCartIcon}
      />
      <StatCard
        label="Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
        icon={DollarSignIcon}
      />
    </div>
  );
}
