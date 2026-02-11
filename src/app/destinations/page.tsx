'use client';

import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { seedDestinations, seedRoutes } from '@/firebase/seed';
import { initialDestinations } from '@/lib/destinations-data';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } as any }
  };

  return (
    <div className="py-16 md:py-24 bg-muted/50 dark:bg-background transition-colors duration-500 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-orange-500" style={{ textShadow: '0 0 40px rgba(249, 115, 22, 0.4)' }}>
            Explore Our Destinations
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            From serene valleys to adventurous peaks, discover the best of Himachal Pradesh with us.
          </p>
        </motion.div>

        {showLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden rounded-xl border-0 shadow-lg">
                <Skeleton className="h-72 w-full" />
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-destructive border border-destructive/50 bg-destructive/5 p-8 rounded-xl max-w-2xl mx-auto backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold font-headline mb-4 text-destructive">Could Not Load Destinations</h2>
            <p className="text-muted-foreground">
              We're having trouble fetching our travel destinations right now. Please try again in a few moments.
            </p>
            <Button asChild variant="outline" className="mt-6 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </motion.div>
        )}

        {!showLoading && !error && destinations && destinations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground"
          >
            <p>No destinations are available at the moment. Please check back later.</p>
          </motion.div>
        )}

        {!showLoading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          >
            {(() => {
              // Combine DB data with local data just like before
              const dbDestinations = destinations || [];
              const mergedList = [...dbDestinations];

              initialDestinations.forEach(local => {
                const existingIndex = mergedList.findIndex(d => d.name === local.name);

                if (existingIndex !== -1) {
                  mergedList[existingIndex] = {
                    ...mergedList[existingIndex],
                    ...local,
                    imageUrl: local.imageUrl || mergedList[existingIndex].imageUrl || 'https://images.unsplash.com/photo-1601895912784-8774950a9089?w=1080&q=80',
                    id: mergedList[existingIndex].id
                  };
                } else {
                  mergedList.push({
                    ...local,
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
                <motion.div key={dest.id} variants={itemVariants} className="h-full">
                  <Card className="group relative flex flex-col h-full overflow-hidden border-0 bg-card/90 dark:bg-card/40 dark:border dark:border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl dark:shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-2 rounded-xl">

                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={dest.imageUrl || 'https://images.unsplash.com/photo-1601895912784-8774950a9089?w=1080&q=80'}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
                          {dest.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 z-10 w-full pr-4">
                        <h2 className="text-3xl font-bold text-white font-headline drop-shadow-lg tracking-wide group-hover:text-primary-foreground transition-colors">
                          {dest.name}
                        </h2>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow relative">
                      {/* Top Border Gradient */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 line-clamp-3">
                        {dest.description}
                      </p>

                      <div className="space-y-4 text-sm text-foreground/80 mb-6 flex-grow">
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10 transition-colors">
                          <Calendar className="w-5 h-5 text-orange-500 shrink-0" strokeWidth={2.5} />
                          <span className="font-medium">{dest.bestTimeToVisit}</span>
                        </div>
                        <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/50 dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10 transition-colors">
                          <Star className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" strokeWidth={2.5} />
                          <span className="line-clamp-2">{dest.attractions.join(', ')}</span>
                        </div>
                      </div>

                      <Button asChild className="w-full mt-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all group-hover:scale-[1.02]" size="lg">
                        <Link href="/contact" className="flex items-center justify-center gap-2">
                          <span>Plan Your Trip</span>
                          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ));
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
