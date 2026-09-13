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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Orders
        </h1>
      </div>
      <div className="mt-6">
        <OrdersDashboardView />
      </div>
    </HydrationBoundary>
  );
}