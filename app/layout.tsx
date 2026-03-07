import type { Metadata, Viewport } from 'next';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/frontend/components/ui/toaster';
import Header from '@/frontend/components/layout/Header';
import Footer from '@/frontend/components/layout/Footer';
import { FirebaseClientProvider } from '@/backend/firebase/client-provider';
import { siteConfig } from '@/frontend/lib/config';
import { cn } from '@/frontend/lib/utils';
import { ColorSplash } from '@/animation/color-splash';
import { ThemeProvider } from "@/frontend/components/theme-provider"


export const metadata: Metadata = {
  title: `${siteConfig.name} - Your Gateway to Himachal`,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

import ErrorBoundary from '@/frontend/components/error-boundary';

/**
 * Root Layout component.
 * Wraps the entire application with:
 * - Font configurations (PT Sans, Playfair Display)
 * - Global providers (Firebase, ErrorBoundary, ThemeProvider)
 * - Global UI components (Header, Footer, Toaster)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'scroll-smooth',
        ptSans.variable,
        playfairDisplay.variable
      )}
    >
      <body className="font-body antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FirebaseClientProvider>
              <ColorSplash />
              <Header />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </FirebaseClientProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
