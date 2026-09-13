import Link from "next/link";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts } from "@/features/products/api";
import { getOrders } from "@/features/orders/api";
import { SectionCards as DashboardStats } from "@/components/section-cards";

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
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Quick Actions
            </h2>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-8">
            <Link 
              href="/dashboard/products/new" 
              className="group flex items-center gap-2 text-base font-medium transition-colors hover:text-primary"
            >
              Add Product <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </Link>
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-base font-medium transition-colors hover:text-primary"
            >
              View Store <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
