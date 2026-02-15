import ItineraryForm from "./ItineraryForm";

export default function AIPlannerPage() {
  return (
    <div className="py-24 bg-mesh min-h-screen relative overflow-hidden">
      {/* Ambient Background Glow - Optimized */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-secondary/15 rounded-full blur-[60px] mix-blend-screen will-change-transform" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[80px] mix-blend-screen will-change-transform" />
      </div>

      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary border border-primary/30 backdrop-blur-xl mb-6 shadow-[0_0_15px_hsla(200,85%,35%,0.5)]">
            ✨ Smart Travel Concierge
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
            Plan your trip with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary animate-gradient-x">AI Power</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground font-body leading-relaxed">
            Crafting legendary Himalayan adventures using real-time data and expert local knowledge.
          </p>
        </div>
        <div className="w-full bg-card/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_hsla(200,85%,35%,0.15)] border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <ItineraryForm />
        </div>
      </div>
    </div>
  );
}
