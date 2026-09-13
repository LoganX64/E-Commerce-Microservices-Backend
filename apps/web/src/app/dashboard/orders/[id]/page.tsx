import { notFound } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getOrder } from "@/features/orders/api";
import { OrderDetail } from "@/features/orders/components/order-detail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
  });

  const order = queryClient.getQueryData< Awaited<ReturnType<typeof getOrder>> >(["order", orderId]);

  if (!order) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderDetail order={order} />
    </HydrationBoundary>
  );
}