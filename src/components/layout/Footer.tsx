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
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg font-headline text-foreground">
              {siteConfig.name}
            </span>
          </Link>
          <p className="text-sm">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Taxi Service</li>
            <li>Innova</li>
            <li>Tempo Traveller</li>
            <li>Alto</li>
            <li>Sumo</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
          <address className="not-italic space-y-2 text-sm">
            <p>Kangra, Himachal Pradesh, India</p>
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>{siteConfig.contact.email}</span>
            </a>
            <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </address>
        </div>
      </div>
      <div className="bg-muted/50 py-4">
        <div className="container text-center text-sm">
          <p>&copy; {year} {siteConfig.name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
