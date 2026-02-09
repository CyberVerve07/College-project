'use client';

import Link from 'next/link';
import { Menu, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { ModeToggle } from '@/components/ui/mode-toggle';

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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-xl transition-all duration-300 shadow-xl">
      <div className="container flex h-20 items-center px-6 md:px-10">
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="font-extrabold text-3xl tracking-tight text-white drop-shadow-lg">
            Destiny <span className="text-primary italic font-black">Tour</span> & Travels
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold uppercase tracking-wider transition-all hover:text-primary relative py-2 group",
                pathname === link.href ? "text-primary" : "text-white/85"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-pink-500 transition-all duration-300",
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
          <Button asChild className="rounded-xl px-8 h-11 bg-gradient-to-r from-primary via-purple-600 to-pink-600 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 active:scale-95 font-bold text-sm glow-on-hover">
            <a href={`tel:${siteConfig.contact.phone}`}>Book a Cab</a>
          </Button>
          <ModeToggle />
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
                <div className="mt-4 flex justify-center">
                  <ModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header >
  );
}
