import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts } from "@/features/products/api";
import { ProductsView } from "@/features/products/components/products-view";

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Products
          </h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Browse our curated collection
          </p>
        </div>
        <ProductsView />
      </section>
    </HydrationBoundary>
  );
}
