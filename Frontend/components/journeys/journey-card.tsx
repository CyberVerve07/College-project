'use client';

import { Star, MapPin, Calendar, User } from 'lucide-react';

export interface JourneyData {
    id: string;
    title: string;
    story: string;
    location: string;
    date: string;
    rating: number;
    imageUrl: string;
    author: string;
}

interface JourneyCardProps {
    journey: JourneyData;
    index: number;
}

export function JourneyCard({ journey, index }: JourneyCardProps) {
    return (
        <div className="group relative rounded-2xl overflow-hidden bg-card border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <div className="relative w-full h-48 overflow-hidden">
                <img
                    src={journey.imageUrl}
                    alt={journey.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" strokeWidth={1.75} />
                    <span className="text-white text-xs font-bold">{journey.rating}/5</span>
                </div>

                {/* Location on image */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/90">
                    <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                    <span className="text-xs font-semibold">{journey.location}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="!text-base font-bold font-headline text-foreground mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
                    {journey.title}
                </h3>
                <p className="!text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                    {journey.story}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <User className="w-3 h-3 text-white" strokeWidth={1.75} />
                        </div>
                        <span className="text-xs font-medium text-foreground">{journey.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" strokeWidth={1.75} />
                        <span className="text-[11px]">{journey.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
