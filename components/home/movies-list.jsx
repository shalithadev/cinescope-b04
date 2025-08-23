import { getMovies } from "@/actions/movies";
import MovieCard from "./movie-card";

export default async function MoviesList() {
  const movies = await getMovies();

  if (!movies || movies.length === 0) {
    return (
      <div className="text-red-600 text-center py-12">No movies found!</div>
    );
  }

  // console.log("Movies:", movies);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Loop Movies (Dynamic) */}
      {movies.map((movie, index) => (
        <div key={`${movie._id}-${index}`}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
