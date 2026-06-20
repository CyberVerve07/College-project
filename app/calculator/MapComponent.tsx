'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapComponentProps {
  pickupCoords?: [number, number];
  dropCoords?: [number, number];
  pickupName: string;
  dropName: string;
}

export default function MapComponent({ pickupCoords, dropCoords, pickupName, dropName }: MapComponentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix leaflet default icon issue in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    setMounted(true);
  }, []);

  if (!mounted || !pickupCoords || !dropCoords) {
    return (
      <div className="w-full h-full bg-slate-900/40 rounded-3xl flex items-center justify-center text-slate-400">
        <span>Initializing Map...</span>
      </div>
    );
  }

  // Calculate center coordinate between pickup and drop
  const centerCoord: [number, number] = [
    (pickupCoords[0] + dropCoords[0]) / 2,
    (pickupCoords[1] + dropCoords[1]) / 2
  ];

  // Dynamic zoom based on pickup/drop distance
  const distance = Math.abs(pickupCoords[0] - dropCoords[0]) + Math.abs(pickupCoords[1] - dropCoords[1]);
  const zoom = distance > 5 ? 6 : distance > 2 ? 8 : 10;

  // Key change to force re-render/re-center on updates
  const mapKey = `${pickupCoords[0]}-${pickupCoords[1]}-${dropCoords[0]}-${dropCoords[1]}`;

  return (
    <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-card">
      <MapContainer
        key={mapKey}
        center={centerCoord}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Pickup Marker */}
        <Marker position={pickupCoords}>
          <Popup>
            <div className="font-bold text-xs uppercase tracking-wider text-slate-500">Pickup Location</div>
            <div className="font-headline font-bold text-sm text-slate-900">{pickupName}</div>
          </Popup>
        </Marker>

        {/* Drop Marker */}
        {pickupName !== dropName && (
          <Marker position={dropCoords}>
            <Popup>
              <div className="font-bold text-xs uppercase tracking-wider text-slate-500">Drop Location</div>
              <div className="font-headline font-bold text-sm text-slate-900">{dropName}</div>
            </Popup>
          </Marker>
        )}

        {/* Polyline connection */}
        {pickupName !== dropName && (
          <Polyline 
            positions={[pickupCoords, dropCoords]} 
            pathOptions={{ color: 'hsl(var(--primary))', weight: 4, dashArray: '6, 6' }} 
          />
        )}
      </MapContainer>
    </div>
  );
}
