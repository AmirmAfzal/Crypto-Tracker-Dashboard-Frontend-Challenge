"use client";

import { Activity, Filter, RefreshCw } from "lucide-react";

import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { Badge } from "./ui/badge";

interface Props {
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  favoriteCount: number;
}

const DashboardHeader = ({
  showFavoritesOnly,
  onToggleFavorites,
  isRefreshing,
  onRefresh,
  favoriteCount,
}: Props) => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  Crypto Tracker
                </h1>
                <p className="text-xs text-muted-foreground">
                  Real-time market data
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={onToggleFavorites}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
              {favoriteCount > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {favoriteCount}
                </Badge>
              )}
            </Button>

            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
