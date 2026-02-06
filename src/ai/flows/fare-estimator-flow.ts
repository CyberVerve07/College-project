import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Helper to get Firestore
function getDb() {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    return getFirestore(app);
}

// Input Schema for Fare Estimator
export const FareRequestSchema = z.object({
    from: z.string().describe('Pickup location'),
    to: z.string().describe('Destination location'),
    vehicleType: z.string().describe('Preferred vehicle (e.g., Sedan, Innova, Tempo Traveller)'),
});

// Output Schema for Fare Estimator
export const FareResponseSchema = z.object({
    estimatedFare: z.number().describe('Calculated fare in INR'),
    currency: z.string().default('INR'),
    distanceKm: z.number().describe('Distance used for calculation'),
    breakdown: z.string().describe('Explanation of the cost (rate * distance)'),
    isVerifiedRoute: z.boolean().describe('Whether the distance was found in our verified routes collection'),
    note: z.string().optional().describe('Extra charges like tolls or parking'),
});

/**
 * AI Fare Estimator Flow
 * Logic:
 * 1. Fetch Route data from Firestore (verified distances).
 * 2. Fetch Service data from Firestore (rates per km).
 * 3. Use AI to match user's fuzzy location names to Firestore IDs and calculate final explanation.
 */
export const fareEstimatorFlow = ai.defineFlow(
    {
        name: 'fareEstimatorFlow',
        inputSchema: FareRequestSchema,
        outputSchema: FareResponseSchema,
    },
    async (input) => {
        const db = getDb();

        // 1. Fetch all routes and services for context
        const routesSnap = await getDocs(collection(db, 'routes'));
        const servicesSnap = await getDocs(collection(db, 'services'));

        const routesData = routesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const servicesData = servicesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        const prompt = `
      You are a pricing assistant for Destiny Tour & Travels.
      
      VERIFIED ROUTES:
      ${JSON.stringify(routesData)}
      
      VEHICLE SERVICES:
      ${JSON.stringify(servicesData)}

      USER REQUEST:
      From: ${input.from}
      To: ${input.to}
      Vehicle: ${input.vehicleType}

      INSTRUCTIONS:
      1. Find the best matching route from the VERIFIED ROUTES.
      2. Find the best matching vehicle from VEHICLE SERVICES.
      3. Extract the 'pricing' (e.g., "From ₹15/km") and 'distanceKm'.
      4. Calculate: Fare = Rate * distanceKm.
      5. If no verified route exists, do NOT guess the distance. Instead, return 0 for estimatedFare and set isVerifiedRoute to false.
      6. Return a JSON object matching the schema.
    `;

        const { output } = await ai.generate({
            prompt,
            output: { schema: FareResponseSchema },
        });

        return output!;
    }
);
