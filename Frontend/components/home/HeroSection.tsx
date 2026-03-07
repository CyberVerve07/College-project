'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

import Image from 'next/image';
import { PlaceHolderImagesMap } from '@/images/placeholder-images';
import { SnowParticles } from '@/animation/snow-particles';
import { siteConfig } from '@/frontend/lib/config';
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


                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="font-headline text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[1.1] sm:leading-[0.9] text-white tracking-tighter drop-shadow-2xl mb-6 sm:mb-8"
                    >
                        Don&apos;t Just Visit, <br className="hidden sm:block" />
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
                        From Manali&apos;s peaks to Dharamshala&apos;s peace — we&apos;ve got the ride sorted.
                    </motion.p>


                </div>
            </motion.div>
        </section>
    );
}
