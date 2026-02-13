'use client';

import { useState, useCallback, useRef } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Car, MapPin, Info, Loader2, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Libraries for Google Maps
const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

const formSchema = z.object({
    pickup: z.string().min(2, {
        message: 'Pickup location must be at least 2 characters.',
    }),
    drop: z.string().min(2, {
        message: 'Drop location must be at least 2 characters.',
    }),
    vehicleType: z.string({
        required_error: 'Please select a vehicle type.',
    }),
});

// Vehicle rates per km (approximate) - ADJUST THESE AS NEEDED
const VEHICLE_RATES = {
    sedan: 14,
    suv: 18,
    innova: 22,
    tempo: 28,
};

export default function FareEstimator() {
    const [distance, setDistance] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [fare, setFare] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load Google Maps Script
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    const [pickupAutocomplete, setPickupAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [dropAutocomplete, setDropAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pickup: '',
            drop: '',
            vehicleType: 'sedan',
        },
    });

    const onPickupLoad = (autocomplete: google.maps.places.Autocomplete) => {
        setPickupAutocomplete(autocomplete);
    };

    const onDropLoad = (autocomplete: google.maps.places.Autocomplete) => {
        setDropAutocomplete(autocomplete);
    };

    const onPickupPlaceChanged = () => {
        if (pickupAutocomplete !== null) {
            const place = pickupAutocomplete.getPlace();
            if (place.formatted_address) {
                form.setValue('pickup', place.formatted_address);
            }
        }
    };

    const onDropPlaceChanged = () => {
        if (dropAutocomplete !== null) {
            const place = dropAutocomplete.getPlace();
            if (place.formatted_address) {
                form.setValue('drop', place.formatted_address);
            }
        }
    };


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        setError(null);
        setFare(null);
        setDistance(null);
        setDuration(null);

        if (!isLoaded) {
            setError("Google Maps API is not loaded yet.");
            setLoading(false);
            return;
        }

        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: values.pickup,
                destination: values.drop,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                setLoading(false);
                if (status === google.maps.DirectionsStatus.OK && result) {
                    const route = result.routes[0];
                    if (route && route.legs && route.legs[0]) {
                        const leg = route.legs[0];
                        const distText = leg.distance?.text || "";
                        const distValue = leg.distance?.value || 0; // meters
                        const durText = leg.duration?.text || "";

                        setDistance(distText);
                        setDuration(durText);

                        // Calculate Fare
                        const distKm = distValue / 1000;
                        const rate = VEHICLE_RATES[values.vehicleType as keyof typeof VEHICLE_RATES];
                        // Simple calculation: Base fare + (distance * rate)
                        // Adding a base fare of 500 for intercity
                        const estimatedFare = Math.round(500 + (distKm * rate));
                        setFare(estimatedFare);
                    }
                } else {
                    console.error(`error fetching directions ${result}`);
                    if (status === 'ZERO_RESULTS') {
                        setError("No route could be found between the origin and destination.");
                    } else if (status === 'NOT_FOUND') {
                        setError("At least one of the locations could not be geocoded.");
                    }
                    else {
                        setError(`Could not calculate distance. Error: ${status}. Please check API Key configuration.`);
                    }
                }
            }
        );
    }

    if (loadError) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Error loading Google Maps API. Please check your API key.
                </AlertDescription>
            </Alert>
        )
    }

    if (!isLoaded) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-primary/20 bg-background/95 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                    <Car className="h-6 w-6" />
                    Fare Estimator
                </CardTitle>
                <CardDescription>
                    Get an instant fare estimate for your journey.
                    <br />
                    <span className="text-xs text-muted-foreground">(Powered by Google Maps)</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="pickup"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pickup Location</FormLabel>
                                    <Autocomplete
                                        onLoad={onPickupLoad}
                                        onPlaceChanged={onPickupPlaceChanged}
                                    >
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="Enter pickup location" className="pl-9" {...field} />
                                            </div>
                                        </FormControl>
                                    </Autocomplete>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="drop"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Drop Location</FormLabel>
                                    <Autocomplete
                                        onLoad={onDropLoad}
                                        onPlaceChanged={onDropPlaceChanged}
                                    >
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="Enter drop location" className="pl-9" {...field} />
                                            </div>
                                        </FormControl>
                                    </Autocomplete>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="vehicleType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="sedan">Sedan (Dzire/Etios)</SelectItem>
                                            <SelectItem value="suv">SUV (Innova/Ertiga)</SelectItem>
                                            <SelectItem value="innova">Innova Crysta</SelectItem>
                                            <SelectItem value="tempo">Tempo Traveller</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Calculating...
                                </>
                            ) : (
                                'Calculate Fare'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            {fare !== null && (
                <CardFooter className="flex flex-col gap-4 bg-primary/5 border-t border-primary/10 pt-6">
                    <div className="flex justify-between w-full text-sm">
                        <span className="text-muted-foreground">Distance:</span>
                        <span className="font-medium">{distance}</span>
                    </div>
                    <div className="flex justify-between w-full text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{duration}</span>
                    </div>
                    <div className="flex justify-between w-full items-center pt-2 border-t border-primary/20">
                        <span className="font-semibold text-lg">Estimated Fare:</span>
                        <span className="font-bold text-2xl text-primary">₹{fare.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-blue-50 p-3 rounded-md flex gap-2 items-start mt-2">
                        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700">
                            This is an approximate fare. Actual fare may vary due to tolls, parking, and night charges.
                        </p>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => {
                        const text = `Hi, I want to book a cab from ${form.getValues('pickup')} to ${form.getValues('drop')}. Estimated fare is ₹${fare}.`;
                        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
                    }}>
                        Book via WhatsApp
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
