'use server';
/**
 * @fileOverview An AI-powered travel planner for Himachal Pradesh.
 *
 * - createItinerary: A function that generates a custom travel itinerary.
 * - ItineraryRequest: The input type for the createItinerary function.
 * - ItineraryResponse: The return type for the createItinerary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const ItineraryRequestSchema = z.object({
  budget: z.number().describe('The total budget for the trip in Indian Rupees (INR).'),
  days: z.number().describe('The total number of days for the trip.'),
  people: z.number().describe('The number of people travelling.'),
  destinations: z.array(z.string()).describe('A list of preferred destinations in Himachal Pradesh.'),
  vehiclePreference: z.string().describe('The preferred type of vehicle (e.g., Sedan, SUV, Tempo Traveller, or Any).'),
});
export type ItineraryRequest = z.infer<typeof ItineraryRequestSchema>;

export const ItineraryResponseSchema = z.object({
  itinerary: z.array(z.object({
    day: z.number().describe('The day number of the itinerary (e.g., 1, 2, 3).'),
    title: z.string().describe('A catchy title for the day\'s plan (e.g., "Arrival in Manali & Local Sightseeing").'),
    description: z.string().describe('A detailed paragraph describing the activities, places to visit, and experiences for the day. Should be engaging and informative.'),
    travelTime: z.string().describe('Estimated travel time for the day in hours (e.g., "Approx. 4-5 hours").'),
  })).describe('A day-wise breakdown of the travel plan.'),
  estimatedCost: z.number().describe('An estimated total cost for the trip in Indian Rupees (INR), considering travel, accommodation, and food for the given budget.'),
  recommendedVehicle: z.string().describe('The recommended vehicle type (e.g., "Sedan", "SUV", "Tempo Traveller") based on the number of people and destinations.'),
  bookingCTA: z.string().describe('A compelling call-to-action text to encourage the user to book the trip.'),
});
export type ItineraryResponse = z.infer<typeof ItineraryResponseSchema>;

// This is the wrapper function that will be called from the client
export async function createItinerary(input: ItineraryRequest): Promise<ItineraryResponse> {
  return createItineraryFlow(input);
}

const plannerPrompt = ai.definePrompt({
  name: 'himachalItineraryPlanner',
  input: { schema: ItineraryRequestSchema },
  output: { schema: ItineraryResponseSchema },
  prompt: `
    You are an expert travel planner for Destiny Tour & Travels, specializing in creating optimized itineraries for Himachal Pradesh. Your task is to generate a practical, enjoyable, and budget-friendly travel plan based on the user's requirements.

    User Requirements:
    - Budget: {{budget}} INR
    - Duration: {{days}} days
    - Group Size: {{people}} people
    - Preferred Destinations: {{#each destinations}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    - Vehicle Preference: {{vehiclePreference}}

    Your Constraints & Knowledge Base:
    1.  **Travel Time is Key:** Mountain travel is slow. Assume an average speed of 30-40 km/h. Be realistic about travel times between destinations. Do not plan more than 6-7 hours of driving on any given day.
    2.  **Seasonal Conditions:**
        - Rohtang Pass (near Manali) is closed from November to May.
        - Spiti Valley is often inaccessible from late October to early June due to heavy snowfall.
        - Monsoon season (July-August) can cause landslides; suggest safer routes or caution.
    3.  **Vehicle Recommendations:**
        - 1-4 people: Sedan (Dzire, Etios) is cost-effective. Recommend an SUV (Innova, Ertiga) for more comfort or rougher terrain.
        - 5-7 people: An SUV (Innova, Scorpio) is necessary.
        - 8-12 people: A Tempo Traveller is the only option.
        - If "Any" is preferred, choose the most cost-effective and practical option.
    4.  **Cost Estimation:** The budget must cover the vehicle, driver, fuel, tolls, and basic accommodation/food. Be realistic. A 5-day trip for 2 people for 25000 INR is more feasible than a 10-day trip. Your estimated cost should be within the user's budget.
    5.  **Itinerary Structure:**
        - The first day should be for arrival and local sightseeing.
        - The last day should be for departure, with minimal activities.
        - Combine nearby destinations logically. For example, Dharamshala and Kangra can be covered together.
    6.  **Output Tone:** Be friendly, encouraging, and professional. The output should feel like it's coming from a trusted travel expert.

    Generate the following output:
    - A day-wise itinerary. Each day must have a day number, a title, a detailed description, and an estimated travel time.
    - An overall estimated cost for the entire trip.
    - A specific recommendation for the best vehicle type.
    - A short, friendly call-to-action to encourage booking. For example: "Ready for an unforgettable adventure? Contact us to book this plan!"
  `,
});

const createItineraryFlow = ai.defineFlow(
  {
    name: 'createItineraryFlow',
    inputSchema: ItineraryRequestSchema,
    outputSchema: ItineraryResponseSchema,
  },
  async (input) => {
    const { output } = await plannerPrompt(input);
    return output!;
  }
);
