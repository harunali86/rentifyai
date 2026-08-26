import { MapWrapper } from "@/components/property/MapWrapper";
import { SearchFilters } from "@/components/search/SearchFilters";
import { getProperties } from "@/lib/api";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Navbar } from "@/components/layout/Navbar";
import { SearchClient } from "@/components/search/SearchClient";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const properties = await getProperties(params);

    // Only auto-fit map bounds if NO geospatial filters are applied
    const isGeospatialSearch = !!(params.ne_lat && params.sw_lat);
    const autoFit = !isGeospatialSearch;

    // Calculate center from params if they exist (Prevent Map Snap-Back)
    let initialCenter: [number, number] | undefined;
    let initialZoom: number | undefined;

    if (isGeospatialSearch) {
        const ne_lat = Number(params.ne_lat);
        const ne_lng = Number(params.ne_lng);
        const sw_lat = Number(params.sw_lat);
        const sw_lng = Number(params.sw_lng);

        const centerLat = (ne_lat + sw_lat) / 2;
        const centerLng = (ne_lng + sw_lng) / 2;
        initialCenter = [centerLat, centerLng];
        // Keep zoom level preserved roughly (or set to current user zoom if we tracked it, but standard 13-14 is fine for search)
    }

    console.log(`[SearchPage] Fetching with params:`, params);
    console.log(`[SearchPage] Found properties: ${properties.length}`);

    return (
        <main className="h-screen flex flex-col overflow-hidden bg-white">
            <Navbar />

            {/* Filter Bar (Sticky) */}
            <SearchFilters />

            {/* Main Content - Search Client (Handles Map <-> List Interaction) */}
            <SearchClient
                properties={properties}
                autoFit={autoFit}
                initialCenter={initialCenter}
            />
        </main>
    );
}
