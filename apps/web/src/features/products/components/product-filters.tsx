"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  priceRange: {
    min: number;
    max: number;
  };
}

const formatPrice = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return `$${value.toFixed(0)}`;
};

export function ProductFilters({
  search,
  onSearchChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  priceRange,
}: ProductFiltersProps) {
  const selectedMin = minPrice !== "" ? Number(minPrice) : priceRange.min;
  const selectedMax = maxPrice !== "" ? Number(maxPrice) : priceRange.max;

  const handleSliderChange = (value: number | readonly number[]) => {
    const values = Array.isArray(value) ? value : [value];
    if (values.length !== 2) return;
    onMinPriceChange(String(values[0]));
    onMaxPriceChange(String(values[1]));
  };

  const hasPriceFilter = minPrice !== "" || maxPrice !== "";

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-9 pl-9 text-sm"
        />
      </div>

      {/* Price filter */}
      {priceRange.max > priceRange.min && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium text-muted-foreground">
              Price
            </span>

            <div className="flex items-center gap-1">
              <Input
                type="number"
                placeholder="Min"
                min={0}
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="h-7 w-20 text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-xs text-muted-foreground">&ndash;</span>
              <Input
                type="number"
                placeholder="Max"
                min={0}
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="h-7 w-20 text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>

            {hasPriceFilter && (
              <button
                type="button"
                onClick={() => {
                  onMinPriceChange("");
                  onMaxPriceChange("");
                }}
                className="ml-auto shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <Slider
            min={priceRange.min}
            max={priceRange.max}
            step={1}
            value={[selectedMin, selectedMax]}
            onValueChange={handleSliderChange}
            className="w-full"
          />

          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{formatPrice(priceRange.min)}</span>
            <span>{formatPrice(priceRange.max)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
