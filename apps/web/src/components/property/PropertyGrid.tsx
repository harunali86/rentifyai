'use client';

import { PropertyCard } from "./PropertyCard";
import { Property } from "@/lib/api";
import { useEffect, useRef } from "react";

interface PropertyGridProps {
    properties: Property[];
    onCardHover?: (id: string | null) => void;
    hoveredPropertyId?: string | null;
}

export function PropertyGrid({ properties, onCardHover, hoveredPropertyId }: PropertyGridProps) {
    const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Auto-scroll to hovered property (triggered by map click/hover)
    useEffect(() => {
        if (hoveredPropertyId && itemRefs.current[hoveredPropertyId]) {
            itemRefs.current[hoveredPropertyId]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [hoveredPropertyId]);

    if (properties.length === 0) {
        return (
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m-5 10hlh1" />
                    </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-400 max-w-sm mx-auto font-medium">We couldn't find any listings matching your criteria. Try adjusting your filters or check back later.</p>
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${properties.length === 1 ? 'max-w-md' : ''}`}>
            {properties.map((property) => (
                <div
                    key={property.id}
                    ref={(el) => { itemRefs.current[property.id] = el; }}
                    onMouseEnter={() => onCardHover?.(property.id)}
                    onMouseLeave={() => onCardHover?.(null)}
                >
                    <PropertyCard property={property} />
                </div>
            ))}
        </div>
    );
}
