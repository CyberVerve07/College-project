import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { googleAI, gemini15Flash } from '@genkit-ai/google-genai';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config();

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

console.log('--- DEBUGGING AI CONNECTION ---');
console.log(`API Key Present: ${apiKey ? 'YES (Length: ' + apiKey.length + ')' : 'NO'}`);

if (!apiKey) {
    console.error('CRITICAL: No API Key found in environment variables.');
    process.exit(1);
}

configureGenkit({
    plugins: [googleAI({ apiKey })],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});

async function testConnection() {
    try {
        console.log('Attempting to generate with model: gemini-1.5-flash');
        const response = await generate({
            model: gemini15Flash,
            prompt: 'Hello, are you working? Reply with "Yes, I am online!"',
        });

        console.log('SUCCESS! Response received:');
        console.log(response.text());
    } catch (error: any) {
        console.error('FAILED TO GENERATE:');
        console.error(error.message);

        if (error.message.includes('404')) {
            console.log('\nDIAGNOSIS: Model not found. The model name might be incorrect or not available for this API key.');
        } else if (error.message.includes('403') || error.message.includes('API key')) {
            console.log('\nDIAGNOSIS: API Key Permission Issue.');
        }
    }
}

testConnection();
