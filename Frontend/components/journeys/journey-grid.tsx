'use client';

import { JourneyCard, type JourneyData } from './journey-card';

interface JourneyGridProps {
    journeys: JourneyData[];
}

export function JourneyGrid({ journeys }: JourneyGridProps) {
    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {journeys.map((journey, index) => (
                <div key={journey.id} className="break-inside-avoid">
                    <JourneyCard journey={journey} index={index} />
                </div>
            ))}
        </div>
    );
}
