import { z } from 'zod';

export const ItineraryRequestSchema = z.object({
  origin: z.string().describe('The starting point of the journey (e.g., "Delhi", "Mumbai").'),
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
  foodRecommendations: z.array(z.string()).describe('List of specific local dishes or cafes to try (e.g., "Siddu at Manali", "Trout Fish").'),
  accommodation: z.array(z.string()).describe('Suggested areas or types of stays (e.g., "Riverside cottages in Jibhi", "Heritage hotel in Shimla").'),
  thingsToAvoid: z.array(z.string()).describe('Important travel advice on what to avoid (e.g., "Avoid Rohtang Pass on Tuesdays", "Don\'t rely on ATMs in remote Spiti").'),
  adventures: z.array(z.string()).describe('List of adventure activities included or recommended (e.g., "Paragliding in Bir", "River Rafting in Kullu").'),
  temples: z.array(z.string()).describe('List of famous temples or monasteries to visit (e.g., "Hadimba Temple", "Key Monastery").'),
});
export type ItineraryResponse = z.infer<typeof ItineraryResponseSchema>;
