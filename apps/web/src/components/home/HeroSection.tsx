"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function HeroSection() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
    const [listingType, setListingType] = useState(searchParams.get('listingType') || "BUY");

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        params.append('listingType', listingType === 'BUY' ? 'SALE' : listingType);
        router.push(`/search?${params.toString()}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <section className="relative pt-32 pb-24 min-h-[600px] flex flex-col justify-center items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2000"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" /> {/* Subtle Overlay */}
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center w-full">
                {/* Hero Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight drop-shadow-md">
                    Find it. Tour it. Own it.
                </h1>

                {/* Search Container */}
                <div className="max-w-2xl mx-auto">
                    {/* Tabs: Buy / Rent / Sell */}
                    <div className="flex w-fit mx-auto mb-1">
                        {['BUY', 'RENT', 'SELL'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setListingType(type)}
                                className={`px-6 py-3 text-sm font-bold transition-all rounded-t-lg ${listingType === type
                                        ? 'bg-white text-[#006AFF]'
                                        : 'bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm'
                                    }`}
                            >
                                {type.charAt(0) + type.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white rounded-lg rounded-tl-none shadow-2xl flex items-center p-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Enter an address, neighborhood, city, or ZIP code"
                                className="w-full px-4 py-3 bg-transparent text-gray-900 focus:outline-none placeholder:text-gray-500 text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <Button
                            onClick={handleSearch}
                            className="bg-[#006AFF] hover:bg-[#0052CC] text-white rounded-md w-12 h-12 flex items-center justify-center shrink-0"
                            aria-label="Search"
                        >
                            <Search className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
