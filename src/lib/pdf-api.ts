import { ItineraryResponse } from '@/ai/flows/itinerary-types';

const JAVA_BACKEND_URL = 'http://localhost:8080/api/pdf';

export async function downloadItineraryPdf(itinerary: ItineraryResponse) {
    try {
        const response = await fetch(JAVA_BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itinerary),
        });

        if (!response.ok) {
            throw new Error('Failed to generate PDF');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TripTo${itinerary.itinerary[0]?.title.split(' ')[0] || 'MyTrip'}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading PDF:', error);
        throw error;
    }
}
