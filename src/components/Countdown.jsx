import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Countdown({ count }) {
  if (count === null || count === undefined) return null;

  const displayVal = count === 0 ? '📸 SMILE! 💖' : count;

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-40 backdrop-blur-sm rounded-3xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
          animate={{
            scale: [0.3, 1.2, 1.0],
            opacity: 1,
            rotate: 0,
            transition: { duration: 0.5, type: 'spring', stiffness: 200 }
          }}
          exit={{ scale: 1.5, opacity: 0, rotate: 15, transition: { duration: 0.2 } }}
          className="text-center select-none"
        >
          <h2
            className={`font-barbie text-7xl md:text-9xl filter drop-shadow-[0_5px_15px_rgba(255,105,180,0.8)] ${
              count === 0 ? 'text-barbie-gold font-sans font-extrabold uppercase tracking-wide text-5xl md:text-7xl' : 'text-barbie-hot'
            }`}
          >
            {displayVal}
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
