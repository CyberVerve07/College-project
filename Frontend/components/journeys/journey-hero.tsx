'use client';

import { Compass, PenLine } from 'lucide-react';
import { Button } from '@/frontend/components/ui/button';

interface JourneyHeroProps {
    onShareClick: () => void;
}

export function JourneyHero({ onShareClick }: JourneyHeroProps) {
    return (
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
            {/* Simple static gradient background — no blur animations */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10" />

            <div className="container px-6 md:px-8 text-center relative z-10 max-w-4xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <Compass className="w-4 h-4 text-primary" strokeWidth={1.75} />
                    <span className="text-xs font-semibold text-primary tracking-wide uppercase">Travel Stories</span>
                </div>

                <h1 className="!text-4xl sm:!text-5xl md:!text-6xl font-black font-headline tracking-tight mb-4 !leading-tight">
                    <span className="text-foreground">Share Your </span>
                    <span className="text-gradient">Epic Journey</span>
                </h1>

                <p className="!text-base md:!text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                    Every adventure deserves to be told. Share your travel experiences and inspire fellow explorers.
                </p>

                <Button
                    onClick={onShareClick}
                    size="lg"
                    className="h-12 px-8 text-base font-bold rounded-2xl bg-gradient-to-r from-primary via-cyan-600 to-teal-500 shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <PenLine className="w-5 h-5 mr-2" strokeWidth={1.75} />
                    Share Your Experience
                </Button>
            </div>
        </section>
    );
}
