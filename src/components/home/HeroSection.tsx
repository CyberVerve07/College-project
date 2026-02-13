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
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                </motion.div>
            )}

            {/* Snow Particles */}
            <SnowParticles count={30} />

            {/* Content Container - Asymmetric Grid */}
            <motion.div
                className="container relative z-20 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full"
                style={{ y: textY, opacity }}
            >
                {/* Left Content (Text) - Col Span 8 for MORE asymmetry */}
                <div className="lg:col-span-8 flex flex-col justify-center pt-20 lg:pt-0 lg:pr-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-3 text-cyan-400 font-bold tracking-widest uppercase text-sm mb-6"
                    >
                        <span className="text-xl">🏔️</span>
                        <span>Ready for the mountains?</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.9] text-white tracking-tighter drop-shadow-2xl mb-6"
                    >
                        Don&apos;t Just Visit, <br />
                        <span className="text-cyan-400 font-black">
                            Live Himachal
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-lg sm:text-xl text-gray-300 max-w-xl font-medium leading-relaxed mb-10"
                    >
                        Tired of the city noise? Pack your bags and let us drive you to paradise. From Manali&apos;s peaks to Dharamshala&apos;s peace – we&apos;ve got the ride sorted.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Button asChild size="lg" className="h-16 px-10 text-lg font-black rounded-[22px] bg-primary text-white hover:bg-primary/90 hover:scale-105 shadow-[0_8px_30px_hsla(200,85%,35%,0.4)] transition-all">
                            <Link href="/contact" className="flex items-center gap-3">
                                Let&apos;s Go! <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg" className="h-16 px-10 text-lg font-bold text-white hover:bg-white/10 hover:text-white rounded-[22px] border-2 border-white/20 backdrop-blur-sm transition-all">
                            <Link href="#destinations">See the Magic</Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Right Content (Floating Card) - Col Span 4 for asymmetry */}
                <div className="hidden lg:flex lg:col-span-4 justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, rotate: -4 }}
                        transition={{ duration: 1, delay: 0.5, type: "spring" }}
                        whileHover={{ scale: 1.05, rotate: 0 }}
                        className="w-full max-w-sm aspect-[4/5] rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden group"
                    >
                        {/* Decorative Gradient Blob */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-secondary/30 rounded-full blur-3xl group-hover:bg-secondary/50 transition-colors duration-700" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <span className="text-5xl font-black text-white/20">01</span>
                                <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                                    <ArrowRight className="text-cyan-400 w-8 h-8 -rotate-45" strokeWidth={2.5} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Manali <br /> Adventures</h3>
                            <p className="text-white/60 text-sm">Most popular this season</p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                                <div className="flex justify-between text-sm text-white/80 mb-1">
                                    <span>Temperature</span>
                                    <span>2°C</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-400 w-1/3 h-full rounded-full" />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black border-2 border-white/20" />
                                    ))}
                                </div>
                                <span className="text-white/80 text-sm font-medium">+12k Travelers</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
