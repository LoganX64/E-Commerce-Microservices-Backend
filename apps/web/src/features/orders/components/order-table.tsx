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
    <>
      {/* Desktop table */}
      <div className="hidden md:block border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Products</TableHead>
              <TableHead className="text-muted-foreground">Total</TableHead>
              <TableHead className="w-[80px] text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-border">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  #{order.id}
                </TableCell>
                <TableCell className="font-medium text-card-foreground">
                  {order.customer.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.products.length} item{order.products.length !== 1 ? "s" : ""}
                </TableCell>
                <TableCell className="text-card-foreground">
                  ${order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    render={<Link href={`/dashboard/orders/${order.id}`} />}
                    nativeButton={false}
                    variant="ghost"
                    size="icon-sm"
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

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-2">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-muted-foreground">
                #{order.id}
              </p>
              <p className="truncate text-sm font-medium text-card-foreground">
                {order.customer.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {order.products.length} item{order.products.length !== 1 ? "s" : ""} &middot; ${order.totalAmount.toFixed(2)}
              </p>
            </div>

            <Button
              render={<Link href={`/dashboard/orders/${order.id}`} />}
              nativeButton={false}
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
            >
              <EyeIcon className="size-3.5" />
              <span className="sr-only">View</span>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
