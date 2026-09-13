"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type SparklesProps = {
  className?: string;
  particleColor?: string;
  particleSize?: number;
  particleDensity?: number;
  speed?: number;
  background?: string;
};

function generateParticles(density: number, maxSize: number) {
  const particles = [];
  for (let i = 0; i < density; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * maxSize + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
    });
  }
  return particles;
}

export const SparklesCore = ({
  className,
  particleColor = "#C8A2FF",
  particleSize = 2,
  particleDensity = 80,
}: SparklesProps) => {
  const [particles] = useState(() =>
    generateParticles(particleDensity, particleSize),
  );

  return (
    <div className={cn("relative h-full w-full", className)}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="sparkle-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: particleColor,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <style jsx>{`
        .sparkle-particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: sparkle-float 6s ease-in-out infinite;
        }
        @keyframes sparkle-float {
          0%,
          100% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-20px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
