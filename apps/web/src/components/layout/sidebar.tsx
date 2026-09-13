"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, PackageIcon, ShoppingCartIcon, LayoutDashboardIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/dashboard/products", label: "Products", icon: PackageIcon },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCartIcon },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href);
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  render={<Link href={link.href} />}
                  isActive={isActive}
                  tooltip={link.label}
                >
                  <Icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-sidebar-foreground"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            V
          </span>
          <span className="group-data-[collapsible=icon]:hidden">
            VoltGrid
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}
