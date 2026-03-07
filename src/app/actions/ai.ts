'use server';

import { chatAssistantFlow } from '@/ai/flows/chat-assistant-flow';
import { ChatRequest } from '@/ai/schemas';

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

