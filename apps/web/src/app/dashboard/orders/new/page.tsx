import { CreateOrderForm } from "@/features/orders/components/create-order-form";

export default function NewOrderPage() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-white">
        New order
      </h1>
      <p className="mt-1 text-sm text-neutral-400">
        Create a new order for a customer
      </p>
      <div className="mt-6 max-w-lg">
        <CreateOrderForm />
      </div>
    </>
  );
}