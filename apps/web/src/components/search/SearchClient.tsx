'use client';

import { useState } from 'react';
import { Property } from '@/lib/api';
import { MapWrapper } from '@/components/property/MapWrapper';
import { PropertyGrid } from '@/components/property/PropertyGrid';

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
            setProperties(newProperties);
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
                        properties={properties}
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
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Real Estate & Homes For Sale
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                {properties.length} results found
                            </p>
                        </div>
                        <div className="text-sm font-semibold text-[#006AFF] cursor-pointer hover:underline">
                            Sort: Recommended
                        </div>
                    </div>

                    {/* Listings Grid */}
                    {properties.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            <PropertyGrid
                                properties={properties}
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
