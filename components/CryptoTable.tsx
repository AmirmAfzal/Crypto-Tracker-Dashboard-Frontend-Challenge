"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import { CryptoCoin } from "@/lib/types/crypto";

import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";
import Sparkline from "./Sparkline";

interface Props {
  data: CryptoCoin[];
  favorites: Set<string>;
  onToggleFavorite: (coinId: string) => void;
  isLoading?: boolean;
  page: number;
}

const CryptoTable = ({
  data,
  favorites,
  onToggleFavorite,
  isLoading,
  page,
}: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No cryptocurrencies found
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-12"></TableHead>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h Change</TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              7 Day Trend
            </TableHead>
            <TableHead className="text-right hidden md:table-cell">
              Market Cap
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((coin, index) => {
            const isFavorite = favorites.has(coin.id);
            const priceChange = coin.price_change_percentage_24h;
            const isPositive = priceChange > 0;

            return (
              <TableRow
                key={coin.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onToggleFavorite(coin.id)}
                  >
                    <Star
                      className={`h-4 w-4 transition-all ${
                        isFavorite
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell className="font-medium text-muted-foreground">
                  {index + 1 + page * 10}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {coin.image === "missing_large.png" ? (
                      <div className="w-8 h-8 rounded-full bg-accent"></div>
                    ) : (
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                        width={100}
                        height={100}
                      />
                    )}
                    <div>
                      <div className="font-semibold">{coin.name}</div>
                      <div className="text-sm text-muted-foreground uppercase">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  $
                  {coin?.current_price?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 font-semibold px-2 py-1 rounded-md text-sm ${
                      isPositive
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {priceChange?.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {coin.sparkline_in_7d?.price &&
                  coin.sparkline_in_7d.price.length > 0 ? (
                    <div className="mx-auto w-32">
                      <Sparkline
                        data={coin.sparkline_in_7d.price}
                        isPositive={isPositive}
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      No data
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground hidden md:table-cell">
                  ${(coin.market_cap / 1e9).toFixed(2)}B
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CryptoTable;
