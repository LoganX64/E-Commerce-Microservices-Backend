import { ProductForm } from "@/features/products/components/product-form";

export default function NewProductPage() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        New product
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add a new product to your catalog
      </p>
      <div className="mt-6 max-w-lg">
        <ProductForm />
      </div>
    </>
  );
}
