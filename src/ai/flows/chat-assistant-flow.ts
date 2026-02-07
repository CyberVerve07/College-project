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
        You are "Destiny AI", an expert local guide for Himachal Pradesh.
        
        KNOWLEDGE BASE:
        ${JSON.stringify(HIMACHAL_KNOWLEDGE, null, 2)}
        
        INSTRUCTIONS:
        1. **BE HELPFUL & CONCISE**: Answer the user's question directly. Do not write long paragraphs unless asked.
        2. **CURRENCY**: Use ₹ (INR) for all prices.
        3. **HOTELS**: Recommend the generic price ranges from knowledge base. "Budget (₹1200+)", "Luxury (₹6000+)".
        4. **FORMATTING**: Use **bold** for key places/prices. Use lists for itineraries/places.
        5. **FALLBACK**: If you don't know something, suggest: "For precise details, please contact our support team directly."
        6. **TONE**: Friendly, warm, and inviting ("Pahadi hospitality").

        Example interaction:
        User: "Best places in Manali?"
        You: "Manali is beautiful! You must visit **Solang Valley** for adventure, **Hadimba Temple** for peace, and **Old Manali** for cafes. We can arrange a **Volvo bus** or **Private Cab** for you. Want to know hotel rates?"
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
