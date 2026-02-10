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
import { Bot, Calendar, Clock, IndianRupee, Users, Car, Sparkles, CreditCard, CheckCircle2 } from 'lucide-react';
import { createItinerary } from '@/ai/flows/create-itinerary-flow';
import { saveBooking } from './actions';
import { Separator } from '@/components/ui/separator';
import type { ItineraryResponse } from '@/ai/flows/itinerary-types';


const availableDestinations = [
  // Shimla & Around
  { id: 'shimla', label: 'Shimla City' },
  { id: 'kufri', label: 'Kufri' },
  { id: 'narkanda', label: 'Narkanda' },
  { id: 'chail', label: 'Chail' },
  { id: 'mashobra', label: 'Mashobra' },
  { id: 'rohru', label: 'Rohru' },

  // Manali & Kullu
  { id: 'manali', label: 'Manali' },
  { id: 'kullu', label: 'Kullu Town' },
  { id: 'old_manali', label: 'Old Manali' },
  { id: 'solang', label: 'Solang Valley' },
  { id: 'sethan', label: 'Sethan (Igloo Village)' },
  { id: 'kasol', label: 'Kasol' },
  { id: 'manikaran', label: 'Manikaran' },
  { id: 'tosh', label: 'Tosh Village' },
  { id: 'malana', label: 'Malana' },
  { id: 'tirthan', label: 'Tirthan Valley' },
  { id: 'jibhi', label: 'Jibhi' },
  { id: 'shoja', label: 'Shoja' },

  // Dharamshala & Kangra
  { id: 'dharamshala', label: 'Dharamshala' },
  { id: 'mcleodganj', label: 'McLeodGanj' },
  { id: 'kangra_devi', label: 'Brajeshwari Devi (Kangra)' },
  { id: 'chamunda', label: 'Chamunda Devi' },
  { id: 'jwala_ji', label: 'Jwala Ji Temple' },
  { id: 'baglamukhi', label: 'Baglamukhi Temple' },
  { id: 'chintpurni', label: 'Chintpurni Mata' },
  { id: 'pathankot', label: 'Pathankot (Pickup/Drop)' },
  { id: 'palampur', label: 'Palampur' },
  { id: 'bir', label: 'Bir Billing' },
  { id: 'kangra_fort', label: 'Kangra Fort' },

  // Dalhousie & Chamba
  { id: 'dalhousie', label: 'Dalhousie' },
  { id: 'khajjiar', label: 'Khajjiar (Mini Swiss)' },
  { id: 'chamba', label: 'Chamba Town' },
  { id: 'bharmour', label: 'Bharmour' },

  // Spiti & Lahaul
  { id: 'spiti', label: 'Spiti Valley (Full Circle)' },
  { id: 'kaza', label: 'Kaza' },
  { id: 'chandratal', label: 'Chandratal Lake' },
  { id: 'tabo', label: 'Tabo Monastery' },
  { id: 'dhankar', label: 'Dhankar' },
  { id: 'langza', label: 'Langza (Fossil Village)' },
  { id: 'hikkim', label: 'Hikkim (Highest Post Office)' },
  { id: 'sissu', label: 'Sissu' },
  { id: 'keylong', label: 'Keylong' },
  { id: 'jispa', label: 'Jispa' },

  // Kinnaur
  { id: 'kinnaur', label: 'Kinnaur Valley' },
  { id: 'kalpa', label: 'Kalpa' },
  { id: 'sangla', label: 'Sangla Valley' },
  { id: 'chitkul', label: 'Chitkul (Last Village)' },
  { id: 'nako', label: 'Nako Lake' },

  // Mandi & Others
  { id: 'prashar', label: 'Prashar Lake' },
  { id: 'barot', label: 'Barot' },
  { id: 'janjheli', label: 'Janjehli' },
  { id: 'kasauli', label: 'Kasauli' },
  { id: 'solan', label: 'Solan' },
  { id: 'renukaji', label: 'Renuka Ji Lake' },
];

const vehicleTypes = ['Sedan', 'SUV', 'Tempo Traveller', 'Any'];

const formSchema = z.object({
  budget: z.coerce.number().int().positive({ message: 'Please enter a valid budget.' }),
  days: z.coerce.number().int().min(1, 'Must be at least 1 day.').max(15, 'Cannot exceed 15 days.'),
  people: z.coerce.number().int().min(1, 'Must be at least 1 person.').max(20, 'Cannot exceed 20 people.'),
  destinations: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one destination.',
  }),
  vehiclePreference: z.string().min(1, 'Please select a vehicle type.'),
});

export default memo(function ItineraryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 50000,
      days: 5,
      people: 2,
      destinations: ['manali'],
      vehiclePreference: 'Any',
    },
  });

  // Memoize destinations to prevent re-creating array on every render
  const memoizedDestinations = useMemo(() => availableDestinations, []);

  // Memoize checkbox change handler
  const handleDestinationChange = useCallback((field: any, itemId: string, checked: boolean) => {
    return checked
      ? field.onChange([...field.value, itemId])
      : field.onChange(field.value?.filter((value: string) => value !== itemId));
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const result = await createItinerary(values);
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Budget (INR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50000" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-purple-500 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300" />
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
                    <Input type="number" placeholder="e.g., 5" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-pink-500 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300" />
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
                    <Input type="number" placeholder="e.g., 2" {...field} className="h-12 bg-white/5 border-white/10 text-lg focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10 backdrop-blur-sm shadow-inner overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-50 pointer-events-none" />
            <FormField
              control={form.control}
              name="destinations"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-6 relative z-10">
                    <FormLabel className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                      Select Your Dream Destinations
                    </FormLabel>
                    <FormDescription>
                      Choose specific temples, valleys, and adventures.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {memoizedDestinations.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center space-x-3 space-y-0 p-3 rounded-xl hover:bg-white/50 transition-colors border border-transparent hover:border-purple-200/50"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => handleDestinationChange(field, item.id, !!checked)}
                            className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer flex-1 text-sm">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="vehiclePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Preferred Ride</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl border-purple-200/50 bg-white/50 backdrop-blur focus:ring-purple-500">
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
            className="w-full h-16 text-xl font-black rounded-2xl text-white shadow-2xl transition-all active:scale-95 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 shadow-purple-500/30"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Bot className="mr-3 h-6 w-6 animate-spin" />
                Planning Magic...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6 fill-yellow-300 text-yellow-300" />
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
          <p className="mt-4 text-muted-foreground">Our AI is planning your perfect trip. This might take a moment...</p>
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
                <p className="font-black text-2xl flex items-center justify-center gap-1 text-primary"><IndianRupee className="w-5 h-5" /> {itinerary.estimatedCost.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-background/40 rounded-3xl border border-white/10 shadow-inner">
                <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-2">Vehicle</p>
                <p className="font-black text-2xl flex items-center justify-center gap-1.5 text-secondary"><Car className="w-5 h-5" /> {itinerary.recommendedVehicle}</p>
              </div>
              <div className="p-6 bg-background/40 rounded-3xl border border-white/10 shadow-inner">
                <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-2">Days</p>
                <p className="font-black text-2xl flex items-center justify-center gap-1.5 text-accent"><Calendar className="w-5 h-5" /> {itinerary.itinerary.length}</p>
              </div>
              <div className="p-6 bg-background/40 rounded-3xl border border-white/10 shadow-inner">
                <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-2">People</p>
                <p className="font-black text-2xl flex items-center justify-center gap-1.5 text-primary"><Users className="w-5 h-5" /> {form.getValues('people')}</p>
              </div>
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
                        <Clock className="w-3 h-3" /> {day.travelTime}
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
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[250px] h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/20">
                  <a href="/contact">Book via WhatsApp</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
