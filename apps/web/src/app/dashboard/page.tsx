import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts } from "@/features/products/api";
import { getOrders } from "@/features/orders/api";
import { DashboardStats } from "./components/dashboard-stats";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["products"], queryFn: getProducts }),
    queryClient.prefetchQuery({ queryKey: ["orders"], queryFn: getOrders }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="text-2xl font-bold tracking-tight text-white">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-neutral-400">
        Overview of your store
      </p>
      <div className="mt-6">
        <DashboardStats />
      </div>
    </HydrationBoundary>
  );
}
