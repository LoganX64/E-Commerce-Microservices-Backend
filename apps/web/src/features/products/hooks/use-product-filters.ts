import { useMemo, useState } from "react";
import type { Product } from "../types";

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;

    const query = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );
  }, [products, search]);

  return { filteredProducts, search, setSearch };
}
