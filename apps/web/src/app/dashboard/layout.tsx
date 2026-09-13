import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/40 px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex-1 p-4 lg:p-8 mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </SidebarProvider>
  );
}
