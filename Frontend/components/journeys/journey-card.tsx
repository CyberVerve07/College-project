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
        <div className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-card/60 border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30">
            {/* Image Section - Fixed Height */}
            <div className="relative w-full h-[200px] overflow-hidden">
                <img
                    src={journey.imageUrl}
                    alt={journey.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" strokeWidth={2} />
                    <span className="text-white text-xs font-bold tracking-tight">{journey.rating}/5</span>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                    <span className="text-white text-[11px] font-bold uppercase tracking-wider">{journey.location}</span>
                </div>
            </div>

            {/* Content Section - Flex-1 to push footer */}
            <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-lg font-bold font-headline text-foreground mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors min-h-[2.5rem]">
                        {journey.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {journey.story}
                    </p>
                </div>

                {/* Footer Section - Pushed to bottom */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/80 to-purple-600/80 p-[1px]">
                            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                                <User className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-foreground/90">{journey.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground/70">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                        <span className="text-[11px] font-medium">{journey.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
