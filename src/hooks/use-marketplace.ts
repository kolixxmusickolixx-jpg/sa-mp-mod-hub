import { useEffect, useState } from "react";
import { mods, reviews } from "@/lib/marketplace-data";

export function useMarketplace() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 550);
    return () => window.clearTimeout(timer);
  }, []);

  return { mods, reviews, isLoading };
}