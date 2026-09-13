import Link from "next/link";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts } from "@/features/products/api";
import { getOrders } from "@/features/orders/api";
import { DashboardStats } from "./components/dashboard-stats";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["products"], queryFn: getProducts }),
    queryClient.prefetchQuery({ queryKey: ["orders"], queryFn: getOrders }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to VoltGrid. Here&apos;s an overview of your store.
          </p>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Quick Actions */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-card-foreground">
            Quick Actions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your electronics inventory and orders.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              render={<Link href="/dashboard/products/new" />}
              nativeButton={false}
              className="rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
            >
              Add Product
            </Button>
            <Button
              render={<Link href="/dashboard/orders/new" />}
              variant="outline"
              className="rounded-lg font-semibold"
            >
              Create Order
            </Button>
            <Button
              render={<Link href="/" />}
              variant="ghost"
              className="rounded-lg font-semibold"
            >
              View Store
            </Button>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
