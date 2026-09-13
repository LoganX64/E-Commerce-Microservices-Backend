import Link from "next/link";
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
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Back to home
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of your store
      </p>
      <div className="mt-6">
        <DashboardStats />
      </div>
    </HydrationBoundary>
  );
}
