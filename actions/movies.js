"use server";

// Get all movies from database - action
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
