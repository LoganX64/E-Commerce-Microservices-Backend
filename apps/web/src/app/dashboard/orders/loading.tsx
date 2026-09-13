import { TableSkeleton } from "@/components/ui/skeleton";

export default function DashboardOrdersLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
      <TableSkeleton columns={5} />
    </div>
  );
}
