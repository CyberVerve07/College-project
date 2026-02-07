'use server';

import { chatAssistantFlow, ChatRequestSchema } from '@/ai/flows/chat-assistant-flow';
import { fareEstimatorFlow, FareRequestSchema } from '@/ai/flows/fare-estimator-flow';
import { z } from 'zod';

/**
 * Server action to generate a chat response using the AI flow.
 * @param {input} input - Chat request data.
 * @returns {Promise<Object>} Success status and data/error.
 */
export async function generateChatResponse(input: z.infer<typeof ChatRequestSchema>) {
    try {
        const result = await chatAssistantFlow(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Chat Action Error:", error);
        return { success: false, error: error.message || "Failed to generate response" };
    }
}

/**
 * Server action to estimate fare using the AI flow.
 * @param {input} input - Fare request data.
 * @returns {Promise<Object>} Success status and data/error.
 */
export async function estimateFare(input: z.infer<typeof FareRequestSchema>) {
    try {
        const result = await fareEstimatorFlow(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Fare Action Error:", error);
        return { success: false, error: error.message || "Failed to estimate fare" };
    }
}
