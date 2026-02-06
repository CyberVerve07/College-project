import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Helper to get Firestore
function getDb() {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    return getFirestore(app);
}

// Input Schema for Chat Assistant
export const ChatRequestSchema = z.object({
    message: z.string().describe('User question or query'),
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string()
    })).optional().describe('Chat history for context'),
});

// Output Schema for Chat Assistant
export const ChatResponseSchema = z.object({
    answer: z.string().describe('Grounded answer from the AI'),
    suggestedActions: z.array(z.string()).optional().describe('Quick replies or next steps'),
    sources: z.array(z.string()).optional().describe('IDs of documents used to answer'),
});

/**
 * AI Chat Assistant Flow
 * Logic:
 * 1. Fetch ALL destinations and services to use as grounding context.
 * 2. Strict system prompt: "If you don't know based on context, say you don't know and provide contact info."
 */
export const chatAssistantFlow = ai.defineFlow(
    {
        name: 'chatAssistantFlow',
        inputSchema: ChatRequestSchema,
        outputSchema: ChatResponseSchema,
    },
    async (input) => {
        const db = getDb();

        // Fetch grounding data
        const [destSnap, servSnap] = await Promise.all([
            getDocs(collection(db, 'destinations')),
            getDocs(collection(db, 'services'))
        ]);

        const context = {
            destinations: destSnap.docs.map(d => ({ id: d.id, ...d.data() })),
            services: servSnap.docs.map(d => ({ id: d.id, ...d.data() }))
        };

        const systemPrompt = `
      You are a helpful travel assistant for "Destiny Tour & Travels", a taxi and travel agency in Kangra, Himachal Pradesh.
      
      AGENCY DATA (GROUNDING CONTEXT):
      ${JSON.stringify(context)}

      STRICT RULES:
      1. ONLY answer based on the provided AGENCY DATA.
      2. If the user asks for something NOT in the data (like international trips, or unrelated topics), politely explain that "Destiny Tour & Travels" specializing in Himachal Pradesh and suggest they contact the agency via WhatsApp: +91-XXXXX-XXXXX.
      3. Do NOT hallucinate prices. If a price is "Contact for Price", tell the user exactly that.
      4. Keep answers concise and professional.
    `;

        const result = await ai.generate({
            system: systemPrompt,
            prompt: input.message,
            // Pass history to allow multi-turn conversation
            messages: input.history?.map(h => ({
                role: h.role as 'user' | 'model',
                content: [{ text: h.content }]
            })),
            output: { schema: ChatResponseSchema },
        });

        return result.output!;
    }
);
