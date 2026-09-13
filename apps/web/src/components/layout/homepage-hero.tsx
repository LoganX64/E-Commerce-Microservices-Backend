"use client";

import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";

export function HomepageHero() {
  return (
    <section className="relative flex h-[80vh] min-h-[500px] w-full items-center justify-center overflow-hidden bg-neutral-950">
      <BackgroundBeams className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-0">
        <SparklesCore
          className="h-full w-full"
          particleDensity={80}
          particleColor="#C8A2FF"
          particleSize={2}
          speed={1.5}
          background="transparent"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Built Different
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-neutral-400">
          E-commerce infrastructure that adapts to your business. Browse
          curated products from independent makers.
        </p>
        <Button
          render={<Link href="/products" />}
          size="lg"
          className="rounded-full px-8"
        >
          Browse Products
        </Button>
      </div>
    </section>
  );
}
