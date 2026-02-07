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
            className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
        >
            {/* Background with Parallax */}
            {heroImage && (
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y: backgroundY, scale: 1.1 }}
                >
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                    />
                    {/* Winter Overlay - Cool Blue Tint */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-black/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
                </motion.div>
            )}

            {/* Snow Particles */}
            <SnowParticles count={100} />



            {/* Content */}
            <motion.div
                className="container relative z-20 px-4 md:px-6 text-center"
                style={{ y: textY, opacity, perspective: 1000 }}
            >
                <div className="max-w-4xl mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block rounded-full bg-white/10 px-6 py-2 text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-pulse"
                    >
                        🏔️ Gateway to the Gods: Himachal Pradesh
                    </motion.div>

                    <h1 className="text-7xl font-black tracking-tighter text-white sm:text-8xl md:text-9xl font-headline leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-blue-200">
                            Explore Himachal
                        </span>
                        <span className="block text-2xl md:text-3xl mt-4 font-bold tracking-wide text-white drop-shadow-md">
                            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500 font-extrabold text-3xl md:text-4xl">Destiny Tour & Travels</span>
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-blue-100 md:text-3xl font-body leading-relaxed drop-shadow-lg">
                        From the valleys of Manali to the spirituality of Dharamshala. Experience the majesty of the mountains with our premium fleet.
                    </p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <Button asChild size="lg" className="h-16 px-12 text-xl rounded-full bg-gradient-to-r from-primary to-pink-600 text-white hover:opacity-90 shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all hover:scale-105 border-0">
                            <Link href="/contact">
                                Book Your Ride <ArrowRight className="ml-3 h-6 w-6" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-16 px-12 text-xl rounded-full glass border-white/30 text-white hover:bg-white/20 transition-all hover:scale-105">
                            <Link href="#gallery">View Gallery</Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
