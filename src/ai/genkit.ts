import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GENKIT ERROR: No API key found. Please check .env file.");
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-1.5-flash-latest',
});

