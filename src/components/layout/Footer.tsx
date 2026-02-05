'use client';

import Link from 'next/link';
import { Mountain, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-foreground text-background border-t border-primary/20 rounded-t-[4rem] mt-20 overflow-hidden">
      <div className="container py-24 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
              <Mountain className="h-8 w-8 text-white" />
            </div>
            <span className="font-black text-3xl font-headline tracking-tighter">
              {siteConfig.name}
            </span>
          </Link>
          <p className="text-lg opacity-60 font-medium leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="font-black text-xl uppercase tracking-widest mb-8 text-secondary">Navigate</h3>
          <ul className="space-y-4">
            {['Home', 'Destinations', 'Services', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-all hover:pl-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-black text-xl uppercase tracking-widest mb-8 text-accent">Our Fleet</h3>
          <ul className="space-y-4 opacity-70">
            {['Innova Crysta', 'Force Traveller', 'Maruti Suzuki Dzire', 'Mahindra Scorpio', 'Tata Sumo Gold'].map((car) => (
              <li key={car} className="flex items-center gap-2 italic">
                <div className="w-4 h-px bg-white/20" />
                {car}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-black text-xl uppercase tracking-widest mb-8 text-primary">Base Camp</h3>
          <address className="not-italic space-y-6">
            <p className="text-lg opacity-60">Kangra Valley, <br />Himachal Pradesh, India</p>
            <div className="flex flex-col gap-4">
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 hover:text-secondary p-3 bg-white/5 rounded-2xl transition-all">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="font-bold">{siteConfig.contact.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 hover:text-accent p-3 bg-white/5 rounded-2xl transition-all">
                <Mail className="w-5 h-5 text-accent" />
                <span className="font-bold">Email Dispatch</span>
              </a>
            </div>
          </address>
        </div>
      </div>
      <div className="bg-black/20 py-8 border-t border-white/5">
        <div className="container text-center text-sm font-bold opacity-40 uppercase tracking-[0.3em]">
          <p>&copy; {year} {siteConfig.name} &bull; Built for the Mountains</p>
        </div>
      </div>
    </footer>
  );
}
