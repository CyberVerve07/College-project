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
    <footer className="relative bg-[#050b1a] text-white border-t border-white/5 rounded-t-[2.5rem] md:rounded-t-[4rem] mt-16 pt-12 pb-8 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      {/* Mountain Silhouette Background - Optimized Opacity */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none opacity-[0.02] select-none z-0">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto translate-y-20 scale-110" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,138.7C960,160,1056,224,1152,218.7C1248,213,1344,139,1392,101.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start">
        {/* Brand Section */}
        <div className="flex flex-col">
          <Link href="/" className="inline-block mb-3">
            <h2 className="font-headline font-black text-3xl tracking-tighter">
              Destiny <span className="text-primary italic">Tour</span>
              <span className="block text-xl font-bold opacity-80 mt-[-4px]">& Travels</span>
            </h2>
          </Link>
          <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[240px] mb-6">
            Crafting unforgettable Himalayan memories with luxury, comfort, and local heart. Available 24/7 for your perfect escape.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: InstagramIcon, label: 'Instagram' },
              { icon: FacebookIcon, label: 'Facebook' },
              { icon: WhatsAppIcon, label: 'WhatsApp' }
            ].map((social, i) => (
              <Link key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 border border-white/5">
                <social.icon className="w-4.5 h-4.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-6 text-primary/90">Quick Portal</h3>
          <ul className="grid grid-cols-1 gap-3.5">
            {[
              { id: 'home', label: 'Home' },
              { id: 'destinations', label: 'Destinations' },
              { id: 'services', label: 'Premium Fleet' },
              { id: 'about', label: 'Our Story' },
              { id: 'contact', label: 'Get in Touch' }
            ].map((item) => (
              <li key={item.id}>
                <Link href={`/${item.id}`} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm font-medium">
                  <span className="w-1.5 h-[1.5px] bg-primary group-hover:w-3.5 transition-all duration-300 rounded-full" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Fleet Highlight */}
        <div className="flex flex-col">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-6 text-primary/90">Top Service</h3>
          <div className="space-y-4">
            {[
              { name: 'Innova Crysta', type: 'Luxury 7 Seater' },
              { name: 'Force Traveller', type: 'Group Mobility' },
              { name: 'Mahindra Thar', type: 'Off-road 4x4' }
            ].map((car) => (
              <div key={car.name} className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:shadow-primary/50 transition-all" />
                <div>
                  <p className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors leading-tight">{car.name}</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">{car.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="flex flex-col">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-6 text-primary/90">Support Center</h3>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-gray-400 text-[13px] font-medium leading-relaxed">
                Dharamshala, Himachal Pradesh<br />
                Kangra Valley, 176215
              </p>
            </div>
            <div className="space-y-2.5">
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white group">
                <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors border border-white/5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-[13px] tracking-tight">{siteConfig.contact.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white group">
                <div className="w-7 h-7 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors border border-white/5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-[13px] tracking-tight">{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Bar - Optimized into compact row */}
      <div className="container relative z-10 mt-12 pt-6 border-t border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-8">
          {[
            { icon: ShieldCheck, label: 'Secure Travels' },
            { icon: Award, label: 'Verified Agency' },
            { icon: Mountain, label: 'Himalayan Experts' },
            { icon: Clock, label: '24/7 Dispatch' }
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
              <badge.icon className="w-5 h-5 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-300">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mt-8 py-5 bg-black/40 border-t border-white/5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">
            &copy; {year} {siteConfig.name} &bull; Made with pride in Himachal
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
