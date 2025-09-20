import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAllYears() {
  return Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );
}

export function getAllGenres() {
  return ["Action", "Adventure", "Sci-Fi", "Horror", "Mystery"];
}

export function getAllMovieStatus() {
  return ["published", "draft", "archived"];
}

export function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
