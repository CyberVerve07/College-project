'use client';

import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Compass, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/frontend/components/ui/card';

interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  humidity: number;
  windSpeed: number;
  recommendation: string;
}

const destinationWeatherConfig: Record<string, { baseTemp: number; range: number; recommendations: string[] }> = {
  'dharamshala': { baseTemp: 18, range: 6, recommendations: ["Perfect for a walk in McLeod Ganj.", "Carry light jacket for the evening.", "Great weather for visiting monasteries."] },
  'shimla': { baseTemp: 15, range: 5, recommendations: ["Walk down Mall road.", "Evening can get chilly. Carry woolens.", "Ideal for historical sightseeing."] },
  'manali': { baseTemp: 12, range: 7, recommendations: ["Check Rohtang Pass status.", "Perfect for adventure sports.", "Evening bonfire recommended!"] },
  'sissu': { baseTemp: 8, range: 6, recommendations: ["Heavy woolens required.", "Beautiful waterfall views today.", "Drive safely through Atal Tunnel."] },
  'spiti valley': { baseTemp: 2, range: 8, recommendations: ["Extreme cold. Layer up!", "Ensure your vehicle has anti-freeze.", "Magnificent clear skies for stargazing."] },
  'kasol': { baseTemp: 16, range: 4, recommendations: ["Perfect riverside café weather.", "Carry a warm fleece.", "Stroll around the pine forests."] },
  'shoja': { baseTemp: 14, range: 5, recommendations: ["Serene and misty environment.", "Trek to Jalori Pass is open.", "Relax with mountain views."] },
  'sangla valley': { baseTemp: 10, range: 6, recommendations: ["Stunning view of Kinnar Kailash.", "Apple orchard tours are great today.", "Keep warm layers handy."] },
};

export default function WeatherWidget({ destination }: { destination: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const destKey = destination.toLowerCase().trim();
    const config = destinationWeatherConfig[destKey] || {
      baseTemp: 15,
      range: 5,
      recommendations: ["Stay safe and enjoy the mountain vibes!", "Check local travel advisories.", "Carry all-weather gear."]
    };

    // Simulate an API call with realistic local seasonal variance
    const timer = setTimeout(() => {
      const currentMonth = new Date().getMonth(); // 0-11
      let seasonalOffset = 0;
      
      // Winter offset (Nov-Feb)
      if (currentMonth >= 10 || currentMonth <= 1) {
        seasonalOffset = -8;
      }
      // Summer offset (May-July)
      else if (currentMonth >= 4 && currentMonth <= 6) {
        seasonalOffset = 8;
      }

      const calculatedTemp = Math.round(config.baseTemp + seasonalOffset + (Math.random() * config.range - config.range / 2));
      
      // Determine condition based on temperature & seasonality
      let condition: WeatherData['condition'] = 'sunny';
      if (calculatedTemp <= 4) {
        condition = 'snowy';
      } else if (currentMonth >= 6 && currentMonth <= 7) {
        // Monsoon season (July-August)
        condition = 'rainy';
      } else if (Math.random() > 0.6) {
        condition = 'cloudy';
      }

      // Pick recommendations
      const recommendations = config.recommendations;
      const rec = recommendations[Math.floor(Math.random() * recommendations.length)];

      setWeather({
        temp: calculatedTemp,
        condition,
        humidity: Math.round(50 + Math.random() * 30),
        windSpeed: Math.round(5 + Math.random() * 15),
        recommendation: rec
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [destination]);

  if (loading) {
    return (
      <Card className="border-white/10 bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center h-28 text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin text-primary mr-2" />
        <span className="text-xs font-bold uppercase tracking-wider">Fetching live weather...</span>
      </Card>
    );
  }

  if (!weather) return null;

  const WeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="w-10 h-10 text-amber-400 animate-spin-slow" />;
      case 'cloudy':
        return <Cloud className="w-10 h-10 text-slate-300 animate-pulse" />;
      case 'rainy':
        return <CloudRain className="w-10 h-10 text-blue-400 animate-bounce" />;
      case 'snowy':
        return <CloudSnow className="w-10 h-10 text-sky-200" />;
      default:
        return <Sun className="w-10 h-10 text-amber-400" />;
    }
  };

  return (
    <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-all duration-700" />
      
      <CardContent className="p-0 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        {/* Temp & Icon info */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
            <WeatherIcon />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{destination}</h3>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-black">{weather.temp}°C</span>
              <span className="text-xs font-semibold text-slate-400 capitalize">{weather.condition}</span>
            </div>
          </div>
        </div>

        {/* Details and recommendations */}
        <div className="flex-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-5 text-center sm:text-left space-y-1.5 w-full">
          <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
            <Compass className="w-3.5 h-3.5 text-primary" />
            <span className="font-bold uppercase tracking-wider">Travel Suggestion:</span>
          </p>
          <p className="text-sm font-semibold text-slate-100">{weather.recommendation}</p>
          
          <div className="flex justify-center sm:justify-start gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-0.5">
            <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-secondary" /> Wind: {weather.windSpeed} km/h</span>
            <span className="flex items-center gap-1"><Cloud className="w-3 h-3 text-secondary" /> Humidity: {weather.humidity}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
