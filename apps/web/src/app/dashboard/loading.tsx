export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar skeleton */}
      <div className="hidden w-56 shrink-0 border-r border-white/[0.08] bg-[#0a0a0a] lg:block" />

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header skeleton */}
          <div className="h-8 w-48 animate-pulse rounded-lg bg-[#0a0a0a]" />

          {/* Content skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-xl border border-white/[0.08] bg-[#0a0a0a]"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}