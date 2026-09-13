"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    return (
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="beam-line"
              style={{
                left: `${5 + (i * 90) / 20}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>
        <style jsx>{`
          .beam-line {
            position: absolute;
            top: -10%;
            height: 120%;
            width: 1px;
            background: linear-gradient(
              to bottom,
              transparent,
              #18ccfc,
              #6344f5,
              #ae48ff,
              transparent
            );
            opacity: 0;
            animation: beam-fade 8s ease-in-out infinite;
          }
          @keyframes beam-fade {
            0%,
            100% {
              opacity: 0;
              transform: translateY(-20%);
            }
            50% {
              opacity: 0.25;
              transform: translateY(20%);
            }
          }
        `}</style>
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";
