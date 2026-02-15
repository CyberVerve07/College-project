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
        You are **Leo AI**, an expert local guide and travel planner for Destiny Tour Travel in Himachal Pradesh.
        Your goal is to create a **highly detailed, immersive, and practical** travel itinerary.
        
        KNOWLEDGE BASE (Use this for descriptions, travel times, food, and culture):
        ${JSON.stringify(HIMACHAL_KNOWLEDGE, null, 2)}

        REQUEST:
        Create a detailed ${input.days}-day trip to ${input.destinations.join(', ')} for ${input.people} people.
        Origin: ${input.origin} (Suggest travel route from here if applicable).
        Budget: ₹${input.budget} (Ensure recommendations fit this budget).
        Vehicle: ${input.vehiclePreference}.

        RETURN FORMAT (JSON):
        Return a JSON object with:
        - estimatedCost (number): Realistic total cost based on mid-range options.
        - recommendedVehicle (string): Best vehicle for the terrain.
        - bookingCTA (string): "Contact Destiny Tour Travel to book this exact trip!"
        - itinerary: Array of days.
          - day (number)
          - title (string): Catchy title (e.g., "The Magic of Spiti Valley").
          - description (string): **THIS IS THE MOST IMPORTANT PART.** Write a full paragraph (approx 50-80 words). 
            - Describe the vibe of the place.
            - Mention specific spots to visit in Morning, Afternoon, and Evening.
            - Include names of famous cafes or restaurants for lunch/dinner.
            - Mention travel times between spots.
          - travelTime (string): e.g., "6 hours drive" or "Local exploration".
        - foodRecommendations: Array of 5-6 specific dishes or famous eateries (e.g., "Cafe 1947", "Siddu at Ghewar's").
        - accommodation: Array of 3-4 specific areas or types (e.g., "Old Manali Homestays", "Luxury Camps in Jispa").
        - thingsToAvoid: Array of 4-5 critical tips (safety, scams, roads).
        - adventures: Array of 3-4 activities available on this route.
        - temples: Array of 3-4 spiritual places to visit.
        
        TONE & STYLE:
        - Write like a passionate local friend, not a robot.
        - Use sensory details (e.g., "crisp mountain air", "aroma of pine").
        - **DO NOT** give generic advice like "Visit local market". Instead say "Stroll through the Mall Road and buy wooden handicrafts."
        - Ensure the itinerary is logically sequenced (don't jump between far-off places in one day).
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
      console.log("⚠️ USING SMART FALLBACK LOGIC - AI GENERATION FAILED");

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
        itinerary: fallbackItinerary,
        foodRecommendations: ["Siddu", "Dham", "Trout Fish", "Thukpa", "Momos"],
        accommodation: ["Homestays", "Boutique Hotels", "Riverside Camps"],
        thingsToAvoid: ["Driving at night", "Littering in mountains", "Overexertion on Day 1"],
        adventures: ["Paragliding", "River Rafting", "Trekking"],
        temples: ["Hadimba Temple", "Jakhu Temple", "Baijnath Temple"]
      };
    }
  }
);

export async function createItinerary(input: ItineraryRequest): Promise<ItineraryResponse> {
  return createItineraryFlow(input);
}
