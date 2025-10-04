"use server";

import { db } from "@/db";
import { MOVIES } from "@/lib/data";
import { ObjectId } from "mongodb";

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
      .collection("movies_n")
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

export const createMovie = async (movie) => {
  try {
    const result = await db.collection("movies_n").insertOne(movie);

    if (result.acknowledged) {
      console.log(`A movie was inserted with the _id: ${result.insertedId}`);

      return {
        success: true,
        message: "Movie created successfully!",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Mongodb movie insert failed!", error);
  }
};

export const updateMovie = async (movieId, movieDoc) => {
  try {
    const result = await db
      .collection("movies_n")
      .updateOne(
        { _id: ObjectId.createFromHexString(movieId) },
        { $set: movieDoc },
        { upsert: true }
      );

    if (result.acknowledged) {
      console.log(`A movie was updated with the _id: ${result.upsertedId}`);

      return {
        success: true,
        message: "Movie updated successfully!",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Mongodb movie update failed!", error);
  }
};

// Action to delete movies from the database
export const deleteMovie = async (movieId) => {
  try {
    const result = await db
      .collection("movies_n")
      .deleteOne({ _id: ObjectId.createFromHexString(movieId) });

    if (result.acknowledged) {
      console.log(`A movie was deleted with the _id: ${result.insertedId}`);

      return {
        success: true,
        message: "Movie deleted successfully!",
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("Mongodb movie delete failed!", error);
  }
};

export const getMovieById = async (movieId) => {
  // Call the database based on parameter
  return MOVIES.at(5);
};

export const getReviewsForMovie = async (movieId) => {
  return [
    {
      id: 123,
      userAvatar: "",
      userName: "Test",
      comment: "This is a test comment",
      rating: 4.5,
      createdAt: "",
    },
  ];
};
