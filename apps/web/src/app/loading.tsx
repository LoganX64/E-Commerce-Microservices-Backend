export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 animate-spin rounded-full border-2 border-neutral-300 border-t-white" />
        <p className="text-sm text-neutral-400">Loading...</p>
      </div>
    </div>
  );
}