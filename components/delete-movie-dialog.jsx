"use client";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteMovieDialog({
  open,
  onOpenChange,
  onConfirm,
  movie,
  isLoading = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Movie</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 my-5 text-center text-balance">
            Are you sure you want to delete the movie{" "}
            <strong>
              {movie?.title} ({movie?.year})
            </strong>{" "}
            ? <br />
            <span className="text-xs text-orange-600">
              This action cannot be undone
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(movie?.id)}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin" />}Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
