"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateMoviesForm from "./update-movie-form";

export default function UpdateMovieDialog({ open, onOpenChange, movie }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[37.5rem]">
        <DialogHeader>
          <DialogTitle>Update Movie</DialogTitle>
          <DialogDescription>
            Fill in the details to update the movie.
          </DialogDescription>
        </DialogHeader>
        <UpdateMoviesForm showDialog={onOpenChange} movie={movie} />
      </DialogContent>
    </Dialog>
  );
}
