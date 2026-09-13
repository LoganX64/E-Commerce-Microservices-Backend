import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="text-4xl font-bold tracking-tight text-white">404</h1>
      <p className="mt-2 text-neutral-400">Page not found</p>
      <p className="mt-1 text-sm text-neutral-500">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-[#C8A2FF] hover:text-white"
      >
        Go home
      </Link>
    </div>
  );
}