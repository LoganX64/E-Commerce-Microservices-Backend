"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { createProductSchema, type CreateProductInput } from "@/features/products/schemas";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/features/products/hooks/use-product-mutations";
import type { Product } from "@/features/products/types";

interface ProductFormProps {
  product?: Product;
}

function generateProductCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PRD-${randomStr}`;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    setValue,
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
      : {
          code: generateProductCode(),
        },
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="space-y-5">
        {/* Code */}
        <div className="space-y-2">
          <Label htmlFor="code" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Code</Label>
          <div className="flex items-center gap-2">
            <Input
              id="code"
              placeholder="e.g. PRD-8A3F2K"
              className="rounded-none border-border"
              {...register("code")}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none gap-1.5 shrink-0"
              onClick={() => setValue("code", generateProductCode(), { shouldValidate: true })}
            >
              <RefreshCw className="size-3.5" />
              Generate
            </Button>
          </div>
          {errors.code && (
            <p className="text-xs text-destructive">{errors.code.message}</p>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</Label>
          <Input
            id="name"
            placeholder="Product name"
            className="rounded-none border-border"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the product"
            {...register("description")}
            className="min-h-[100px] resize-none rounded-none border-border"
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            {...register("price", { valueAsNumber: true })}
            className="w-40 rounded-none border-border [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {errors.price && (
            <p className="text-xs text-destructive">{errors.price.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Label htmlFor="image" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Image URL</Label>
          <Input
            id="image"
            type="url"
            placeholder="https://example.com/image.jpg"
            className="rounded-none border-border"
            {...register("image")}
          />
          {errors.image && (
            <p className="text-xs text-destructive">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-border/50">
        <Button
          type="button"
          variant="outline"
          className="rounded-none"
          onClick={() => router.push("/dashboard/products")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-none bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/80"
        >
          {isPending
            ? "Saving..."
            : isEditing
              ? "Save changes"
              : "Create product"}
        </Button>
      </div>
    </form>
  );
}
