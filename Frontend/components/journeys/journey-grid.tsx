'use client';

import { JourneyCard, type JourneyData } from './journey-card';

interface JourneyGridProps {
    journeys: JourneyData[];
}

export function JourneyGrid({ journeys }: JourneyGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {journeys.map((journey, index) => (
                <JourneyCard key={journey.id} journey={journey} index={index} />
            ))}
        </div>
    );
}
