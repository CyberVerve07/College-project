
import { NextResponse } from 'next/server';
import { groqClient, GROQ_CHAT_MODEL } from '@/ai/groq-chat';

export async function GET() {
    try {
        console.log("DEBUG: Testing Groq AI connection...");
        const response = await groqClient.chat.completions.create({
            messages: [{ role: 'user', content: 'Say hello!' }],
            model: GROQ_CHAT_MODEL,
            max_tokens: 50,
        });
        const text = response.choices?.[0]?.message?.content || 'No response';
        console.log("DEBUG: Groq Response received", text);
        return NextResponse.json({ success: true, response: text });
    } catch (error: any) {
        console.error("DEBUG: Groq Error", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            name: error.name,
        }, { status: 500 });
    }
}
