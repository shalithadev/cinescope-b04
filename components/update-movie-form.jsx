"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import {
  capitalizeFirstLetter,
  getAllGenres,
  getAllMovieStatus,
  getAllYears,
} from "@/lib/utils";
import { updateMovie } from "@/actions/movies";

export default function UpdateMoviesForm({ showDialog, movie }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    title: movie?.title || "",
    director: movie?.directors?.at(0) || "",
    year: movie?.year || null,
    genre: movie?.genres?.at(0) || null,
    rating: movie?.imdb?.rating || "",
    runtime: movie?.runtime || "",
    overview: movie?.plot || "",
    poster: movie?.poster || "",
    backdrop: movie?.backdrop || "",
    status: movie?.status || "",
  });

  const years = getAllYears();
  const genres = getAllGenres();
  const statuses = getAllMovieStatus();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Get the previous state and update
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // ignore the default form submission behavior
    const formData = new FormData(event.currentTarget);
    const movieDoc = {
      title: formData.get("title"),
      year: formData.get("year"),
      directors: [formData.get("director")],
      genres: [formData.get("genre")],
      imdb: { rating: Number(formData.get("rating")) },
      runtime: formData.get("runtime"),
      plot: formData.get("overview"),
      poster: formData.get("poster"),
      backdrop: formData.get("backdrop"),
      status: formData.get("status"),
      lastUpdated: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try {
      const response = await updateMovie(movie?.id, movieDoc);

      if (response?.success) {
        router.refresh();
        showDialog(false);
      }
    } catch {
      console.log("Error in handle submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Movie title"
            value={formState?.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">
            Year<span className="text-red-500">*</span>
          </Label>
          <Select
            id="year"
            name="year"
            value={formState?.year}
            onValueChange={(value) =>
              setFormState((prev) => ({
                ...prev,
                year: value,
              }))
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Please select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year, index) => (
                <SelectItem key={`${year}-${index}`} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="director">Director</Label>
          <Input
            id="director"
            name="director"
            value={formState?.director}
            onChange={handleChange}
            placeholder="Director name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre">
            Genre<span className="text-red-500">*</span>
          </Label>
          <Select
            id="genre"
            name="genre"
            value={formState?.genre}
            onValueChange={(value) =>
              setFormState((prev) => ({
                ...prev,
                genre: value,
              }))
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Please select genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre, index) => (
                <SelectItem key={`${genre}-${index}`} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">
            IMDb Rating<span className="text-red-500">*</span>
          </Label>
          <Input
            id="rating"
            name="rating"
            placeholder="IMDb Rating (0.0 - 10.0)"
            type="number"
            max="10"
            min="0"
            step="0.1"
            value={formState?.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="runtime">
            Runtime<span className="text-red-500">*</span>
          </Label>
          <Input
            id="runtime"
            name="runtime"
            placeholder="Runtime in minutes"
            type="number"
            max="1000"
            min="0"
            step="1"
            value={formState?.runtime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea
          id="overview"
          name="overview"
          placeholder="Movie description"
          className="h-[6.25rem]"
          value={formState?.overview}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="poster">
            Poster URL<span className="text-red-500">*</span>
          </Label>
          <Input
            id="poster"
            name="poster"
            placeholder="URL to poster image"
            value={formState?.poster}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backdrop">
            Backdrop URL<span className="text-red-500">*</span>
          </Label>
          <Input
            id="backdrop"
            name="backdrop"
            placeholder="URL to backdrop image"
            value={formState?.backdrop}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">
            Status<span className="text-red-500">*</span>
          </Label>
          <Select
            id="status"
            name="status"
            value={formState?.status}
            onValueChange={(value) =>
              setFormState((prev) => ({
                ...prev,
                status: value,
              }))
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue
                className="capitalize"
                placeholder="Please select status"
              />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status, index) => (
                <SelectItem key={`${status}-${index}`} value={status}>
                  {capitalizeFirstLetter(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="reset"
          variant="outline"
          className="min-w-[6.375rem]"
          disabled={isSubmitting}
          onClick={() => showDialog(false)}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="min-w-[6.375rem]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Movie"}
        </Button>
      </DialogFooter>
    </form>
  );
}
