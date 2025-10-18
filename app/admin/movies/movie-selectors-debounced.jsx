"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useDeferredValue } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";

export default function MovieSelectorsDebounced() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // seed from URL
  const initialQuery = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  // keep UI responsive while typing
  const deferred = useDeferredValue(searchTerm);

  // true debounce for side-effects (URL + fetch)
  const [debounced, setDebounced] = useState(deferred);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(deferred), 400); // adjust delay as you like
    return () => clearTimeout(t);
  }, [deferred]);

  // keep input in sync if user uses back/forward or external link changes query
  useEffect(() => {
    const q = searchParams.get("query") || "";
    // only update if different to avoid cursor jumps
    if (q !== searchTerm) setSearchTerm(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // update URL ONLY when debounced value changes (prevents per-character updates)
  useEffect(() => {
    const current = searchParams.get("query") || "";
    if (debounced === current) return; // no-op if already in URL

    const params = new URLSearchParams(searchParams.toString());
    if (debounced) params.set("query", debounced);
    else params.delete("query");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debounced, pathname, replace, searchParams]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full items-center space-x-2 md:w-1/2">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9"
        />
      </div>

      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="h-9">
          <SlidersHorizontalIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
}
