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
    <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-400">{label}</span>
        <Icon className="size-4 text-neutral-500" />
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
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
