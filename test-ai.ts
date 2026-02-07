
import { ai } from './src/ai/genkit';
import * as dotenv from 'dotenv';
dotenv.config();

console.log("Checking API Key...");
const key = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

if (!key) {
    console.error("No API key found in environment!");
    process.exit(1);
}

console.log("API Key found (length):", key.length);

async function main() {
    try {
        console.log("Generating...");
        const response = await ai.generate({
            prompt: 'Hello from test script!',
        });
        console.log("Response:", response.text);
    } catch (error: any) {
        console.error("Generation Error:", error);
    }
}

main();
