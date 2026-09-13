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
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Products
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your electronics inventory.
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/products/new" />}
            nativeButton={false}
            className="rounded-none bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
          >
            Add Product
          </Button>
        </div>
        <ProductsDashboardView />
      </div>
    </HydrationBoundary>
  );
}
