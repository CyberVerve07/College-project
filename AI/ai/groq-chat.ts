import Groq from 'groq-sdk';

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
    console.error("❌ GROQ ERROR: No GROQ_API_KEY found in .env.local");
}

/**
 * Groq client configured for the AI assistant chatbot.
 * Uses Llama 3.3 70B Versatile model for high-quality responses.
 */
export const groqClient = new Groq({
    apiKey: groqApiKey,
});

export const GROQ_CHAT_MODEL = 'llama-3.3-70b-versatile';
