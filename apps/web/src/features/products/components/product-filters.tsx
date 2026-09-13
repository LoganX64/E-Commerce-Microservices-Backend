"use client";

import { Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export function ProductFilters({
  search,
  onSearchChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
        <Input
          placeholder="Search products"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20"
        />
      </div>

      {/* Price range */}
      <div className="flex items-center gap-2">
        <span title="Filter by minimum and maximum price">
          <HelpCircle className="size-4 text-neutral-500 shrink-0" />
        </span>
        <div className="flex items-center gap-1.5">
          <Input
            type="number"
            placeholder="Min"
            min={0}
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-20 border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="text-neutral-500">–</span>
          <Input
            type="number"
            placeholder="Max"
            min={0}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-20 border-white/[0.08] bg-[#0a0a0a] text-white placeholder:text-neutral-500 focus-visible:border-[#C8A2FF]/40 focus-visible:ring-[#C8A2FF]/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
