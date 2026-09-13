import Link from "next/link";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getOrders } from "@/features/orders/api";
import { OrdersDashboardView } from "@/features/orders/components/orders-dashboard-view";
import { Button } from "@/components/ui/button";

export default async function DashboardOrdersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Orders
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track and manage customer orders.
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/orders/new" />}
            nativeButton={false}
            className="rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
          >
            Create Order
          </Button>
        </div>
        <OrdersDashboardView />
      </div>
    </HydrationBoundary>
  );
}
