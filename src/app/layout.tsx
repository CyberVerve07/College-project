import type { Metadata } from 'next';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { ColorSplash } from '@/components/ui/color-splash';

export const metadata: Metadata = {
  title: `${siteConfig.name} - Your Gateway to Himachal`,
  description: siteConfig.description,
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

import ErrorBoundary from '@/components/error-boundary';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'scroll-smooth',
        ptSans.variable,
        playfairDisplay.variable
      )}
    >
      <body className="font-body antialiased">
        <ErrorBoundary>
          <FirebaseClientProvider>
            <ColorSplash />
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingButtons />
            <Toaster />
          </FirebaseClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
