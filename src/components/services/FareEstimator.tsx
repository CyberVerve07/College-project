'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { estimateFare } from '@/app/actions/ai';
import { Loader2, MapPin, Calculator, IndianRupee, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
    from: z.string().min(2, { message: 'Pickup location is required' }),
    to: z.string().min(2, { message: 'Destination is required' }),
    distance: z.string().min(1, { message: 'Distance is required' }),
});

export default function FareEstimator() {
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from: '',
            to: '',
            distance: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);
        setResult(null);

        const response = await estimateFare(values);

        if (response.success) {
            setResult(response.data);
        } else {
            setError(response.error as string);
        }
        setIsLoading(false);
    }

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-xl border-primary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                        <Calculator className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>
                    <div>
                        <CardTitle>Instant Fare Estimator</CardTitle>
                        <CardDescription>Get a quick quote for your journey in Himachal.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="from"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pickup</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" strokeWidth={2} />
                                                <Input placeholder="e.g. Kangra Airport" className="pl-9 bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20 transition-all font-medium" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="to"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Drop</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" strokeWidth={2} />
                                                <Input placeholder="e.g. McLeod Ganj" className="pl-9 bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20 transition-all font-medium" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="distance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Distance (km)</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" strokeWidth={2} />
                                                <Input type="number" placeholder="e.g. 50" className="pl-9 bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20 transition-all font-medium" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700 transition-all shadow-md" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" strokeWidth={2.5} />
                                    Calculating...
                                </>
                            ) : (
                                'Calculate Fare'
                            )}
                        </Button>
                    </form>
                </Form>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 p-4 bg-destructive/10 text-destructive rounded-lg text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {result && (

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 bg-gradient-to-br from-card to-muted/30 border border-primary/20 rounded-xl p-6 relative overflow-hidden shadow-xl"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-[0.03]">
                                <IndianRupee className="w-40 h-40 text-primary" strokeWidth={1} />
                            </div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-1">Estimated Fare</p>
                                    <div className="flex items-center gap-1">
                                        <IndianRupee className="w-8 h-8 text-primary" strokeWidth={3} />
                                        <span className="text-5xl font-black text-foreground tracking-tight">{result.estimatedFare.toLocaleString()}</span>
                                        <span className="text-sm text-muted-foreground self-end mb-2 font-medium">approx</span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/40 w-fit px-3 py-1 rounded-full border border-border/50">
                                        <Car className="w-4 h-4 text-primary/80" strokeWidth={2.5} />
                                        <span>{result.vehicle}</span>
                                        <span className="w-1 h-1 bg-border rounded-full" />
                                        <span>{result.distanceKm} km</span>
                                    </div>
                                </div>
                                <div className="bg-muted/40 p-5 rounded-xl border border-border/50 shadow-inner backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Rate Breakdown</p>
                                    </div>
                                    <p className="text-base text-foreground/90 font-medium">{result.breakdown}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 cursor-pointer shadow-md">
                                    <a
                                        href={`https://wa.me/917832989320?text=${encodeURIComponent(`Hi Destiny Tours, I want to book a taxi.\n\n📍 Trip: ${form.getValues('from')} ➝ ${form.getValues('to')}\n🚗 Vehicle: ${result.vehicle}\n💰 Est. Fare: ₹${result.estimatedFare}\n\nPlease confirm availability.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IndianRupee className="w-4 h-4" strokeWidth={2.5} />
                                        Book This Trip
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card >
    );
}
