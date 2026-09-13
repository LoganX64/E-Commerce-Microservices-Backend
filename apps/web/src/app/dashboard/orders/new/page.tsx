import { CreateOrderForm } from "@/features/orders/components/create-order-form";

export default function NewOrderPage() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        New order
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Create a new order for a customer
      </p>
      <div className="mt-6 max-w-lg">
        <CreateOrderForm />
      </div>
    </>
  );
}
