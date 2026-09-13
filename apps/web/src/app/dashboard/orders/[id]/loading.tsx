export default function DashboardOrderDetailLoading() {
  return (
    <div className="space-y-6">
      {/* Back button skeleton */}
      <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />

      {/* Order header skeleton */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 animate-pulse rounded bg-[#1a1a1a]" />
            <div className="h-4 w-48 animate-pulse rounded bg-[#1a1a1a]" />
          </div>
          <div className="space-y-2 text-right">
            <div className="h-4 w-16 animate-pulse rounded bg-[#1a1a1a]" />
            <div className="h-8 w-24 animate-pulse rounded bg-[#1a1a1a]" />
          </div>
        </div>

        {/* Separator */}
        <div className="my-6 h-px bg-white/[0.08]" />

        {/* Products skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-white/[0.08] p-4"
            >
              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-[#1a1a1a]" />
                <div className="h-3 w-24 animate-pulse rounded bg-[#1a1a1a]" />
              </div>
              <div className="h-4 w-16 animate-pulse rounded bg-[#1a1a1a]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}