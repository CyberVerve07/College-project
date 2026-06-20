'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/frontend/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/frontend/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/frontend/components/ui/select';
import { Compass, Car, Navigation, ShieldCheck, Sparkles, MapPin, Loader2, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Load Leaflet map components dynamically to prevent SSR hydration mismatches
const MapComponent = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-slate-900/40 rounded-3xl flex items-center justify-center text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
        <span>Loading map environment...</span>
      </div>
    )
  }
);

interface City {
  name: string;
  coords: [number, number];
}

const cities: City[] = [
  { name: 'Dharamshala', coords: [32.2190, 76.3234] },
  { name: 'Shimla', coords: [31.1048, 77.1734] },
  { name: 'Manali', coords: [32.2718, 77.1887] },
  { name: 'Kangra', coords: [32.1024, 76.2692] },
  { name: 'Pathankot', coords: [32.2689, 75.6531] },
  { name: 'Chandigarh', coords: [30.7333, 76.7794] },
  { name: 'Delhi', coords: [28.6139, 77.2090] },
  { name: 'Sissu', coords: [32.4833, 77.1167] }
];

const vehicleRates = [
  { name: 'Maruti Alto', baseRate: 1500, perKm: 12, id: 'maruti-alto' },
  { name: 'Swift Dzire (Sedan)', baseRate: 2000, perKm: 15, id: 'swift-dzire' },
  { name: 'Toyota Innova Crysta (SUV)', baseRate: 3500, perKm: 22, id: 'innova-crysta' },
  { name: 'Mahindra Thar (4x4)', baseRate: 4000, perKm: 25, id: 'mahindra-thar' },
  { name: 'Tempo Traveller', baseRate: 6000, perKm: 35, id: 'mini-bus' }
];

export default function CalculatorPage() {
  const [pickup, setPickup] = useState<string>('Dharamshala');
  const [drop, setDrop] = useState<string>('Manali');
  const [vehicle, setVehicle] = useState<string>('swift-dzire');

  const pickupCity = useMemo(() => cities.find(c => c.name === pickup), [pickup]);
  const dropCity = useMemo(() => cities.find(c => c.name === drop), [drop]);
  const selectedVehicle = useMemo(() => vehicleRates.find(v => v.id === vehicle) || vehicleRates[1], [vehicle]);

  const distance = useMemo(() => {
    if (!pickupCity || !dropCity) return 0;
    if (pickup === drop) return 0;
    
    // Haversine formula with mountain winding multiplier (1.4x)
    const R = 6371; // km
    const dLat = (dropCity.coords[0] - pickupCity.coords[0]) * Math.PI / 180;
    const dLng = (dropCity.coords[1] - pickupCity.coords[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pickupCity.coords[0] * Math.PI / 180) * Math.cos(dropCity.coords[0] * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return Math.round(d * 1.4);
  }, [pickupCity, dropCity, pickup, drop]);

  const estimatedFare = useMemo(() => {
    if (distance === 0) return 0;
    return Math.round(selectedVehicle.baseRate + (distance * selectedVehicle.perKm));
  }, [distance, selectedVehicle]);

  return (
    <div className="min-h-screen py-24 bg-[#050b1a] text-white relative">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Title */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Fare Estimation
          </div>
          <h1 className="text-5xl sm:text-7xl font-headline font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Route & <span className="text-primary italic">Cost Calculator</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg">
            Choose your travel cities and preferred vehicle type to get an instant estimated fare for your journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Form Card */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex-1 flex flex-col justify-between gap-6">
              
              <div className="space-y-6">
                <div>
                  <CardTitle className="text-2xl font-headline font-bold">Configure Trip</CardTitle>
                  <CardDescription className="text-slate-400 text-xs">Fill details for fare output</CardDescription>
                </div>

                <div className="space-y-4">
                  {/* Pickup */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Pickup Location</label>
                    <Select value={pickup} onValueChange={setPickup}>
                      <SelectTrigger className="bg-slate-950/60 border-white/10 rounded-xl text-white">
                        <SelectValue placeholder="Select pickup city" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-white/10 text-white rounded-xl">
                        {cities.map(city => (
                          <SelectItem key={city.name} value={city.name} className="focus:bg-primary/20 focus:text-white">
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Drop */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Drop Location</label>
                    <Select value={drop} onValueChange={setDrop}>
                      <SelectTrigger className="bg-slate-950/60 border-white/10 rounded-xl text-white">
                        <SelectValue placeholder="Select drop city" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-white/10 text-white rounded-xl">
                        {cities.map(city => (
                          <SelectItem key={city.name} value={city.name} className="focus:bg-primary/20 focus:text-white">
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vehicle */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Vehicle Type</label>
                    <Select value={vehicle} onValueChange={setVehicle}>
                      <SelectTrigger className="bg-slate-950/60 border-white/10 rounded-xl text-white">
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-white/10 text-white rounded-xl">
                        {vehicleRates.map(v => (
                          <SelectItem key={v.id} value={v.id} className="focus:bg-primary/20 focus:text-white">
                            {v.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pricing breakdown */}
              {pickup === drop ? (
                <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 text-center text-slate-500 text-xs italic">
                  Select different pickup and drop cities to calculate fare.
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Calculated Distance:</span>
                      <span className="font-bold text-white">{distance} KM</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Base Fare ({selectedVehicle.name}):</span>
                      <span className="font-bold text-white">₹{selectedVehicle.baseRate}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Per KM Rate:</span>
                      <span className="font-bold text-white">₹{selectedVehicle.perKm} / km</span>
                    </div>
                    <div className="h-px bg-white/5 my-1" />
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Fare:</span>
                      <span className="text-2xl font-black text-primary">₹{estimatedFare}</span>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/95 hover:to-purple-600/95 font-bold h-12 rounded-xl flex items-center justify-center gap-2">
                    <Link href={`/contact?pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(drop)}&vehicle=${encodeURIComponent(selectedVehicle.name)}&fare=${estimatedFare}`}>
                      Book Trip Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Map Card */}
          <div className="flex-1 min-h-[400px] lg:min-h-[500px]">
            <MapComponent 
              pickupCoords={pickupCity?.coords} 
              dropCoords={dropCity?.coords} 
              pickupName={pickup} 
              dropName={drop} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
