'use client';

import Link from 'next/link';
import { Menu, Mountain } from 'lucide-react';
import { Button } from '@/frontend/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/frontend/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/frontend/lib/utils';
import { siteConfig } from '@/frontend/lib/config';
import { ModeToggle } from '@/frontend/components/ui/mode-toggle';
const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/discover-himachal', label: 'Discover' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/planner', label: 'AI Planner' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Global Header component.
 * Features:
 * - Responsive navigation (Desktop vs Mobile Sheet)
 * - Dynamic active state styling
 * - "Book Cab" CTA linking to WhatsApp
 * - Theme toggle integration
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-xl transition-all duration-300 shadow-xl">
      <div className="container flex h-20 items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center space-x-3 group">
          <span className="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight text-white drop-shadow-lg">
            Destiny <span className="text-primary italic font-black">Tour</span> & Travels
          </span>
        </Link>
        <nav className="hidden lg:flex gap-6 xl:gap-8 items-center">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-wide transition-all hover:text-white relative py-2 group",
                pathname === link.href ? "text-white drop-shadow-md font-semibold" : "text-white/80"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-pink-500 transition-all duration-300",
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}


          <div className="flex gap-4">
            <Button asChild className="rounded-xl px-6 h-10 bg-gradient-to-r from-primary via-cyan-600 to-teal-500 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 font-bold text-sm glow-on-hover">
              <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">Book Cab</a>
            </Button>
          </div>
          <ModeToggle />
        </nav>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Menu className="h-8 w-8 text-white" strokeWidth={1.5} />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-2xl border-l-primary/20">
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile Navigation Menu</SheetTitle>
                <SheetDescription>
                  Access site navigation links and settings.
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-8 text-lg font-medium pt-12">
                <Link
                  href="/"
                  className="flex items-center gap-3 text-3xl font-black font-headline tracking-tighter text-primary"
                >
                  <Mountain className="h-10 w-10 p-2 bg-primary text-white rounded-xl shadow-lg" strokeWidth={1.5} />
                  <span>{siteConfig.name}</span>
                </Link>
                <div className="h-px bg-primary/20 w-full my-4" />
                {mainNavLinks.map((link) => (
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

              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header >
  );
}
// Force recompile to clear hydration cache
