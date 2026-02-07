import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const key = process.env.GOOGLE_GENAI_API_KEY;
    if (!key) {
        console.error('❌ No API Key found in env.');
        process.exit(1);
    }
    console.log(`🔑 Found Key: ${key.slice(0, 8)}...`);

    try {
        const ai = genkit({
            plugins: [googleAI({ apiKey: key })],
            model: 'googleai/gemini-1.5-flash',
        });

        console.log('🔄 Testing generation...');
        const { text } = await ai.generate({ prompt: 'Hello Genkit!' });
        console.log('✅ Success! Response:', text);
    } catch (error: any) {
        console.error('❌ API Key verification failed:', error.message);
        process.exit(1);
    }
}

main();
