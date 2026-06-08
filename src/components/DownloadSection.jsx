import React from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Home, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/soundSynthesizer';

export default function DownloadSection({ onDownload, onRetake, onStartOver, isDownloading }) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs mt-6 select-none relative z-20">
      {/* Download PNG Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          playClickSound();
          onDownload();
        }}
        disabled={isDownloading}
        className="btn-glossy-gold py-4 px-6 rounded-full text-base font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
      >
        {isDownloading ? (
          <>
            <RefreshCw className="animate-spin" size={20} />
            <span>EXPORTING STRIP...</span>
          </>
        ) : (
          <>
            <Download size={20} className="stroke-[2.5]" />
            <span>DOWNLOAD PHOTOSTRIP</span>
            <Sparkles size={16} className="animate-pulse" />
          </>
        )}
      </motion.button>

      {/* Row of sub-buttons */}
      <div className="flex gap-3 mt-1">
        {/* Retake Photos */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playClickSound();
            onRetake();
          }}
          className="flex-1 bg-white hover:bg-barbie-light border-2 border-barbie-primary text-barbie-hot py-3 px-4 rounded-full text-sm font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-colors"
        >
          <RefreshCw size={15} />
          <span>RETAKE</span>
        </motion.button>

        {/* Start Over */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playClickSound();
            onStartOver();
          }}
          className="flex-1 bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-600 py-3 px-4 rounded-full text-sm font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-colors"
        >
          <Home size={15} />
          <span>HOME</span>
        </motion.button>
      </div>
    </div>
  );
}
