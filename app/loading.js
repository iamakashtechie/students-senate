export default function Loading() {
  // A stark, brutalist loading screen
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream px-6 py-24">
      <div className="flex flex-col items-center relative gap-8">
        
        {/* Animated geometric loader */}
        <div className="relative w-24 h-24 border-4 border-primary bg-sand shadow-[8px_8px_0_0_#111] overflow-hidden">
          <div className="absolute inset-0 bg-primary w-full h-full origin-bottom animate-[scale-y_1.5s_ease-in-out_infinite_alternate]" style={{ transformOrigin: "bottom" }}></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-accent opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="font-display text-3xl font-black text-primary uppercase tracking-widest">
            Loading
          </h2>
          <div className="flex gap-1" aria-hidden="true">
            <span className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></span>
            <span className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></span>
            <span className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scale-y {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
      `}} />
    </div>
  );
}
