
import { ai } from './genkit';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    try {
        const key = process.env.GOOGLE_GENAI_API_KEY;
        console.log("Testing AI connection...");
        console.log("API Key present:", !!key);

        // Simple generation
        const response = await ai.generate({
            prompt: 'Hello, are you online?',
        });

        console.log("Response:", response.text);
    } catch (error: any) {
        console.error("Test Error:", error);
    }
}

main();
