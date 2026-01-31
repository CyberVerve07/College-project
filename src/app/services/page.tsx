'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Award, CheckCircle } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { seedServices } from '@/firebase/seed';

interface Service {
  id: string;
  name: string;
  description: string;
  pricing: string;
  imageUrl: string;
  capacity: string;
  features: string[];
  idealFor: string;
}

export default function ServicesPage() {
  const firestore = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const [isSeeding, setIsSeeding] = useState(true);

  const servicesCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'services');
  }, [firestore]);

  const { data: vehicleServices, isLoading, error } = useCollection<Service>(servicesCollection);

 useEffect(() => {
    // We need to wait for auth to complete and firestore to be available.
    if (firestore && !isAuthLoading && user && !isLoading) {
      if (vehicleServices?.length === 0) {
        seedServices(firestore).finally(() => setIsSeeding(false));
      } else {
        // Data exists, no need to seed.
        setIsSeeding(false);
      }
    } else if (!isAuthLoading && !isLoading) {
      // If auth is done but there is no user, or if data loading is done, stop seeding indicator.
      setIsSeeding(false);
    }
  }, [firestore, vehicleServices, isLoading, isAuthLoading, user]);

  const showLoading = isLoading || isSeeding || isAuthLoading;

  return (
    <div className="bg-background">
      <section className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We offer a diverse fleet of vehicles to cater to all your travel needs in Himachal Pradesh. From solo trips to large group tours, we have the perfect ride for you.
          </p>
        </div>

        {showLoading && (
          <div className="space-y-12">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="grid md:grid-cols-2 overflow-hidden border-0 shadow-none">
                <div className={`relative min-h-[300px] ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
                <div className="p-8 flex flex-col justify-center space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="pt-4">
                    <Skeleton className="h-6 w-1/3" />
                  </div>
                  <div className="pt-4">
                    <Skeleton className="h-12 w-1/2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {error && !showLoading && (
          <div className="text-center text-destructive border border-destructive/50 bg-destructive/5 p-8 rounded-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold font-headline mb-4 text-destructive">Could Not Load Services</h2>
            <p className="text-muted-foreground">
              We're having trouble fetching our vehicle services right now.
              This could be a temporary issue with the network or our servers.
            </p>
            <p className="text-sm mt-4 text-muted-foreground">
              Please try again in a few moments.
            </p>
             <Button asChild variant="outline" className="mt-6 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        )}

        {!showLoading && !error && vehicleServices && vehicleServices.length === 0 && (
            <div className="text-center text-muted-foreground">
                <p>No services are available at the moment.</p>
                <p>Please check back later.</p>
            </div>
        )}

        {!showLoading && !error && vehicleServices && vehicleServices.length > 0 && (
          <div className="space-y-12">
            {vehicleServices.map((service, index) => (
              <Card key={service.id} className="grid md:grid-cols-2 overflow-hidden border shadow-md hover:shadow-2xl transition-shadow duration-300 rounded-xl">
                <div className={`relative min-h-[300px] ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="font-headline text-3xl font-bold mb-4">{service.name}</h2>
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">{service.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-3 text-primary" />
                      <span className="font-medium">{service.capacity}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 mr-3 text-primary" />
                      <span className="font-medium">{service.idealFor}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold mb-3 text-md">Key Features:</h4>
                    <ul className="space-y-2">
                      {Array.isArray(service.features) && service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-lg font-semibold mb-6">
                    <span>{service.pricing}</span>
                  </div>

                  <Button asChild size="lg" className="w-full sm:w-auto self-start">
                    <Link href="/contact">Book This Vehicle</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
