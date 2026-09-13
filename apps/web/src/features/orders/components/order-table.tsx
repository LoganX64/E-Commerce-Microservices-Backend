"use client";

import Link from "next/link";
import { EyeIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Order } from "@/features/orders/types";

export function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a]">
      <Table>
        <TableHeader>
          <TableRow className="border-white/[0.08] hover:bg-transparent">
            <TableHead className="text-neutral-400">ID</TableHead>
            <TableHead className="text-neutral-400">Customer</TableHead>
            <TableHead className="text-neutral-400">Products</TableHead>
            <TableHead className="text-neutral-400">Total</TableHead>
            <TableHead className="w-[80px] text-neutral-400">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-white/[0.08]">
              <TableCell className="font-mono text-xs text-neutral-400">
                #{order.id}
              </TableCell>
              <TableCell className="font-medium text-white">
                {order.customer.name}
              </TableCell>
              <TableCell className="text-neutral-400">
                {order.products.length} item{order.products.length !== 1 ? "s" : ""}
              </TableCell>
              <TableCell className="text-white">
                ${order.totalAmount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button
                  render={<Link href={`/dashboard/orders/${order.id}`} />}
                  variant="ghost"
                  size="icon-sm"
                  className="text-neutral-400 hover:text-white"
                >
                  <EyeIcon className="size-3.5" />
                  <span className="sr-only">View</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}