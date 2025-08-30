"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function MovieCard({ movie }) {
  const [posterUrl, setPosterUrl] = useState(movie.poster);

  return (
    <Card className="board-primary/20 hover:border-primary/50 overflow-hidden py-0 gap-0 transition-colors">
      <div className="aspect-2/3 w-full overflow-hidden">
        <Image
          width={300}
          height={450}
          src={posterUrl || "/placeholder.svg"}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          priority
          onError={() => setPosterUrl("/placeholder.svg")}
        />
      </div>

      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-semibold">{movie.title}</h3>
        <p className="text-muted-foreground text-sm">
          {movie.year} • {movie.runtime} min
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {movie?.genres?.slice(0, 2).map((genre, index) => (
            <Badge
              variant="outline"
              key={`${genre}-${index}`}
              className="border-primary/30 bg-primary/5 text-xs"
            >
              {genre}
            </Badge>
          ))}

          {movie?.genres?.length > 2 && (
            <Badge>+{movie?.genres?.length - 2}</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex items-center">
          <span className="text-primary text-sm font-medium">
            {movie?.imdb?.rating}/10
          </span>
        </div>
        <Button variant="ghost" size="sm" className="hover:text-primary">
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg">
      <Skeleton className="aspect-2/3 w-full" />
      <div className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="flex mt-3 gap-1">
          <Skeleton className="h-5 w-1/5" />
          <Skeleton className="h-5 w-1/5" />
        </div>

        <div className="flex justify-between gap-2 mt-6">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
