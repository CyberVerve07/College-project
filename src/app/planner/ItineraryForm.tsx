'use client';

import { useState } from 'react';
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

declare global {
  interface Window {
    Razorpay: any;
  }
}

const availableDestinations = [
  { id: 'dharamshala', label: 'Dharamshala' },
  { id: 'manali', label: 'Manali' },
  { id: 'shimla', label: 'Shimla' },
  { id: 'spiti', label: 'Spiti Valley' },
  { id: 'kangra', label: 'Kangra Valley' },
  { id: 'bir', label: 'Bir Billing' },
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

export default function ItineraryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setIsPaid(false);

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

  const handlePayment = async () => {
    if (!itinerary) return;

    setIsPaymentLoading(true);

    // Load Razorpay Script
    const loadScript = (src: string) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Razorpay SDK failed to load. Check your internet connection.',
      });
      setIsPaymentLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Use test key
      amount: 99900, // Amount in paise (₹999)
      currency: 'INR',
      name: 'Destiny Tour & Travels',
      description: 'Advance Booking for Itinerary',
      image: 'https://cdn-icons-png.flaticon.com/512/826/826070.png',
      handler: async function (response: any) {
        // This function executes after successful payment
        const bookingData = {
          paymentId: response.razorpay_payment_id,
          amount: 999,
          itinerary: itinerary,
          customer: form.getValues(),
        };

        const saveRes = await saveBooking(bookingData);
        if (saveRes.success) {
          setIsPaid(true);
          toast({
            title: 'Booking Confirmed!',
            description: 'Your payment was successful and your trip is booked.',
          });
        }
        setIsPaymentLoading(false);
      },
      prefill: {
        name: 'Guest User',
        email: 'guest@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3b82f6',
      },
      modal: {
        ondismiss: function () {
          setIsPaymentLoading(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
                    <Input type="number" placeholder="e.g., 50000" {...field} />
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
                    <Input type="number" placeholder="e.g., 5" {...field} />
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
                    <Input type="number" placeholder="e.g., 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="destinations"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Preferred Destinations</FormLabel>
                  <FormDescription>
                    Select the places you'd love to visit.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {availableDestinations.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="destinations"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehiclePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
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

          <Button type="submit" className="w-full h-16 text-xl font-black rounded-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 transition-all active:scale-95" disabled={isLoading}>
            {isLoading ? (
              <>
                <Bot className="mr-3 h-6 w-6 animate-spin" />
                Architecting...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6" />
                Generate My Adventure
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
                {isPaid ? (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-6 py-3 rounded-full font-bold border border-green-200">
                    <CheckCircle2 className="w-6 h-6" />
                    Booking Confirmed & Paid
                  </div>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={handlePayment}
                      disabled={isPaymentLoading}
                      className="bg-accent hover:bg-accent/90 text-white min-w-[250px] h-16 rounded-2xl text-xl font-black shadow-xl shadow-accent/20"
                    >
                      {isPaymentLoading ? 'Securing Link...' : (
                        <span className="flex items-center gap-3">
                          <CreditCard className="w-6 h-6" /> PAY ADVANCE (₹999)
                        </span>
                      )}
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <a href="/contact">Enquire Instead</a>
                    </Button>
                  </>
                )}
              </div>
              {isPaid && (
                <p className="mt-4 text-sm text-muted-foreground italic">
                  Our team will contact you shortly with the driver details.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
