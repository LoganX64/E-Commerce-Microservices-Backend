import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getProducts } from "@/features/products/api";
import { HomepageHero } from "@/components/layout/homepage-hero";


export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomepageHero />

    </HydrationBoundary>
  );
}
