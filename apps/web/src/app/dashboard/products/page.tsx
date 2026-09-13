import Link from "next/link";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts } from "@/features/products/api";
import { ProductsDashboardView } from "@/features/products/components/products-dashboard-view";
import { Button } from "@/components/ui/button";

export default async function DashboardProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Products
        </h1>
        <Button
          render={<Link href="/dashboard/products/new" />}
          nativeButton={false}
          className="rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
        >
          Add product
        </Button>
      </div>
      <div className="mt-6">
        <ProductsDashboardView />
      </div>
    </HydrationBoundary>
  );
}
