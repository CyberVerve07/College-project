'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImagesMap } from '@/lib/placeholder-images';
import { SnowParticles } from '@/components/ui/snow-particles';
import { siteConfig } from '@/lib/config';
import { useEffect, useRef } from 'react';

/**
 * Hero Section component for the Home page.
 * Features:
 * - Parallax background effect using Framer Motion
 * - Animated text entrance
 * - Snow particles effect
 * - "Let's Go" CTA linking to WhatsApp
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
            className="relative w-full h-[100dvh] flex items-center overflow-hidden"
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
                    {/* Asymmetric Gradient: Darker on left for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                </motion.div>
            )}

            {/* Snow Particles */}
            <SnowParticles count={30} />

            {/* Content Container - Asymmetric Grid */}
            <motion.div
                className="container relative z-20 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full"
                style={{ y: textY, opacity }}
            >
                {/* Left Content (Text) - Col Span 8 for MORE asymmetry */}
                <div className="lg:col-span-8 flex flex-col justify-center pt-20 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 text-white/90 tracking-widest uppercase text-xs mb-6 font-medium bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 w-fit"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Trusted since 2018</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="font-headline text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[1.1] sm:leading-[0.9] text-white tracking-tighter drop-shadow-2xl mb-6 sm:mb-8"
                    >
                        Don&apos;t Just Visit, <br />
                        <span className="text-white font-black underline decoration-primary/60 decoration-4 underline-offset-4 sm:underline-offset-8">
                            Live Himachal
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-lg sm:text-xl text-gray-200 max-w-xl font-medium leading-relaxed mb-12"
                    >
                        Tired of the city noise? Pack your bags and let us drive you to paradise. From Manali&apos;s peaks to Dharamshala&apos;s peace – we&apos;ve got the ride sorted.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-lg bg-white text-black hover:bg-gray-200 transition-all shadow-xl">
                            <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                                Let&apos;s Go! <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-bold text-white hover:bg-white/10 hover:text-white rounded-lg border-white/30 backdrop-blur-sm transition-all bg-transparent">
                            <Link href="#destinations">See the Magic</Link>
                        </Button>
                    </motion.div>

                    {/* Stats strip — breaks generic hero pattern */}
                    <motion.div
                        className="flex flex-wrap gap-6 md:gap-10 mt-10 border-t border-white/10 pt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-black text-white">7+</span>
                            <span className="text-xs text-white/50 uppercase tracking-wider">Years</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-black text-white">5k+</span>
                            <span className="text-xs text-white/50 uppercase tracking-wider">Happy Riders</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-black text-white">4.9★</span>
                            <span className="text-xs text-white/50 uppercase tracking-wider">Rated</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
