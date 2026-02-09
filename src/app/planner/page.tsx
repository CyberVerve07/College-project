import ItineraryForm from "./ItineraryForm";

export default function AIPlannerPage() {
  return (
    <div className="py-24 bg-mesh min-h-screen relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-pink-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse delay-700" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-green-500/20 rounded-full blur-[80px] mix-blend-screen" />
      </div>

      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary border border-primary/30 backdrop-blur-xl mb-6 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            ✨ Smart Travel Concierge
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
            Plan your trip with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x">AI Power</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground font-body leading-relaxed">
            Crafting legendary Himalayan adventures using real-time data and expert local knowledge.
          </p>
        </div>
        <div className="w-full bg-card/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(139,92,246,0.15)] border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <ItineraryForm />
        </div>
      </div>
    </div>
  );
}
