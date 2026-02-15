import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImagesMap, PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { ArrowRight, Car, Users, Mountain } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import { cn } from '@/lib/utils';
import { testimonials } from '@/lib/testimonials-data';
import { siteConfig } from '@/lib/config';

const featuredDestinations = [
  { id: 'dest-dharamshala', title: 'Dharamshala' },
  { id: 'dest-kangra', title: 'Kangra' },
  { id: 'dest-birbilling', title: 'Bir Billing' },
  { id: 'dest-manali', title: 'Manali' },
  { id: 'dest-shimla', title: 'Shimla' },
  { id: 'dest-spiti', title: 'Spiti Valley' },
  { id: 'dest-dalhousie', title: 'Dalhousie' },
  { id: 'dest-kasol', title: 'Kasol' },
];

const services = [
  { name: 'Taxi Service', icon: Car, imageId: 'service-taxi' },
  { name: 'Innova', icon: Car, imageId: 'service-innova' },
  { name: 'Tempo Traveller', icon: Users, imageId: 'service-tempo' },
  { name: 'Alto & Sumo', icon: Mountain, imageId: 'service-sumo' },
];

/**
 * Home Page component.
 * Landing page featuring:
 * - Hero section with parallax
 * - Featured destinations grid
 * - Services overview
 * - Image gallery
 * - Booking call-to-action
 */
export default function Home() {
  const heroImage = PlaceHolderImagesMap.get('hero');

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Destinations */}
      <section id="destinations" className="py-8 md:py-16 relative">
        <div className="container px-6 md:px-8 text-center mb-6 md:mb-10">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tight mb-3 md:mb-5 text-white" style={{ textShadow: '0 0 60px hsla(200, 85%, 35%, 0.6), 0 4px 20px rgba(0,0,0,0.8)' }}>Legendary Destinations</h2>
          <p className="text-base md:text-lg text-slate-300 font-medium max-w-3xl mx-auto">Discover the most breathtaking destinations in Himachal Pradesh</p>
        </div>

        <div className="container px-4 md:px-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6 py-6">
              {featuredDestinations.map((dest) => {
                const imageData = PlaceHolderImagesMap.get(dest.id);
                if (!imageData) return null;

                return (
                  <CarouselItem key={dest.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="group relative h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-3 cursor-pointer neon-border bg-card">
                      <Image
                        src={imageData.homeImageUrl || imageData.imageUrl}
                        alt={imageData.description}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full transform transition-all duration-500">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 group-hover:text-secondary-foreground transition-colors">{dest.title}</h3>
                        <p className="text-white/60 text-sm md:text-base line-clamp-2 mb-4 md:mb-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                          {imageData.description}
                        </p>
                        <div className="h-1 w-0 group-hover:w-full bg-secondary transition-all duration-500 rounded-full" />
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-[-2rem] bg-white/10 hover:bg-white/20 border-white/20 text-white" />
              <CarouselNext className="right-[-2rem] bg-white/10 hover:bg-white/20 border-white/20 text-white" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-overview" className="bg-muted py-16 md:py-32 text-foreground rounded-[2.5rem] md:rounded-[4rem] mx-4 md:mx-8">
        <div className="container px-4 md:px-6 text-center mb-12 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-4 md:mb-6">Our Premium Fleet</h2>
          <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">Reliable, well-maintained vehicles for a safe and comfortable journey.</p>
        </div>

        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {services.map((service) => {
              const serviceImage = PlaceHolderImagesMap.get(service.imageId);
              return (
                <div key={service.name} className="bg-background/5 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center text-center group hover:bg-white/10 transition-all hover:scale-105">
                  <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 md:mb-8">
                    {serviceImage ? (
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.name}
                        fill
                        sizes="192px"
                        className="object-contain drop-shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                      />
                    ) : (
                      <div className="bg-primary/20 w-full h-full flex items-center justify-center rounded-full">
                        <service.icon className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={2} />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-4">{service.name}</h3>
                  <p className="opacity-50 text-sm md:text-base mb-6 md:mb-8 italic">Rugged. Sanatized. Ready.</p>
                  <Button asChild variant="secondary" className="mt-auto w-full h-12 md:h-14 rounded-xl md:rounded-2xl text-base md:text-lg font-bold bg-white text-black hover:bg-secondary hover:text-white transition-all">
                    <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">Get Quote</a>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-32">
        <div className="container px-4 md:px-6 text-center mb-10 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-4 text-primary" style={{ textShadow: '0 0 50px hsla(200, 85%, 35%, 0.5)' }}>Visual Overdose</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">No filters needed. Pure Himachal magic.</p>
        </div>
        <div className="container px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {PlaceHolderImages.filter(img => img.id.startsWith('dest-')).map((img: ImagePlaceholder) => (
            <div key={img.id} className="relative h-[350px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl transition-all group neon-border">
              <Image
                src={img.imageUrl}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-8 text-center">
                <span className="text-white font-black text-3xl drop-shadow-2xl mb-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">{img.title}</span>
                <p className="text-white/70 text-sm line-clamp-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-700 delay-100">{img.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-40 bg-mesh text-white text-center rounded-t-[2.5rem] md:rounded-t-[5rem] mx-4 md:mx-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-3xl" />
        <div className="container px-4 md:px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-9xl font-black font-headline mb-6 md:mb-10 tracking-tighter animate-pulse">DON'T SETTLE</h2>
          <p className="text-lg md:text-2xl mb-10 md:mb-16 opacity-80 max-w-3xl mx-auto font-bold uppercase tracking-widest leading-relaxed">
            While others take you to destinations, we take you to experiences. Book the ride of your life.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-16 md:h-24 px-10 md:px-16 text-xl md:text-3xl font-black rounded-[1.5rem] md:rounded-[2rem] bg-white text-primary hover:bg-black hover:text-white transition-all shadow-2xl hover:scale-110 active:scale-95">
            <Link href="/contact">LOCK THE TRIP</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
