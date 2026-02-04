import ItineraryForm from "./ItineraryForm";

export default function AIPlannerPage() {
  return (
    <div className="py-16 md:py-24 bg-muted/30">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            AI Travel Planner for Himachal
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Let our AI craft the perfect, personalized itinerary for your dream trip to the Himalayas. Just tell us your preferences, and we'll handle the rest!
          </p>
        </div>
        <div className="bg-card p-8 rounded-2xl shadow-xl border">
          <ItineraryForm />
        </div>
      </div>
    </div>
  );
}
