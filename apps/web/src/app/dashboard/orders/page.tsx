import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getOrders } from "@/features/orders/api";
import { OrdersDashboardView } from "@/features/orders/components/orders-dashboard-view";

export default async function DashboardOrdersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Orders
            </h1>
            <p className="text-sm text-muted-foreground">
              Track and manage customer orders.
            </p>
          </div>
        </div>
        <OrdersDashboardView />
      </div>
    </HydrationBoundary>
  );
}
