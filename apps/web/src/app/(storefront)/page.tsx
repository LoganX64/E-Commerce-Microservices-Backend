import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getProducts } from "@/features/products/api";
import { HomepageHero } from "@/components/layout/homepage-hero";
import { FeaturedProducts } from "@/features/products/components/featured-products";
import { TestimonialsSection } from "@/components/layout/testimonials-section";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = queryClient.getQueryData< Awaited<ReturnType<typeof getProducts>> >(["products"]) ?? [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomepageHero />
      <FeaturedProducts products={products.slice(0, 4)} />
      <TestimonialsSection />
    </HydrationBoundary>
  );
}
