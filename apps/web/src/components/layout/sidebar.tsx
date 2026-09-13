"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, PackageIcon, ShoppingCartIcon } from "lucide-react";
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
  { href: "/", label: "Home", icon: HomeIcon },
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
              link.href === "/"
                ? pathname === "/"
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
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}
