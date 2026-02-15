import { z } from 'zod';

export const ItineraryRequestSchema = z.object({
  origin: z.string().describe('The starting city of the journey (e.g., "Delhi", "Mumbai").'),
  destination: z.string().describe('Where the user wants to go (e.g., "Manali", "Shimla", "Spiti").'),
  budget: z.number().describe('The total budget for the trip in Indian Rupees (INR).'),
  days: z.number().describe('The total number of days for the trip.'),
  people: z.number().describe('The number of people travelling.'),
  tripStyle: z.string().describe('The style of trip: Adventure, Nature, Peace, or Spiritual.'),
});
export type ItineraryRequest = z.infer<typeof ItineraryRequestSchema>;

export const ItineraryResponseSchema = z.object({
  // Section 1: Best Destinations
  bestDestinations: z.array(z.object({
    name: z.string().describe('Name of the destination'),
    reason: z.string().describe('Why this destination is recommended for the user'),
  })).describe('Top recommended destinations with reasons.'),

  // Section 2: Day-wise Itinerary
  itinerary: z.array(z.object({
    day: z.number().describe('Day number'),
    title: z.string().describe('Catchy title for the day'),
    morning: z.string().describe('Morning plan with specific places/activities'),
    afternoon: z.string().describe('Afternoon plan with lunch spot and activities'),
    evening: z.string().describe('Evening plan with dinner or relaxation'),
    dailyExpense: z.string().describe('Approximate expense for this day (e.g., "₹3,000 - ₹4,000")'),
  })).describe('Complete day-by-day breakdown.'),

  // Section 3: Travel & Transport Advice
  transportAdvice: z.array(z.string()).describe('Travel and transport tips (routes, vehicle suggestions, road conditions).'),

  // Section 4: Budget Breakdown
  budgetBreakdown: z.object({
    transport: z.string().describe('Approximate transport cost'),
    accommodation: z.string().describe('Approximate stay cost'),
    food: z.string().describe('Approximate food cost'),
    activities: z.string().describe('Approximate activities/entry fees cost'),
    misc: z.string().describe('Miscellaneous/emergency buffer'),
    total: z.string().describe('Total estimated cost'),
  }).describe('Approximate budget breakdown.'),

  // Section 5: Local Tips
  localTips: z.array(z.string()).describe('Weather advice, clothing tips, common mistakes to avoid, and local insights.'),

  // Booking CTA
  bookingCTA: z.string().describe('Call-to-action text mentioning Destiny Tour Travel.'),
});
export type ItineraryResponse = z.infer<typeof ItineraryResponseSchema>;
