import { TableSkeleton } from "@/components/ui/skeleton";

export default function DashboardProductsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-[#0a0a0a]" />
        <div className="h-10 w-32 animate-pulse rounded-lg bg-[#0a0a0a]" />
      </div>
      <TableSkeleton columns={4} />
    </div>
  );
}