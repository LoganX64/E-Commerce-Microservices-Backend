import { ProductForm } from "@/features/products/components/product-form";

export default function NewProductPage() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-white">
        New product
      </h1>
      <p className="mt-1 text-sm text-neutral-400">
        Add a new product to your catalog
      </p>
      <div className="mt-6 max-w-lg">
        <ProductForm />
      </div>
    </>
  );
}
