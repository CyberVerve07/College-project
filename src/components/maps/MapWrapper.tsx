'use client';

import dynamic from 'next/dynamic';

const DynamicOpenMapView = dynamic(() => import('@/components/maps/OpenMapView'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] md:h-[500px] bg-muted/20 animate-pulse rounded-[2.5rem] flex items-center justify-center">
            <p className="text-muted-foreground font-medium">Loading Map...</p>
        </div>
    )
});

export default function MapWrapper() {
    return <DynamicOpenMapView />;
}
