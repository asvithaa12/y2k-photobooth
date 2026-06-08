import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function PhotoStrip({ photos }) {
  return (
    <div
      id="barbie-photostrip-element"
      className="bg-gradient-to-b from-[#FFD6EC] to-[#FFEAF5] p-5 rounded-[2.5rem] shadow-2xl flex flex-col items-center border-[6px] border-white relative overflow-hidden w-[300px] select-none mx-auto"
      style={{
        boxShadow: '0 20px 50px rgba(255, 105, 180, 0.25), inset 0 0 40px rgba(255, 255, 255, 0.6)',
      }}
    >
      {/* Glossy Diagonal Shine Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 pointer-events-none z-10" />

      {/* Decorative corner sparkles */}
      <div className="absolute top-2 left-2 text-barbie-hot opacity-40 animate-pulse">✨</div>
      <div className="absolute top-2 right-2 text-barbie-hot opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-[80px] left-3 text-barbie-hot opacity-40 animate-bounce-slow">💖</div>
      <div className="absolute bottom-[80px] right-3 text-barbie-gold opacity-60 animate-pulse">★</div>

      {/* 3 Photos stacked vertically */}
      <div className="flex flex-col gap-4 w-full z-20">
        {photos.map((src, index) => (
          <div
            key={index}
            className="w-full aspect-[3/4] bg-white p-2.5 rounded-2xl shadow-md border-2 border-barbie-baby/30 relative overflow-hidden"
          >
            <img
              src={src}
              alt={`Capture ${index + 1}`}
              className="w-full h-full object-cover rounded-xl scale-x-[-1]" // Keep mirror view for consistency
            />
            {/* Corner glossy dots like an old polaroid */}
            <div className="absolute bottom-4 right-4 bg-white/20 text-[10px] text-white px-1.5 py-0.5 rounded-full font-mono scale-75">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Branding Area */}
      <div className="mt-6 mb-2 flex flex-col items-center text-center z-20">
        <div className="flex items-center gap-1.5 justify-center">
          <Heart size={14} fill="#FF4FA3" className="text-barbie-hot animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-extrabold text-barbie-hot/80 font-sans">
            Dreamhouse Magic
          </span>
          <Heart size={14} fill="#FF4FA3" className="text-barbie-hot animate-pulse" />
        </div>
        
        <h3 className="font-barbie text-3xl text-barbie-hot mt-1 select-none tracking-wide drop-shadow-sm leading-tight">
          Barbie Dream Booth
        </h3>

        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
          Made in Malibu 💖 {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
