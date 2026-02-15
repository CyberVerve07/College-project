
import { NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';

export async function GET() {
    try {
        console.log("DEBUG: Testing AI connection...");
        const response = await ai.generate({
            prompt: 'Say hello!',
        });
        console.log("DEBUG: AI Response received", response);
        return NextResponse.json({ success: true, response });
    } catch (error: any) {
        console.error("DEBUG: AI Error", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            name: error.name,
            stack: error.stack
        }, { status: 500 });
    }
}
