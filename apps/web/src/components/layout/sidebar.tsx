"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PackageIcon, ShoppingCartIcon, MenuIcon } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartButton } from "./cart-button";

const sidebarLinks = [
  { href: "/dashboard/products", label: "Products", icon: PackageIcon },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCartIcon },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      {sidebarLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent",
              isActive
                ? "border-l-2 border-foreground bg-sidebar-accent text-sidebar-accent-foreground"
                : "border-l-2 border-transparent text-sidebar-foreground",
            )}
          >
            <Icon className="size-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-12 items-center border-b border-sidebar-border px-4">
          <span className="text-xs font-medium tracking-widest uppercase text-sidebar-foreground/60">
            Dashboard
          </span>
        </div>
        <SidebarNav />
      </aside>

      {/* Mobile header bar */}
      <header className="flex h-12 items-center justify-between border-b border-border px-4 lg:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon-sm" />
            }
          >
            <MenuIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-12 items-center border-b border-sidebar-border px-4">
              <span className="text-xs font-medium tracking-widest uppercase text-sidebar-foreground/60">
                Dashboard
              </span>
            </div>
            <SidebarNav />
          </SheetContent>
        </Sheet>
        <CartButton />
      </header>
    </>
  );
}
