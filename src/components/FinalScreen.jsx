import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { Download, Edit2, Camera, Home as HomeIcon, Sparkles, Heart } from 'lucide-react';
import SparkleCursor from './SparkleCursor';

export default function FinalScreen({
  savedImageUri,
  onEditAgain,
  onStartNew,
  footerText
}) {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = () => {
    if (!savedImageUri) return;
    const link = document.createElement('a');
    link.href = savedImageUri;
    link.download = `y2k-memories-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    // Attempt copy image to clipboard or share
    try {
      const response = await fetch(savedImageUri);
      const blob = await response.blob();
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy image:", err);
      // Fallback: copy a dummy link or just warn
    }
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-x-hidden flex flex-col items-center justify-center bg-cover bg-center font-serif py-12 select-none"
      style={{ backgroundImage: `url('/bg-scrapbook.png')` }}
    >
      <SparkleCursor />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#f5ebe8]/20 mix-blend-multiply pointer-events-none" />

      {/* Confetti celebration */}
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={250}
        colors={['#fbcfe8', '#fde047', '#f472b6', '#cbd5e1', '#fff']}
      />

      <div className="z-10 flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl px-6 w-full">
        
        {/* LEFT: Exported Photostrip Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.1 }}
          className="relative group shrink-0"
        >
          {/* Polaroid outline card mockup */}
          <div className="bg-white p-4 rounded-xl shadow-2xl border border-stone-200/50 flex flex-col items-center max-w-[280px]">
            {savedImageUri ? (
              <img 
                src={savedImageUri} 
                alt="Final Photostrip" 
                className="w-[220px] shadow-md border border-stone-100 rounded" 
              />
            ) : (
              <div className="w-[220px] h-[660px] bg-stone-100 animate-pulse rounded" />
            )}
            
            <div className="mt-3 text-[10px] font-mono text-stone-400 tracking-wider text-center flex items-center gap-1 justify-center">
              <Heart size={10} className="text-rose-400 fill-rose-400" />
              Y2K PHOTOBOTH MEMORIES
            </div>
          </div>
          
          {/* Scrapbook pin decoration overlay */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 pointer-events-none drop-shadow-md">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <path d="M 20 5 Q 22 15 28 35 L 20 30 L 12 35 Q 18 15 20 5" fill="#e11d48" stroke="#991b1b" strokeWidth="1" />
              <circle cx="20" cy="5" r="4" fill="#f43f5e" />
            </svg>
          </div>
        </motion.div>

        {/* RIGHT: Congratulations Card & Action Wardrobe */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-stone-200/40 w-full max-w-[420px] text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase">Saved!</span>
            <Sparkles className="text-yellow-500 fill-yellow-400 animate-pulse" size={16} />
          </div>

          <h2 className="font-serif italic text-3xl text-stone-800 mb-2 leading-none">
            Memory Saved Successfully!
          </h2>
          
          <p className="text-xs text-stone-500 leading-relaxed font-sans mb-6">
            Your custom Y2K Scrapbook photostrip has been generated. You can download it to your device or continue editing it.
          </p>

          <div className="flex flex-col gap-3 w-full">
            {/* Primary Download Button */}
            <button
              onClick={handleDownload}
              className="w-full bg-stone-900 hover:bg-black text-white py-3 px-5 rounded-2xl font-sans font-bold flex items-center justify-center gap-2 shadow-lg active:translate-y-[1px] transition cursor-pointer"
            >
              <Download size={18} />
              DOWNLOAD PHOTOSTRIP
            </button>

            {/* Copy/Share Button */}
            <button
              onClick={handleShare}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-2.5 px-5 rounded-2xl font-sans font-bold flex items-center justify-center gap-2 transition cursor-pointer border border-stone-200"
            >
              {copied ? (
                <>
                  <Sparkles size={16} className="text-green-500 fill-green-400" />
                  COPIED TO CLIPBOARD!
                </>
              ) : (
                <>
                  <Heart size={16} className="text-rose-400" />
                  COPY IMAGE
                </>
              )}
            </button>

            <div className="w-full h-px bg-stone-200 my-2" />

            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Edit again */}
              <button
                onClick={onEditAgain}
                className="bg-white hover:bg-stone-50 text-stone-600 py-2.5 px-3 rounded-2xl font-sans text-xs font-bold border border-stone-300 flex items-center justify-center gap-1.5 transition cursor-pointer active:translate-y-[1px]"
              >
                <Edit2 size={13} />
                EDIT AGAIN
              </button>

              {/* Start new session */}
              <button
                onClick={onStartNew}
                className="bg-white hover:bg-stone-50 text-stone-600 py-2.5 px-3 rounded-2xl font-sans text-xs font-bold border border-stone-300 flex items-center justify-center gap-1.5 transition cursor-pointer active:translate-y-[1px]"
              >
                <Camera size={13} />
                NEW BOOTH
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-2 text-stone-400 hover:text-stone-600 cursor-pointer self-center text-xs font-bold" onClick={onStartNew}>
            <HomeIcon size={12} />
            <span className="font-sans">Back to Home Screen</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
