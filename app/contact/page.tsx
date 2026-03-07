
import { Mail, Phone, MapPin, Sparkles, Send, ArrowRight } from 'lucide-react';
import ContactForm from './ContactForm';
import { siteConfig } from '@/frontend/lib/config';
import WhatsAppIcon from '@/frontend/components/icons/WhatsAppIcon';
import FloatingButtons from '@/frontend/components/layout/FloatingButtons';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-background">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center mb-20 space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-4 border border-primary/20 backdrop-blur-md shadow-lg shadow-primary/5 animate-fade-in-up">
            <Sparkles className="w-4 h-4" /> 24/7 Premium Support
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-secondary drop-shadow-2xl animate-fade-in-up delay-100 pb-2">
            Get in Touch
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed animate-fade-in-up delay-200">
            Customize your Himalayan adventure today.
            <br />
            <span className="text-foreground font-semibold">Best rates guaranteed for direct bookings.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto items-stretch">
          {/* Contact Info Card */}
          <div className="relative group perspective-1000 animate-fade-in-left delay-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-teal-400 to-secondary rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative h-full bg-card/50 dark:bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 dark:border-white/5 flex flex-col overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <MapPin className="w-64 h-64 text-primary" />
              </div>

              <div className="relative z-10 mb-12">
                <h2 className="text-4xl font-bold font-headline mb-4">Contact Information</h2>
                <p className="text-lg text-muted-foreground">We're always ready to help you plan.</p>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-10 relative z-10">
                <div className="flex items-start gap-8 group/item">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-500 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                    <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-xl">Our Base Camp</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">Main Bazaar, Kangra,<br />Himachal Pradesh, 176001</p>
                  </div>
                </div>

                <div className="flex items-start gap-8 group/item">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-500 border border-green-500/20 shadow-lg shadow-green-500/5">
                    <Phone className="w-8 h-8 text-green-600 dark:text-green-400" strokeWidth={2} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-xl">Call Us (24/7)</h3>
                    <p className="text-muted-foreground">Instant booking & inquiries:</p>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-2xl font-black text-green-600 dark:text-green-400 hover:text-green-700 transition-colors block mt-1 tracking-tight">{siteConfig.contact.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-8 group/item">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-500 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                    <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" strokeWidth={2} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-xl">Email Us</h3>
                    <p className="text-muted-foreground">For detailed itineraries:</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-xl font-medium hover:text-primary transition-colors block mt-1 break-all">{siteConfig.contact.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-8 group/item pt-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                    <WhatsAppIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl">WhatsApp</h3>
                    <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-2xl font-bold shadow-xl shadow-emerald-500/20 hover:bg-[#1fb355] transition-all hover:-translate-y-1 hover:shadow-2xl">
                      Chat Now <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="relative group perspective-1000 animate-fade-in-right delay-300">
            <div className="absolute -inset-1 bg-gradient-to-l from-primary via-teal-400 to-secondary rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative h-full bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col">
              <div className="mb-10">
                <h2 className="text-4xl font-bold font-headline mb-3">Send a Message</h2>
                <p className="text-lg text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              <div className="flex-1">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp + Phone buttons - Only on Contact page */}
      <FloatingButtons />
    </div>
  );
}
