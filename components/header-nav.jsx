import Link from "next/link";
import { Logo } from "./logo";
import ModeToggle from "./mode-toggle";

// Used PascalCase for component name to follow React conventions
// Functional component - use PascalCase for component names
export default function HeaderNav({ isAuthenticated }) {
  return (
    <header className="border-primary/20 bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center">
        {/* Website Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Logo className="h-8 w-8" fill="fill-primary" />
          <div className="text-primary text-xl font-bold">CineScope</div>
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="/movies"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Movies
          </Link>
          <Link
            href="/genres"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Genres
          </Link>
          <Link
            href="/about"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            About
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
          )}
          {!isAuthenticated && (
            <Link
              href="/login"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Login
            </Link>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
