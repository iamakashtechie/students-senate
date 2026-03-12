"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Next.js App Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream px-6 py-24">
      <div className="bg-primary text-cream p-10 md:p-16 border-4 border-primary shadow-[16px_16px_0_0_#cd7a47] max-w-2xl w-full text-center relative">
        {/* Decorative corner block */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent border-4 border-primary shadow-[4px_4px_0_0_#111]"></div>
        
        <p className="font-display font-black text-6xl md:text-8xl text-accent mb-4 tracking-tighter">
          500
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
          System Failure
        </h2>
        <p className="font-body text-cream/70 text-sm md:text-base mb-10 max-w-md mx-auto">
          We encountered an unexpected error while trying to load this page data. Please try again or return later.
        </p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="font-display font-bold text-lg uppercase tracking-widest bg-accent text-primary px-8 py-4 border-4 border-primary shadow-[6px_6px_0_0_#111] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#111] transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
