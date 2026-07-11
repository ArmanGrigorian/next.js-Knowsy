import FeaturedArticle from "@/components/FeaturedArticle";
import HomePageHero from "@/components/HomePageHero";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh]">
      <HomePageHero />
      <FeaturedArticle />
    </main>
  );
}
