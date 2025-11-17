"use client";

import { useState, useMemo, useEffect } from "react";
import { AlertCircle, WifiOff } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useCryptoData } from "@/hooks/useCryptoData";
import { useFavorites } from "@/hooks/useFavorites";
import DashboardHeader from "@/components/DashboardHeader";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import CryptoTable from "./CryptoTable";
import PaginationSection from "./PaginationSection";
import { CryptoCoin } from "@/lib/types/crypto";

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

function useIsOffline() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handle = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", handle);
    window.addEventListener("offline", handle);
    return () => {
      window.removeEventListener("online", handle);
      window.removeEventListener("offline", handle);
    };
  }, []);

  return isOffline;
}

const HomePage = () => {
  const hydrated = useHydrated();
  const isOffline = useIsOffline();

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useCryptoData(page);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!showFavoritesOnly) return data;
    return data.filter((coin : CryptoCoin) => favorites.has(coin.id));
  }, [data, showFavoritesOnly, favorites]);

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Data refreshed",
        description: "Cryptocurrency data has been updated",
      });
    } catch {
      toast({
        title: "Refresh failed",
        description: "Unable to fetch latest data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20">
      <DashboardHeader
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        isRefreshing={isFetching}
        onRefresh={handleRefresh}
        favoriteCount={favorites.size}
      />

      <main className="container mx-auto px-4 py-8">
        {hydrated && isOffline && (
          <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
            <WifiOff className="h-4 w-4 text-yellow-500" />
            <AlertTitle className="text-yellow-500">Offline Mode</AlertTitle>
            <AlertDescription className="text-yellow-600">
              You`re currently offline. Showing cached data from your last
              visit.
            </AlertDescription>
          </Alert>
        )}

        {isError && !data && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message ||
                "Failed to load cryptocurrency data. Please try again later."}
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            {showFavoritesOnly ? "Your Favorites" : "Top Cryptocurrencies"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {showFavoritesOnly
              ? `Showing ${filteredData.length} favorite ${
                  filteredData.length === 1 ? "coin" : "coins"
                }`
              : "Market data updates every 30 seconds"}
          </p>
        </div>

        <CryptoTable
          data={filteredData}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          isLoading={isLoading && !data}
        />

        {!showFavoritesOnly && (
          <div className="mt-8">
            <PaginationSection totalPages={10} />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
