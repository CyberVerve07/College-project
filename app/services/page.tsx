'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/frontend/components/ui/button';
import { Card, CardContent } from '@/frontend/components/ui/card';
import { Users, Award, CheckCircle, Navigation, Phone, Car, Hotel, List } from 'lucide-react';
import { initialServices } from '@/images/services-data';
import { initialHotels } from '@/images/hotels-data';
import { Badge } from '@/frontend/components/ui/badge';
import { Star, MapPin, Coffee, ShieldCheck, Clock, HeartHandshake, Zap } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/frontend/components/ui/dialog';
import ReviewSection from '@/frontend/components/reviews/ReviewSection';

/**
 * Services Page component.
 * Displays the fleet of vehicles and hotel stays with a toggle view.
 * Animations powered by Framer Motion.
 */
export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<'fleet' | 'hotels'>('fleet');
  const services = initialServices;
  const hotels = initialHotels;

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-16 md:py-24 bg-muted/50 dark:bg-background transition-colors duration-500 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 pb-2">
                {viewMode === 'fleet' ? 'Our Premium Fleet' : 'Elite Himalayan Stays'}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {viewMode === 'fleet' 
                  ? 'Experience luxury and comfort with our wide range of well-maintained vehicles for the varied terrains of Himachal.'
                  : 'Discover handpicked luxury resorts and boutique homestays curated for your perfect mountain escape.'}
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex shrink-0">
              <div className="bg-muted p-1 rounded-2xl flex items-center shadow-inner border border-border/50">
                <Button
                  variant={viewMode === 'fleet' ? 'secondary' : 'ghost'}
                  className={`rounded-xl px-6 py-6 gap-3 transition-all duration-300 ${
                    viewMode === 'fleet' 
                      ? 'bg-primary text-white shadow-lg scale-105' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setViewMode('fleet')}
                >
                  <Car className={`w-5 h-5 ${viewMode === 'fleet' ? 'animate-pulse' : ''}`} />
                  <span className="font-bold tracking-tight">Car Services</span>
                </Button>
                <Button
                  variant={viewMode === 'hotels' ? 'secondary' : 'ghost'}
                  className={`rounded-xl px-6 py-6 gap-3 transition-all duration-300 ${
                    viewMode === 'hotels' 
                      ? 'bg-primary text-white shadow-lg scale-105' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setViewMode('hotels')}
                >
                  <Hotel className={`w-5 h-5 ${viewMode === 'hotels' ? 'animate-pulse' : ''}`} />
                  <span className="font-bold tracking-tight">Hotel Stays</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'fleet' ? (
            <motion.div
              key="fleet-view"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service) => (
                <motion.div key={service.id} variants={itemVariants}>
                  <Card className="group relative overflow-hidden border-0 bg-card/90 dark:bg-card/40 dark:border dark:border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-1 rounded-xl flex flex-col h-full">

                    {/* Verified Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge variant="secondary" className="bg-black/70 hover:bg-black/80 text-white backdrop-blur-md border-0 px-3 py-1 flex items-center gap-1.5 shadow-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" strokeWidth={2.5} />
                        <span className="text-xs font-medium tracking-wide">Verified</span>
                      </Badge>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1080&q=80'}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow relative">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <h3 className="text-2xl font-bold font-headline mb-3 text-foreground group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>

                      <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 line-clamp-3">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                          <Users className="w-4 h-4 text-primary" strokeWidth={2} />
                          <span className="truncate">{service.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                          <CheckCircle className="w-4 h-4 text-primary" strokeWidth={2} />
                          <span className="truncate">All Himachal Permit</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Starting at</p>
                            <p className="text-xl font-bold text-foreground">{service.pricing}</p>
                          </div>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="border-white/10 text-xs font-bold rounded-xl h-8 px-4 text-white">
                                Reviews
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-white/10 text-white rounded-3xl p-6 max-h-[80vh] overflow-y-auto max-w-lg">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-bold font-headline">Reviews for {service.name}</DialogTitle>
                                <DialogDescription className="text-slate-400 text-xs">Real customer experiences and ratings.</DialogDescription>
                              </DialogHeader>
                              <ReviewSection targetId={service.id} />
                            </DialogContent>
                          </Dialog>
                        </div>

                        <Button asChild className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all h-10 rounded-xl" size="sm">
                          <Link href={`/contact?service=${service.id}`} className="flex items-center justify-center gap-2">
                            <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
                            <span>Book Now</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="hotels-view"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {hotels.map((hotel) => (
                <motion.div key={hotel.id} variants={itemVariants}>
                  <Card className="group relative overflow-hidden border-0 bg-card/90 dark:bg-card/40 dark:border dark:border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-1 rounded-xl flex flex-col h-full">
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge variant="secondary" className="bg-black/70 hover:bg-black/80 text-white backdrop-blur-md border-0 px-3 py-1 flex items-center gap-1.5 shadow-sm">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" strokeWidth={2.5} />
                        <span className="text-xs font-bold tracking-wide">{hotel.rating}</span>
                      </Badge>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <Badge variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white px-3 py-1 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{hotel.location}</span>
                      </Badge>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow relative">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <h3 className="text-xl font-bold font-headline mb-2 text-foreground group-hover:text-blue-500 transition-colors">
                        {hotel.name}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                        {hotel.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {hotel.features.map((feature, index) => (
                          <span key={index} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border/50">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Starting from</p>
                            <p className="text-2xl font-black text-white">{hotel.priceRange.split('-')[0].trim()}</p>
                          </div>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="border-white/10 text-xs font-bold rounded-xl h-8 px-4 text-white">
                                Reviews
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-white/10 text-white rounded-3xl p-6 max-h-[80vh] overflow-y-auto max-w-lg">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-bold font-headline">Reviews for {hotel.name}</DialogTitle>
                                <DialogDescription className="text-slate-400 text-xs">Real customer experiences and ratings.</DialogDescription>
                              </DialogHeader>
                              <ReviewSection targetId={hotel.id} />
                            </DialogContent>
                          </Dialog>
                        </div>

                        <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 shadow-md hover:shadow-blue-500/50 transition-all font-bold">
                          <Link href={`/contact?hotel=${hotel.id}`}>
                            Enquire Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-card/50 rounded-3xl border border-border/50 backdrop-blur-sm shadow-inner"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Why Book With Us?</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-bold mb-2">Verified Partners</h4>
              <p className="text-sm text-muted-foreground">Every vehicle and hotel is personally verified for quality and safety.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-lg font-bold mb-2">24/7 Assistance</h4>
              <p className="text-sm text-muted-foreground">On-ground support available round the clock throughout your journey.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/20 transition-colors">
                <HeartHandshake className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-lg font-bold mb-2">Local Expertise</h4>
              <p className="text-sm text-muted-foreground">Trained local drivers and guides who know the mountains like no one else.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/20 transition-colors">
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
              <h4 className="text-lg font-bold mb-2">Instant Booking</h4>
              <p className="text-sm text-muted-foreground">Quick enquiry system with fast response times for hassle-free planning.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
