"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Props {
  totalPages: number;
}

const PaginationSection = ({ totalPages }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page") || 1);

  const maxVisibleNumbers = 10;

  type PageItem = number | "ellipsis";

  const paginationItems = useMemo<PageItem[]>(() => {
    if (totalPages <= maxVisibleNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: PageItem[] = [];

    const middleCount = maxVisibleNumbers - 2; // exclude first & last
    let start = Math.max(2, currentPage - Math.floor(middleCount / 2));
    let end = start + middleCount - 1;

    if (end >= totalPages) {
      end = totalPages - 1;
      start = Math.max(2, end - middleCount + 1);
    }

    // First page
    items.push(1);

    // Left ellipsis
    if (start > 2) {
      items.push("ellipsis");
    }

    // Middle pages
    for (let page = start; page <= end; page++) {
      items.push(page);
    }

    // Right ellipsis
    if (end < totalPages - 1) {
      items.push("ellipsis");
    }

    // Last page
    items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Numbers */}
        {paginationItems.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem
              key={`ellipsis-${index}`}
              className="hidden sm:inline-block"
            >
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item} className="hidden sm:inline-block">
              <PaginationLink
                isActive={currentPage === item}
                onClick={() => goToPage(item)}
                className="cursor-pointer"
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;
