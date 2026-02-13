'use client';

export default function DebugEnvPage() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
        <div className="p-10 font-mono">
            <h1 className="text-2xl font-bold mb-4">Deployment Debugger</h1>
            <div className="bg-gray-100 p-4 rounded border">
                <p><strong>Status Check:</strong></p>
                <p>API Key Variable Name: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</p>
                <p>
                    Value Detected:
                    <span className={apiKey ? "text-green-600 font-bold ml-2" : "text-red-600 font-bold ml-2"}>
                        {apiKey ? `Yes (Starts with ${apiKey.substring(0, 5)}...)` : "NO - Missing/Undefined"}
                    </span>
                </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
                If this says "NO", you need to go to Vercel Settings, add the key, and <strong>REDEPLOY</strong>.
            </p>
        </div>
    );
}
