
'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Property, getProperties } from '@/lib/api';
import { PropertyCard } from './PropertyCard';
import { SlidersHorizontal, Map as MapIcon, List as ListIcon, Search, ChevronDown, Bell } from 'lucide-react';

// Dynamically import the map component with SSR disabled
const PropertyMap = dynamic(
    () => import('./PropertyMap').then((mod) => mod.PropertyMap),
    {
        ssr: false,
        loading: () => <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400 font-medium italic">Initializing Map Engine...</div>
    }
);

interface PropertySplitViewProps {
    initialProperties: Property[];
    searchParams: any;
}

export function PropertySplitView({ initialProperties, searchParams }: PropertySplitViewProps) {
    // --- FILTER STATE ---
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'split' | 'map' | 'list'>('split');
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

    // Sorting & Saved Search State (Zillow Parity)
    const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'newest' | 'sqft'>('recommended');
    const [isSavedSearch, setIsSavedSearch] = useState(false);

    // Actual search filters
    const [searchQuery, setSearchQuery] = useState(searchParams.search || '');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [homeType, setHomeType] = useState<string>('');

    // Map bounds track
    const currentBounds = useRef<any>(null);

    const handleSaveSearch = () => {
        setIsSavedSearch(prev => !prev);
    };

    // Client-side instant sorting
    const sortedProperties = [...properties].sort((a, b) => {
        if (sortBy === 'price_asc') return Number(a.price) - Number(b.price);
        if (sortBy === 'price_desc') return Number(b.price) - Number(a.price);
        if (sortBy === 'sqft') return (b.areaSqFt || 0) - (a.areaSqFt || 0);
        if (sortBy === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        return 0; // recommended
    });

    // --- FETCH LOGIC ---
    const fetchWithFilters = useCallback(async (bounds?: any) => {
        setLoading(true);
        if (bounds) currentBounds.current = bounds;

        try {
            const params = {
                ...searchParams,
                search: searchQuery,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                type: homeType || undefined,
                ...(currentBounds.current ? {
                    ne_lat: currentBounds.current.ne.lat,
                    ne_lng: currentBounds.current.ne.lng,
                    sw_lat: currentBounds.current.sw.lat,
                    sw_lng: currentBounds.current.sw.lng,
                } : {})
            };
            const results = await getProperties(params);
            setProperties(results);
        } catch (error) {
            console.error('Filtering failed:', error);
        } finally {
            setLoading(false);
        }
    }, [searchParams, searchQuery, minPrice, maxPrice, homeType]);

    // Update results when filters change (Debounced search would be better, but let's keep it direct for now)
    const handleSearchClick = () => {
        fetchWithFilters(currentBounds.current);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-white">
            {/* Zillow-Style Search & Filter Header */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white z-20 shadow-sm">
                <div className="flex items-center flex-1 max-w-5xl gap-3 mr-4">
                    {/* Location Input */}
                    <div className="relative flex-[1.5] group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-600 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                            placeholder="Enter City, Neighborhood, or Address"
                            className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Price Range Selectors */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-24 bg-gray-50 border border-gray-200 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                        />
                        <span className="text-gray-300">-</span>
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-24 bg-gray-50 border border-gray-200 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                        />
                    </div>

                    {/* Home Type Filter */}
                    <select
                        value={homeType}
                        onChange={(e) => setHomeType(e.target.value)}
                        className="bg-white border border-gray-200 rounded-md py-2 px-4 text-sm font-semibold text-gray-700 hover:border-gray-300 cursor-pointer outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                        <option value="">Home Type</option>
                        <option value="RESIDENTIAL">Residential</option>
                        <option value="COMMERCIAL">Commercial</option>
                        <option value="INDUSTRIAL">Industrial</option>
                        <option value="LAND">Land</option>
                    </select>

                    <button
                        onClick={handleSearchClick}
                        className="px-6 py-2 bg-brand-600 text-white rounded-md text-sm font-bold hover:bg-brand-700 transition-all shadow-md shadow-brand-100 whitespace-nowrap active:scale-95"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* View Toggles */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('split')}
                        className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${viewMode === 'split' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                    >
                        <MapIcon className="w-3.5 h-3.5" /> Split
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                    >
                        <ListIcon className="w-3.5 h-3.5" /> List
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative bg-gray-50">
                {/* Map Section */}
                <div className={`transition-all duration-500 ease-in-out ${viewMode === 'list' ? 'w-0 opacity-0 hidden' : viewMode === 'map' ? 'w-full' : 'w-1/2'} border-r border-gray-200 relative`}>
                    <PropertyMap
                        properties={properties}
                        hoveredPropertyId={hoveredPropertyId}
                        onBoundsChange={fetchWithFilters}
                    />
                    {loading && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur shadow-2xl px-6 py-2.5 rounded-full z-30 border border-brand-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                            <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-900">Syncing Network</span>
                        </div>
                    )}
                </div>

                {/* List Section */}
                <div className={`transition-all duration-500 ease-in-out overflow-y-auto ${viewMode === 'map' ? 'w-0 opacity-0 hidden' : viewMode === 'list' ? 'w-full' : 'w-1/2'} p-6 custom-scrollbar`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                {sortedProperties.length} {sortedProperties.length === 1 ? 'Home' : 'Homes'} in {searchQuery || 'Pune & Mumbai'}
                            </h2>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                Verified RERA inventory with 100% price transparency
                            </p>
                        </div>

                        {/* Zillow Action Controls: Save Search + Sort */}
                        <div className="flex items-center gap-2.5">
                            <button
                                onClick={handleSaveSearch}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    isSavedSearch 
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs' 
                                        : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-500 hover:text-blue-600 shadow-xs'
                                }`}
                            >
                                <Bell className={`w-3.5 h-3.5 ${isSavedSearch ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                                {isSavedSearch ? 'Alerts Active ✓' : 'Save Search'}
                            </button>

                            {/* Sort Dropdown */}
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

                    <div className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                        {sortedProperties.length > 0 ? (
                            sortedProperties.map(p => (
                                <div
                                    key={p.id}
                                    onMouseEnter={() => setHoveredPropertyId(p.id)}
                                    onMouseLeave={() => setHoveredPropertyId(null)}
                                    className="h-full transform transition-transform duration-200 hover:-translate-y-1"
                                >
                                    <PropertyCard property={p} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full h-[60vh] flex flex-col items-center justify-center text-center px-4">
                                <div className="bg-gray-100 p-6 rounded-full mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No matching homes found</h3>
                                <p className="text-gray-500 max-w-sm">Try widening your search area or adjusting the filters to see more results.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setMinPrice('');
                                        setMaxPrice('');
                                        setHomeType('');
                                        handleSearchClick();
                                    }}
                                    className="mt-6 text-brand-600 font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
