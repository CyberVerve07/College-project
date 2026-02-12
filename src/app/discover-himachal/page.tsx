'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles, Utensils, Mountain, Quote, CloudSun, Languages, Wheat } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const facts = [
    {
        title: "Land of Gods",
        description: "Himachal is known as 'Dev Bhoomi' due to its mention in ancient Hindu texts and abundance of temples.",
        icon: <Sparkles className="h-6 w-6 text-yellow-400" />
    },
    {
        title: "Fruit Bowl of India",
        description: "It is the second largest apple producer in the country, earning it the nickname 'Apple State'.",
        icon: <div className="text-red-500 font-bold text-xl">🍎</div>
    },
    {
        title: "Eco-Friendly State",
        description: "Himachal Pradesh was the first state in India to ban the production, storage, and use of plastic bags.",
        icon: <div className="text-green-500 font-bold text-xl">♻️</div>
    },
    {
        title: "World's Highest Post Office",
        description: "Hikkim, a village in Spiti Valley, houses the world's highest post office at 14,400 ft.",
        icon: <div className="text-blue-500 font-bold text-xl">📮</div>
    }
];

const temples = [
    {
        name: "Hadimba Devi Temple",
        location: "Manali",
        description: "An ancient cave temple dedicated to Hidimbi Devi, built in 1553 with a unique pagoda-style roof.",
        image: "https://www.tourmyholiday.com/pdf/1696233741hidimba-devi-temple1.png"
    },
    {
        name: "Jakhu Temple",
        location: "Shimla",
        description: "Dedicated to Lord Hanuman, this temple sits on the highest peak of Shimla and features a giant 108-foot statue.",
        image: "https://i0.wp.com/himtimes.com/wp-content/uploads/2023/01/Jakhu-temple-Unique-history-first-choice-tourists-2.jpg?resize=696%2C434&ssl=1"
    },
    {
        name: "Baijnath Temple",
        location: "Kangra",
        description: "A 13th-century Shiva temple known for its exquisite Nagara style architecture and peaceful aura.",
        image: "https://akm-img-a-in.tosshub.com/sites/indiacontent/0/images/product/public/03042019/00/01/55/42/90/29/29/91/1554290292991/659-a-view-of-the-ancient-shiva-temple-in-image-88005500_20190403_020.jpg"
    },
    {
        name: "Masroor Rock Cut Temple",
        location: "Kangra",
        description: "Known as the Himalayan Pyramid, a complex of monolith rock-cut temples dating back to the 8th century.",
        image: "https://himalayasdigital.com/wp-content/uploads/2024/06/Masroor-Rock-Cut-Temple-Kangra.jpg"
    },
    {
        name: "Jwala Ji Temple",
        location: "Kangra",
        description: "A unique temple with no idol, where eternal flames (Jyotis) have been burning naturally for centuries.",
        image: "https://jawalaji.in/wp-content/uploads/2015/09/jwaladevi-Jwala-ji-slide7.jpg"
    },
    {
        name: "Chamunda Devi",
        location: "Dharamshala",
        description: "A powerful shrine dedicated to Goddess Chamunda, situated on the banks of the Baner River with Dhauladhar views.",
        image: "https://www.himalayanadrenaline.com/wp-content/uploads/2024/07/Chamunda-Devi-Temple.webp"
    }
];

const foods = [
    {
        name: "Dham",
        description: "A traditional festive meal served on leaf plates, featuring rice, madra, dal, and sweet rice.",
        image: "https://1.bp.blogspot.com/-D-X9GlhJ5e8/Xe_fcj5xBYI/AAAAAAAAExs/arnU2ntIKXY7NnHv1Sl2cxx8e05vGDYGwCNcBGAsYHQ/s1600/dham-photo.jpg"
    },
    {
        name: "Siddu",
        description: "A steamed bun made from wheat flour, stuffed with poppy seeds or walnuts, served with ghee.",
        image: "https://images.herzindagi.info/image/2023/Aug/Himachali-Siddu.jpg"
    },
    {
        name: "Madra",
        description: "A rich and creamy chickpea curry cooked in yogurt and spices, a staple of Himachali cuisine.",
        image: "https://img-global.cpcdn.com/recipes/f3c7294e2599cbf6/1502x1064cq70/himachali-madra-recipe-main-photo.jpg"
    },
    {
        name: "Pahadon wali Maggi",
        description: "The ultimate comfort food in the mountains, served hot with vegetables and chai.",
        image: "https://i.pinimg.com/736x/f5/4d/d5/f54dd51ea805e0ec3bb041c485d5f92a.jpg"
    }
];

const cultureInsights = [
    {
        category: "Production",
        title: "Apple State",
        icon: <Wheat className="h-4 w-4 text-amber-500" />,
        content: "Himachal is famous for its apples, especially in Shimla and Kinnaur. It also produces large quantities of maize, wheat, and wool.",
        color: "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
    },
    {
        category: "Languages",
        title: "Pahari Dialects",
        icon: <Languages className="h-4 w-4 text-blue-500" />,
        content: "While Hindi is the official language, locals speak various Pahari dialects like Kangri, Mandyali, Kulluvi, and Chambeali.",
        color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
    },
    {
        category: "Weather",
        title: "Diverse Climate",
        icon: <CloudSun className="h-4 w-4 text-cyan-500" />,
        content: "Varies from hot and sub-humid tropical in southern tracts to cold, alpine, and glacial in northern and eastern mountain ranges.",
        color: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300"
    }
];

const seasons = [
    { name: "Summer", months: "Apr - Jun", temp: "5°C to 24°C", desc: "Pleasant weather, perfect for sightseeing and trekking." },
    { name: "Monsoon", months: "Jul - Sep", temp: "15°C to 25°C", desc: "Lush greenery, but risk of landslides. Great for nature lovers." },
    { name: "Winter", months: "Nov - Mar", temp: "-5°C to 10°C", desc: "Snowfall in many areas. Ideal for skiing and snow activities." }
];

export default function DiscoverHimachal() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 300]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div ref={containerRef} className="min-h-screen bg-background overflow-hidden font-sans">

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://www.japjitravel.com/blog/wp-content/uploads/2015/07/Khajjair.jpg"
                        alt="Himalayan Peaks"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
                </motion.div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-white backdrop-blur-md text-sm font-medium tracking-wider mb-4">
                            DISCOVER THE UNSEEN
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl font-headline"
                    >
                        The Soul of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Himachal</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
                    >
                        Beyond the snow-capped peaks lies a land of ancient gods, vibrant culture, and flavors that warm the heart.
                    </motion.p>
                </div>
            </section>

            {/* --- INTERESTING FACTS --- */}
            <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">Did You Know? <span className="text-primary">.</span></h2>
                        <p className="text-muted-foreground text-lg max-w-xl">Fascinating insights about the land of snow that make it truly unique.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {facts.map((fact, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="p-6 rounded-3xl bg-secondary/30 border border-secondary hover:bg-secondary/50 transition-all duration-300 group cursor-pointer"
                            >
                                <div className="mb-4 bg-background w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    {fact.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{fact.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{fact.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CULTURE & INSIGHTS --- */}
            <section className="py-24 bg-gradient-to-b from-background to-slate-50 dark:to-slate-900/50 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Tradition & Nature</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 font-headline">Culture & Climate</h2>
                        <div className="w-24 h-1 bg-primary/50 mx-auto mt-6 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {cultureInsights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="relative group"
                            >
                                <div className={`absolute inset-0 bg-primary/5 rounded-[2rem] transform rotate-3 transition-transform group-hover:rotate-6`} />
                                <div className="relative bg-background border border-border p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all h-full">
                                    <div className={`w-fit px-3 py-1 rounded-full text-xs font-bold uppercase mb-6 ${item.color}`}>
                                        {item.category}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        {item.icon}
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Weather Widget Style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <CloudSun className="w-64 h-64" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-8">Seasonal Breakdown</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {seasons.map((season, idx) => (
                                    <div key={idx} className="space-y-2 border-l-2 border-white/20 pl-6">
                                        <h4 className="text-xl font-bold text-primary-foreground">{season.name}</h4>
                                        <span className="text-sm font-mono text-white/60 block">{season.months}</span>
                                        <div className="text-2xl font-bold">{season.temp}</div>
                                        <p className="text-sm text-white/80">{season.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- DIVINE DESTINATIONS (TEMPLES) --- */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Spiritual Journey</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-2 font-headline">Divine Destinations</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temples.map((temple, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-background rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 flex flex-col"
                            >
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={temple.image}
                                        alt={temple.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider mb-1">
                                            <MapPin className="h-3 w-3" /> {temple.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold mb-3 font-headline group-hover:text-primary transition-colors">{temple.name}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{temple.description}</p>
                                    <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 hover:text-primary group/btn">
                                        View Details <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CULINARY JOURNEY (FOOD) --- */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">A Taste of <span className="text-primary">Mountains</span></h2>
                            <p className="text-lg text-muted-foreground">Flavors derived from the crisp air and rich traditions.</p>
                        </div>
                        <Utensils className="h-12 w-12 text-muted-foreground/20 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {foods.map((food, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="relative overflow-hidden rounded-3xl h-[400px] group cursor-pointer"
                            >
                                <Image
                                    src={food.image}
                                    alt={food.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end text-white">
                                    <h3 className="text-3xl font-bold mb-2">{food.name}</h3>
                                    <p className="text-white/80 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        {food.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- QUOTE / FOOTER CTA --- */}
            <section className="py-32 bg-primary/5 relative overflow-hidden flex items-center justify-center text-center px-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <Quote className="h-12 w-12 text-primary/40 mx-auto" />
                    <h2 className="text-3xl md:text-4xl font-serif italic text-foreground/90 leading-tight">
                        "To travel is to discover that everyone is wrong about other countries."
                    </h2>
                    <div className="pt-8">
                        <Button size="lg" className="rounded-full text-lg px-8 h-14 bg-gradient-to-r from-primary to-purple-600 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300" asChild>
                            <Link href="/contact">Plan Your Trip Now</Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}
