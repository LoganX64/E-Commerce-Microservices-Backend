"use client";

import { Marquee } from "@/components/ui/marquee";

const firstRow = [
  {
    quote:
      "The product quality exceeded my expectations. Fast shipping and excellent customer service.",
    name: "Sarah Chen",
    title: "Verified Buyer",
  },
  {
    quote:
      "I've been shopping here for months and every order arrives perfectly. Highly recommend.",
    name: "Marcus Johnson",
    title: "Repeat Customer",
  },
  {
    quote:
      "The curation is outstanding. Every item feels thoughtfully selected and premium.",
    name: "Elena Rodriguez",
    title: "First-time Buyer",
  },
];

const secondRow = [
  {
    quote:
      "Seamless checkout experience. The product pages are beautiful and informative.",
    name: "David Park",
    title: "Verified Buyer",
  },
  {
    quote:
      "Found exactly what I was looking for. The search and filtering actually work well.",
    name: "Amara Okafor",
    title: "Repeat Customer",
  },
  {
    quote:
      "Great selection of independent makers. Nice to support small businesses this easily.",
    name: "James Mitchell",
    title: "Verified Buyer",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative w-full bg-neutral-50 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            What People Are Saying
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <Marquee items={firstRow} direction="left" speed="normal" />
          <Marquee items={secondRow} direction="right" speed="normal" />
        </div>
      </div>
    </section>
  );
}
