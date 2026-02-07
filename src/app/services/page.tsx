'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Award, CheckCircle, MapPin, Navigation, Phone } from 'lucide-react';
import { initialServices } from '@/lib/services-data';
import { Badge } from '@/components/ui/badge';
import FareEstimator from '@/components/services/FareEstimator';

export default function ServicesPage() {
  // Use local fixed data to identify vehicles
  // We want to display exactly the vehicles in our verified list.
  const services = initialServices;

  return (
    <div className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Fleet</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose from our wide range of well-maintained vehicles for a safe and comfortable journey.
          </p>
        </div>

        {/* AI Fare Estimator */}
        <div className="mb-16">
          <FareEstimator />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl bg-card flex flex-col">

              {/* Verified Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-black/70 hover:bg-black/80 text-white backdrop-blur-md border-0 px-3 py-1 flex items-center gap-1.5 shadow-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-medium tracking-wide">Verified Vehicle</span>
                </Badge>
              </div>

              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1080&q=80'} // Fallback
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features / Specs */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Users className="w-4 h-4 text-primary/80" />
                    <span className="truncate">{service.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Award className="w-4 h-4 text-primary/80" />
                    <span className="truncate">Top Rated</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/80 col-span-2">
                    <Navigation className="w-4 h-4 text-primary/80" />
                    <span className="truncate">{service.idealFor.split(',')[0]}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all" size="lg">
                    <Link href="/contact" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Contact for Price</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
