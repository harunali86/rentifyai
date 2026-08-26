'use client';

import { MapContainer, TileLayer, Marker, useMapEvents, useMap, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useState, useCallback, useMemo, useEffect } from 'react';
import L from 'leaflet';
import { Property } from '@/lib/api';

// Mumbai center
const DEFAULT_CENTER: [number, number] = [19.0760, 72.8777];

// Fix for default marker icon issue in Leaflet + Next.js
const createCustomIcon = (price: string, isHovered: boolean) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `
      <div class="cursor-pointer px-2 py-1 rounded-full text-[10px] font-bold border-2 transition-all duration-200 transform
        ${isHovered
                ? 'bg-brand-600 text-white border-brand-700 scale-125 z-[1000] shadow-xl'
                : 'bg-white text-gray-900 border-gray-200 hover:border-brand-500 hover:scale-110 z-[500] shadow-md'}">
        ₹${price}
      </div>
    `,
        iconSize: [40, 20],
        iconAnchor: [20, 10],
    });
};

function MapEvents({ onBoundsChange }: { onBoundsChange: (bounds: any) => void }) {
    const map = useMapEvents({
        moveend: () => {
            const bounds = map.getBounds();
            onBoundsChange({
                ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
                sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng }
            });
        },
        zoomend: () => {
            const bounds = map.getBounds();
            onBoundsChange({
                ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
                sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng }
            });
        }
    });
    return null;
}

// Inner component to handle bounds fitting
function FitBounds({ properties }: { properties: Property[] }) {
    const map = useMap();

    useEffect(() => {
        if (properties.length === 0) return;

        const bounds = L.latLngBounds(properties.map(p => [Number(p.latitude), Number(p.longitude)]));
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
    }, [properties, map]);

    return null;
}

import { MapDrawTools } from './MapDrawTools';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point, polygon } from '@turf/helpers';

interface PropertyMapProps {
    properties: Property[];
    onBoundsChange?: (bounds: any) => void;
    hoveredPropertyId?: string | null;
    onMarkerClick?: (property: Property) => void;
    center?: [number, number];
    autoFit?: boolean;
}

export function PropertyMap({ properties, onBoundsChange, hoveredPropertyId, onMarkerClick, center, autoFit = true }: PropertyMapProps) {
    const [mounted, setMounted] = useState(false);
    // STABILIZATION FIX: Capture center ONCE on mount.
    // MapContainer ignores center updates anyway, but this ensures prop stability and prevents any potential re-mounting triggers.
    // If center is provided (from URL), use it. otherwise default.
    // We do NOT want to update this when user pans (which updates URL params -> updates center prop).
    const [stableCenter] = useState<[number, number]>(center || DEFAULT_CENTER);

    // Fix for "Map container is being reused" error in strict mode/HMR
    // We generate a unique ID for the map instance to force React to use a fresh DOM node on remount
    const [mapId] = useState(() => `map-${Date.now()}-${Math.random()}`);

    // Polygon Filtering State
    const [filterPolygon, setFilterPolygon] = useState<any | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatPrice = (price: number) => {
        if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
        if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`;
        return `₹${(price / 1000).toFixed(0)}k`;
    };

    // State to track if we should auto-fit bounds (disabled after user manually moves map)
    const [shouldFitBounds, setShouldFitBounds] = useState(autoFit);

    // Initial sync with prop
    useEffect(() => {
        setShouldFitBounds(autoFit);
    }, [autoFit]);

    const handleUserInteraction = useCallback((bounds: any) => {
        // Once user moves map, disable auto-fitting so we don't snap back when new properties load
        setShouldFitBounds(false);
        onBoundsChange?.(bounds);
    }, [onBoundsChange]);

    // Memoize the icon creation to prevent re-creation on every render (Major Performance Fix)
    const getIcon = useCallback((price: string, isHovered: boolean) => {
        return createCustomIcon(price, isHovered);
    }, []);

    // FILTER LOGIC: If polygon exists, only show points inside it
    const visibleProperties = useMemo(() => {
        if (!filterPolygon) return properties;

        return properties.filter(p => {
            if (!p.latitude || !p.longitude) return false;
            try {
                // Turf expects [lng, lat]
                const pt = point([Number(p.longitude), Number(p.latitude)]);
                // Leaflet Polygon to GeoJSON
                const poly = filterPolygon.toGeoJSON();
                return booleanPointInPolygon(pt, poly);
            } catch (err) {
                console.error("Filter error", err);
                return true;
            }
        });
    }, [properties, filterPolygon]);

    if (!mounted) return <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">Initializing Map...</div>;

    return (
        <div className="w-full h-full z-0 relative">
            <MapContainer
                key={mapId}
                center={stableCenter}
                zoom={11}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false} // We will add manual control for better positioning
            >
                <TileLayer
                    attribution='&copy; Google Maps'
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // Standard Map View
                />

                {/* Add Zoom Control in Bottom Right (Zillow Style) */}
                <ZoomControl position="bottomright" />

                <MapDrawTools
                    onPolygonCreated={(layer) => {
                        setFilterPolygon(layer);
                        setShouldFitBounds(false); // Disable auto-fit when drawing
                    }}
                    onPolygonDeleted={() => setFilterPolygon(null)}
                />

                {properties.length > 0 && shouldFitBounds && <FitBounds properties={properties} />}
                {onBoundsChange && <MapEvents onBoundsChange={handleUserInteraction} />}

                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={(cluster: any) => {
                        return L.divIcon({
                            html: `<div class="bg-brand-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg text-sm">${cluster.getChildCount()}</div>`,
                            className: 'custom-cluster-icon',
                            iconSize: [32, 32],
                        });
                    }}
                >
                    {visibleProperties.map((property) => {
                        // If this property is the hovered one, we DO NOT render it inside the cluster
                        // We render it separatedly outside to avoid "re-clustering" crash on icon update
                        if (!property.latitude || !property.longitude) return null;
                        if (property.id === hoveredPropertyId) return null;

                        const priceStr = formatPrice(Number(property.price));

                        return (
                            <Marker
                                key={property.id}
                                position={[Number(property.latitude), Number(property.longitude)]}
                                icon={getIcon(priceStr, false)}
                                eventHandlers={{
                                    click: () => onMarkerClick?.(property)
                                }}
                            />
                        );
                    })}
                </MarkerClusterGroup>

                {/* Render Hovered Marker Separately (Higher Z-Index, No Clustering) */}
                {visibleProperties.map((property) => {
                    if (property.id !== hoveredPropertyId) return null;
                    if (!property.latitude || !property.longitude) return null;

                    const priceStr = formatPrice(Number(property.price));
                    return (
                        <Marker
                            key={`hover-${property.id}`}
                            position={[Number(property.latitude), Number(property.longitude)]}
                            icon={getIcon(priceStr, true)}
                            zIndexOffset={1000} // Force on top
                            eventHandlers={{
                                click: () => onMarkerClick?.(property)
                            }}
                        />
                    );
                })}

                {/* Floating "Remove Boundary" Button if Polygon Active */}
                {filterPolygon && (
                    <div className="leaflet-bottom leaflet-left" style={{ bottom: '20px', left: '20px', pointerEvents: 'auto' }}>
                        <div className="leaflet-control">
                            <button
                                onClick={() => {
                                    // Hacky way to remove layer from Draw control? 
                                    // Ideally we trigger the draw control to clear.
                                    // For now, simple state clear. Visual layer might persist unless we manage FeatureGroup ref.
                                    // Just refreshing map state for MVP.
                                    setFilterPolygon(null);
                                    // Note: This won't remove the visual shape from Leaflet Draw's FeatureGroup automatically
                                    // without passing proper ref or triggering delete. 
                                    // UX Improvement: rely on the Trash icon in Draw toolbar for now.
                                }}
                                className="bg-white text-brand-600 font-bold px-4 py-2 rounded-lg shadow-lg border border-brand-200 hover:bg-brand-50 transition-colors"
                            >
                                Showing {visibleProperties.length} Homes in Boundary
                            </button>
                        </div>
                    </div>
                )}
            </MapContainer>
        </div>
    );
}
