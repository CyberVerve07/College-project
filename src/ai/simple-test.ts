import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('CRITICAL: No API Key found in environment variables.');
    process.exit(1);
}

const MODEL_NAME = 'gemini-1.5-flash';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

console.log('--- TESTING DIRECT API CONNECTION ---');
console.log(`URL: https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`);
console.log(`Key Present: YES (${apiKey.length} chars)`);

async function testApi() {
    try {
        const payload = {
            contents: [{
                parts: [{ text: "Hello, reply with 'Online' if you can read this." }]
            }]
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('\nSUCCESS! API is working.');
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.error('\nAPI ERROR:');
            console.error(JSON.stringify(data, null, 2));

            if (data.error && data.error.status === 'NOT_FOUND') {
                console.log('\nTIP: The model name might be wrong. Try "gemini-pro" or "gemini-1.0-pro".');
            }
        }

    } catch (error) {
        console.error('NETWORK/FETCH ERROR:', error);
    }
}

testApi();
