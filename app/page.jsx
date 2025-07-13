import HeaderNav from "@/components/header-nav";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav />
      <main className="flex-2">Main Section</main>
      <footer className="flex-1 bg-amber-400">Footer Section</footer>
    </div>
  );
}
