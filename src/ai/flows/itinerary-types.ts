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
