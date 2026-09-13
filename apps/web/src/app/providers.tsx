"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense, useEffect } from "react";
import { getQueryClient } from "./get-query-client";
import { useCartStore } from "@/features/cart/store";

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/production").then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Suspense fallback={null}>
        {process.env.NODE_ENV === "production" ? (
          <ReactQueryDevtoolsProduction />
        ) : (
          <ReactQueryDevtools />
        )}
      </Suspense>
    </QueryClientProvider>
  );
}
