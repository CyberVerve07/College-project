// Simple test to verify Groq API key works
const API_KEY = "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";

async function testGroq() {
    console.log("🧪 Testing Groq API Key...\n");

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: "Say 'Hello from Groq!' if you can hear me." }],
                model: "llama-3.1-70b-versatile"
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ SUCCESS! API Key is valid.");
            console.log("📩 Response:", data.choices[0].message.content);
        } else {
            console.error("❌ API Error:", data);
        }
    } catch (error) {
        console.error("❌ Network Error:", error.message);
    }
}

testGroq();
