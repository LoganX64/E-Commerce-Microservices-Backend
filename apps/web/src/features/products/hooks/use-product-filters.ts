import { useMemo, useState } from "react";
import type { Product } from "../types";

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products;

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    const min = minPrice !== "" ? parseFloat(minPrice) : undefined;
    const max = maxPrice !== "" ? parseFloat(maxPrice) : undefined;

    if (min !== undefined && !isNaN(min)) {
      result = result.filter((p) => p.price >= min);
    }
    if (max !== undefined && !isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }

    return result;
  }, [products, search, minPrice, maxPrice]);

  return {
    filteredProducts,
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  };
}
