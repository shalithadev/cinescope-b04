"use server";

import { db } from "@/db";

// Option 1: Get all movies from database using /api/v1/movies
export const getMovies = async () => {
  try {
    // using fetch API to get movies from the server
    const movieResponse = await fetch(`${process.env.API_BASE_URL}/v1/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!movieResponse.ok) {
      throw new Error("Network response was not ok :(");
    }

    if (movieResponse.status === 200) {
      return await movieResponse.json();
    } else {
      console.log("No movies found!");
      return undefined;
    }
  } catch (error) {
    console.log("Error fetching movies", error);
    return undefined;
  }
};

// Option 2: Search movies from database using a server action
export const searchMovies = async (query) => {
  try {
    // Search by title (i = case-insensitive)
    const movies = await db
      .collection("movies")
      .find({ title: { $regex: query, $options: "i" } }) // search query
      .limit(50)
      .toArray();

    // console.log("Search movies", movies.length, query);

    if (movies && movies.length > 0) {
      return {
        success: true,
        message: "Movies fetched successfully!",
        data: movies,
      };
    } else {
      return {
        success: false,
        message: "No movies found!",
        data: [],
      };
    }
  } catch (error) {
    console.log("Mongodb fetch failed", error);
    return {
      success: false,
      message: "Error fetching movies.",
      data: [],
    };
  }
};

export const createMovie = async () => {
  //
};
