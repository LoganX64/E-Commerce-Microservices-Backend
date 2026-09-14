import Link from "next/link";

export function HomepageHero() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.5_0.134_242.749/0.1),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 59px,oklch(0.5_0.134_242.749/1) 59px,oklch(0.5_0.134_242.749/1) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,oklch(0.5_0.134_242.749/1) 59px,oklch(0.5_0.134_242.749/1) 60px)",
        }}
      />
      <div className="absolute -right-32 -top-32 size-[500px] rounded-full bg-[oklch(0.78_0.14_320/0.12)] blur-[120px]" />
      <div className="absolute -bottom-48 -left-48 size-[400px] rounded-full bg-[oklch(0.5_0.134_242.749/0.08)] blur-[100px]" />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          VoltGrid
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
          Premium electronics goods curated for you. Browse top-tier gadgets,
          components, and accessories.
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
