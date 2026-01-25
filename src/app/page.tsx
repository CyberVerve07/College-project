import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImagesMap } from '@/lib/placeholder-images';
import { ArrowRight, Car, Users, Mountain, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { testimonials } from '@/lib/testimonials-data';

const featuredDestinations = [
  { id: 'dest-dharamshala', title: 'Dharamshala' },
  { id: 'dest-kangra', title: 'Kangra Valley' },
  { id: 'dest-birbilling', title: 'Bir Billing' },
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
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline drop-shadow-lg">
            Explore the Heart of Himachal
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl font-body drop-shadow-md">
            Your journey begins with Destiny Tour & Travels. Reliable, comfortable, and memorable travel experiences in Kangra.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/services">
              Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="destinations" className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Destinations</h2>
            <p className="mt-2 text-lg text-muted-foreground">Discover the pristine beauty of Himachal Pradesh.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((dest) => {
              const imageData = PlaceHolderImagesMap.get(dest.id);
              if (!imageData) return null;

              return (
                <Card key={dest.id} className="group overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-96">
                    <Image
                      src={imageData.imageUrl}
                      alt={imageData.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={imageData.imageHint}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <CardHeader className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                    <CardTitle className="text-2xl font-bold text-white font-headline drop-shadow-md">
                      {dest.title}
                    </CardTitle>
                    <p className="text-white/90 text-sm mt-1 drop-shadow">
                      {imageData.description}
                    </p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Customers Say</h2>
            <p className="mt-2 text-lg text-muted-foreground">Experiences that speak for themselves.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col">
                <CardContent className="pt-6 flex flex-col flex-grow">
                  <div className="flex mb-2" role="img" aria-label={`${testimonial.stars} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < testimonial.stars
                            ? "text-yellow-400 fill-current"
                            : "text-muted-foreground/50"
                        )}
                      />
                    ))}
                    <span className="sr-only">{testimonial.stars} out of 5 stars</span>
                  </div>
                  <p className="italic text-muted-foreground flex-grow">"{testimonial.quote}"</p>
                  <p className="font-bold text-right mt-4">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services-overview" className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Fleet</h2>
            <p className="mt-2 text-lg text-muted-foreground">Vehicles for every need and every journey.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {services.map((service) => {
              const serviceImage = PlaceHolderImagesMap.get(service.imageId);
              return (
                <div key={service.name} className="flex flex-col items-center gap-4 group">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {serviceImage ? (
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                        data-ai-hint={serviceImage.imageHint}
                      />
                    ) : (
                      <div className="bg-background w-full h-full flex items-center justify-center">
                        <service.icon className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mt-2 transition-colors group-hover:text-primary">{service.name}</h3>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/contact">Book a Cab</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
