"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/hooks/use-cart";
import type { Product } from "@/features/products/types";

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function useScramble(text: string, active: boolean, speed = 30) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevActive = useRef(active);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!active) {
      if (prevActive.current) setDisplay(text);
      prevActive.current = false;
      return;
    }

    prevActive.current = true;
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return text[i];
            if (char === " ") return " ";
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join(""),
      );
      iteration += 1 / 3;
      if (iteration >= text.length && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplay(text);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, text, speed]);

  return display;
}

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const scrambledCode = useScramble(product.code, hovered);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem({
        id: product.id,
        name: product.name,
        rate: product.price,
      });
    },
    [addItem, product],
  );

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] transition-colors duration-300",
          "hover:border-[#C8A2FF]/30",
        )}
        animate={{
          boxShadow: hovered
            ? "0 0 30px rgba(200,162,255,0.08), 0 0 60px rgba(200,162,255,0.04)"
            : "0 0 0px rgba(200,162,255,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="mb-1 font-mono text-[11px] tracking-wider text-[#C8A2FF]/70">
            {scrambledCode}
          </p>
          <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-white">
            ${product.price.toFixed(2)}
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full border-white/[0.08] bg-white/[0.03] text-white hover:bg-[#C8A2FF]/10 hover:border-[#C8A2FF]/30 hover:text-[#C8A2FF]"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
