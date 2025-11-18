import { useQuery } from "@tanstack/react-query";
import { CryptoCoin } from "@/lib/types/crypto";



const isClient = typeof window !== "undefined";



export const getFavoriteIds = (): string[] => {
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
): Promise<{ coins: CryptoCoin[]; total: number }> => {
  let apiUrl = "";
  const baseUrl = "https://api.coingecko.com/api/v3";
  if (showFavoritesOnly) {
    const favoriteIds = getFavoriteIds();
    if (favoriteIds.length === 0) return { coins: [], total: 0 };
    apiUrl = `${baseUrl}/coins/markets?vs_currency=usd&ids=${favoriteIds.join(
      ","
    )}&sparkline=true`;
  } else {
    apiUrl = `${baseUrl}/coins/markets?vs_currency=usd&sparkline=true&page=${page}&per_page=10&order=market_cap_desc`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch crypto data");
    }
    const data: CryptoCoin[] = await response.json();
    const total = Number(response.headers.get("total")) || 0;

    return { coins: data, total: total };
  } catch (error) {
    console.error("Error fetching crypto data:", error);
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
  });
};
