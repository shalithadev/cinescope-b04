import { getMovieById, getReviewsForMovie } from "@/actions/movies";
import MovieDetails from "./movie-details";

export default async function MovieDetailsPage({ params }) {
  const { id } = await params;
  const movie = await getMovieById(id);
  const reviews = await getReviewsForMovie(id);

  if (!movie && !isLoading) {
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
  return <MovieDetails movie={movie} reviews={reviews} id={id} />;
}
