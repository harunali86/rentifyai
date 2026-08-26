"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state from URL params
    const [listingType, setListingType] = useState<'SALE' | 'RENT' | 'SOLD'>(
        (searchParams.get('listingType') as any) || 'RENT'
    );
    const [priceRange, setPriceRange] = useState([
        Number(searchParams.get('minPrice')) || 0,
        Number(searchParams.get('maxPrice')) || 10000000
    ]);
    const [beds, setBeds] = useState(searchParams.get('minBeds') ? `${searchParams.get('minBeds')}+` : "Any");
    const [baths, setBaths] = useState(searchParams.get('minBaths') ? `${searchParams.get('minBaths')}+` : "Any");
    const [minSqFt, setMinSqFt] = useState(searchParams.get('minSqFt') || "");
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        // Listing Type
        params.set('listingType', listingType);

        // Price
        if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
        else params.delete('minPrice');

        if (priceRange[1] < 10000000) params.set('maxPrice', priceRange[1].toString());
        else params.delete('maxPrice');

        // Beds
        if (beds !== "Any") params.set('minBeds', beds.replace('+', ''));
        else params.delete('minBeds');

        // Baths
        if (baths !== "Any") params.set('minBaths', baths.replace('+', ''));
        else params.delete('minBaths');

        // SqFt (From More Filter)
        if (minSqFt) params.set('minSqFt', minSqFt);
        else params.delete('minSqFt');

        // Search Term
        if (searchTerm) params.set('search', searchTerm);
        else params.delete('search');

        router.push(`/search?${params.toString()}`);
    };

    const handleSearchEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') applyFilters();
    };

    const FilterButton = ({ label, active }: { label: string, active?: boolean }) => (
        <Button
            variant="outline"
            className={`h-9 rounded-md border-gray-300 font-normal hover:bg-gray-50 hover:border-[#006AFF] hover:text-[#006AFF] transition-colors ${active ? 'bg-[#F2F8FF] border-[#006AFF] text-[#006AFF] font-bold' : 'text-gray-700'}`}
        >
            {label} <ChevronDown className={`w-3 h-3 ml-2 transition-transform ${active ? 'rotate-180' : ''}`} />
        </Button>
    );

    return (
        <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-3 px-4 flex items-center gap-2 shadow-sm overflow-visible">

            {/* Search Input */}
            <div className="relative mr-2 w-64 hidden xl:block">
                <input
                    type="text"
                    placeholder="Address, Neighborhood, or Zip"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchEnter}
                    className="w-full h-9 pl-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006AFF] focus:border-transparent text-sm placeholder:text-gray-500"
                />
                <button onClick={applyFilters} className="absolute right-2.5 top-2.5">
                    <Search className="w-4 h-4 text-gray-400 hover:text-[#006AFF]" />
                </button>
            </div>

            {/* Listing Type Popover */}
            <Popover>
                <PopoverTrigger asChild>
                    <div><FilterButton label={listingType === 'RENT' ? 'For Rent' : listingType === 'SALE' ? 'For Sale' : 'Sold'} active={true} /></div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm">Listing Type</div>
                    <div className="p-4 space-y-3">
                        {['SALE', 'RENT', 'SOLD'].map((type) => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${listingType === type ? 'border-[#006AFF] bg-[#006AFF]' : 'border-gray-300 bg-white group-hover:border-[#006AFF]'}`}>
                                    {listingType === type && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                <span className="text-sm text-gray-900 font-medium capitalize">
                                    {type.toLowerCase().replace('_', ' ')}
                                </span>
                                <input type="radio" name="listingType" className="hidden" checked={listingType === type} onChange={() => setListingType(type as any)} />
                            </label>
                        ))}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <Button onClick={applyFilters} className="bg-[#006AFF] hover:bg-brand-700 text-white font-bold h-8 px-6">Apply</Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Price Popover */}
            <Popover>
                <PopoverTrigger asChild>
                    <div><FilterButton label="Price" active={priceRange[0] > 0 || priceRange[1] < 10000000} /></div>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0" align="start">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm">Price Range</div>
                    <div className="p-6">
                        <Slider
                            value={priceRange}
                            min={0}
                            max={10000000}
                            step={50000}
                            className="mb-8"
                            onValueChange={setPriceRange}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Min Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">₹</span>
                                    <Input value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="pl-6 h-10" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Max Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">₹</span>
                                    <Input value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="pl-6 h-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <Button onClick={applyFilters} className="bg-[#006AFF] hover:bg-brand-700 text-white font-bold h-8 px-6">Apply</Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Beds & Baths Popover */}
            <Popover>
                <PopoverTrigger asChild>
                    <div><FilterButton label="Beds & Baths" active={beds !== "Any" || baths !== "Any"} /></div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm">Number of Bedrooms</div>
                    <div className="p-5 space-y-6">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-3 block">Bedrooms</label>
                            <div className="flex rounded-md shadow-sm border border-gray-300 overflow-hidden divide-x divide-gray-300">
                                {['Any', '1+', '2+', '3+', '4+', '5+'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setBeds(opt)}
                                        className={`flex-1 py-2 text-sm font-medium hover:bg-gray-50 ${beds === opt ? 'bg-[#F2F8FF] text-[#006AFF] font-bold' : 'bg-white text-gray-700'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-3 block">Bathrooms</label>
                            <div className="flex rounded-md shadow-sm border border-gray-300 overflow-hidden divide-x divide-gray-300">
                                {['Any', '1+', '2+', '3+', '4+'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setBaths(opt)}
                                        className={`flex-1 py-2 text-sm font-medium hover:bg-gray-50 ${baths === opt ? 'bg-[#F2F8FF] text-[#006AFF] font-bold' : 'bg-white text-gray-700'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <Button onClick={applyFilters} className="bg-[#006AFF] hover:bg-brand-700 text-white font-bold h-8 px-6">Apply</Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* "More" Filters (Advanced) */}
            <Popover>
                <PopoverTrigger asChild>
                    <div><FilterButton label="More" active={!!minSqFt} /></div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm">Review more options</div>
                    <div className="p-5 space-y-6">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-3 block">Square Feet</label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="Min Sq Ft"
                                    value={minSqFt}
                                    onChange={(e) => setMinSqFt(e.target.value)}
                                    className="h-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-3 block">Property Amenities</label>
                            <div className="space-y-2">
                                {['Air Conditioning', 'Pool', 'Waterfront'].map(amenity => (
                                    <div key={amenity} className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border border-gray-300 rounded bg-gray-50" />
                                        <span className="text-sm text-gray-600">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                        <Button variant="ghost" className="text-[#006AFF] font-bold h-8 px-4" onClick={() => { setMinSqFt(""); }}>Reset</Button>
                        <Button onClick={applyFilters} className="bg-[#006AFF] hover:bg-brand-700 text-white font-bold h-8 px-6">Apply</Button>
                    </div>
                </PopoverContent>
            </Popover>

            <div className="ml-auto flex items-center gap-2">
                <Button
                    onClick={async () => {
                        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                        if (!token) {
                            alert("Please login to save searches.");
                            return;
                        }

                        const filters = {
                            listingType,
                            minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
                            maxPrice: priceRange[1] < 10000000 ? priceRange[1] : undefined,
                            minBeds: beds !== "Any" ? beds.replace('+', '') : undefined,
                            minSqFt: minSqFt || undefined
                        };

                        const name = `${filters.minBeds ? filters.minBeds + '+ Beds ' : ''}${filters.listingType === 'RENT' ? 'Rent' : 'Buy'}`;

                        // Dynamic Import to avoid SSR issues with API usage in client component if needed, 
                        // but here we just imported saveSearch from api.ts
                        const { saveSearch } = await import("@/lib/api");

                        const res = await saveSearch(name, filters, token);
                        if (res) {
                            alert("Search Saved Successfully!");
                        } else {
                            alert("Failed to save search.");
                        }
                    }}
                    className="h-9 bg-[#006AFF] hover:bg-brand-700 text-white font-bold rounded-md px-4"
                >
                    Save Search
                </Button>
            </div>
        </div>
    );
}
