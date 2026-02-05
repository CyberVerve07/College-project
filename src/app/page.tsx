import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImagesMap, PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { ArrowRight, Car, Users, Mountain, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { testimonials } from '@/lib/testimonials-data';

const featuredDestinations = [
  { id: 'dest-dharamshala', title: 'Dharamshala' },
  { id: 'dest-kangra', title: 'Kangra Valley' },
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

export default function Home() {
  const heroImage = PlaceHolderImagesMap.get('hero');

  return (
    <div className="flex flex-col min-h-[100dvh] bg-mesh">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover scale-105 animate-in fade-in duration-1000"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/40 to-transparent" />
          </div>
        )}

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl space-y-8">
            <div className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary border border-primary/30 backdrop-blur-xl animate-in fade-in slide-in-from-left-4 duration-700">
              🏔️ Next-Gen Himalayan Travel
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl md:text-8xl font-headline leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
              Peak <br />
              <span className="text-gradient">Experience</span>
            </h1>
            <p className="max-w-[550px] text-xl text-muted-foreground md:text-2xl font-body leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Modern rides, Local souls. Redefining how you experience the roof of the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Button asChild size="lg" className="h-16 px-10 text-xl rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95">
                <Link href="/contact">
                  Start Adventure <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xl rounded-2xl glass border-primary/20 hover:bg-primary/10 transition-all hover:-translate-y-1 active:scale-95">
                <Link href="#gallery">Visual Journey</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Quick Facts */}
        <div className="absolute bottom-20 right-12 hidden lg:flex flex-col gap-6 animate-in fade-in slide-in-from-right-10 duration-1000 delay-500">
          {[
            { label: 'Verified Drivers', value: '50+', color: 'text-primary' },
            { label: 'Safety Rating', value: '4.9/5', color: 'text-secondary' },
            { label: 'Happy Souls', value: '2k+', color: 'text-accent' },
          ].map((item, i) => (
            <div key={i} className="glass-dark rounded-3xl p-6 border-l-4 border-l-primary flex flex-col justify-center min-w-[200px] hover:bg-white/5 transition-colors">
              <div className={cn("text-3xl font-black", item.color)}>{item.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] font-bold opacity-60 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-32 relative">
        <div className="container px-4 md:px-6 text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black font-headline tracking-tighter mb-6">Legends Await</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Skip the tourist traps. Our drivers take you to the heart of the Himalayas.</p>
        </div>

        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest) => {
              const imageData = PlaceHolderImagesMap.get(dest.id);
              if (!imageData) return null;

              return (
                <div key={dest.id} className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-3 cursor-pointer neon-border">
                  <Image
                    src={imageData.imageUrl}
                    alt={imageData.description}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-10 w-full transform transition-all duration-500">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-secondary-foreground transition-colors">{dest.title}</h3>
                    <p className="text-white/60 text-base line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      {imageData.description}
                    </p>
                    <div className="h-1 w-0 group-hover:w-full bg-secondary transition-all duration-500 rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-overview" className="bg-foreground py-32 text-background rounded-[4rem] mx-4 md:mx-8">
        <div className="container px-4 md:px-6 text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black font-headline tracking-tighter mb-6">The Machine</h2>
          <p className="text-xl opacity-60 max-w-2xl mx-auto">Precision-tuned fleet for the world's most challenging roads.</p>
        </div>

        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service) => {
              const serviceImage = PlaceHolderImagesMap.get(service.imageId);
              return (
                <div key={service.name} className="bg-background/5 border border-white/10 p-10 rounded-[3rem] flex flex-col items-center text-center group hover:bg-white/10 transition-all hover:scale-105">
                  <div className="relative w-48 h-48 mb-8">
                    {serviceImage ? (
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.name}
                        fill
                        className="object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
                      />
                    ) : (
                      <div className="bg-primary/20 w-full h-full flex items-center justify-center rounded-full">
                        <service.icon className="w-20 h-20 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-black mb-4">{service.name}</h3>
                  <p className="opacity-50 text-base mb-8 italic">Rugged. Sanatized. Ready.</p>
                  <Button variant="secondary" className="mt-auto w-full h-14 rounded-2xl text-lg font-bold bg-white text-black hover:bg-secondary hover:text-white transition-all">
                    Get Quote
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32">
        <div className="container px-4 md:px-6 text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black font-headline tracking-tighter mb-4 text-gradient">Visual Overdose</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">No filters needed. Pure Himachal magic.</p>
        </div>
        <div className="container px-4 md:px-6 columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
          {PlaceHolderImages.filter(img => img.id.startsWith('dest-')).map((img: ImagePlaceholder) => (
            <div key={img.id} className="relative break-inside-avoid rounded-[2rem] overflow-hidden shadow-2xl transition-all group neon-border">
              <Image
                src={img.imageUrl}
                alt={img.title}
                width={600}
                height={900}
                className="w-full object-cover transition-transform duration-1000 group-hover:scale-125 hover:rotate-2"
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

      {/* Booking Prompt */}
      <section className="py-40 bg-accent text-white text-center rounded-t-[5rem] mx-4 md:mx-8">
        <div className="container px-4 md:px-6">
          <h2 className="text-6xl md:text-9xl font-black font-headline mb-10 tracking-tighter animate-pulse">DON'T SETTLE</h2>
          <p className="text-2xl mb-16 opacity-80 max-w-3xl mx-auto font-bold uppercase tracking-widest leading-relaxed">
            While others take you to destinations, we take you to experiences. Book the ride of your life.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-24 px-16 text-3xl font-black rounded-[2rem] bg-white text-accent hover:bg-black hover:text-white transition-all shadow-2xl hover:scale-110 active:scale-95">
            <Link href="/contact">LOCK THE TRIP</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
