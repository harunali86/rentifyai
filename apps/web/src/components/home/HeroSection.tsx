import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function HeroSection() {
    return (
        <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-800/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1600596542815-e32c21216f31?q=80&w=2674&auto=format&fit=crop"
                    alt="Luxury Real Estate"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
                    Discover Your <span className="text-brand-300">Dream Life</span>
                </h1>
                <p className="text-xl md:text-2xl text-brand-100 max-w-2xl mx-auto mb-10 font-light">
                    Seamlessly search thousands of premium listings or connect with top-tier agents in your area.
                </p>

                {/* Search Bar Container */}
                <div className="bg-white p-4 rounded-xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 animate-fade-in-up delay-100">
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="Search by City, Zip, or Neighborhood..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
                            <option>Buy</option>
                            <option>Rent</option>
                            <option>Sold</option>
                        </select>
                        <Button variant="premium" size="lg" className="w-full md:w-auto">
                            <Search className="mr-2 w-5 h-5" />
                            Search
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-12 flex justify-center gap-8 md:gap-16 text-brand-100/80">
                    <div>
                        <div className="text-3xl font-bold text-white">50k+</div>
                        <div className="text-sm uppercase tracking-wider">Listings</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">12k+</div>
                        <div className="text-sm uppercase tracking-wider">Agents</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">100+</div>
                        <div className="text-sm uppercase tracking-wider">Cities</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
