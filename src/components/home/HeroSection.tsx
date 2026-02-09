'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImagesMap } from '@/lib/placeholder-images';
import { SnowParticles } from '@/components/ui/snow-particles';
import { useEffect, useRef } from 'react';

/**
 * Hero Section component for the Home page.
 * Features:
 * - Parallax background effect using Framer Motion
 * - Animated text entrance
 * - Snow particles effect
 */
export default function HeroSection() {
    const heroImage = PlaceHolderImagesMap.get('hero');
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);



    return (
        <section
            ref={ref}
            className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
        >
            {/* Background with Parallax */}
            {heroImage && (
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y: backgroundY, scale: 1.1 }}
                >
                    <Image
                        src={heroImage.homeImageUrl || heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover"
                        priority
                        quality={75}
                    />
                    {/* Enhanced Gradient Overlay for Better Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-black/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
                </motion.div>
            )}

            {/* Snow Particles - Reduced for performance */}
            <SnowParticles count={30} />

            {/* Content */}
            <motion.div
                className="container relative z-20 px-6 md:px-8 text-center"
                style={{ y: textY, opacity, perspective: 1000 }}
            >
                <div className="max-w-5xl mx-auto space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3 text-sm font-semibold text-white border border-white/30 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                    >
                        <span className="text-xl">🏔️</span>
                        <span className="tracking-wide">Gateway to the Gods: Himachal Pradesh</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tight text-white font-headline leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
                            Explore
                        </span>
                        <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 font-headline leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
                            Himachal
                        </span>
                        <span className="block text-xl sm:text-2xl md:text-3xl mt-6 font-semibold tracking-wide text-white/90 drop-shadow-lg">
                            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400 font-bold">Destiny Tour & Travels</span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-100 font-medium leading-relaxed drop-shadow-lg"
                    >
                        From the valleys of Manali to the spirituality of Dharamshala. Experience the majesty of the mountains with our premium fleet.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-5 justify-center pt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Button asChild size="lg" className="h-14 sm:h-16 px-10 sm:px-14 text-base sm:text-lg font-bold rounded-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 border-0 glow-on-hover">
                            <Link href="/contact">
                                Book Your Ride <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 sm:h-16 px-10 sm:px-14 text-base sm:text-lg font-bold rounded-full bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 transition-all duration-300 hover:scale-105 shadow-lg glow-on-hover">
                            <Link href="#destinations">View Gallery</Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
