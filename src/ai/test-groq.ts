import { groq } from 'genkitx-groq';
import { genkit } from 'genkit';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
    const apiKey = process.env.GROQ_API_KEY;
    console.log('🔑 Checking API Key:', apiKey ? 'Found (starts with ' + apiKey.substring(0, 5) + '...)' : 'MISSING');

    if (!apiKey) {
        console.error('❌ Error: GROQ_API_KEY is missing in .env or .env.local');
        process.exit(1);
    }

    try {
        console.log('🤖 Initializing Genkit with Groq...');
        const ai = genkit({
            plugins: [
                groq({ apiKey }),
            ],
            model: 'groq/llama-3.1-70b-versatile',
        });

        console.log('📨 Sending test prompt to Groq...');
        const { text } = await ai.generate('Say "Hello from Groq!" if you can hear me.');

        console.log('✅ Success! Response from AI:');
        console.log('---------------------------------------------------');
        console.log(text);
        console.log('---------------------------------------------------');

    } catch (error) {
        console.error('❌ Connection Failed:', error);
    }
}

main();
