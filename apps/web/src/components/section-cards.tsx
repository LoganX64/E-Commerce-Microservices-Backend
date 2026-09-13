"use client"

import { PackageIcon, ShoppingCartIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react"
import { useProducts } from "@/features/products/hooks/use-products"
import { useOrders } from "@/features/orders/hooks/use-orders"

export function SectionCards() {
  const { data: products = [] } = useProducts()
  const { data: orders = [] } = useOrders()

  const totalRevenue = Array.isArray(orders) ? orders.reduce((sum, o) => sum + o.totalAmount, 0) : 0
  const avgOrderValue = orders && Array.isArray(orders) && orders.length > 0 ? totalRevenue / orders.length : 0

  const cards = [
    {
      label: "TOTAL PRODUCTS",
      value: String(products.length),
      icon: PackageIcon,
    },
    {
      label: "TOTAL ORDERS",
      value: String(orders.length),
      icon: ShoppingCartIcon,
    },
    {
      label: "REVENUE",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSignIcon,
    },
    {
      label: "AVG. ORDER VALUE",
      value: `$${avgOrderValue.toFixed(2)}`,
      icon: TrendingUpIcon,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-border">
      {cards.map((card) => (
        <div key={card.label} className="flex flex-col gap-6 border-b border-r border-border p-6 bg-background/50 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <card.icon className="size-4" strokeWidth={2} />
            <span className="text-xs font-semibold tracking-wider">{card.label}</span>
          </div>
          <div className="text-4xl font-light tabular-nums tracking-tight text-foreground">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  )
}
