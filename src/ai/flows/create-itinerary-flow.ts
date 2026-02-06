'use server';
import { z } from 'zod';
import { ai } from '@/ai/genkit';
import {
  ItineraryRequestSchema,
  ItineraryResponseSchema,
  type ItineraryRequest,
  type ItineraryResponse,
} from './itinerary-types';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Helper to get Firestore (same logic as actions.ts for consistency)
function getDb() {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);
    console.log('Firebase initialized successfully for Flow');
    return db;
  } catch (error) {
    console.error('Firebase initialization failed for Flow:', error);
    throw error;
  }
}

// RAG: Fetch destination context and service metadata from Firestore
async function getPlannerContext(requestedDestinations: string[]) {
  try {
    const db = getDb();
    const [destSnap, servSnap] = await Promise.all([
      getDocs(collection(db, 'destinations')),
      getDocs(collection(db, 'services'))
    ]);

    const allDestinations = destSnap.docs.map(doc => doc.data());
    const allServices = servSnap.docs.map(doc => doc.data());

    // Filter context to only include requested places or nearby ones
    const destContext = allDestinations
      .filter(d => requestedDestinations.includes(d.name?.toLowerCase()) || requestedDestinations.length === 0)
      .map(d => `${d.name}: ${d.description}. Best time: ${d.bestTimeToVisit}. Attractions: ${d.attractions?.join(', ')}`)
      .join('\n');

    const serviceContext = allServices
      .map(s => `${s.name}: Capacity ${s.capacity}. Rates: ${s.pricing}. Best for: ${s.idealFor}`)
      .join('\n');

    return {
      destinations: destContext || 'Use general knowledge for Himachal Pradesh.',
      services: serviceContext
    };
  } catch (error) {
    console.warn('Firestore fallback: Using generic knowledge', error);
    return {
      destinations: 'Use general knowledge for Himachal Pradesh.',
      services: ''
    };
  }
}

const plannerPrompt = ai.definePrompt({
  name: 'himachalItineraryPlanner',
  model: 'googleai/gemini-pro',
  input: {
    schema: ItineraryRequestSchema.extend({
      context: z.string().optional()
    })
  },
  output: { schema: ItineraryResponseSchema },
  prompt: `
    You are an expert travel planner for Destiny Tour & Travels, specializing in Himachal Pradesh.
    
    DESTINATION DATA:
    {{destContext}}

    AVAILABLE VEHICLES & RATES:
    {{serviceContext}}

    User Requirements:
    - Budget: {{budget}} INR
    - Duration: {{days}} days
    - Group Size: {{people}} people
    - Preferred Destinations: {{#each destinations}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    - Vehicle Preference: {{vehiclePreference}}

    Your Constraints:
    1. **Context-First:** Use the LOCAL DATA CONTEXT provided above to suggest specific attractions and timing.
    2. **Realistic Travel:** Mountain travel is slow (30km/h). Don't overpack days.
    3. **Pricing Engine Logic:** 
       - Sedan: 14/km + 300/day driver allowance.
       - SUV: 20/km + 400/day driver allowance.
       - Minimum 250km/day billing applies.
    
    Generate a practical, luxury-feel itinerant plan.
  `,
});

export const createItineraryFlow = ai.defineFlow(
  {
    name: 'createItineraryFlow',
    inputSchema: ItineraryRequestSchema,
    outputSchema: ItineraryResponseSchema,
  },
  async (input) => {
    // Phase 1: Retrieval
    const { destinations: destContext, services: serviceContext } = await getPlannerContext(input.destinations);

    // Phase 2: Generation
    const { output } = await plannerPrompt({ ...input, destContext, serviceContext } as any);

    // Phase 3: Post-processing/Validation (Simulated)
    return output!;
  }
);

export async function createItinerary(input: ItineraryRequest): Promise<ItineraryResponse> {
  return createItineraryFlow(input);
}
