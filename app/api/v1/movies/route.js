import { NextResponse } from "next/server";
import { db } from "@/db";

export const GET = async () => {
  try {
    const movies = await db
      .collection("movies")
      .find()
      .sort({ metacritic: -1 })
      .limit(50)
      .toArray()
      .catch((error) => {
        console.error("Error fetching movies from database:", error);
        return [];
      });

    return NextResponse.json(movies);
  } catch (error) {
    console.log("Error in GET /api/v1/movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
