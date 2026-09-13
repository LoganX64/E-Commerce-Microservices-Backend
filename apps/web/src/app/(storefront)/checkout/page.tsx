"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useCreateOrder } from "@/features/orders/hooks/use-order-mutations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = totalPrice();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Nothing to checkout
        </h1>
        <p className="mt-2 text-muted-foreground">
          Add some products to your cart first.
        </p>
        <Button
          render={<Link href="/products" />}
          nativeButton={false}
          size="lg"
          className="mt-6 rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
        >
          Browse products
        </Button>
      </section>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createOrder.mutate(
      {
        customer: { name: name.trim(), phone: phone.trim() },
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          rate: item.rate,
          qty: item.qty,
        })),
        totalAmount: total,
      },
      {
        onSuccess: (order) => {
          clearCart();
          router.push(`/dashboard/orders/${order.id}`);
        },
      },
    );
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Order form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-medium text-muted-foreground">Customer information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={createOrder.isPending}
            className="w-full rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
          >
            {createOrder.isPending ? "Placing order..." : "Place order"}
          </Button>
        </form>

        {/* Order summary */}
        <div className="rounded-xl border border-border bg-card p-5 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-base font-semibold text-card-foreground">Order summary</h2>
          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} × {item.qty}
                </span>
                <span className="text-card-foreground">${(item.rate * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between text-base font-bold">
            <span className="text-card-foreground">Total</span>
            <span className="text-card-foreground">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
