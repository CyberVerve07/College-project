'use client';

import Link from 'next/link';
import { Mountain, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { useEffect, useState } from 'react';

/**
 * Global Footer component.
 * Displays site navigation, fleet information, contact details, and copyright.
 * Uses client-side state for the current year.
 */
export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-foreground text-background border-t border-primary/20 rounded-t-[2rem] md:rounded-t-[3rem] mt-10 md:mt-20 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div className="container py-12 md:py-24 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="font-extrabold text-3xl tracking-tighter">
              Destiny <span className="text-primary italic">Tour</span> & Travels
            </span>
          </Link>
          <p className="text-lg opacity-60 font-medium leading-relaxed">
            Mission: To provide unforgettable journeys with 100% customer satisfaction. We are available 24/7 to make your trip flawless.
          </p>
        </div>

        <div>
          <h3 className="font-black text-xl uppercase tracking-widest mb-8 text-secondary">Navigate</h3>
          <ul className="space-y-4">
            {[
              { id: 'home', label: 'Home' },
              { id: 'destinations', label: 'Destinations' },
              { id: 'services', label: 'Services (24x7)' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <li key={item.id}>
                <Link href={`/${item.id}`} className="hover:text-primary transition-all hover:pl-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-black text-xl uppercase tracking-widest mb-8 text-secondary">Our Fleet</h3>
          <ul className="space-y-4">
            {[
              { name: 'Innova Crysta', type: 'Premium SUV' },
              { name: 'Force Traveller', type: 'Group Travel' },
              { name: 'Maruti Dzire', type: 'Comfort Sedan' },
              { name: 'Mahindra Scorpio', type: 'Rugged SUV' },
              { name: 'Tata Sumo', type: 'Budget 4x4' }
            ].map((car) => (
              <li key={car.name} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all">
                <div className="bg-white/10 p-2 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <div className="w-1.5 h-1.5 bg-current rounded-full" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-wide group-hover:text-primary transition-colors">{car.name}</p>
                  <p className="text-xs opacity-40 uppercase tracking-wider">{car.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-black text-xl uppercase tracking-widest mb-8 text-primary">Base Camp</h3>
          <address className="not-italic space-y-6">
            <p className="text-lg opacity-60">Dharamshala, <br />Himachal Pradesh, India</p>
            <div className="flex flex-col gap-4">
              <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} className="flex items-center gap-3 hover:text-green-500 p-3 bg-white/5 rounded-2xl transition-all group">
                <WhatsAppIcon className="w-5 h-5 text-green-500" />
                <span className="font-bold">WhatsApp Us</span>
              </a>
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 hover:text-secondary p-3 bg-white/5 rounded-2xl transition-all">
                <Phone className="w-5 h-5 text-secondary" strokeWidth={2.5} />
                <span className="font-bold">{siteConfig.contact.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 hover:text-accent p-3 bg-white/5 rounded-2xl transition-all">
                <Mail className="w-5 h-5 text-accent" strokeWidth={2.5} />
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
