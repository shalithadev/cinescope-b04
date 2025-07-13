import Link from "next/link";
// Logo Component
// Mode Toggle Component

// Used PascalCase for component name to follow React conventions
export default function HeaderNav() {
  return (
    <header className="border-primary/20 bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-1">
          <div className="text-red-400 font-bold">CS</div>
          <div className="text-teal-400 font-bold">CineScope.lk</div>
        </Link>
      </div>
    </header>
  );
}
