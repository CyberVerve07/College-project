'use server';

import { FareRequest, FareResponse } from '@/ai/schemas';
import { ai } from '@/ai/genkit';

/**
 * Fare Estimator Flow using Genkit (Groq)
 */
/**
 * Fare Estimator Flow
 * Now uses deterministic calculation based on user input distance.
 */
export async function fareEstimatorFlow(input: FareRequest): Promise<FareResponse> {
    try {
        // Parse distance from input
        const distanceVal = parseFloat(input.distance || '0');
        const distance = isNaN(distanceVal) ? 0 : distanceVal;

        const vehicleType = input.vehicleType || 'Sedan';
        const isSedan = vehicleType.toLowerCase().includes('sedan');

        let fare = 0;
        let ratePerKm = isSedan ? 25 : 35; // Default rates

        // Logic: 4km = 100rs (approx 25rs/km)
        // If distance <= 4km, flat 100rs? Or just rate * distance?
        // User said "4 km ka liya kariya hoga 100rs" -> implies 25rs/km base.
        // "long root ha to aur" -> could mean higher rate or check for > X km.

        // Implementing simple tiered logic based on user prompt interpretation
        if (distance <= 4) {
            fare = Math.max(100, distance * 25);
        } else {
            // For > 4km, continue with rate. 
            // "long root ha to aur" -> maybe maintain the rate or slight discount? 
            // Promoting simple linear for now as per "8 km jana ha to 200" (8 * 25 = 200).
            fare = distance * 25;

            if (!isSedan) {
                // SUV rates are typically higher
                fare = distance * 35; // SUV rate assumption
            }
        }

        return {
            estimatedFare: Math.ceil(fare),
            distanceKm: distance,
            vehicle: vehicleType,
            breakdown: `${distance}km @ ₹${isSedan ? 25 : 35}/km`,
        };

    } catch (error: any) {
        console.error("Fare Estimator Error:", error);
        return {
            estimatedFare: 0,
            distanceKm: 0,
            vehicle: input.vehicleType || "Taxi",
            breakdown: "Error calculating fare."
        };
    }
}
