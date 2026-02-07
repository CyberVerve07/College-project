'use client';

import Link from 'next/link';
import { Menu, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

/**
 * Navigation links configuration.
 * Used for both desktop navigation and mobile sheet menu.
 */
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services', label: 'Services' },
  { href: '/planner', label: 'AI Planner' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Global Header component.
 * Features:
 * - Responsive navigation (Desktop list / Mobile sheet)
 * - Sticky positioning with backdrop blur
 * - Active link highlighting
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 rounded-b-3xl shadow-2xl">
      <div className="container flex h-24 items-center px-6 md:px-10">
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="font-extrabold text-4xl tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Destiny <span className="text-primary italic">Tour</span> & Travels
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-all hover:text-primary relative py-2 group",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
          <Button asChild className="rounded-2xl px-8 h-12 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 font-bold">
            <a href={`tel:${siteConfig.contact.phone}`}>Book a Cab</a>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-2xl border-l-primary/20">
              <nav className="grid gap-8 text-lg font-medium pt-12">
                <Link
                  href="/"
                  className="flex items-center gap-3 text-3xl font-black font-headline tracking-tighter text-primary"
                >
                  <Mountain className="h-10 w-10 p-2 bg-primary text-white rounded-xl shadow-lg" />
                  <span>{siteConfig.name}</span>
                </Link>
                <div className="h-px bg-primary/20 w-full my-4" />
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-xl font-bold uppercase tracking-[0.2em] transition-all hover:pl-6 hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground/60'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-8 rounded-2xl h-16 text-xl font-black bg-primary">
                  <a href={`tel:${siteConfig.contact.phone}`}>Call Us Now</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
