'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function OpenMapView() {
    const [mounted, setMounted] = useState(false);
    // Coordinates for Kangra, Himachal Pradesh
    const position: [number, number] = [32.1024, 76.2692];

    useEffect(() => {
        // Fix leaflet default icon issue in Next.js/Webpack
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-full h-[400px] md:h-[500px] bg-muted/20 animate-pulse rounded-[2.5rem] flex items-center justify-center">
                <p className="text-muted-foreground font-medium">Loading Map...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-card">
            <MapContainer
                center={position}
                zoom={12}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div className="font-bold text-base mb-1">Destiny Tour & Travels</div>
                        <div className="text-sm text-muted-foreground">Main Bazaar, Kangra, HP</div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
