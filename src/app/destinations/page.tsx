'use client';

import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { seedDestinations, seedRoutes } from '@/firebase/seed';
import { initialDestinations } from '@/lib/destinations-data';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';

interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  bestTimeToVisit: string;
  attractions: string[];
}

export default function DestinationsPage() {
  const firestore = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const [isSeeding, setIsSeeding] = useState(true);

  const destinationsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'destinations');
  }, [firestore]);

  const { data: destinations, isLoading, error } = useCollection<Destination>(destinationsCollection);

  useEffect(() => {
    // We need to wait for auth to complete and firestore to be available.
    if (firestore && !isAuthLoading && user && !isLoading) {
      if (destinations?.length === 0) {
        Promise.all([
          seedDestinations(firestore),
          seedRoutes(firestore)
        ]).finally(() => setIsSeeding(false));
      } else {
        // Data exists, no need to seed.
        setIsSeeding(false);
      }
    } else if (!isAuthLoading && !isLoading) {
      // If auth is done but there is no user, or if data loading is done, stop seeding indicator.
      setIsSeeding(false);
    }
  }, [firestore, destinations, isLoading, isAuthLoading, user]);

  const showLoading = isLoading || isSeeding || isAuthLoading;

  return (
    <div className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Explore Our Destinations</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            From serene valleys to adventurous peaks, discover the best of Himachal Pradesh with us.
          </p>
        </div>

        {showLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-60 w-full" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex justify-between pt-4">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && !showLoading && (
          <div className="text-center text-destructive border border-destructive/50 bg-destructive/5 p-8 rounded-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold font-headline mb-4 text-destructive">Could Not Load Destinations</h2>
            <p className="text-muted-foreground">
              We're having trouble fetching our travel destinations right now. Please try again in a few moments.
            </p>
            <Button asChild variant="outline" className="mt-6 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        )}

        {!showLoading && !error && destinations && destinations.length === 0 && (
          <div className="text-center text-muted-foreground">
            <p>No destinations are available at the moment. Please check back later.</p>
          </div>
        )}

        {!showLoading && !error && (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              // Combine DB data with local data to ensure everything is visible
              // Prioritize local data for details if available (to reflect recent text/image changes immediately)
              const dbDestinations = destinations || [];
              const combinedDestinations = [...initialDestinations];

              const mergedList = [...dbDestinations];

              initialDestinations.forEach(local => {
                const existingIndex = mergedList.findIndex(d => d.name === local.name);

                if (existingIndex !== -1) {
                  // Update existing with local data (images/desc)
                  mergedList[existingIndex] = {
                    ...mergedList[existingIndex],
                    ...local,
                    // Preserve ID from DB
                    id: mergedList[existingIndex].id
                  };
                } else {
                  // Add new local-only destination
                  mergedList.push({
                    ...local,
                    // Fix: Ensure imageUrl is a string to satisfy TypeScript
                    imageUrl: local.imageUrl || 'https://images.unsplash.com/photo-1601895912784-8774950a9089?w=1080&q=80',
                    id: `local-${local.name.toLowerCase().replace(/\s+/g, '-')}`
                  } as Destination);
                }
              });

              if (mergedList.length === 0) {
                return (
                  <div className="col-span-full text-center text-muted-foreground">
                    <p>No destinations found.</p>
                  </div>
                );
              }

              return mergedList.map((dest) => (
                <StaggerItem key={dest.id} className="h-full">
                  <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-0 group hover:-translate-y-2">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={dest.imageUrl || 'https://images.unsplash.com/photo-1601895912784-8774950a9089?w=1080&q=80'}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      <div className="absolute bottom-4 left-4">
                        <h2 className="text-2xl font-bold text-white font-headline drop-shadow-lg">{dest.name}</h2>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow bg-card/40 backdrop-blur-sm border-t border-white/10">
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">{dest.description}</p>
                      <div className="space-y-3 text-sm text-foreground/80 mb-6">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{dest.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{dest.bestTimeToVisit}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <Star className="w-4 h-4 text-primary mt-0.5" />
                          <span>{dest.attractions.join(', ')}</span>
                        </div>
                      </div>
                      <Button asChild className="w-full mt-auto bg-primary/90 hover:bg-primary transition-all shadow-md hover:shadow-primary/30 transform active:scale-95">
                        <Link href="/contact">Plan Your Trip</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ));
            })()}
          </StaggerContainer>
        )}

      </div>
    </div>
  );
}
