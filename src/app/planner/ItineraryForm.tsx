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
import { Bot, Calendar, Clock, IndianRupee, Users, Car, Sparkles } from 'lucide-react';
import { createItinerary } from '@/ai/flows/create-itinerary-flow';
import { Separator } from '@/components/ui/separator';
import type { ItineraryResponse } from '@/ai/flows/itinerary-types';

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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Bot className="mr-2 h-4 w-4 animate-spin" />
                Crafting Your Adventure...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Itinerary
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-bold text-lg flex items-center justify-center gap-1"><IndianRupee className="w-4 h-4" /> {itinerary.estimatedCost.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-bold text-lg flex items-center justify-center gap-1.5"><Car className="w-4 h-4" /> {itinerary.recommendedVehicle}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">Days</p>
                    <p className="font-bold text-lg flex items-center justify-center gap-1.5"><Calendar className="w-4 h-4" /> {itinerary.itinerary.length}</p>
                </div>
                 <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">People</p>
                    <p className="font-bold text-lg flex items-center justify-center gap-1.5"><Users className="w-4 h-4" /> {form.getValues('people')}</p>
                </div>
            </div>
            
            <Separator />
            
            <div className="space-y-6">
              {itinerary.itinerary.map((day, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold">{day.day}</div>
                    {index < itinerary.itinerary.length - 1 && <div className="w-px h-full bg-border mt-2"></div>}
                  </div>
                  <div className="flex-1 pb-4">
                    <h3 className="font-headline text-xl font-bold mb-1">{day.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5"/> Estimated Travel: {day.travelTime}
                    </p>
                    <p className="leading-relaxed">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="text-center pt-4">
              <p className="text-lg font-semibold mb-4">{itinerary.bookingCTA}</p>
              <Button asChild size="lg">
                <a href="/contact">Book Your Trip Now</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
