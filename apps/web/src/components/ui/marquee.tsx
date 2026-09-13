"use client";

import { cn } from "@/lib/utils";

type MarqueeItem = {
  quote: string;
  name: string;
  title: string;
};

export function Marquee({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: MarqueeItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const duration =
    speed === "fast" ? "20s" : speed === "slow" ? "80s" : "40s";

  return (
    <div
      className={cn(
        "relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,var(--mask-color)_20%,var(--mask-color)_80%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max gap-4 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee-scroll ${duration} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "forwards",
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-border bg-[linear-gradient(180deg,var(--marquee-card-start),var(--marquee-card-end))] px-8 py-6 md:w-[450px]"
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-foreground">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal text-muted-foreground">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-muted-foreground">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
}
