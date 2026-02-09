// Quick test script to verify OpenRouter API is working
const testOpenRouter = async () => {
    const apiKey = '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';

    console.log('🔄 Testing OpenRouter API...');

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://destiny-travel.com',
                'X-Title': 'Destiny Travel AI Test',
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: 'Say hello in one word' }
                ],
                max_tokens: 50,
            }),
        });

        console.log('📡 Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('❌ Error:', errorText);
            return;
        }

        const data = await response.json();
        console.log('✅ Success! Response:', data.choices[0]?.message?.content);

    } catch (error) {
        console.log('❌ Fetch Error:', error.message);
    }
};

testOpenRouter();
