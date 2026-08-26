import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { ActionCards } from "@/components/home/ActionCards";
import { getProperties } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const properties = await getProperties(params);

  return (
    <main className="min-h-screen bg-white font-sans text-[#2A2A33]">
      <Navbar />

      {/* 1. Hero Section with Central Search */}
      <HeroSection />

      {/* 2. Featured Properties Carousel */}
      <FeaturedCarousel properties={properties} />

      {/* 3. Buy/Rent/Sell Action Cards */}
      <ActionCards />

      {/* 4. SEO / About Section (Bottom) */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Change starts here</h2>
          <p className="text-gray-600 leading-relaxed">
            Whether you’re buying your first home, looking for a rental, or selling your current property,
            RentifyAI connects you with the best agents and tools to make it happen.
            Powered by AI-driven insights and verified listings.
          </p>
        </div>
      </section>
    </main>
  );
}
