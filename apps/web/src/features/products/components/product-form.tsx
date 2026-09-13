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
        <Label htmlFor="code" className="text-neutral-300">
          Code
        </Label>
        <Input
          id="code"
          placeholder="e.g. WDG-001"
          {...register("code")}
          className="border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20"
        />
        {errors.code && (
          <p className="text-xs text-red-400">{errors.code.message}</p>
        )}
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className="text-neutral-300">
          Name
        </Label>
        <Input
          id="name"
          placeholder="Product name"
          {...register("name")}
          className="border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20"
        />
        {errors.name && (
          <p className="text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description" className="text-neutral-300">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the product"
          {...register("description")}
          className="min-h-24 border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20"
        />
        {errors.description && (
          <p className="text-xs text-red-400">{errors.description.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="price" className="text-neutral-300">
          Price
        </Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          {...register("price", { valueAsNumber: true })}
          className="w-40 border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {errors.price && (
          <p className="text-xs text-red-400">{errors.price.message}</p>
        )}
      </div>

      {/* Image URL */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="image" className="text-neutral-300">
          Image URL
        </Label>
        <Input
          id="image"
          type="url"
          placeholder="https://example.com/image.jpg"
          {...register("image")}
          className="border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20"
        />
        {errors.image && (
          <p className="text-xs text-red-400">{errors.image.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-white text-neutral-950 font-semibold hover:bg-[#C8A2FF] hover:text-white transition-colors"
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
          className="border-white/[0.08] text-white"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
