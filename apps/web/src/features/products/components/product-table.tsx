"use client";

import { useState } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteProduct } from "@/features/products/hooks/use-product-mutations";
import type { Product } from "@/features/products/types";

export function ProductTable({ products }: { products: Product[] }) {
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const deleteProduct = useDeleteProduct();

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteProduct.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  return (
    <>
      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground w-16">
                Image
              </TableHead>
              <TableHead className="text-muted-foreground min-w-[100px]">
                Name
              </TableHead>
              <TableHead className="text-muted-foreground w-24">
                Code
              </TableHead>
              <TableHead className="text-muted-foreground">
                Description
              </TableHead>
              <TableHead className="text-muted-foreground w-20">
                Price
              </TableHead>
              <TableHead className="text-muted-foreground w-[100px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-border">
                <TableCell className="flex items-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={`${product.name} thumbnail`}
                      className="h-10 w-10 rounded object-cover border"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs">
                      No Image
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-card-foreground min-w-[100px]">
                  {product.name}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground w-24">
                  {product.code}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground line-clamp-2 max-w-[200px]">
                  {product.description}
                </TableCell>
                <TableCell className="text-card-foreground font-mono w-20">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="flex items-center gap-1 w-[100px]">
                  <Button
                    render={<Link href={`/dashboard/products/${product.id}`} />}
                    nativeButton={false}
                    variant="ghost"
                    size="icon-sm"
                  >
                    <PencilIcon className="size-3.5" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleteTarget(product)}
                  >
                    <TrashIcon className="size-3.5" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteTarget?.name}&rdquo;?
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}