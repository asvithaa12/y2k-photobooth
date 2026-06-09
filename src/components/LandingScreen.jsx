import React from 'react';
import { Camera } from 'lucide-react';

const LandingScreen = ({ onStart }) => {
  return (
    <div 
      className="w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center py-12 px-4 relative select-none font-serif"
      style={{ backgroundImage: `url('/bg-scrapbook.png')` }}
    >
      <div className="absolute inset-0 bg-[#f5ebe8]/10 mix-blend-multiply pointer-events-none" />

      {/* Scattered Scrapbook Elements (Simulated with absolute positioning) */}
      <div className="absolute top-10 left-10 text-6xl drop-shadow-md rotate-[-15deg] opacity-90 animate-float">💋</div>
      <div className="absolute top-20 right-20 text-6xl drop-shadow-md rotate-[10deg] opacity-90 animate-float" style={{ animationDelay: '1s' }}>🪩</div>
      <div className="absolute bottom-20 left-20 text-6xl drop-shadow-md rotate-[-5deg] opacity-90 animate-float" style={{ animationDelay: '2s' }}>💌</div>
      <div className="absolute bottom-10 right-10 text-6xl drop-shadow-md rotate-[20deg] opacity-90 animate-float" style={{ animationDelay: '0.5s' }}>🌷</div>

      {/* Main Title Area simulating torn paper effect */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        
        <div className="bg-[#f0f0f0] p-8 md:p-12 shadow-[10px_10px_0_rgba(0,0,0,0.2)] border-[2px] border-black rotate-[-2deg] flex flex-col items-center">
          <h1 className="font-serif italic text-6xl md:text-[6rem] text-[#333] drop-shadow-sm tracking-tighter leading-none mb-2 text-center">
            Y2K Memories
          </h1>
          <p className="font-mono text-[#555] tracking-widest uppercase text-sm md:text-lg mb-8 text-center border-b border-black/20 pb-2">
            digital camera photobooth
          </p>

          <button 
            onClick={onStart}
            className="group bg-[#222] text-white px-10 py-5 font-mono font-bold text-xl md:text-2xl tracking-widest shadow-[6px_6px_0_rgba(0,0,0,0.15)] hover:bg-[#000] hover:shadow-[4px_4px_0_rgba(0,0,0,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all flex items-center justify-center gap-4"
          >
            <Camera size={28} className="group-hover:scale-110 transition-transform" />
            START CAPTURE
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default LandingScreen;
