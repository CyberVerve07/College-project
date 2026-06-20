'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initialTourPackages, TourPackage } from '@/images/packages-data';
import { Button } from '@/frontend/components/ui/button';
import { Card, CardContent } from '@/frontend/components/ui/card';
import { Badge } from '@/frontend/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/frontend/components/ui/dialog';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, ChevronRight, Phone, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PackagesPage() {
  const [activePackage, setActivePackage] = useState<TourPackage | null>(null);
  const packages = initialTourPackages;

  return (
    <div className="min-h-screen py-24 bg-[#050b1a] text-white relative">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Title */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Exclusive Deals
          </div>
          <h1 className="text-5xl sm:text-7xl font-headline font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Popular <span className="text-primary italic">Tour Packages</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg">
            Carefully curated itineraries designed by mountain specialists to show you the heart and soul of Himachal Pradesh.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden border-white/10 bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl hover:border-primary/20 transition-all duration-300 group hover:-translate-y-2 text-white">
                
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 flex flex-col flex-grow space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold font-headline leading-tight group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{pkg.subtitle}</p>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {pkg.overview}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {pkg.destinations.map(d => (
                      <span key={d} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/5 rounded border border-white/5 text-slate-300">
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Best Price</p>
                      <p className="text-lg font-black text-white">{pkg.price.split(' ')[0]}</p>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => setActivePackage(pkg)}
                          className="bg-primary hover:bg-primary/95 text-white font-bold rounded-xl h-10 px-5 transition-all text-xs"
                        >
                          View Itinerary
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl bg-slate-900 border-white/10 text-white rounded-3xl overflow-y-auto max-h-[85vh] p-6 sm:p-8">
                        <DialogHeader>
                          <DialogTitle className="text-2xl sm:text-3xl font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {pkg.title}
                          </DialogTitle>
                          <DialogDescription className="text-slate-400 text-xs sm:text-sm">
                            {pkg.duration} &bull; {pkg.price}
                          </DialogDescription>
                        </DialogHeader>

                        {/* Itinerary details */}
                        <div className="space-y-6 my-6">
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Day-by-Day Itinerary</h4>
                            <div className="space-y-4 relative border-l border-white/10 pl-6 ml-3 pt-2">
                              {pkg.itinerary.map(item => (
                                <div key={item.day} className="relative space-y-1">
                                  <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-slate-900 border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary">
                                    {item.day}
                                  </div>
                                  <h5 className="font-bold text-sm text-slate-100">{item.title}</h5>
                                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Inclusions & Exclusions */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2.5">What's Included</h4>
                              <ul className="space-y-1.5 text-xs text-slate-300">
                                {pkg.inclusions.map((inc, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                    <span>{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2.5">What's Excluded</h4>
                              <ul className="space-y-1.5 text-xs text-slate-300">
                                {pkg.exclusions.map((exc, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                    <span>{exc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Booking actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                          <Button asChild className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold rounded-xl h-11 text-xs">
                            <a 
                              href={`https://wa.me/917832989320?text=Hello!%20I%20want%20to%20book%20the%20${encodeURIComponent(pkg.title)}%20package%20(${pkg.duration}).`}
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center justify-center gap-2"
                            >
                              <Phone className="w-4 h-4" /> Book via WhatsApp
                            </a>
                          </Button>
                          <Button asChild variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl h-11 text-xs">
                            <Link href={`/contact?package=${pkg.id}`} className="flex items-center justify-center gap-2">
                              <Compass className="w-4 h-4 text-primary" /> Send Booking Inquiry
                            </Link>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
