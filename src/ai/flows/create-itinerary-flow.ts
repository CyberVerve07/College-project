'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import {
  ItineraryRequestSchema,
  ItineraryResponseSchema,
  type ItineraryRequest,
  type ItineraryResponse,
} from './itinerary-types';
import { HIMACHAL_KNOWLEDGE } from '@/lib/himachal-knowledge';

export const createItineraryFlow = ai.defineFlow(
  {
    name: 'createItineraryFlow',
    inputSchema: ItineraryRequestSchema,
    outputSchema: ItineraryResponseSchema,
  },
  async (input) => {
    try {
      const prompt = `
        You are an expert local guide and travel planner for Himachal Pradesh.
        
        KNOWLEDGE BASE (Use this for descriptions, travel times, food, and culture):
        ${JSON.stringify(HIMACHAL_KNOWLEDGE, null, 2)}

        REQUEST:
        Create a detailed ${input.days}-day trip to ${input.destinations.join(', ')} for ${input.people} people.
        Budget: ₹${input.budget}.
        Vehicle: ${input.vehiclePreference}.

        Return a JSON object with:
        - estimatedCost (number)
        - recommendedVehicle (string)
        - bookingCTA (string)
        - itinerary: Array of days (day, title, description, travelTime).
        
        CRITICAL INSTRUCTIONS FOR 'description':
        - Do NOT just write generic text.
        - You MUST include specific names of Temples, Cafes, and Dishes from the Knowledge Base.
        - Format the description covers:
          * Morning: [Activity/Spot]
          * Afternoon: [Lunch recommendation & Spot]
          * Evening: [Market/Sunset spot]
          * Food to Try: [Specific Dish Name]
        
        Make it sound like a passionate local guide is speaking.
        `;

      const { output } = await ai.generate({
        prompt,
        output: { schema: ItineraryResponseSchema },
      });

      if (!output) throw new Error("No output generated");
      return output;

    } catch (error) {
      console.error("Itinerary Gen Error:", error);
      console.error("Itinerary Gen Error:", error);

      console.error("Itinerary Gen Error:", error);

      // SMART FALLBACK v3: Multi-Destination, No-Repetition & Deep Details
      const totalDays = input.days;
      const userDests = input.destinations;

      // 1. Identify relevant districts for the chosen destinations
      let relevantDistricts = userDests.map(ud =>
        HIMACHAL_KNOWLEDGE.districts.find(d =>
          d.keywords.some(k => k.toLowerCase() === ud.toLowerCase()) ||
          d.name.toLowerCase().includes(ud.toLowerCase())
        ) || HIMACHAL_KNOWLEDGE.districts[0]
      );

      // Remove duplicates if multiple destinations map to same district (e.g. Manali & Solang -> Kullu)
      relevantDistricts = [...new Set(relevantDistricts)];

      const fallbackItinerary = [];
      const usedPlaces = new Set(); // Track to prevent repetition

      // 2. Distribute days across districts
      for (let i = 0; i < totalDays; i++) {
        // Rotate through districts: Day 1 -> Dist A, Day 2 -> Dist B, Day 3 -> Dist A...
        const district = relevantDistricts[i % relevantDistricts.length];

        // Pick a unique popular place
        let place = district.popular_places.find(p => !usedPlaces.has(p));
        if (!place) {
          place = district.popular_places[Math.floor(Math.random() * district.popular_places.length)];
        }
        usedPlaces.add(place);

        // Pick unique attributes
        const activity = district.activities[i % district.activities.length];
        const food = district.food[i % district.food.length];
        const culture = district.culture[i % district.culture.length];
        const dayNum = i + 1;

        let title = "";
        let desc = "";

        if (dayNum === 1) {
          title = `Arrival in ${district.name} & Relax`;
          desc = `Morning: Arrive and check into your hotel (${district.hotels.mid_range}). \nAfternoon: Visit ${place} for a peaceful start. \nEvening: Stroll around the local market. \nFood to Try: ${food}.`;
        } else if (dayNum === totalDays) {
          title = `Departure & Souvenirs`;
          desc = `Morning: One last view of the mountains from ${place}. \nAfternoon: Buy local handicrafts and ${culture} souvenirs. \nJourney back home with memories.`;
        } else {
          title = `Exploring ${place} & Culture`;
          desc = `Morning: Visit the sacred ${culture}. \nAfternoon: Adventure time! Go for ${activity}. \nEvening: Sunset views at ${place}. \nDinner Recommendation: Try authentic ${food} at a local cafe.`;
        }

        fallbackItinerary.push({
          day: dayNum,
          title: title,
          description: desc,
          travelTime: dayNum === 1 || dayNum === totalDays ? "Traveling" : "Local Sightseeing"
        });
      }

      return {
        estimatedCost: (input.budget || 25000),
        recommendedVehicle: input.vehiclePreference || "SUV",
        bookingCTA: "This is a curated plan based on top local spots. Contact us to book!",
        itinerary: fallbackItinerary
      };
    }
  }
);

export async function createItinerary(input: ItineraryRequest): Promise<ItineraryResponse> {
  return createItineraryFlow(input);
}
