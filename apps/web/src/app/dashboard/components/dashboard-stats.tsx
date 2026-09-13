"use client";

import { useProducts } from "@/features/products/hooks/use-products";
import { useOrders } from "@/features/orders/hooks/use-orders";
import { PackageIcon, ShoppingCartIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-card/80">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUpIcon className="size-3 text-emerald-500" />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

export function DashboardStats() {
  const { data: products = [] } = useProducts();
  const { data: orders = [] } = useOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderValue =
    orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Products"
        value={String(products.length)}
        icon={PackageIcon}
      />
      <StatCard
        label="Total Orders"
        value={String(orders.length)}
        icon={ShoppingCartIcon}
      />
      <StatCard
        label="Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
        icon={DollarSignIcon}
        trend="All time"
      />
      <StatCard
        label="Avg. Order Value"
        value={`$${avgOrderValue.toFixed(2)}`}
        icon={TrendingUpIcon}
      />
    </div>
  );
}
