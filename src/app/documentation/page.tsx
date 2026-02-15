'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, FileText, Printer } from 'lucide-react';

export default function DocumentationPage() {
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-background min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header / Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6 print:hidden">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">Project Documentation</h1>
                        <p className="text-muted-foreground mt-2">Himachal Pradesh Travel AI Planner</p>
                    </div>
                    <Button onClick={handlePrint} className="gap-2 print:hidden">
                        <Printer className="w-4 h-4" />
                        Print / Save as PDF
                    </Button>
                </div>

                {/* Documentation Content */}
                <div ref={contentRef} className="space-y-12 print:space-y-8 print:text-black">

                    {/* 1. Overview */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2 print:text-xl">1. Project Overview</h2>
                        <p className="text-muted-foreground leading-relaxed print:text-black">
                            This project is a comprehensive travel planning platform for Himachal Pradesh, integrating an AI-powered itinerary planner, detailed destination guides, and an interactive map. It is designed to provide users with personalized travel experiences using modern web technologies and generative AI.
                        </p>
                    </section>

                    {/* 2. Tech Stack */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2 print:text-xl">2. Tech Stack</h2>
                        <div className="grid md:grid-cols-2 gap-6 print:block print:space-y-6">
                            <Card className="print:border-0 print:shadow-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <FileText className="w-5 h-5 text-primary" /> Frontend Framework & Core
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground print:text-black">
                                    <p><strong>Framework:</strong> Next.js 15.1.0 (App Router)</p>
                                    <p><strong>Language:</strong> TypeScript</p>
                                    <p><strong>Styling:</strong> Tailwind CSS, Shadcn/UI, Framer Motion</p>
                                    <p><strong>Icons:</strong> Lucide React, React Icons</p>
                                </CardContent>
                            </Card>

                            <Card className="print:border-0 print:shadow-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <FileText className="w-5 h-5 text-primary" /> Backend & Database
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground print:text-black">
                                    <p><strong>Platform:</strong> Firebase (Firestore, Auth)</p>
                                    <p><strong>API:</strong> Next.js API Routes (Serverless)</p>
                                    <p><strong>AI Integration:</strong> Groq SDK (Llama3-70b), Genkit</p>
                                </CardContent>
                            </Card>

                            <Card className="print:border-0 print:shadow-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <FileText className="w-5 h-5 text-primary" /> Maps & Geolocation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground print:text-black">
                                    <p><strong>Display:</strong> React Leaflet (Client-side)</p>
                                    <p><strong>Provider:</strong> OpenStreetMap</p>
                                    <p><strong>Optimization:</strong> Dynamic Imports (ssr: false)</p>
                                </CardContent>
                            </Card>

                            <Card className="print:border-0 print:shadow-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <FileText className="w-5 h-5 text-primary" /> DevOps & Deployment
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground print:text-black">
                                    <p><strong>Hosting:</strong> Vercel</p>
                                    <p><strong>CI/CD:</strong> Automatic deployments via GitHub</p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* 3. System Design */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2 print:text-xl">3. System Design & Architecture</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">3.1 Architecture Pattern</h3>
                                <p className="text-muted-foreground print:text-black">
                                    <strong>Hybrid Architecture:</strong> Combines Server Components (RSC) for data fetching/SEO and Client Components for interactivity (Maps, Forms).
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">3.2 Data Flow</h3>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground print:text-black pl-4">
                                    <li><strong>User Input:</strong> Form submission (Planner) or Chat query.</li>
                                    <li><strong>Validation:</strong> Zod schemas validate data on client & server.</li>
                                    <li><strong>AI Processing:</strong> Server sends prompt to Groq API.</li>
                                    <li><strong>Response:</strong> Structured JSON received and stored in Firestore.</li>
                                    <li><strong>Render:</strong> UI updates with new itinerary/message.</li>
                                </ol>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">3.3 Folder Structure (src/)</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground print:text-black pl-4">
                                    <li><code>app/</code> - Pages & Routes</li>
                                    <li><code>components/</code> - Reusable UI</li>
                                    <li><code>lib/</code> - Utilities & Constants</li>
                                    <li><code>hooks/</code> - Custom React Hooks</li>
                                    <li><code>ai/</code> - AI Logic & Prompts</li>
                                    <li><code>firebase/</code> - Config & Providers</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 4. Features */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2 print:text-xl">4. Key Features</h2>
                        <div className="space-y-4 text-muted-foreground print:text-black">
                            <div>
                                <strong className="text-foreground print:text-black">AI-Powered Trip Planner:</strong> Takes user inputs (budget, dates) -> Generates daily itinerary -> Plots on Map.
                            </div>
                            <div>
                                <strong className="text-foreground print:text-black">Interactive Destinations:</strong> List View / Map View toggle. Uses specific coordinates to render markers on OpenStreetMap.
                            </div>
                            <div>
                                <strong className="text-foreground print:text-black">Authentication:</strong> Secure login via Firebase Auth to save trip history.
                            </div>
                            <div>
                                <strong className="text-foreground print:text-black">Dark Mode:</strong> Fully responsive theme switching using <code>next-themes</code> and Tailwind CSS variables.
                            </div>
                        </div>
                    </section>

                    {/* 7. Footer for Print */}
                    <div className="hidden print:block mt-12 pt-8 border-t text-center text-sm text-gray-500">
                        <p>Generated by AI Planner Project Documentation</p>
                        <p>{new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
