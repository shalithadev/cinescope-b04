import MovieSelectors from "./movie-selectors";
import MoviesData from "./movies-data";
import AddMovieDialog from "@/components/add-movie-dialog";

export default async function MoviesPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Movies</h2>
          <p className="text-muted-foreground">Manage your movies catalog</p>
        </div>
        <AddMovieDialog />
      </div>

      <MovieSelectors />

      <MoviesData query={query} />
    </div>
  );
}
