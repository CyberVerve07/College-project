'use client';

import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, AlertTriangle, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
    safetyStatus: string;
    roadStatus: string;
    bestTimeStatus: string;
}

interface WeatherWidgetProps {
    lat: number;
    lng: number;
}

export function WeatherWidget({ lat, lng }: WeatherWidgetProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/weather?lat=${lat}&lng=${lng}`);
                if (!response.ok) throw new Error('Failed to fetch weather');
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lng]);

    if (loading) return <Skeleton className="h-24 w-full rounded-lg" />;
    if (error || !weather) return null; // Hide if error

    const getSafetyColor = (status: string) => {
        switch (status) {
            case 'Safe': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Caution': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Unsafe': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-500';
        }
    };

    const getIcon = (desc: string) => {
        if (desc.includes('rain')) return <CloudRain className="w-5 h-5" />;
        if (desc.includes('snow')) return <Snowflake className="w-5 h-5" />;
        if (desc.includes('cloud')) return <Cloud className="w-5 h-5" />;
        return <Sun className="w-5 h-5" />;
    };

    return (
        <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-sm mt-4">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {getIcon(weather.description)}
                        <span className="text-lg font-bold">{Math.round(weather.temperature)}°C</span>
                    </div>
                    <Badge variant="outline" className={`${getSafetyColor(weather.safetyStatus)}`}>
                        {weather.safetyStatus}
                    </Badge>
                </div>

                <div className="text-sm text-muted-foreground capitalize">
                    {weather.description}
                </div>

                {weather.roadStatus !== 'Open' && (
                    <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md">
                        <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                        <span>Road: {weather.roadStatus}</span>
                    </div>
                )}

                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                    <Thermometer className="w-3 h-3" />
                    <span>{weather.bestTimeStatus}</span>
                </div>
            </CardContent>
        </Card>
    );
}
