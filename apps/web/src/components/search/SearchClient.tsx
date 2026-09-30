'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/api';
import { MapWrapper } from '@/components/property/MapWrapper';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { Bell, ChevronDown } from 'lucide-react';

interface SearchClientProps {
    properties: Property[];
    autoFit: boolean;
    initialCenter?: [number, number];
}

import { getProperties } from '@/lib/api';

export function SearchClient({ properties: initialProperties, autoFit, initialCenter }: SearchClientProps) {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showMapMobile, setShowMapMobile] = useState(false); // Mobile Toggle State
    const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'newest' | 'sqft'>('recommended');
    const [isSavedSearch, setIsSavedSearch] = useState(false);

    // Synchronize client properties when filter or URL changes
    useEffect(() => {
        setProperties(initialProperties);
    }, [initialProperties]);

    // Client-side dynamic sorting
    const sortedProperties = [...properties].sort((a, b) => {
        if (sortBy === 'price_asc') return Number(a.price) - Number(b.price);
        if (sortBy === 'price_desc') return Number(b.price) - Number(a.price);
        if (sortBy === 'sqft') return (b.areaSqFt || 0) - (a.areaSqFt || 0);
        if (sortBy === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        return 0;
    });

    // Client-Side Fetch Handler
    const handleMapBoundsChange = async (bounds: any) => {
        setLoading(true);
        try {
            const newProperties = await getProperties({
                ne_lat: bounds.ne.lat,
                ne_lng: bounds.ne.lng,
                sw_lat: bounds.sw.lat,
                sw_lng: bounds.sw.lng
            });
            if (newProperties && newProperties.length > 0) {
                setProperties(newProperties);
            }
        } catch (error) {
            console.error("Failed to fetch map properties:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex h-[calc(100vh-130px)] relative">
            {/* Mobile Toggle Button */}
            <div className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1001]">
                <button
                    onClick={() => setShowMapMobile(!showMapMobile)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2 hover:bg-black transition-all hover:scale-105 active:scale-95"
                >
                    {showMapMobile ? 'Show List' : 'Map View'}
                </button>
            </div>

            {/* Left Side: Map (Fixed on Desktop, Toggled on Mobile) */}
            <div className={`${showMapMobile ? 'block' : 'hidden'} md:block w-full md:w-[55%] lg:w-[60%] h-full bg-gray-100 relative border-r border-gray-200`}>
                <div className="absolute inset-0">
                    <MapWrapper
                        properties={sortedProperties}
                        autoFit={autoFit}
                        initialCenter={initialCenter}
                        hoveredPropertyId={hoveredPropertyId}
                        onMarkerClick={(property) => setHoveredPropertyId(property.id)}
                        onBoundsChange={handleMapBoundsChange}
                    />
                    {loading && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-[1000] text-sm font-semibold text-brand-600 flex items-center gap-2">
                            <span className="animate-spin text-lg">↻</span> Updating...
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Listings (Scrollable on Desktop, Toggled on Mobile) */}
            <div className={`${showMapMobile ? 'hidden' : 'block'} md:block w-full md:w-[45%] lg:w-[40%] h-full overflow-y-auto bg-white z-10 scrollbar-hide`}>
                <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Real Estate & Homes For Sale
                            </h1>
                            <p className="text-gray-500 text-sm mt-0.5">
                                {sortedProperties.length} results found • Verified Zero Brokerage
                            </p>
                        </div>
                        
                        {/* Zillow Action Controls: Save Search + Dynamic Sort */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsSavedSearch(prev => !prev)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    isSavedSearch 
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs' 
                                        : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-500 hover:text-blue-600 shadow-xs'
                                }`}
                            >
                                <Bell className={`w-3.5 h-3.5 ${isSavedSearch ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                                {isSavedSearch ? 'Alerts Active ✓' : 'Save Search'}
                            </button>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-lg py-1.5 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-xs"
                                >
                                    <option value="recommended">Sort: Recommended</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="newest">Newest First</option>
                                    <option value="sqft">Largest Sq Ft</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Listings Grid */}
                    {sortedProperties.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            <PropertyGrid
                                properties={sortedProperties}
                                onCardHover={setHoveredPropertyId}
                                hoveredPropertyId={hoveredPropertyId}
                            />
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-4xl mb-4">🏠</div>
                            <h3 className="text-lg font-bold text-gray-900">No homes found</h3>
                            <p className="text-gray-500 mt-2">
                                Try adjusting your search to a different area or price range.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
