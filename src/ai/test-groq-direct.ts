
const apiKey = "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"; // Hardcoded for testing

async function testGroq() {
    console.log("Testing Groq API directly...");
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: "Hello!" }],
                model: "llama3-8b-8192"
            })
        });

        if (!response.ok) {
            console.error(`❌ API Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response:", text);
        } else {
            const data = await response.json();
            console.log("✅ Success! API Key is working.");
            console.log("Response:", data.choices[0].message.content);
        }
    } catch (error) {
        console.error("❌ Network Error:", error);
    }
}

testGroq();
