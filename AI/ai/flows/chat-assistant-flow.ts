'use server';

import { HIMACHAL_KNOWLEDGE, getSmartFallback } from '@/images/himachal-knowledge';
import { ChatRequest, ChatResponse } from '@/ai/ai/schemas';
import { groqClient, GROQ_CHAT_MODEL } from '@/ai/ai/groq-chat';

const SYSTEM_PROMPT = `You are "Destiny AI", an expert local guide for Himachal Pradesh.

KNOWLEDGE BASE:
${JSON.stringify(HIMACHAL_KNOWLEDGE, null, 2)}

INSTRUCTIONS:
1. BE HELPFUL & CONCISE: Answer the user's question directly. Do not write long paragraphs unless asked.
2. CURRENCY: Use ₹ (INR) for all prices.
3. HOTELS: Recommend the generic price ranges from knowledge base. "Budget (₹1200+)", "Luxury (₹6000+)".
4. FORMATTING: Use **bold** for key places/prices. Use lists for itineraries/places.
5. FALLBACK: If you don't know something, suggest: "For precise details, please contact our support team directly."
6. TONE: Friendly, warm, and inviting ("Pahadi hospitality").

Example interaction:
User: "Best places in Manali?"
You: "Manali is beautiful! You must visit **Solang Valley** for adventure, **Hadimba Temple** for peace, and **Old Manali** for cafes. We can arrange a **Volvo bus** or **Private Cab** for you. Want to know hotel rates?"`;

/**
 * Parse AI response to extract answer and suggestions
 */
function parseResponse(content: string): ChatResponse {
    const suggestedActions: string[] = [];

    if (content.toLowerCase().includes('hotel')) suggestedActions.push('View Hotels');
    if (content.toLowerCase().includes('cab') || content.toLowerCase().includes('travel')) suggestedActions.push('Check Cab Rates');
    if (content.toLowerCase().includes('trek') || content.toLowerCase().includes('adventure')) suggestedActions.push('View Packages');

    if (suggestedActions.length === 0) {
        suggestedActions.push('Plan a Trip', 'View Destinations');
    }

    return {
        answer: content,
        suggestedActions: suggestedActions.slice(0, 3),
    };
}

/**
 * Main chat assistant flow using Groq (Llama 3.3 70B)
 */
export async function chatAssistantFlow(input: ChatRequest): Promise<ChatResponse> {
    try {
        // Build message history for Groq
        const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
            { role: 'system', content: SYSTEM_PROMPT },
        ];

        if (input.history && input.history.length > 0) {
            for (const msg of input.history) {
                messages.push({
                    role: msg.role === 'user' ? 'user' : 'assistant',
                    content: msg.content,
                });
            }
        }

        messages.push({ role: 'user', content: input.message });

        console.log('[Groq Chat] Sending request with model:', GROQ_CHAT_MODEL);

        const chatCompletion = await groqClient.chat.completions.create({
            messages,
            model: GROQ_CHAT_MODEL,
            temperature: 0.7,
            max_tokens: 1024,
        });

        const text = chatCompletion.choices?.[0]?.message?.content;

        console.log('[Groq Chat] Response received, length:', text?.length || 0);

        if (!text || text.trim().length === 0) {
            console.warn('[Groq Chat] Empty response from Groq, using fallback.');
            return {
                answer: getSmartFallback(input.message),
                suggestedActions: ["Plan a Trip", "View Destinations"]
            };
        }

        return parseResponse(text);

    } catch (error: any) {
        console.error("[Groq Chat] Error:", error?.message || error);

        return {
            answer: getSmartFallback(input.message),
            suggestedActions: ["View Packages", "Call Support"]
        };
    }
}
