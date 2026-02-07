import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
      <Button asChild size="icon" className="rounded-full w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg">
        <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Book on WhatsApp">
          <WhatsAppIcon className="w-7 h-7" />
        </a>
      </Button>
      <Button asChild size="icon" className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
        <a href={`tel:${siteConfig.contact.phone}`} aria-label="Book a Cab">
          <Phone className="w-6 h-6" />
        </a>
      </Button>
    </div>
  );
}
