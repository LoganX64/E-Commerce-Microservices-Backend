"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  createProductSchema,
  type CreateProductInput,
} from "@/features/products/schemas";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/features/products/hooks/use-product-mutations";
import type { Product } from "@/features/products/types";

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: product
      ? {
          code: product.code,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
        }
      : undefined,
  });

  const onSubmit = (data: CreateProductInput) => {
    if (isEditing) {
      updateProduct.mutate(
        { id: product.id, data },
        { onSuccess: () => router.push("/dashboard/products") },
      );
    } else {
      createProduct.mutate(data, {
        onSuccess: () => router.push("/dashboard/products"),
      });
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Code */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="code">Code</Label>
        <Input
          id="code"
          placeholder="e.g. WDG-001"
          {...register("code")}
        />
        {errors.code && (
          <p className="text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Product name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the product"
          {...register("description")}
          className="min-h-24"
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          {...register("price", { valueAsNumber: true })}
          className="w-40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {errors.price && (
          <p className="text-xs text-destructive">{errors.price.message}</p>
        )}
      </div>

      {/* Image URL */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="url"
          placeholder="https://example.com/image.jpg"
          {...register("image")}
        />
        {errors.image && (
          <p className="text-xs text-destructive">{errors.image.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
        >
          {isPending
            ? "Saving..."
            : isEditing
              ? "Save changes"
              : "Create product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
