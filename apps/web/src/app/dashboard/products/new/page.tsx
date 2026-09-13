import { ProductForm } from "@/features/products/components/product-form";

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div className="flex flex-col gap-1 border-b border-border/50 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          New Product
        </h1>
        <p className="text-sm text-muted-foreground">
          Add a new product to your inventory.
        </p>
      </div>
      <div className="w-full">
        <ProductForm />
      </div>
    </div>
  );
}
