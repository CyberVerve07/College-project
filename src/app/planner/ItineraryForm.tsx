'use client';

import { useState, memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Bot, Calendar, Clock, IndianRupee, Users, Car, Sparkles, FileText, MapPin, Compass, Wallet, Lightbulb, Navigation } from 'lucide-react';
import { createItinerary } from '@/ai/flows/create-itinerary-flow';
import { Separator } from '@/components/ui/separator';
import type { ItineraryResponse } from '@/ai/flows/itinerary-types';
import { downloadItineraryPdf } from '@/lib/pdf-api';
import { useRouter } from 'next/navigation';


const tripStyles = ['Adventure', 'Nature', 'Peace', 'Spiritual'];

const formSchema = z.object({
  origin: z.string().min(2, 'Please enter a valid origin city.'),
  destination: z.string().min(2, 'Please enter where you want to go.'),
  budget: z.coerce.number().int().positive({ message: 'Please enter a valid budget.' }),
  days: z.coerce.number().int().min(1, 'Must be at least 1 day.').max(15, 'Cannot exceed 15 days.'),
  people: z.coerce.number().int().min(1, 'Must be at least 1 person.').max(20, 'Cannot exceed 20 people.'),
  tripStyle: z.string().min(1, 'Please select a trip style.'),
});

export default memo(function ItineraryForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: '',
      destination: '',
      budget: 50000,
      days: 5,
      people: 2,
      tripStyle: 'Adventure',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const result = await createItinerary(values);
      setItinerary(result);
    } catch (e) {
      console.error(e);
      setError('Leo AI could not generate the itinerary. Please try again in a moment.');
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not generate the itinerary. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownloadPdf = async () => {
    if (!itinerary) return;
    try {
      toast({ title: "Generating PDF...", description: "Please wait while Leo AI prepares your itinerary." });
      await downloadItineraryPdf(itinerary);
      toast({ title: "Success", description: "PDF downloaded successfully!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF. Please try again." });
    }
  };

  const handleBooking = () => {
    router.push('/contact');
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Origin */}
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where are you traveling from?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Delhi, Mumbai, Chandigarh" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-primary focus-visible:ring-offset-0 transition-all duration-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget, Days, People */}
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Budget (INR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50000" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-primary focus-visible:ring-offset-0 transition-all duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Days</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-secondary focus-visible:ring-offset-0 transition-all duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="people"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of People</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 2" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-accent focus-visible:ring-offset-0 transition-all duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Destination & Trip Style */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Destination</FormLabel>
                  <FormDescription>Where do you want to go?</FormDescription>
                  <FormControl>
                    <Input placeholder="e.g., Manali, Shimla, Spiti" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-accent focus-visible:ring-offset-0 transition-all duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tripStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Trip Style</FormLabel>
                  <FormDescription>What kind of experience are you looking for?</FormDescription>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl border-primary/20 bg-white/50 backdrop-blur focus:ring-primary">
                        <SelectValue placeholder="Select trip style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tripStyles.map((style) => (
                        <SelectItem key={style} value={style}>{style}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-16 text-xl font-black rounded-2xl text-white shadow-2xl transition-all active:scale-95 bg-gradient-to-r from-primary via-teal-500 to-secondary hover:opacity-90 shadow-primary/30"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Bot className="mr-3 h-6 w-6 animate-spin" strokeWidth={2} />
                Leo AI is working...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6 fill-secondary text-secondary" strokeWidth={2} />
                Generate My Dream Trip
              </>
            )}
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center">
            <Bot className="h-8 w-8 text-primary animate-bounce" />
          </div>
          <p className="mt-4 text-muted-foreground">Leo AI is planning your perfect Himachal trip. This might take a moment...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
          <h3 className="font-semibold text-destructive">Oops, something went wrong!</h3>
          <p className="text-sm text-destructive/80">{error}</p>
        </div>
      )}

      {itinerary && (
        <div className="mt-12 space-y-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline">Your Leo AI Travel Plan</h2>
            <p className="text-muted-foreground mt-2">Here is your personalized Himachal trip crafted by Leo AI.</p>
          </div>

          {/* ===== SECTION 1: Best Destinations ===== */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-primary">
              <MapPin className="w-6 h-6" /> Best Destinations for You
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {itinerary.bestDestinations?.map((dest, i) => (
                <div key={i} className="bg-background/40 p-4 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-lg text-foreground">{dest.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{dest.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== SECTION 2: Day-wise Itinerary ===== */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="flex items-center gap-2 font-bold text-xl mb-6 text-secondary">
              <Calendar className="w-6 h-6" /> Day-wise Itinerary
            </h3>
            <div className="space-y-8">
              {itinerary.itinerary.map((day, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary text-white rounded-2xl h-14 w-14 flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-primary/20 group-hover:scale-110 transition-transform">{day.day}</div>
                    {index < itinerary.itinerary.length - 1 && <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-transparent mt-4 rounded-full"></div>}
                  </div>
                  <div className="flex-1 pb-6">
                    <h4 className="font-headline text-2xl font-black mb-3 text-foreground/90">{day.title}</h4>
                    <div className="space-y-3">
                      <div className="bg-background/40 p-3 rounded-xl border border-white/5">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">☀️ Morning</span>
                        <p className="text-sm text-muted-foreground mt-1">{day.morning}</p>
                      </div>
                      <div className="bg-background/40 p-3 rounded-xl border border-white/5">
                        <span className="text-xs font-bold uppercase tracking-widest text-orange-400">🌤️ Afternoon</span>
                        <p className="text-sm text-muted-foreground mt-1">{day.afternoon}</p>
                      </div>
                      <div className="bg-background/40 p-3 rounded-xl border border-white/5">
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">🌙 Evening</span>
                        <p className="text-sm text-muted-foreground mt-1">{day.evening}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-2">
                        <Wallet className="w-3 h-3" /> <span>{day.dailyExpense}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== SECTION 3: Travel & Transport ===== */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-teal-400">
              <Navigation className="w-6 h-6" /> Travel & Transport Advice
            </h3>

            <ul className="space-y-2">
              {itinerary.transportAdvice?.map((tip, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground text-sm items-start">
                  <Compass className="w-4 h-4 mt-0.5 shrink-0 text-teal-400" /> {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* ===== SECTION 4: Budget Breakdown ===== */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-amber-400">
              <IndianRupee className="w-6 h-6" /> Budget Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {itinerary.budgetBreakdown && Object.entries(itinerary.budgetBreakdown).map(([key, value]) => (
                <div key={key} className={`bg-background/40 p-4 rounded-2xl border border-white/10 ${key === 'total' ? 'col-span-2 md:col-span-3 bg-primary/10 border-primary/30' : ''}`}>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">{key}</p>
                  <p className={`font-bold text-lg ${key === 'total' ? 'text-primary text-2xl' : 'text-foreground'}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== SECTION 5: Local Tips ===== */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="flex items-center gap-2 font-bold text-xl mb-4 text-green-400">
              <Lightbulb className="w-6 h-6" /> Local Tips & Advice
            </h3>
            <ul className="space-y-3">
              {itinerary.localTips?.map((tip, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground text-sm items-start bg-background/40 p-3 rounded-xl border border-white/5">
                  <span className="text-green-400 font-bold shrink-0">💡</span> {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* ===== CTA ===== */}
          <Separator />
          <div className="text-center pt-4">
            <p className="text-lg font-semibold mb-4">{itinerary.bookingCTA}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={handleBooking} size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[250px] h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/20 cursor-pointer">
                Book via WhatsApp
              </Button>
              <Button onClick={handleDownloadPdf} variant="outline" size="lg" className="bg-background/50 hover:bg-background/80 border-primary/20 min-w-[250px] h-16 rounded-2xl text-xl font-bold backdrop-blur-sm">
                <FileText className="mr-2 h-6 w-6" /> Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
