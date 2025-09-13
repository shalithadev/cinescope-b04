import MoviesData from "./movies-data";

export default function MoviesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Movies</h2>
          <p className="text-muted-foreground">Manage your movies catalog</p>
        </div>
      </div>

      <MoviesData query="" />
    </div>
  );
}
