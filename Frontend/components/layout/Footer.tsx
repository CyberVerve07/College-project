'use client';

import Link from 'next/link';
import { Mountain, Phone, Mail, Instagram, Facebook, ShieldCheck, Award, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/frontend/lib/config';
import WhatsAppIcon from '@/frontend/components/icons/WhatsAppIcon';
import InstagramIcon from '@/frontend/components/icons/InstagramIcon';
import FacebookIcon from '@/frontend/components/icons/FacebookIcon';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Global Footer component.
 * Displays site navigation, fleet information, contact details, and copyright.
 * Uses client-side state for the current year.
 * Integrated with siteConfig for centralized contact info.
 */
export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-[#050b1a] text-white border-t border-white/5 rounded-t-[3rem] md:rounded-t-[5rem] mt-20 pt-20 pb-10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      {/* Mountain Silhouette Background */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none z-0">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto translate-y-20 scale-110" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,138.7C960,160,1056,224,1152,218.7C1248,213,1344,139,1392,101.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
        {/* Brand Section */}
        <div className="flex flex-col gap-8">
          <Link href="/" className="inline-block group">
            <span className="font-headline font-black text-4xl tracking-tighter block mb-1">
              Destiny <span className="text-blue-500 italic">Tour</span>
            </span>
            <span className="font-headline text-2xl font-bold opacity-80">& Travels</span>
          </Link>
          <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-xs">
            Crafting unforgettable Himalayan memories with luxury, comfort, and local heart. Available 24/7 for your perfect escape.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/10">
              <InstagramIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/10">
              <FacebookIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/10">
              <WhatsAppIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-headline font-black text-xs uppercase tracking-[0.3em] mb-10 text-blue-500">Quick Portal</h3>
          <ul className="grid grid-cols-1 gap-5">
            {[
              { id: 'home', label: 'Home' },
              { id: 'destinations', label: 'Destinations' },
              { id: 'services', label: 'Premium Fleet' },
              { id: 'about', label: 'Our Story' },
              { id: 'contact', label: 'Get in Touch' }
            ].map((item) => (
              <li key={item.id}>
                <Link href={`/${item.id}`} className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1.5 h-[1px] bg-blue-500/50 group-hover:w-4 transition-all duration-300" />
                  <span className="font-bold text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Fleet Highlight */}
        <div>
          <h3 className="font-headline font-black text-xs uppercase tracking-[0.3em] mb-10 text-blue-500">Top Service Fleet</h3>
          <div className="space-y-6">
            {[
              { name: 'Innova Crysta', type: 'Luxury 7 Seater' },
              { name: 'Force Traveller', type: 'Group Mobility' },
              { name: 'Mahindra Thar', type: 'Off-road 4x4' }
            ].map((car) => (
              <div key={car.name} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <div>
                  <p className="font-bold text-sm mb-1">{car.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{car.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-headline font-black text-xs uppercase tracking-[0.3em] mb-10 text-blue-500">Base Camp Support</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Dharamshala, Himachal Pradesh<br />
                Headquarters: District Kangra, 176215
              </p>
            </div>
            <div className="space-y-3">
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-4 text-gray-400 hover:text-white group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm tracking-tight">{siteConfig.contact.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-4 text-gray-400 hover:text-white group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm tracking-tight">{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="container mt-20 pt-10 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Travels</span>
          </div>
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
            <Award className="w-8 h-8" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified Agency</span>
          </div>
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
            <Mountain className="w-8 h-8" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Mountain Specialists</span>
          </div>
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
            <Clock className="w-8 h-8" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">24/7 Dispatch</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mt-20 py-8 bg-black/40 border-t border-white/5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
            &copy; {year} {siteConfig.name} &bull; Destination Specialists
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
