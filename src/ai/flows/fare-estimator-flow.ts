'use server';

import { FareRequest, FareResponse } from '@/ai/schemas';

/**
 * OpenRouter API call for fare estimation
 */
async function callOpenRouterForFare(prompt: string) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY is not set');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://destiny-travel.com',
            'X-Title': 'Destiny Travel AI',
        },
        body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a taxi fare calculator. Always respond with valid JSON only.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 300,
            temperature: 0.3,
        }),
    });

    if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}

/**
 * Fare Estimator Flow using OpenRouter
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

        const aiResponse = await callOpenRouterForFare(prompt);

        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
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
