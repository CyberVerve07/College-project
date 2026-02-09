'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Award, CheckCircle, Navigation, Phone } from 'lucide-react';
import { initialServices } from '@/lib/services-data';
import { Badge } from '@/components/ui/badge';
import FareEstimator from '@/components/services/FareEstimator';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const services = initialServices;

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
    <div className="py-16 md:py-24 bg-muted/50 dark:bg-background transition-colors duration-500">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Our Premium Fleet
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience luxury and comfort with our wide range of well-maintained vehicles for the varied terrains of Himachal.
          </p>
        </motion.div>

        {/* AI Fare Estimator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <FareEstimator />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="group relative overflow-hidden border-0 bg-card/90 dark:bg-card/40 dark:border dark:border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-1 rounded-xl flex flex-col h-full">

                {/* Verified Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <Badge variant="secondary" className="bg-black/70 hover:bg-black/80 text-white backdrop-blur-md border-0 px-3 py-1 flex items-center gap-1.5 shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
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

                  {/* Overlay Content (Optional) */}
                  <div className="absolute bottom-4 left-4 z-10 md:hidden">
                    <h3 className="text-xl font-bold text-white font-headline">{service.name}</h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow relative">
                  {/* Glow effect on border bottom in dark mode */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <h3 className="text-2xl font-bold font-headline mb-3 text-foreground group-hover:text-primary transition-colors hidden md:block">
                    {service.name}
                  </h3>
                  <h3 className="text-2xl font-bold font-headline mb-3 text-foreground group-hover:text-primary transition-colors md:hidden">
                    {/* Duplicate specifically for layout stability if needed, but standard h3 above image is tricky. keeping this one standard. */}
                    {service.name}
                  </h3>

                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Features / Specs */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="truncate">{service.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="truncate">Top Rated</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 col-span-2">
                      <Navigation className="w-4 h-4 text-primary" />
                      <span className="truncate">{service.idealFor.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <Button asChild className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all group-hover:scale-[1.02]" size="lg">
                      <Link href="/contact?service=${service.id}" className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>Book This Vehicle</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
