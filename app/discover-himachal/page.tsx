'use client';

import { motion } from 'framer-motion';

import Image from 'next/image';
import { Button } from '@/frontend/components/ui/button';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles, Utensils, Mountain, Quote, CloudSun, Languages, Wheat, Tent, Wind, Waves, Compass, Camera, Map as MapIcon, PartyPopper } from 'lucide-react';
import { Card, CardContent } from "@/frontend/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/frontend/components/ui/dialog";
import { Clock, Info, Calendar } from 'lucide-react';

const facts = [
    {
        title: "Land of Gods",
        description: "Himachal is known as 'Dev Bhoomi' due to its mention in ancient Hindu texts and abundance of temples.",
        icon: <Sparkles className="h-6 w-6 text-cyan-400" />
    },
    {
        title: "Fruit Bowl of India",
        description: "It is the second largest apple producer in the country, earning it the nickname 'Apple State'.",
        icon: <div className="text-red-500 font-bold text-xl">🍎</div>
    },
    {
        title: "Eco-Friendly State",
        description: "Himachal Pradesh was the first state in India to ban the production, storage, and use of plastic bags.",
        icon: <div className="text-cyan-400 font-bold text-xl">♻️</div>
    },
    {
        title: "World's Highest Post Office",
        description: "Hikkim, a village in Spiti Valley, houses the world's highest post office at 14,400 ft.",
        icon: <div className="text-primary font-bold text-xl">📮</div>
    }
];

const temples = [
    {
        name: "Hadimba Devi Temple",
        location: "Manali",
        description: "An ancient cave temple dedicated to Hidimbi Devi, built in 1553 with a unique pagoda-style roof.",
        image: "https://www.tourmyholiday.com/pdf/1696233741hidimba-devi-temple1.png",
        bestTime: "March to June",
        entryFee: "Free",
        timings: "8:00 AM - 6:00 PM"
    },
    {
        name: "Jakhu Temple",
        location: "Shimla",
        description: "Dedicated to Lord Hanuman, this temple sits on the highest peak of Shimla and features a giant 108-foot statue.",
        image: "https://i0.wp.com/himtimes.com/wp-content/uploads/2023/01/Jakhu-temple-Unique-history-first-choice-tourists-2.jpg?resize=696%2C434&ssl=1",
        bestTime: "Throughout the year",
        entryFee: "Free",
        timings: "5:00 AM - 9:00 PM"
    },
    {
        name: "Baijnath Temple",
        location: "Kangra",
        description: "A 13th-century Shiva temple known for its exquisite Nagara style architecture and peaceful aura.",
        image: "https://akm-img-a-in.tosshub.com/sites/indiacontent/0/images/product/public/03042019/00/01/55/42/90/29/29/91/1554290292991/659-a-view-of-the-ancient-shiva-temple-in-image-88005500_20190403_020.jpg",
        bestTime: "September to June",
        entryFee: "Free",
        timings: "6:00 AM - 8:00 PM"
    },
    {
        name: "Masroor Rock Cut Temple",
        location: "Kangra",
        description: "Known as the Himalayan Pyramid, a complex of monolith rock-cut temples dating back to the 8th century.",
        image: "https://himalayasdigital.com/wp-content/uploads/2024/06/Masroor-Rock-Cut-Temple-Kangra.jpg",
        bestTime: "October to March",
        entryFee: "INR 25 (Indians), INR 300 (Foreigners)",
        timings: "9:00 AM - 5:00 PM"
    },
    {
        name: "Jwala Ji Temple",
        location: "Kangra",
        description: "A unique temple with no idol, where eternal flames (Jyotis) have been burning naturally for centuries.",
        image: "https://jawalaji.in/wp-content/uploads/2015/09/jwaladevi-Jwala-ji-slide7.jpg",
        bestTime: "Anytime",
        entryFee: "Free",
        timings: "5:00 AM - 10:00 PM"
    },
    {
        name: "Chamunda Devi",
        location: "Dharamshala",
        description: "A powerful shrine dedicated to Goddess Chamunda, situated on the banks of the Baner River with Dhauladhar views.",
        image: "https://www.himalayanadrenaline.com/wp-content/uploads/2024/07/Chamunda-Devi-Temple.webp",
        bestTime: "April to October",
        entryFee: "Free",
        timings: "6:00 AM - 8:00 PM"
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
        icon: <Wheat className="h-4 w-4 text-primary" />,
        content: "Himachal is famous for its apples, especially in Shimla and Kinnaur. It also produces large quantities of maize, wheat, and wool.",
        color: "bg-primary/10 text-primary"
    },
    {
        category: "Languages",
        title: "Pahari Dialects",
        icon: <Languages className="h-4 w-4 text-blue-500" />,
        content: "While Hindi is the official language, locals speak various Pahari dialects like Kangri, Mandyali, Kulluvi, and Chambeali.",
        color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
    },
    {
        category: "Art & Crafts",
        title: "Pahari Paintings",
        icon: <Camera className="h-4 w-4 text-cyan-500" />,
        content: "Famous for Kangra and Basholi styles of miniature paintings, intricate wood carvings, and beautiful Himachali shawls.",
        color: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300"
    }
];

const regions = [
    {
        name: "Kullu & Manali",
        title: "Valley of Gods",
        desc: "Famous for its lush green mountains, apple orchards, and the vibrant Beas river.",
        image: "https://www.tourmyholiday.com/pdf/1696233741hidimba-devi-temple1.png",
        highlights: ["Rohtang Pass", "Solang Valley", "Hadimba Temple"]
    },
    {
        name: "Kangra Valley",
        title: "Seat of Heritage",
        desc: "Known for ancient temples, sprawling tea gardens, and the majestic Dhauladhar ranges.",
        image: "https://himalayasdigital.com/wp-content/uploads/2024/06/Masroor-Rock-Cut-Temple-Kangra.jpg",
        highlights: ["Dharamshala", "McLeod Ganj", "Kangra Fort"]
    },
    {
        name: "Spiti Valley",
        title: "The Middle Land",
        desc: "A cold desert mountain valley located high in the Himalayas, known for its surreal landscapes.",
        image: "https://www.holidify.com/images/bgImages/SPITI.jpg",
        highlights: ["Key Monastery", "Chandratal Lake", "Kaza"]
    },
    {
        name: "Kinnaur",
        title: "Land of Fairytales",
        desc: "Renowned for its delicious apples, gorgeous terrain, and thrilling, dangerous roads.",
        image: "https://tse4.mm.bing.net/th/id/OIP.Tl2Hz_QleoEqK4VQHEx2GAHaE6?rs=1&pid=ImgDetMain&o=7&rm=3",
        highlights: ["Kalpa", "Sangla Valley", "Chitkul"]
    }
];

const adventures = [
    {
        title: "Trekking",
        location: "Across Himachal",
        desc: "From moderate trails in Triund to challenging passes like Pin Parvati.",
        icon: <Mountain className="w-8 h-8" />,
        color: "bg-emerald-500/10 text-emerald-500",
        hoverBorder: "hover:border-emerald-500/50"
    },
    {
        title: "Paragliding",
        location: "Bir Billing",
        desc: "Soar high in the second highest paragliding site in the world.",
        icon: <Wind className="w-8 h-8" />,
        color: "bg-cyan-500/10 text-cyan-500",
        hoverBorder: "hover:border-cyan-500/50"
    },
    {
        title: "River Rafting",
        location: "Kullu",
        desc: "Battle the rapids of the mighty Beas, Sutlej, and Ravi rivers.",
        icon: <Waves className="w-8 h-8" />,
        color: "bg-blue-500/10 text-blue-500",
        hoverBorder: "hover:border-blue-500/50"
    },
    {
        title: "Camping",
        location: "Spiti & Lahaul",
        desc: "Sleep under a blanket of stars in the pristine Himalayan valleys.",
        icon: <Tent className="w-8 h-8" />,
        color: "bg-orange-500/10 text-orange-500",
        hoverBorder: "hover:border-orange-500/50"
    }
];

const festivals = [
    {
        name: "Kullu Dussehra",
        time: "October",
        desc: "A grand deeply religious week-long festival attracting thousands of deities from nearby villages.",
        image: "https://tse3.mm.bing.net/th/id/OIP.R__wY-umzSvpSqb-3WqiWQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        name: "Minjar Fair",
        time: "July / August",
        desc: "Celebrated in Chamba to offer thanks to deities for the good yield of maize crops.",
        image: "https://www.tourmyindia.com/socialimg/minjar-mela-himachal.jpg"
    },
    {
        name: "Losar Festival",
        time: "February / March",
        desc: "The Tibetan New Year, celebrated with great enthusiasm and vibrant mask dances in Lahaul, Spiti, and Kinnaur.",
        image: "https://tse4.mm.bing.net/th/id/OIP.1uygjzH_G1JsO-j_cUzchQHaE8?w=768&h=512&rs=1&pid=ImgDetMain&o=7&rm=3"
    }
];

export default function DiscoverHimachal() {
    return (
        <div className="min-h-screen overflow-hidden font-sans pt-20">



            {/* --- INTERESTING FACTS --- */}
            <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4">Did You Know? <span className="text-primary">.</span></h2>
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
                                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                            >
                                <div className="mb-4 bg-background w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    {fact.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{fact.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{fact.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CULTURE & INSIGHTS --- */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Tradition & Nature</span>
                        <h2 className="text-4xl md:text-6xl font-bold mt-2 font-headline">Culture & Climate</h2>
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

                </div>
            </section>

            {/* --- REGIONS OF HIMACHAL --- */}
            <section className="py-24 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Explore Landscapes</span>
                        <h2 className="text-4xl md:text-6xl font-bold mt-2 font-headline">Majestic Regions</h2>
                        <div className="w-24 h-1 bg-primary/50 mx-auto mt-6 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {regions.map((region, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-background rounded-[2rem] overflow-hidden border border-border/50 flex flex-col sm:flex-row hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden">
                                    <Image
                                        src={region.image}
                                        alt={region.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                </div>
                                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                                    <div className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
                                        {region.title}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 font-headline group-hover:text-primary transition-colors">{region.name}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                        {region.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {region.highlights.map((highlight, idx) => (
                                            <span key={idx} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ADVENTURE & THRILLS --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Adrenaline Rush</span>
                            <h2 className="text-4xl md:text-6xl font-bold mt-2 font-headline">Adventure & Thrills</h2>
                        </div>
                        <Compass className="h-12 w-12 text-muted-foreground/20 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {adventures.map((adv, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={`bg-background border border-border/50 p-8 rounded-[2rem] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-pointer ${adv.hoverBorder}`}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform ${adv.color}`}>
                                    {adv.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{adv.title}</h3>
                                <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                                    <MapPin className="w-3 h-3" /> {adv.location}
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {adv.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- DIVINE DESTINATIONS (TEMPLES) --- */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Spiritual Journey</span>
                            <h2 className="text-4xl md:text-6xl font-bold mt-2 font-headline">Divine Destinations</h2>
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
                                        className="object-cover"
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

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 hover:text-primary group/btn">
                                                View Details <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] md:max-w-2xl overflow-hidden p-0 rounded-3xl">
                                            <div className="relative h-64 w-full">
                                                <Image
                                                    src={temple.image}
                                                    alt={temple.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                                <div className="absolute bottom-6 left-6 text-white">
                                                    <DialogTitle className="text-3xl font-bold font-headline mb-2 text-white">{temple.name}</DialogTitle>
                                                    <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                                                        <MapPin className="h-4 w-4" /> {temple.location}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 md:p-8 space-y-6">
                                                <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                                                    {temple.description}
                                                </DialogDescription>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                                                            <Clock className="h-4 w-4" /> Timings
                                                        </div>
                                                        <p className="text-sm font-medium">{temple.timings}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                                                            <Calendar className="h-4 w-4" /> Best Time
                                                        </div>
                                                        <p className="text-sm font-medium">{temple.bestTime}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide">
                                                            <Info className="h-4 w-4" /> Entry Fee
                                                        </div>
                                                        <p className="text-sm font-medium">{temple.entryFee}</p>
                                                    </div>
                                                </div>

                                                <Button className="w-full rounded-xl h-12 text-lg font-bold" asChild>
                                                    <Link href="/contact">Book a Trip Here</Link>
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
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
                            <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4">A Taste of <span className="text-primary">Mountains</span></h2>
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
                                    className="object-cover"
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

            {/* --- VIBRANT FESTIVALS --- */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm">Living Traditions</span>
                            <h2 className="text-4xl md:text-6xl font-bold mt-2 font-headline">Vibrant Festivals</h2>
                        </div>
                        <PartyPopper className="h-12 w-12 text-white/10 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {festivals.map((fest, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="group relative rounded-[2rem] overflow-hidden bg-slate-800/50 border border-white/10"
                            >
                                <div className="relative h-64 w-full">
                                    <Image
                                        src={fest.image}
                                        alt={fest.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                                        {fest.time}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{fest.name}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {fest.desc}
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
