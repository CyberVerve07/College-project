import { createItineraryFlow } from './flows/create-itinerary-flow';
import { ai } from './genkit';

async function runDebug() {
    console.log("🚀 Starting Debug Script...");

    try {
        const input = {
            budget: 50000,
            days: 3,
            people: 2,
            destinations: ['Manali'],
            vehiclePreference: 'Sedan'
        };

        console.log("📝 Input:", input);
        console.log("⚙️ Invoking Flow...");

        const result = await createItineraryFlow(input);

        console.log("✅ Result:", JSON.stringify(result, null, 2));

    } catch (error) {
        console.error("❌ FATAL ERROR:", error);
        if (error instanceof Error) {
            console.error("Stack:", error.stack);
        }
    }
}

runDebug();
