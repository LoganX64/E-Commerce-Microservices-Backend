import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowLeft } from "lucide-react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getOrder } from "@/features/orders/api";
import { Button } from "@/components/ui/button";

export default async function CustomerOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);

  if (isNaN(orderId)) notFound();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
  });

  const order = queryClient.getQueryData<Awaited<ReturnType<typeof getOrder>>>(["order", orderId]);

  if (!order) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
            <CheckCircle2 className="size-10 stroke-[1.75]" />
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Your order <span className="font-semibold text-foreground">#{order.id}</span> has been placed successfully.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
          {/* Customer info */}
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Customer Details
              </p>
              <h2 className="mt-1 text-lg font-bold text-card-foreground">
                {order.customer.name}
              </h2>
              <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Order Reference
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-primary">
                ORDER-{order.id}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Order Items
            </h3>
            <div className="mt-4 space-y-3">
              {order.products.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 p-4 transition-colors"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="truncate font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${product.rate.toFixed(2)} × {product.qty}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">
                    ${(product.rate * product.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6 sm:items-end">
            <div className="flex w-full justify-between sm:w-64 text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between sm:w-64 text-sm text-muted-foreground">
              <span>Shipping</span>
              <span className="text-emerald-500 font-medium">Free</span>
            </div>
            <div className="my-2 h-px w-full sm:w-64 bg-border" />
            <div className="flex w-full justify-between sm:w-64 text-lg font-bold text-foreground">
              <span>Total Paid</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            render={<Link href="/products" />}
            nativeButton={false}
            size="lg"
            className="w-full sm:w-auto rounded-xl bg-primary text-primary-foreground font-semibold px-8 hover:bg-primary/90"
          >
            <ShoppingBag className="mr-2 size-4" />
            Continue Shopping
          </Button>

          <Button
            render={<Link href="/" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-xl px-8"
          >
            <ArrowLeft className="mr-2 size-4" />
            Return Home
          </Button>
        </div>
      </section>
    </HydrationBoundary>
  );
}
