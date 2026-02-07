import { z } from 'zod';
import { ai } from '@/ai/genkit';

// Input Schema
export const FareRequestSchema = z.object({
    from: z.string().describe('Pickup location'),
    to: z.string().describe('Destination location'),
    vehicleType: z.string().optional().describe('Preferred vehicle (Sedan, SUV, etc.)'),
});

// Output Schema
export const FareResponseSchema = z.object({
    estimatedFare: z.number().describe('Calculated total fare in INR'),
    distanceKm: z.number().describe('Estimated distance in Kilometers'),
    breakdown: z.string().describe('Short explanation of the cost'),
    vehicle: z.string().describe('The vehicle type used for calculation'),
});

export const fareEstimatorFlow = ai.defineFlow(
    {
        name: 'fareEstimatorFlow',
        inputSchema: FareRequestSchema,
        outputSchema: FareResponseSchema,
    },
    async (input) => {
        try {
            const prompt = `
            You are a taxi fare estimator for "Destiny Tour & Travels" in Himachal Pradesh.
            
            REQUEST:
            From: ${input.from}
            To: ${input.to}
            Vehicle: ${input.vehicleType || 'Any standard taxi'}

            RATES (Use these strictly):
            - Sedan (Dzire/Etios): ₹14/km
            - SUV (Innova/Crysta): ₹20/km
            - Tempo Traveller: ₹28/km
            - Minimum billing distance: 10km

            LOGIC:
            1. Estimate the road distance between the two locations in Himachal Pradesh. Be realistic for mountain roads.
            2. Choose the appropriate rate based on the requested vehicle. If "Any", use Sedan.
            3. Calculate Fare = Distance * Rate.
            4. Add a standard ₹300 driver/night charge if the distance is > 250km.

            OUTPUT:
            Return a JSON object with:
            - estimatedFare (number)
            - distanceKm (number)
            - vehicle (string)
            - breakdown (string, e.g. "250km @ ₹14/km + Tolls")
            `;

            const { output } = await ai.generate({
                prompt,
                output: { schema: FareResponseSchema },
            });

            if (!output) {
                throw new Error('AI could not generate a response.');
            }

            return output;
        } catch (error) {
            console.error("Fare Estimator Error:", error);
            // Return a fallback so the UI doesn't crash
            // Fallback to a safe estimate or contact message
            const isSedan = input.vehicleType?.toLowerCase().includes('sedan') || !input.vehicleType;
            const rate = isSedan ? 15 : 22;
            const estimatedDist = 50; // Default assumption if map fails

            return {
                estimatedFare: estimatedDist * rate,
                distanceKm: estimatedDist,
                vehicle: input.vehicleType || "Taxi",
                breakdown: "System is offline. This is a base estimate for local travel. Please contact us for exact inter-city rates."
            };
        }
    }
);
