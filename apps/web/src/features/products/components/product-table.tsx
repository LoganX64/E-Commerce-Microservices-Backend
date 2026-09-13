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
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.08] hover:bg-transparent">
              <TableHead className="text-neutral-400">Name</TableHead>
              <TableHead className="text-neutral-400">Code</TableHead>
              <TableHead className="text-neutral-400">Price</TableHead>
              <TableHead className="w-[100px] text-neutral-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-white/[0.08]">
                <TableCell className="font-medium text-white">
                  {product.name}
                </TableCell>
                <TableCell className="font-mono text-xs text-neutral-400">
                  {product.code}
                </TableCell>
                <TableCell className="text-white">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      render={<Link href={`/dashboard/products/${product.id}`} />}
                      variant="ghost"
                      size="icon-sm"
                      className="text-neutral-400 hover:text-white"
                    >
                      <PencilIcon className="size-3.5" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-neutral-400 hover:text-red-400"
                      onClick={() => setDeleteTarget(product)}
                    >
                      <TrashIcon className="size-3.5" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="bg-[#1a1a1a] border-white/[0.08] text-white">
          <DialogHeader>
            <DialogTitle>Delete product</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Are you sure you want to delete &ldquo;{deleteTarget?.name}&rdquo;?
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              className="border-white/[0.08] text-white"
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
