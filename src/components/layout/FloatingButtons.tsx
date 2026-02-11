import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

/**
 * Fixed floating action buttons for quick contact (WhatsApp & Phone).
 * Positioned at the bottom-right of the viewport.
 */
export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-4 md:bottom-24 md:right-6 z-40 flex flex-col gap-3">
      <Button asChild size="icon" className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-gradient-to-b from-[#4ade80] to-[#22c55e] hover:from-[#22c55e] hover:to-[#16a34a] text-white shadow-[0_8px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_20px_rgba(37,211,102,0.6)] border border-white/20 click-effect transition-all duration-300">
        <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Book on WhatsApp">
          <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7" />
        </a>
      </Button>
      <Button asChild size="icon" className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg glow-on-hover click-effect">
        <a href={`tel:${siteConfig.contact.phone}`} aria-label="Book a Cab">
          <Phone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
        </a>
      </Button>
    </div>
  );
}
