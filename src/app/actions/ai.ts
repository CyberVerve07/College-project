'use server';

import { chatAssistantFlow } from '@/ai/flows/chat-assistant-flow';
import { fareEstimatorFlow } from '@/ai/flows/fare-estimator-flow';
import { ChatRequest, FareRequest } from '@/ai/schemas';

/**
 * Server action to generate a chat response using OpenRouter AI.
 */
export async function generateChatResponse(input: ChatRequest) {
    try {
        const result = await chatAssistantFlow(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Chat Action Error:", error);
        return { success: false, error: error.message || "Failed to generate response" };
    }
}

/**
 * Server action to estimate fare using OpenRouter AI.
 */
export async function estimateFare(input: FareRequest) {
    try {
        const result = await fareEstimatorFlow(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Fare Action Error:", error);
        return { success: false, error: error.message || "Failed to estimate fare" };
    }
}
