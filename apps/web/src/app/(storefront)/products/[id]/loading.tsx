export default function ProductDetailLoading() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Image skeleton */}
      <div className="aspect-square animate-pulse rounded-xl border border-border bg-card" />

      {/* Info skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-6 w-32 animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded-lg bg-muted" />
        <div className="pt-4">
          <div className="h-12 w-48 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
