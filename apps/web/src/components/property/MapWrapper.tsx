'use client';

import dynamic from 'next/dynamic';
import { Property } from '@/lib/api';

const PropertyMap = dynamic(
    () => import('./PropertyMap').then(mod => mod.PropertyMap),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
                Loading Interactive Map...
            </div>
        ),
    }
);

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useRef } from 'react';

export function MapWrapper({ properties, autoFit = true, initialCenter, hoveredPropertyId, onMarkerClick, onBoundsUpdate, onBoundsChange }: { properties: Property[], autoFit?: boolean, initialCenter?: [number, number], hoveredPropertyId?: string | null, onMarkerClick?: (property: Property) => void, onBoundsUpdate?: (bounds: any) => void, onBoundsChange?: (bounds: any) => void }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Debounce the URL update and Data Fetch to avoid excessive requests while panning
    const handleBoundsChange = useCallback((bounds: any) => {
        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            params.set('ne_lat', bounds.ne.lat);
            params.set('ne_lng', bounds.ne.lng);
            params.set('sw_lat', bounds.sw.lat);
            params.set('sw_lng', bounds.sw.lng);

            // 1. Silent URL Update (No Reload, No Vibration) - "Google Maps Feel"
            window.history.replaceState(null, '', `/search?${params.toString()}`);

            // 2. Trigger Client-Side Data Fetch (Background)
            onBoundsChange?.(bounds);
        }, 500); // reduced to 500ms for snappier feel
    }, [searchParams, onBoundsChange]);

    return (
        <PropertyMap
            properties={properties}
            onBoundsChange={handleBoundsChange}
            autoFit={autoFit}
            center={initialCenter}
            hoveredPropertyId={hoveredPropertyId}
            onMarkerClick={onMarkerClick}
        />
    );
}
