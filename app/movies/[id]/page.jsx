import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMovieById, getReviewsForMovie } from "@/actions/movies";
import MovieDetails from "./movie-details";

export default async function MovieDetailsPage({ params }) {
  const { id } = await params;
  // First API Call to get the movie data
  // Second API Call to get the reviews for the movie
  // console.time("Operation 1");
  // const movie = await getMovieById(id);
  // const reviews = await getReviewsForMovie(id);
  // console.timeEnd("Operation 1");

  // Method 02: Faster parallel data fetching
  // Reduce the execution time by 50% or more
  console.time("Operation 2");
  const [movie, reviews] = await Promise.all([
    getMovieById(id),
    getReviewsForMovie(id),
  ]);
  console.timeEnd("Operation 2");

  // There no dependency with above api calls

  // throw new Error("ffff");

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold">Movie not found</h1>
          <p className="text-muted-foreground">
            The movie you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/" className="mt-4">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Passing server data to client component
  return <MovieDetails movie={movie.data} reviews={reviews} id={id} />;
}
