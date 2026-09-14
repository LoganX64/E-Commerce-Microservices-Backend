import { useMemo, useState } from "react";
import type { Product } from "../types";

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const priceRange = useMemo(() => {
    if (products.length === 0) {
      return {
        min: 0,
        max: 0,
      };
    }

    const prices = products.map((product) => product.price);

    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.code.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      );
    }

    const min =
      minPrice !== "" ? Number.parseFloat(minPrice) : undefined;

    const max =
      maxPrice !== "" ? Number.parseFloat(maxPrice) : undefined;

    if (min !== undefined && !Number.isNaN(min)) {
      result = result.filter((product) => product.price >= min);
    }

    if (max !== undefined && !Number.isNaN(max)) {
      result = result.filter((product) => product.price <= max);
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

    priceRange,
  };
}