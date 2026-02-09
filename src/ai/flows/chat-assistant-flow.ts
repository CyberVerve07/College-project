'use server';

import { HIMACHAL_KNOWLEDGE, getSmartFallback } from '@/lib/himachal-knowledge';
import { ChatRequest, ChatResponse } from '@/ai/schemas';

const SYSTEM_PROMPT = `
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

/**
 * OpenRouter API call function
 */
async function callOpenRouter(messages: Array<{ role: string; content: string }>) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY is not set in environment variables');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://destiny-travel.com',
            'X-Title': process.env.OPENROUTER_APP_NAME || 'Destiny Travel AI',
        },
        body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo',
            messages: messages,
            max_tokens: 500,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenRouter API Error:', errorData);
        throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}

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
 * Main chat assistant flow using OpenRouter
 */
export async function chatAssistantFlow(input: ChatRequest): Promise<ChatResponse> {
    try {
        const messages: Array<{ role: string; content: string }> = [
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

        const aiResponse = await callOpenRouter(messages);

        return parseResponse(aiResponse);

    } catch (error: any) {
        console.error("Chat Gen Error:", error.message);

        return {
            answer: getSmartFallback(input.message),
            suggestedActions: ["View Packages", "Call Support"]
        };
    }
}
