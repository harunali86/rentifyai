'use client';

import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';

interface MapDrawToolsProps {
    onPolygonCreated: (layer: any) => void;
    onPolygonDeleted: () => void;
}

export function MapDrawTools({ onPolygonCreated, onPolygonDeleted }: MapDrawToolsProps) {
    // Customizing Draw Options for Zillow-like feel
    // Only allow Polygons (no Rectangles/Circles for now to keep it "Free Draw")
    // Actually Zillow allows "Draw" which is usually a Polygon.

    return (
        <FeatureGroup>
            <EditControl
                position="topright"
                onCreated={(e) => {
                    const layer = e.layer;
                    onPolygonCreated(layer);
                }}
                onDeleted={() => {
                    onPolygonDeleted();
                }}
                draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false,
                    polygon: {
                        allowIntersection: false,
                        drawError: {
                            color: '#e1e100', // Color the shape will turn when intersects
                            message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
                        },
                        shapeOptions: {
                            color: '#006AFF', // Zillow Blue
                            fillOpacity: 0.2,
                            weight: 2
                        }
                    }
                }}
            />
        </FeatureGroup>
    );
}
