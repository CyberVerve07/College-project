'use client';

import { useState, useMemo, useCallback, memo } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Bot, Calendar, Clock, IndianRupee, Users, Car, Sparkles, CreditCard, CheckCircle2, FileText, Utensils, Bed, Landmark, MountainSnow, AlertTriangle, XCircle } from 'lucide-react';
import { createItinerary } from '@/ai/flows/create-itinerary-flow';
import { saveBooking } from './actions';
import { Separator } from '@/components/ui/separator';
import type { ItineraryResponse } from '@/ai/flows/itinerary-types';
import { downloadItineraryPdf } from '@/lib/pdf-api';
import { useRouter } from 'next/navigation';



// DestinationItem component removed


// Removed availableDestinations list for simpler UI

const vehicleTypes = ['Sedan', 'SUV', 'Tempo Traveller', 'Any'];

const formSchema = z.object({
  origin: z.string().min(2, 'Please enter a valid origin city.'),
  budget: z.coerce.number().int().positive({ message: 'Please enter a valid budget.' }),
  days: z.coerce.number().int().min(1, 'Must be at least 1 day.').max(15, 'Cannot exceed 15 days.'),
  people: z.coerce.number().int().min(1, 'Must be at least 1 person.').max(20, 'Cannot exceed 20 people.'),
  destinations: z.string().min(2, 'Please enter at least one destination.'),
  vehiclePreference: z.string().min(1, 'Please select a vehicle type.'),
});

export default memo(function ItineraryForm() {
  // const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: '',
      budget: 50000,
      days: 5,
      people: 2,
      destinations: '',
      vehiclePreference: 'Any',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      // Split comma-separated string into array for API
      const destinationArray = values.destinations.split(',').map(d => d.trim()).filter(d => d);

      const payload = {
        ...values,
        destinations: destinationArray
      };

      const result = await createItinerary(payload);
      setItinerary(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate itinerary. The AI model might be busy. Please try again in a moment.');
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
      toast({ title: "Generating PDF...", description: "Please wait while we prepare your itinerary." });
      await downloadItineraryPdf(itinerary);
      toast({ title: "Success", description: "PDF downloaded successfully!" });
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF. Please try again." });
    }
  };

  const handleBooking = (e: React.MouseEvent) => {
    // Redirect to contact for booking
    router.push('/contact');
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where are you traveling from?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mumbai, Delhi, Bangalore" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:shadow-[0_0_20px_hsla(200,85%,35%,0.3)] transition-all duration-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Budget (INR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50000" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:shadow-[0_0_20px_hsla(200,85%,35%,0.3)] transition-all duration-300" />
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
                    <Input type="number" placeholder="e.g., 5" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-secondary focus-visible:ring-offset-0 focus-visible:shadow-[0_0_20px_hsla(35,95%,50%,0.3)] transition-all duration-300" />
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
                    <Input type="number" placeholder="e.g., 2" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-accent focus-visible:ring-offset-0 focus-visible:shadow-[0_0_20px_hsla(150,60%,40%,0.3)] transition-all duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="destinations"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Your Dream Destinations
                </FormLabel>
                <FormDescription>
                  Where do you want to go? Enter multiple places separated by commas.
                </FormDescription>
                <FormControl>
                  <Input placeholder="e.g., Manali, Kasol, Spiti Valley" {...field} className="h-14 bg-white/5 border-white/10 text-lg focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:shadow-[0_0_20px_hsla(200,85%,35%,0.3)] transition-all duration-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehiclePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Select Vehicle</FormLabel>
                <FormDescription className="mb-3 text-primary/90 font-medium">
                  Destiny Tour Travel will provide you the best transport services in Himachal in a budget-friendly way.
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl border-primary/20 bg-white/50 backdrop-blur focus:ring-primary">
                      <SelectValue placeholder="Select a preferred vehicle type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
          <p className="mt-4 text-muted-foreground">Leo AI is planning your perfect trip. This might take a moment...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
          <h3 className="font-semibold text-destructive">Oops, something went wrong!</h3>
          <p className="text-sm text-destructive/80">{error}</p>
        </div>
      )}

      {itinerary && (
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline">Your Custom Itinerary</h2>
            <p className="text-muted-foreground mt-2">Here is the personalized travel plan crafted just for you.</p>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-background/40 rounded-3xl border border-white/10 shadow-inner">
                <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-2">Budget</p>
                <p className="font-black text-2xl flex items-center justify-center gap-1 text-primary"><IndianRupee className="w-5 h-5" strokeWidth={2.5} /> {itinerary.estimatedCost.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-background/40 rounded-3xl border border-white/10 shadow-inner">
                <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-2">Vehicle</p>
                <p className="font-black text-2xl flex items-center justify-center gap-1.5 text-secondary"><Car className="w-5 h-5" strokeWidth={2.5} /> {itinerary.recommendedVehicle}</p>
              </div>
              <div className="p-6 bg-background/40 rounded-3xl border border-white/10 shadow-inner">
                <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-2">Days</p>
                <p className="font-black text-2xl flex items-center justify-center gap-1.5 text-accent"><Calendar className="w-5 h-5" strokeWidth={2.5} /> {itinerary.itinerary.length}</p>
              </div>
              <div className="p-6 bg-background/40 rounded-3xl border border-white/10 shadow-inner">
                <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-2">People</p>
                <p className="font-black text-2xl flex items-center justify-center gap-1.5 text-primary"><Users className="w-5 h-5" strokeWidth={2.5} /> {form.getValues('people')}</p>
              </div>
            </div>

            <Separator className="my-8 bg-white/10" />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Food & Stay */}
              <div className="space-y-6">
                <div className="bg-background/40 p-5 rounded-2xl border border-white/5 shadow-sm">
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-primary"><Utensils className="w-5 h-5" /> Food to Try</h4>
                  <ul className="space-y-2">
                    {itinerary.foodRecommendations?.map((item, i) => (
                      <li key={i} className="flex gap-2 text-muted-foreground text-sm">
                        <span className="text-primary mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background/40 p-5 rounded-2xl border border-white/5 shadow-sm">
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-secondary"><Bed className="w-5 h-5" /> Where to Stay</h4>
                  <ul className="space-y-2">
                    {itinerary.accommodation?.map((item, i) => (
                      <li key={i} className="flex gap-2 text-muted-foreground text-sm">
                        <span className="text-secondary mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Temples & Adventures */}
              <div className="space-y-6">
                <div className="bg-background/40 p-5 rounded-2xl border border-white/5 shadow-sm">
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-amber-400"><Landmark className="w-5 h-5" /> Temples & Culture</h4>
                  <ul className="space-y-2">
                    {itinerary.temples?.map((item, i) => (
                      <li key={i} className="flex gap-2 text-muted-foreground text-sm">
                        <span className="text-amber-400 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background/40 p-5 rounded-2xl border border-white/5 shadow-sm">
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-orange-400"><MountainSnow className="w-5 h-5" /> Adventures</h4>
                  <ul className="space-y-2">
                    {itinerary.adventures?.map((item, i) => (
                      <li key={i} className="flex gap-2 text-muted-foreground text-sm">
                        <span className="text-orange-400 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Things to Avoid - Full Width Warning */}
            <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/20 mb-8">
              <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-red-400"><AlertTriangle className="w-5 h-5" /> Travel Advisory (What to Avoid)</h4>
              <ul className="grid md:grid-cols-2 gap-x-4 gap-y-2">
                {itinerary.thingsToAvoid?.map((item, i) => (
                  <li key={i} className="flex gap-2 text-red-300/80 text-sm items-start">
                    <XCircle className="w-4 h-4 mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-10">
              {itinerary.itinerary.map((day, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary text-white rounded-2xl h-14 w-14 flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-primary/20 group-hover:scale-110 transition-transform">{day.day}</div>
                    {index < itinerary.itinerary.length - 1 && <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-transparent mt-4 rounded-full"></div>}
                  </div>
                  <div className="flex-1 pb-10">
                    <h3 className="font-headline text-3xl font-black mb-2 text-foreground/90">{day.title}</h3>
                    <div className="flex gap-4 mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest bg-secondary/10 text-secondary px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Clock className="w-3 h-3" strokeWidth={2.5} /> {day.travelTime}
                      </span>
                    </div>
                    <p className="leading-relaxed text-lg text-muted-foreground/80">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>

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
        </div>
      )}
    </>
  );
});
