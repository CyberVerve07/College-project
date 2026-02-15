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
You are **Leo AI**, a smart and friendly travel assistant by Destiny Tour Travel.

Plan a complete Himachal Pradesh trip using the details below.

User Details:
- Starting City: ${input.origin}
- Total Budget (INR): ₹${input.budget}
- Number of Days: ${input.days}
- Number of People: ${input.people}
- Vehicle Preference: ${input.vehiclePreference}
- Trip Style: ${input.tripStyle}

KNOWLEDGE BASE (Use this data for accuracy on places, food, culture, routes):
${JSON.stringify(HIMACHAL_KNOWLEDGE, null, 2)}

Rules:
1. Suggest ONLY Himachal Pradesh destinations.
2. Keep the plan realistic within the given budget of ₹${input.budget} for ${input.people} people.
3. Avoid overtraveling — max 2 locations if days ≤ 5. For longer trips, add 1-2 more.
4. Prefer safe and popular routes.
5. Mention approximate daily expenses for each day.
6. Do NOT book anything — only planning.
7. Match destinations to the trip style: "${input.tripStyle}".

Output Format (strictly follow this JSON structure):

{
  "bestDestinations": [
    { "name": "Place Name", "reason": "Why this place suits the user" }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Catchy day title",
      "morning": "Detailed morning plan with specific places",
      "afternoon": "Afternoon activities with food/cafe recommendations",
      "evening": "Evening relaxation, market, sunset spot",
      "dailyExpense": "₹X,XXX - ₹X,XXX per person"
    }
  ],
  "transportAdvice": ["Tip 1", "Tip 2", "Tip 3"],
  "budgetBreakdown": {
    "transport": "₹X,XXX",
    "accommodation": "₹X,XXX",
    "food": "₹X,XXX",
    "activities": "₹X,XXX",
    "misc": "₹X,XXX",
    "total": "₹XX,XXX"
  },
  "localTips": ["Tip about weather", "Clothing advice", "Common mistake to avoid"],
  "bookingCTA": "Contact Destiny Tour Travel to book this exact trip!",
  "recommendedVehicle": "Best vehicle type"
}

IMPORTANT INSTRUCTIONS:
- Write in simple, friendly, human language — like a local friend giving advice.
- Use real names of places, cafes, dishes, temples from the knowledge base.
- Morning/Afternoon/Evening should each be 2-3 sentences with SPECIFIC details.
- Budget breakdown should be realistic and add up close to the user's total budget.
- Give at least 5 local tips covering weather, clothes, food safety, and common tourist mistakes.
- Transport advice should include route suggestions from ${input.origin}, road conditions, and vehicle tips.
`;

      const { output } = await ai.generate({
        prompt,
        output: { schema: ItineraryResponseSchema },
      });

      if (!output) throw new Error("No output generated");
      return output;

    } catch (error) {
      console.error("Leo AI Generation Error:", error);
      console.log("⚠️ USING FALLBACK LOGIC - AI GENERATION FAILED");

      // FALLBACK: Generate a basic but structured response
      const districts = HIMACHAL_KNOWLEDGE.districts;
      const tripDests = districts.slice(0, Math.min(2, districts.length));

      const fallbackItinerary = [];
      for (let i = 0; i < input.days; i++) {
        const district = tripDests[i % tripDests.length];
        const place = district.popular_places[i % district.popular_places.length];
        const food = district.food[i % district.food.length];
        const activity = district.activities[i % district.activities.length];
        const culture = district.culture[i % district.culture.length];

        fallbackItinerary.push({
          day: i + 1,
          title: i === 0 ? `Arrival in ${district.name}` : i === input.days - 1 ? `Departure Day` : `Exploring ${place}`,
          morning: i === 0
            ? `Arrive in ${district.name} from ${input.origin}. Check into your hotel (${district.hotels.mid_range}).`
            : `Start your morning with a visit to ${place}. Enjoy the fresh mountain air and scenic views.`,
          afternoon: `Grab lunch and try ${food} at a local restaurant. Then head out for ${activity}.`,
          evening: i === input.days - 1
            ? `Pack up souvenirs and start your journey back to ${input.origin}. Safe travels!`
            : `Visit ${culture} in the evening. Stroll through the local market and enjoy street food.`,
          dailyExpense: `₹${Math.round(input.budget / input.days / input.people).toLocaleString()} approx per person`,
        });
      }

      const perPersonBudget = input.budget / input.people;
      return {
        bestDestinations: tripDests.map(d => ({
          name: d.name,
          reason: `Popular for ${d.activities.slice(0, 2).join(' and ')} with beautiful scenery.`,
        })),
        itinerary: fallbackItinerary,
        transportAdvice: [
          `From ${input.origin}, take a Volvo bus or drive via NH to ${tripDests[0].name}.`,
          `Roads can be narrow in hills — drive carefully and avoid night driving.`,
          `Keep extra fuel/snacks as remote areas may not have shops.`,
        ],
        budgetBreakdown: {
          transport: `₹${Math.round(perPersonBudget * 0.30).toLocaleString()}`,
          accommodation: `₹${Math.round(perPersonBudget * 0.30).toLocaleString()}`,
          food: `₹${Math.round(perPersonBudget * 0.20).toLocaleString()}`,
          activities: `₹${Math.round(perPersonBudget * 0.10).toLocaleString()}`,
          misc: `₹${Math.round(perPersonBudget * 0.10).toLocaleString()}`,
          total: `₹${perPersonBudget.toLocaleString()} per person`,
        },
        localTips: [
          "Carry warm clothes even in summer — nights are cold in the hills.",
          "Keep cash handy, ATMs are scarce in remote areas like Spiti.",
          "Don't litter — Himachal has strict eco-tourism rules.",
          "Book accommodation in advance during peak season (May-June, Dec).",
          "Stay hydrated and avoid overexertion on Day 1 to prevent altitude sickness.",
        ],
        bookingCTA: "Contact Destiny Tour Travel to book this trip at the best price!",
        recommendedVehicle: input.vehiclePreference === "Any" ? "SUV" : input.vehiclePreference,
      };
    }
  }
);

export async function createItinerary(input: ItineraryRequest): Promise<ItineraryResponse> {
  return createItineraryFlow(input);
}
