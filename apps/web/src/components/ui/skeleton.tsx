interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

export function TableSkeleton({ columns, rows = 5 }: TableSkeletonProps) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a]">
      <div className="space-y-0 p-4">
        {/* Header row */}
        <div className="flex gap-4 border-b border-white/[0.08] pb-3">
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={i}
              className="h-4 animate-pulse rounded bg-[#1a1a1a]"
              style={{ width: `${100 / columns}%` }}
            />
          ))}
        </div>
        {/* Data rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 border-b border-white/[0.08] py-3 last:border-0"
          >
            {Array.from({ length: columns }).map((_, j) => (
              <div
                key={j}
                className="h-4 animate-pulse rounded bg-[#1a1a1a]"
                style={{ width: `${100 / columns}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}