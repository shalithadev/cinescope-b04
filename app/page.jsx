import HeaderNav from "@/components/header-nav";
import HeroBanner from "@/components/home/hero-banner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav />
      <main className="flex-1">
        <HeroBanner />
      </main>
      <footer className="flex-1 bg-amber-400">Footer Section</footer>
    </div>
  );
}
