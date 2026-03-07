import { ai } from './src/ai/genkit.js';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    try {
        const key = process.env.GOOGLE_GENAI_API_KEY;
        console.log("🔑 API Key present:", !!key);
        console.log("🧪 Testing Google Gemini connection...\n");

        const response = await ai.generate({
            prompt: 'Say "Hello from Gemini!" if you can hear me.',
        });

        console.log("✅ SUCCESS! Gemini is working!");
        console.log("📩 Response:", response.text);
    } catch (error) {
        console.error("❌ Test Error:", error.message);
    }
}

main();
