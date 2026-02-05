import ItineraryForm from "./ItineraryForm";

export default function AIPlannerPage() {
  return (
    <div className="py-24 bg-mesh min-h-screen">
      <div className="container max-w-4xl px-4">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary border border-primary/30 backdrop-blur-xl mb-6">
            ✨ Smart Travel Concierge
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-tight">
            AI <span className="text-gradient">Trip Architect</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground font-body leading-relaxed">
            Crafting legendary Himalayan adventures using real-time data and expert local knowledge.
          </p>
        </div>
        <div className="bg-card/50 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-primary/10 neon-border">
          <ItineraryForm />
        </div>
      </div>
    </div>
  );
}
