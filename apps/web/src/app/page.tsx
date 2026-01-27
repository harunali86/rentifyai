import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <HeroSection />

      {/* Featured Properties Placeholder */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 mt-2">Handpicked luxury for your lifestyle.</p>
          </div>
          <button className="text-brand-600 font-semibold hover:text-brand-800 transition-colors">
            View All &rarr;
          </button>
        </div>

        {/* Grid Skeleton for now */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
