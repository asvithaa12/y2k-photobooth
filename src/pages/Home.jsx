import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import html2canvas from 'html2canvas';
import { Sparkles, Heart } from 'lucide-react';

// Components
import LandingScreen from '../components/LandingScreen';
import CameraBooth from '../components/CameraBooth';
import StickerCanvas from '../components/StickerCanvas';
import StickerPanel from '../components/StickerPanel';
import DownloadSection from '../components/DownloadSection';
import FloatingHearts from '../components/FloatingHearts';
import SparkleCursor from '../components/SparkleCursor';

// Audio and data
import { playClickSound } from '../utils/soundSynthesizer';

export default function Home() {
  const [appState, setAppState] = useState('LOBBY'); // LOBBY, CAMERA, EDITOR
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const canvasRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStartBooth = () => {
    setAppState('CAMERA');
  };

  const handlePhotosComplete = (photosList) => {
    setCapturedPhotos(photosList);
    setStickers([]);
    setSelectedStickerId(null);
    setAppState('EDITOR');
    setShowConfetti(true);
    // Disable confetti after 5 seconds to free up CPU
    setTimeout(() => {
      setShowConfetti(false);
    }, 5500);
  };

  const handleAddSticker = (stickerTemplateId) => {
    const newSticker = {
      id: `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      stickerId: stickerTemplateId,
      x: 150, // default center position (container is 300px wide)
      y: 350, // default vertically balanced position
      scale: 1.0,
      rotate: 0,
      zIndex: stickers.length + 10,
    };
    setStickers((prev) => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);
    setSelectedStickerId(null); // Clear selection border for print

    // Wait a brief moment for the browser to render selection removal
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 3, // Render 3x resolution for beautiful download print quality
        backgroundColor: null, // keep transparent backing
        logging: false,
      });

      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `barbie-dreambooth-${Date.now()}.png`;
      link.click();
      
      // Trigger a short burst of confetti again on success download!
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (err) {
      console.error('Failed to generate png download:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRetake = () => {
    setStickers([]);
    setSelectedStickerId(null);
    setAppState('CAMERA');
  };

  const handleStartOver = () => {
    setCapturedPhotos([]);
    setStickers([]);
    setSelectedStickerId(null);
    setAppState('LOBBY');
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col bg-gradient-to-tr from-[#FFEAF5] via-[#FFD6EC] to-[#FFEAF5] font-sans pb-12 select-none">
      {/* Decorative Dreamhouse Cloud Layer */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FFF]/20 to-transparent pointer-events-none" />

      {/* Ambient background particles and trails */}
      <FloatingHearts />
      <SparkleCursor />

      {/* Confetti Trigger */}
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#FF69B4', '#FFD6EC', '#FF4FA3', '#FFD700', '#FFFFFF']}
        />
      )}

      {/* App Main Header Logo */}
      <header className="w-full py-6 flex items-center justify-center gap-2 z-20 select-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-barbie-hot drop-shadow-md text-2xl"
        >
          💖
        </motion.div>
        <h1 className="font-barbie text-4xl text-barbie-hot drop-shadow-sm tracking-wide">
          Malibu Dreamhouse
        </h1>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
          className="text-barbie-gold drop-shadow-md text-2xl"
        >
          ✨
        </motion.div>
      </header>

      {/* Screen Routing */}
      <main className="flex-grow flex items-center justify-center w-full max-w-7xl mx-auto px-4 z-10">
        <AnimatePresence mode="wait">
          {appState === 'LOBBY' && (
            <motion.div
              key="lobby"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="w-full"
            >
              <LandingScreen onStart={handleStartBooth} />
            </motion.div>
          )}

          {appState === 'CAMERA' && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <CameraBooth onPhotosComplete={handlePhotosComplete} onBack={handleStartOver} />
            </motion.div>
          )}

          {appState === 'EDITOR' && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 py-6"
            >
              {/* Left Column: Photostrip Canvas and Download Controls */}
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/60 shadow-xl">
                  <StickerCanvas
                    photos={capturedPhotos}
                    stickers={stickers}
                    setStickers={setStickers}
                    selectedId={selectedStickerId}
                    setSelectedId={setSelectedStickerId}
                    canvasRef={canvasRef}
                  />
                </div>
                
                <DownloadSection
                  onDownload={handleDownload}
                  onRetake={handleRetake}
                  onStartOver={handleStartOver}
                  isDownloading={isDownloading}
                />
              </div>

              {/* Right Column: Sticker Panel Shelf */}
              <div className="w-full max-w-md lg:mt-4">
                <div className="flex items-center gap-2 mb-3 text-barbie-hot justify-center lg:justify-start">
                  <Sparkles size={18} className="animate-pulse" />
                  <span className="font-extrabold uppercase text-sm tracking-wider font-sans">
                    Sticker Wardrobe
                  </span>
                  <Sparkles size={18} className="animate-pulse" />
                </div>
                <StickerPanel onAddSticker={handleAddSticker} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
