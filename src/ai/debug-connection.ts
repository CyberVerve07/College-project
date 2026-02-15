
import { ai } from './genkit';

async function testConnection() {
    console.log("Testing Genkit AI connection (Gemini)...");
    try {
        const { text } = await ai.generate({
            prompt: "Say hello and confirm you are working.",
        });
        console.log("✅ SUCCESS! AI Response:", text);
    } catch (error: any) {
        console.error("❌ FAILED! Detailed Error:", error);
        if (error.status) console.error("Status Code:", error.status);
        if (error.details) console.error("Details:", error.details);
    }
}

testConnection();
