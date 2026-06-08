import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart } from 'lucide-react';
import { playClickSound } from '../utils/soundSynthesizer';

export default function LandingScreen({ onStart }) {
  const handleStart = () => {
    playClickSound();
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center select-none relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full p-8 md:p-12 rounded-[2.5rem] barbie-glass border-4 border-barbie-baby relative shadow-2xl overflow-hidden"
      >
        {/* Decorative Dollhouse Arch Frame */}
        <div className="absolute inset-2 border-2 border-dashed border-barbie-primary rounded-[2rem] pointer-events-none opacity-50" />

        {/* Small floating sparkles/hearts in card */}
        <div className="absolute top-4 left-6 text-barbie-primary opacity-60 animate-bounce-slow">
          <Heart size={28} fill="#FF69B4" />
        </div>
        <div className="absolute bottom-6 right-8 text-barbie-gold opacity-80 animate-spin" style={{ animationDuration: '6s' }}>
          <Sparkles size={32} />
        </div>

        {/* Cursive Logo Header */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-6xl md:text-8xl font-barbie text-barbie-hot drop-shadow-lg tracking-wider mb-2 select-none"
        >
          Dream Booth
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-2xl font-semibold text-slate-700 max-w-lg mx-auto leading-relaxed font-sans mb-8"
        >
          Welcome to Barbie's Dreamhouse! Step inside, pose, and decorate your memories with cute stickers.
        </motion.p>

        {/* Main CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="btn-glossy px-8 py-4 rounded-full text-lg md:text-xl font-bold flex items-center gap-3 mx-auto transition-transform"
        >
          <Camera size={24} className="stroke-[2.5]" />
          <span>START PHOTOBOOTH</span>
          <Sparkles size={20} className="animate-pulse" />
        </motion.button>

        {/* Additional Decorative Badges */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap text-sm font-semibold text-barbie-hot">
          <span className="bg-barbie-light border border-barbie-baby px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            💝 3 Snapshots
          </span>
          <span className="bg-barbie-light border border-barbie-baby px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            🎀 Cute Stickers
          </span>
          <span className="bg-barbie-light border border-barbie-baby px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            ✨ Pure Magic
          </span>
        </div>
      </motion.div>
    </div>
  );
}
