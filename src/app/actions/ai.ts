'use server';

import { chatAssistantFlow, ChatRequestSchema } from '@/ai/flows/chat-assistant-flow';
import { fareEstimatorFlow, FareRequestSchema } from '@/ai/flows/fare-estimator-flow';
import { z } from 'zod';

export async function generateChatResponse(input: z.infer<typeof ChatRequestSchema>) {
    try {
        const result = await chatAssistantFlow(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Chat Action Error:", error);
        return { success: false, error: error.message || "Failed to generate response" };
    }
}

export async function estimateFare(input: z.infer<typeof FareRequestSchema>) {
    try {
        const result = await fareEstimatorFlow(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Fare Action Error:", error);
        return { success: false, error: error.message || "Failed to estimate fare" };
    }
}
