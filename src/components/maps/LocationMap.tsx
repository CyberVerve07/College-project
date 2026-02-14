'use client';

import { useState, useEffect, useRef } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { Loader2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ["places"];

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.75rem',
};

const defaultCenter = {
    lat: 32.0998, // Kangra
    lng: 76.2691,
};

const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
};

export default function LocationMap() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setUserLocation(pos);
                    if (mapRef) {
                        mapRef.panTo(pos);
                    }
                },
                (err) => {
                    console.error("Error getting location", err);
                    setError("Unable to retrieve your location. Please enable location services.");
                },
                { enableHighAccuracy: true }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, [mapRef]);

    const onMapLoad = (map: google.maps.Map) => {
        setMapRef(map);
        if (userLocation) {
            map.panTo(userLocation);
        }
    };

    const handleCenterMap = () => {
        if (userLocation && mapRef) {
            mapRef.panTo(userLocation);
            mapRef.setZoom(15);
        }
    };

    if (loadError) return <div className="p-4 text-red-500">Error loading maps</div>;
    if (!isLoaded) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="relative w-full h-[400px] md:h-[500px] flex flex-col gap-2">
            {error && (
                <div className="bg-red-50 text-red-600 p-2 text-sm rounded mb-2 border border-red-200">
                    {error}
                </div>
            )}

            <div className="relative flex-1 rounded-xl overflow-hidden border border-border shadow-inner">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={14}
                    center={userLocation || defaultCenter}
                    options={mapOptions}
                    onLoad={onMapLoad}
                >
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            title="You are here"
                            icon={{
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 8,
                                fillColor: "#4285F4",
                                fillOpacity: 1,
                                strokeColor: "#ffffff",
                                strokeWeight: 2,
                            }}
                        />
                    )}
                </GoogleMap>

                <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-4 right-4 shadow-lg z-10 gap-2 bg-background/90 backdrop-blur-sm"
                    onClick={handleCenterMap}
                    disabled={!userLocation}
                >
                    <Navigation className="w-4 h-4" />
                    Recenter
                </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
                Review your live location. Use this to verify pickup points or track your journey.
            </p>
        </div>
    );
}
