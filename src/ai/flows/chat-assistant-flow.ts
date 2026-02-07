import { z } from 'zod';
import { ai } from '@/ai/genkit';

export const ChatRequestSchema = z.object({
    message: z.string(),
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string()
    })).optional(),
});

export const ChatResponseSchema = z.object({
    answer: z.string(),
    suggestedActions: z.array(z.string()).optional(),
});

import { HIMACHAL_KNOWLEDGE, getSmartFallback } from '@/lib/himachal-knowledge';

export const chatAssistantFlow = ai.defineFlow(
    {
        name: 'chatAssistantFlow',
        inputSchema: ChatRequestSchema,
        outputSchema: ChatResponseSchema,
    },
    async (input) => {
        const systemPrompt = `
        You are "Destiny AI", an expert travel assistant for Himachal Pradesh.
        
        EXTENSIVE KNOWLEDGE BASE:
        ${JSON.stringify(HIMACHAL_KNOWLEDGE, null, 2)}
        
        ROLE & TONE:
        - You are helpful, enthusiastic, and knowledgeable about every corner of Himachal.
        - **CURRENCY RULE**: ALWAYS display prices in **Indian Rupees (₹)**. Never use USD ($). If a price is just a number, assume it is ₹.
        - WHEN ASKED ABOUT HOTELS: Use the price ranges from the knowledge base. Suggest calling our office for specific booking.
        - WHEN ASKED ABOUT PLACES: List the 'popular_places' and 'activities' for that district.
        - ALWAYS start with a friendly greeting if it's the start of convo.
        - Keep responses concise but informative.
        `;

        try {
            const response = await ai.generate({
                system: systemPrompt,
                prompt: input.message,
                messages: input.history?.map(h => ({
                    role: h.role,
                    content: [{ text: h.content }]
                })),
                output: { schema: ChatResponseSchema },
            });

            return response.output || { answer: getSmartFallback(input.message), suggestedActions: [] };
        } catch (error) {
            console.error("Chat Gen Error:", error);
            // Smart Fallback using local search
            return {
                answer: getSmartFallback(input.message),
                suggestedActions: ["View Packages", "Call Support"]
            };
        }
    }
);
