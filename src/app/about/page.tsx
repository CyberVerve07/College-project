import Image from "next/image";
import { PlaceHolderImagesMap } from "@/lib/placeholder-images";
import { Target, Eye, BookOpen } from "lucide-react";

export default function AboutPage() {
  const aboutImage = PlaceHolderImagesMap.get("about-us");

  return (
    <div className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            About Destiny Tour & Travels
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Your trusted partner for unforgettable journeys through the majestic
            landscapes of Himachal Pradesh.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-headline mb-3">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in the heart of Kangra, Destiny Tour & Travels was born from a passion for sharing the breathtaking beauty of our home with the world. We started with a single taxi and a big dream: to provide safe, reliable, and friendly travel services that go beyond just transportation. Over the years, we've grown our fleet and our family of happy customers, but our core commitment to authentic Himachali hospitality remains unchanged.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-headline mb-3">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and customer-centric travel agency in Himachal Pradesh, offering seamless and memorable travel experiences. We strive to connect travelers with the culture, nature, and adventure of the Himalayas through our reliable fleet and local expertise.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <Eye className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-headline mb-3">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To create journeys that inspire and memories that last a lifetime. We envision a future where every traveler experiences the magic of Himachal with the comfort and peace of mind that comes with a trusted local guide.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[600px]">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="rounded-lg shadow-xl object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
