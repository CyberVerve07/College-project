import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import { siteConfig } from '@/lib/config';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Get in Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have questions or ready to book your trip? Contact us today. We're here to help you plan your perfect Himalayan adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-8 rounded-lg shadow-lg flex flex-col justify-center space-y-8">
            <h2 className="text-3xl font-bold font-headline text-card-foreground">Contact Information</h2>
            <address className="not-italic space-y-6 text-card-foreground/90">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-card-foreground">Our Address</h3>
                  <p>Main Bazaar, Kangra,</p>
                  <p>Himachal Pradesh, 176001, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-card-foreground">Phone</h3>
                  <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-primary transition-colors">{siteConfig.contact.phone}</a>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-card-foreground">Email</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">{siteConfig.contact.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <WhatsAppIcon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-card-foreground">WhatsApp</h3>
                  <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Book on WhatsApp</a>
                </div>
              </div>
            </address>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
