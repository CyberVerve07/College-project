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
        console.log("This test script is outdated. Use scripts/test-groq-simple.mjs or scripts/test-gemini.mjs instead.");
    } catch (error: any) {
        console.error("Generation Error:", error);
    }
}

main();
