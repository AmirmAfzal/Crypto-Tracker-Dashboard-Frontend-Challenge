import { useQuery } from "@tanstack/react-query";
import { CryptoCoin } from "@/lib/types/crypto";

const CACHE_KEY = "crypto-cache";
const CACHE_TIMESTAMP_KEY = "crypto-cache-timestamp";

const isClient = typeof window !== "undefined";

const getCachedData = (page: number): CryptoCoin[] | null => {
  if (!isClient) return null;
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}-${page}`);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error("Error reading from cache:", error);
  }
  return null;
};

const setCachedData = (data: CryptoCoin[], page: number) => {
  if (!isClient) return;
  try {
    localStorage.setItem(`${CACHE_KEY}-${page}`, JSON.stringify(data));
    localStorage.setItem(
      `${CACHE_TIMESTAMP_KEY}-${page}`,
      Date.now().toString()
    );
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
};

const getFavoriteIds = (): string[] => {
  if (!isClient) return [];
  try {
    const stored = localStorage.getItem("crypto-favorites");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading favorite coins from localStorage:", error);
    return [];
  }
};

const fetchCryptoData = async (
  page: number,
  showFavoritesOnly?: boolean
): Promise<CryptoCoin[]> => {
  let apiUrl = "";

  if (showFavoritesOnly) {
    const favoriteIds = getFavoriteIds();
    if (favoriteIds.length === 0) return [];
    apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=${page}&per_page=10&ids=${favoriteIds.join(
      ","
    )}&sparkline=true`;
  } else {
    apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&page=${page}&per_page=10&order=market_cap_desc`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch crypto data");
    }
    const data: CryptoCoin[] = await response.json();
    if (!showFavoritesOnly) setCachedData(data, page);
    return data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    if (!showFavoritesOnly) {
      const cachedData = getCachedData(page);
      if (cachedData) return cachedData;
    }
    throw error;
  }
};

export const useCryptoData = (
  page: number = 1,
  showFavoritesOnly?: boolean
) => {
  return useQuery({
    queryKey: ["crypto-data", page, showFavoritesOnly],
    queryFn: () => fetchCryptoData(page, showFavoritesOnly),
    refetchInterval: 30000,
    staleTime: 25000,
    retry: 2,
    initialData:
      isClient && !showFavoritesOnly
        ? getCachedData(page) || undefined
        : undefined,
  });
};
