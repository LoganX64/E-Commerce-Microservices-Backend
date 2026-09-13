"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="text-2xl font-bold tracking-tight text-white">
        Something went wrong
      </h1>
      <p className="mt-2 text-neutral-400">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-[#C8A2FF] hover:text-white"
      >
        Try again
      </button>
    </div>
  );
}