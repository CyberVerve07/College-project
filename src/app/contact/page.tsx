
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import ContactForm from './ContactForm';
import { siteConfig } from '@/lib/config';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" /> 24/7 Support Available
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 drop-shadow-sm">
            Get in Touch
            <br />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary-foreground font-semibold text-sm border border-secondary/20 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> All Himachal Services Available
            </div>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
            Ready for your Himalayan adventure?
            <br />
            <span className="text-foreground font-bold">For the best and lowest prices</span>, contact us directly!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Contact Info Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 space-y-10 relative overflow-hidden group hover:shadow-primary/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <h2 className="text-3xl font-bold font-headline mb-2">Contact Information</h2>
              <p className="text-muted-foreground">Reach out to us through any of these channels.</p>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Base Camp</h3>
                  <p className="text-muted-foreground leading-relaxed">Main Bazaar, Kangra,<br />Himachal Pradesh, 176001, India</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground mb-1">For instant booking & best rates:</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-xl font-bold text-green-600 hover:underline">{siteConfig.contact.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground mb-1">For customized itineraries:</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-lg font-medium hover:text-orange-500 transition-colors">{siteConfig.contact.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <WhatsAppIcon className="w-7 h-7 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground mb-1">Chat for live updates & photos:</p>
                  <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all hover:-translate-y-1">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
            <h2 className="text-3xl font-bold font-headline mb-8">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
