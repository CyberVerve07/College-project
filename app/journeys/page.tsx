'use client';

import { useState } from 'react';
import { JourneyHero } from '@/frontend/components/journeys/journey-hero';
import { JourneyGrid } from '@/frontend/components/journeys/journey-grid';
import { ShareJourneyModal } from '@/frontend/components/journeys/share-journey-modal';
import { AnimatedSection } from '@/animation/animated-section';
import type { JourneyData } from '@/frontend/components/journeys/journey-card';
import { Sparkles } from 'lucide-react';

const sampleJourneys: JourneyData[] = [
    {
        id: '1',
        title: 'Sunrise Trek to Triund Peak',
        story: 'Started at 4 AM from McLeod Ganj and reached the summit just as the sun painted the Dhauladhar range in shades of gold and pink. The cold wind, the hot chai from the local stall, and the panoramic view made it an unforgettable morning.',
        location: 'Triund, Dharamshala',
        date: 'Dec 2025',
        rating: 5,
        imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=400&fit=crop',
        author: 'Aarav Mehta',
    },
    {
        id: '2',
        title: 'Paragliding Over Bir Billing',
        story: 'The moment my feet left the ground I knew this was going to be the best day of my trip. Soaring over the lush green valley with snow-capped peaks in the background was pure adrenaline and zen at the same time.',
        location: 'Bir Billing',
        date: 'Nov 2025',
        rating: 5,
        imageUrl: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&h=400&fit=crop',
        author: 'Priya Sharma',
    },
    {
        id: '3',
        title: 'Snowy Roads of Spiti Valley',
        story: 'Driving through the snow-covered roads of Spiti in winter was both terrifying and breathtaking. The monasteries perched on cliffs, the frozen rivers, and the hospitality of locals made this a journey of a lifetime.',
        location: 'Spiti Valley',
        date: 'Jan 2026',
        rating: 4,
        imageUrl: 'https://www.onacheaptrip.com/wp-content/uploads/Curvy-roads-Spiti-valley-route.jpg',
        author: 'Vikram Singh',
    },
    {
        id: '4',
        title: 'Riverside Camping in Kasol',
        story: 'Spent three nights by the Parvati River with nothing but a tent and a guitar. The sound of the river, campfire stories, and stargazing sessions created memories that no luxury hotel could ever match.',
        location: 'Kasol',
        date: 'Oct 2025',
        rating: 5,
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
        author: 'Neha Kapoor',
    },
    {
        id: '5',
        title: 'Old Town Walk in Shimla',
        story: 'Walking through the colonial architecture of Shimla\'s Mall Road during the evening was magical. The church, the old bookshops, and warm momos from a roadside stall made the town feel timeless.',
        location: 'Shimla',
        date: 'Sep 2025',
        rating: 4,
        imageUrl: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&h=400&fit=crop',
        author: 'Rohit Verma',
    },
    {
        id: '6',
        title: 'Meditation Retreat in Dharamkot',
        story: 'A week of silence, meditation, and yoga amidst the pine forests changed my perspective on life. The Tibetan culture, prayer flags, and monastery visits added spiritual depth to the journey.',
        location: 'Dharamkot, Dharamshala',
        date: 'Aug 2025',
        rating: 5,
        imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop',
        author: 'Ananya Joshi',
    },
    {
        id: '7',
        title: 'Chasing Waterfalls in Manali',
        story: 'Discovered a hidden waterfall off the beaten path near Old Manali. The trek through dense forests, crossing wooden bridges, and finally standing before the cascading water was nature at its raw best.',
        location: 'Manali',
        date: 'Jul 2025',
        rating: 4,
        imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.hXqANwGv6mA3Z6j7j358GwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
        author: 'Karan Thakur',
    },
    {
        id: '8',
        title: 'Stargazing Night at Chandratal',
        story: 'At 14,000 feet, with zero light pollution, the Milky Way stretched across the sky like a celestial painting. Chandratal Lake reflected the stars, creating a surreal mirror effect. Absolutely magical!',
        location: 'Chandratal, Spiti',
        date: 'Jun 2025',
        rating: 5,
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop',
        author: 'Ishita Patel',
    },
];

export default function JourneysPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [journeys, setJourneys] = useState<JourneyData[]>(sampleJourneys);

    const handleNewJourney = (data: any) => {
        const newJourney: JourneyData = {
            id: String(Date.now()),
            title: data.title,
            story: data.story,
            location: data.location,
            date: data.date,
            rating: data.rating,
            imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
            author: data.author,
        };
        setJourneys((prev) => [newJourney, ...prev]);
    };

    return (
        <div className="min-h-[100dvh]">
            <JourneyHero onShareClick={() => setIsModalOpen(true)} />

            <div className="container px-6 md:px-8 -mt-6 relative z-20 max-w-3xl mx-auto">
                <div className="flex justify-center gap-8 md:gap-16 py-5 px-6 rounded-xl bg-card/80 backdrop-blur-sm border border-white/10 shadow-lg">
                    <div className="text-center">
                        <p className="!text-2xl md:!text-3xl font-black text-primary !leading-none">{journeys.length}</p>
                        <p className="!text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">Stories</p>
                    </div>
                    <div className="w-px bg-white/15" />
                    <div className="text-center">
                        <p className="!text-2xl md:!text-3xl font-black text-secondary !leading-none">12+</p>
                        <p className="!text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">Destinations</p>
                    </div>
                    <div className="w-px bg-white/15" />
                    <div className="text-center">
                        <p className="!text-2xl md:!text-3xl font-black text-accent !leading-none">50+</p>
                        <p className="!text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">Travelers</p>
                    </div>
                </div>
            </div>

            <AnimatedSection animation="fade" delay={0.1}>
                <section className="pt-14 pb-16 md:pt-20 md:pb-24">
                    <div className="container px-6 md:px-8">
                        <div className="text-center mb-10 md:mb-14">
                            <div className="inline-flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-amber-400" strokeWidth={1.75} />
                                <span className="!text-xs font-bold text-amber-400 uppercase tracking-widest">Community Stories</span>
                                <Sparkles className="w-4 h-4 text-amber-400" strokeWidth={1.75} />
                            </div>
                            <h2 className="!text-3xl sm:!text-4xl md:!text-5xl font-black font-headline tracking-tight mb-3 text-foreground">
                                Traveler <span className="text-gradient">Experiences</span>
                            </h2>
                            <p className="!text-sm md:!text-base text-muted-foreground max-w-xl mx-auto">
                                Real stories from real travelers. Get inspired for your next Himachal adventure.
                            </p>
                        </div>

                        <JourneyGrid journeys={journeys} />
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection animation="fade" delay={0.1}>
                <section className="py-14 md:py-24 bg-mesh text-white text-center rounded-t-[2rem] md:rounded-t-[4rem] mx-4 md:mx-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20" />
                    <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">
                        <h2 className="!text-3xl sm:!text-4xl md:!text-5xl font-black font-headline mb-4 tracking-tight">
                            YOUR STORY MATTERS
                        </h2>
                        <p className="!text-sm md:!text-base mb-8 opacity-80 max-w-xl mx-auto font-bold uppercase tracking-wider leading-relaxed">
                            Every mountain has a story. Every road has a memory. Share yours.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="h-12 md:h-16 px-8 md:px-12 !text-base md:!text-xl font-black rounded-xl md:rounded-2xl bg-white text-primary hover:bg-black hover:text-white transition-all duration-200 shadow-xl hover:scale-105 active:scale-95"
                        >
                            WRITE YOUR STORY
                        </button>
                    </div>
                </section>
            </AnimatedSection>

            <ShareJourneyModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSuccess={handleNewJourney}
            />
        </div>
    );
}
