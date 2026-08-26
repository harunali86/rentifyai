'use client';

import dynamic from 'next/dynamic';
import { Property } from '@/lib/api';

const PropertyMap = dynamic(() => import('./PropertyMap').then(mod => mod.PropertyMap), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">Loading Map...</div>
});

interface PropertyMapProps {
    properties: Property[];
    onBoundsChange?: (bounds: any) => void;
    hoveredPropertyId?: string | null;
    onMarkerClick?: (property: Property) => void;
    center?: [number, number];
    autoFit?: boolean;
}

export default function PropertyMapWrapper(props: PropertyMapProps) {
    return <PropertyMap {...props} />;
}
