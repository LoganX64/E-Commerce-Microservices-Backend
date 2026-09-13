import Link from "next/link";

export function HomepageHero() {
  return (
    <section className="relative flex h-[80vh] min-h-[500px] w-full items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          Built Different
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
          E-commerce infrastructure that adapts to your business. Browse
          curated products from independent makers.
        </p>
        <Link
          href="/products"
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Browse Products
        </Link>
      </div>
    </section>
  );
}
