import { notFound } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProduct } from "@/features/products/api";
import { EditProductView } from "@/features/products/components/edit-product-view";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const product = queryClient.getQueryData< Awaited<ReturnType<typeof getProduct>> >(["product", productId]);

  if (!product) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditProductView productId={productId} />
    </HydrationBoundary>
  );
}
