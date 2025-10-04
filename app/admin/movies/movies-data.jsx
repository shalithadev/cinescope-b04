import { searchMovies } from "@/actions/movies";
import MovieTable from "./movie-table";

export default async function MoviesData({ query = "" }) {
  // Fetch movies data from database
  // Option 1: Fetch movies from /api/movies
  // Option 2: Fetch movies from database through server action
  try {
    const { data: moviesData = [] } = await searchMovies(query);

    if (!moviesData.length) throw new Error("No movies found in the database!");

    const refinedMovies = moviesData.map((movie) => ({
      id: movie._id.toString(),
      title: movie.title,
      year: movie.year,
      plot: movie.plot,
      rated: movie.rated,
      genres: movie.genres,
      poster: movie.poster,
      backdrop: movie.backdrop,
      imdb: movie.imdb,
      runtime: movie.runtime,
      status: movie.status ?? "published",
      directors: movie.directors,
    }));

    return <MovieTable movies={refinedMovies} />;
  } catch {
    return <div>No Movies Available!</div>;
  }
}
