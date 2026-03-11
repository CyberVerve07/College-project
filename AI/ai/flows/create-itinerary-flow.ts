'use server';

import {
  ItineraryResponseSchema,
  type ItineraryRequest,
  type ItineraryResponse,
} from './itinerary-types';
import { HIMACHAL_KNOWLEDGE } from '@/images/himachal-knowledge';
import { groqClient, GROQ_CHAT_MODEL } from '@/ai/ai/groq-chat';

/**
 * Create an itinerary using Groq AI (Llama 3.3 70B Versatile)
 */
export async function createItinerary(input: ItineraryRequest): Promise<ItineraryResponse> {
  try {
    const prompt = `
You are **Leo AI**, a smart and friendly travel assistant by Destiny Tour Travel.

Plan a complete Himachal Pradesh trip using the details below.

User Details:
- Starting City: ${input.origin}
- Destination: ${input.destination}
- Total Budget (INR): Rs. ${input.budget}
- Number of Days: ${input.days}
- Number of People: ${input.people}
- Trip Style: ${input.tripStyle}

KNOWLEDGE BASE (Use this data for accuracy on places, food, culture, routes):
${JSON.stringify(HIMACHAL_KNOWLEDGE, null, 2)}

Rules:
1. Suggest ONLY Himachal Pradesh destinations.
2. Keep the plan realistic within the given budget of Rs. ${input.budget} for ${input.people} people.
3. Avoid overtraveling - max 2 locations if days <= 5. For longer trips, add 1-2 more.
4. Prefer safe and popular routes.
5. Mention approximate daily expenses for each day.
6. Do NOT book anything - only planning.
7. Match destinations to the trip style: "${input.tripStyle}".
8. IMPORTANT: Provide accurate Latitude and Longitude for each "Best Destination" so we can show them on a map.

You MUST respond with ONLY valid JSON matching this exact structure (no markdown, no explanation, just JSON):

{
  "bestDestinations": [
    {
      "name": "Place Name",
      "reason": "Why this place suits the user",
      "coordinates": { "lat": 32.2432, "lng": 77.1892 }
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Catchy day title",
      "morning": "Detailed morning plan with specific places",
      "afternoon": "Afternoon activities with food/cafe recommendations",
      "evening": "Evening relaxation, market, sunset spot",
      "dailyExpense": "Rs. X,XXX - Rs. X,XXX per person"
    }
  ],
  "transportAdvice": ["Tip 1", "Tip 2", "Tip 3"],
  "budgetBreakdown": {
    "transport": "Rs. X,XXX",
    "accommodation": "Rs. X,XXX",
    "food": "Rs. X,XXX",
    "activities": "Rs. X,XXX",
    "misc": "Rs. X,XXX",
    "total": "Rs. XX,XXX"
  },
  "localTips": ["Tip about weather", "Clothing advice", "Common mistake to avoid"],
  "bookingCTA": "Contact Destiny Tour Travel to book this exact trip!"
}

IMPORTANT INSTRUCTIONS:
- Respond with ONLY the JSON object, nothing else.
- Write in simple, friendly, human language - like a local friend giving advice.
- Use real names of places, cafes, dishes, temples from the knowledge base.
- Morning/Afternoon/Evening should each be 2-3 sentences with SPECIFIC details.
- Budget breakdown should be realistic and add up close to the user's total budget.
- Give at least 5 local tips covering weather, clothes, food safety, and common tourist mistakes.
- Transport advice should include route suggestions from ${input.origin}, road conditions, and vehicle tips.
`;

    console.log('[Leo AI Planner] Sending request to Groq...');

    const chatCompletion = await groqClient.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are Leo AI, a travel planner. You MUST respond with ONLY valid JSON. No markdown, no code fences, no explanation text.' },
        { role: 'user', content: prompt },
      ],
      model: GROQ_CHAT_MODEL,
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    });

    const text = chatCompletion.choices?.[0]?.message?.content;
    console.log('[Leo AI Planner] Response received, length:', text?.length || 0);

    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from Groq');
    }

    const parsed = JSON.parse(text);
    return ItineraryResponseSchema.parse(parsed);
  } catch (error: any) {
    console.error('Leo AI Generation Error:', error?.message || error);
    console.log('Using fallback logic - AI generation failed');

    const districts = HIMACHAL_KNOWLEDGE.districts;
    const tripDests = districts.slice(0, Math.min(2, districts.length));

    const coordMap: Record<string, { lat: number; lng: number }> = {
      'Kullu & Manali': { lat: 32.2432, lng: 77.1892 },
      Shimla: { lat: 31.1048, lng: 77.1734 },
      'Kangra & Shaktipeeths': { lat: 32.0998, lng: 76.2691 },
      'Lahaul & Spiti': { lat: 32.2276, lng: 78.0772 },
      'Dalhousie & Chamba': { lat: 32.5359, lng: 75.9647 },
      Kinnaur: { lat: 31.651, lng: 78.4754 },
      'Mandi & Bilaspur': { lat: 31.7082, lng: 76.9327 },
    };

    const fallbackItinerary = [];
    for (let i = 0; i < input.days; i++) {
      const district = tripDests[i % tripDests.length];
      const place = district.popular_places[i % district.popular_places.length];
      const food = district.food[i % district.food.length];
      const activity = district.activities[i % district.activities.length];
      const culture = district.culture[i % district.culture.length];

      fallbackItinerary.push({
        day: i + 1,
        title: i === 0 ? `Arrival in ${district.name}` : i === input.days - 1 ? 'Departure Day' : `Exploring ${place}`,
        morning: i === 0
          ? `Arrive in ${district.name} from ${input.origin}. Check into your hotel (${district.hotels.mid_range}).`
          : `Start your morning with a visit to ${place}. Enjoy the fresh mountain air and scenic views.`,
        afternoon: `Grab lunch and try ${food} at a local restaurant. Then head out for ${activity}.`,
        evening: i === input.days - 1
          ? `Pack up souvenirs and start your journey back to ${input.origin}. Safe travels!`
          : `Visit ${culture} in the evening. Stroll through the local market and enjoy street food.`,
        dailyExpense: `Rs. ${Math.round(input.budget / input.days / input.people).toLocaleString()} approx per person`,
      });
    }

    const perPersonBudget = input.budget / input.people;
    return {
      bestDestinations: tripDests.map((d) => ({
        name: d.name,
        reason: `Popular for ${d.activities.slice(0, 2).join(' and ')} with beautiful scenery.`,
        coordinates: coordMap[d.name] || { lat: 31.1048, lng: 77.1734 },
      })),
      itinerary: fallbackItinerary,
      transportAdvice: [
        `From ${input.origin}, take a Volvo bus or drive via NH to ${tripDests[0].name}.`,
        'Roads can be narrow in hills - drive carefully and avoid night driving.',
        'Keep extra fuel and snacks as remote areas may not have shops.',
      ],
      budgetBreakdown: {
        transport: `Rs. ${Math.round(perPersonBudget * 0.3).toLocaleString()}`,
        accommodation: `Rs. ${Math.round(perPersonBudget * 0.3).toLocaleString()}`,
        food: `Rs. ${Math.round(perPersonBudget * 0.2).toLocaleString()}`,
        activities: `Rs. ${Math.round(perPersonBudget * 0.1).toLocaleString()}`,
        misc: `Rs. ${Math.round(perPersonBudget * 0.1).toLocaleString()}`,
        total: `Rs. ${perPersonBudget.toLocaleString()} per person`,
      },
      localTips: [
        'Carry warm clothes even in summer - nights are cold in the hills.',
        'Keep cash handy, ATMs are scarce in remote areas like Spiti.',
        "Don't litter - Himachal has strict eco-tourism rules.",
        'Book accommodation in advance during peak season (May-June, Dec).',
        'Stay hydrated and avoid overexertion on Day 1 to prevent altitude sickness.',
      ],
      bookingCTA: 'Contact Destiny Tour Travel to book this trip at the best price!',
    };
  }
}
