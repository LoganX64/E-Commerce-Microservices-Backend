import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 border-t border-border lg:border-t-0">
        <div className="mx-auto max-w-6xl p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
