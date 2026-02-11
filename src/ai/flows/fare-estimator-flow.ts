'use server';

import { FareRequest, FareResponse } from '@/ai/schemas';
import { ai } from '@/ai/genkit';

/**
 * Fare Estimator Flow using Genkit (Groq)
 */
export async function fareEstimatorFlow(input: FareRequest): Promise<FareResponse> {
    try {
        const prompt = `
        Calculate taxi fare for Himachal Pradesh travel:
        
        From: ${input.from}
        To: ${input.to}
        Vehicle: ${input.vehicleType || 'Sedan'}

        RATES:
        - Sedan (Dzire/Etios): ₹14/km
        - SUV (Innova/Crysta): ₹20/km
        - Tempo Traveller: ₹28/km
        - Minimum billing: 10km
        - Add ₹300 driver charge if distance > 250km

        Return ONLY this JSON format (no other text):
        {
            "estimatedFare": <number>,
            "distanceKm": <number>,
            "vehicle": "<string>",
            "breakdown": "<string like '150km @ ₹14/km'>"
        }
        `;

        const { text } = await ai.generate({
            prompt: prompt,
            config: {
                temperature: 0.3,
            }
        });

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                estimatedFare: parsed.estimatedFare || 0,
                distanceKm: parsed.distanceKm || 0,
                vehicle: parsed.vehicle || input.vehicleType || 'Taxi',
                breakdown: parsed.breakdown || 'Estimated fare',
            };
        }

        throw new Error('Could not parse AI response');

    } catch (error) {
        console.error("Fare Estimator Error:", error);

        const isSedan = input.vehicleType?.toLowerCase().includes('sedan') || !input.vehicleType;
        const rate = isSedan ? 15 : 22;
        const estimatedDist = 50;

        return {
            estimatedFare: estimatedDist * rate,
            distanceKm: estimatedDist,
            vehicle: input.vehicleType || "Taxi",
            breakdown: "Offline estimate. Please contact us for exact rates."
        };
    }
}
