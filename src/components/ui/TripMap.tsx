'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface TripMapProps {
    destinations: {
        name: string;
        description?: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    }[];
}

export default function TripMap({ destinations }: TripMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="h-[400px] w-full bg-muted/20 animate-pulse rounded-xl" />;

    // Filter valid coordinates
    const markers = destinations.filter(d => d.coordinates?.lat && d.coordinates?.lng);

    if (markers.length === 0) return null;

    // Calculate center
    const centerLat = markers.reduce((sum, d) => sum + (d.coordinates?.lat || 0), 0) / markers.length;
    const centerLng = markers.reduce((sum, d) => sum + (d.coordinates?.lng || 0), 0) / markers.length;

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-white/10 relative z-0">
            <MapContainer
                center={[centerLat, centerLng]}
                zoom={markers.length > 1 ? 7 : 10}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((dest, idx) => (
                    <Marker
                        key={idx}
                        position={[dest.coordinates!.lat, dest.coordinates!.lng]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="text-sm font-semibold">{dest.name}</div>
                            {dest.description && <div className="text-xs text-gray-600">{dest.description}</div>}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
