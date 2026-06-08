import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, AlertCircle, Sparkles, Heart } from 'lucide-react';
import Countdown from './Countdown';
import { playClickSound, playShutterSound } from '../utils/soundSynthesizer';

export default function CameraBooth({ onPhotosComplete, onBack }) {
  const webcamRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // 1, 2, 3
  const [countdown, setCountdown] = useState(null);
  const [isFlash, setIsFlash] = useState(false);

  const handleUserMedia = useCallback(() => {
    setHasPermission(true);
  }, []);

  const handleUserMediaError = useCallback((err) => {
    console.error('Camera permission error:', err);
    setHasPermission(false);
  }, []);

  const runSingleCapture = (photoIndex) => {
    setCurrentPhotoIndex(photoIndex + 1);
    let timer = 3;
    setCountdown(timer);
    playClickSound(); // First beep on timer start

    const interval = setInterval(() => {
      timer -= 1;
      if (timer > 0) {
        setCountdown(timer);
        playClickSound(); // Beeps on 2, 1
      } else if (timer === 0) {
        setCountdown(0);
        clearInterval(interval);
        
        // Let the user see "SMILE!" then take screenshot
        setTimeout(() => {
          takeScreenshot(photoIndex);
        }, 800);
      }
    }, 1000);
  };

  const takeScreenshot = (photoIndex) => {
    if (webcamRef.current) {
      // Trigger flash overlay
      setIsFlash(true);
      playShutterSound();

      const imageSrc = webcamRef.current.getScreenshot();

      setTimeout(() => {
        setIsFlash(false);
      }, 150);

      if (imageSrc) {
        setPhotos((prev) => {
          const updated = [...prev, imageSrc];
          if (updated.length === 3) {
            // Done! Give the user a moment to see the final photo flash
            setTimeout(() => {
              onPhotosComplete(updated);
            }, 800);
          } else {
            // Pause before the next timer
            setTimeout(() => {
              runSingleCapture(updated.length);
            }, 1200);
          }
          return updated;
        });
      } else {
        // Fallback if screenshot failed
        console.warn('Screenshot capture returned null');
        setIsCapturing(false);
      }
    }
  };

  const startSession = () => {
    if (!hasPermission) return;
    playClickSound();
    setIsCapturing(true);
    setPhotos([]);
    runSingleCapture(0);
  };

  // Video resolution constraints: portrait 3:4 ratio fits the vertical strip perfectly!
  const videoConstraints = {
    width: 480,
    height: 640,
    facingMode: 'user',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-6 relative z-10 w-full max-w-4xl mx-auto select-none">
      {/* Shutter flash screen */}
      <AnimatePresence>
        {isFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="shutter-flash"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full p-6 md:p-8 rounded-[2.5rem] barbie-glass border-4 border-barbie-baby relative shadow-2xl flex flex-col items-center"
      >
        {/* Decorative corner bows */}
        <div className="absolute -top-4 -left-4 text-3xl animate-bounce-slow">🎀</div>
        <div className="absolute -top-4 -right-4 text-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}>🎀</div>

        {/* Header Text */}
        <h2 className="text-3xl md:text-5xl font-barbie text-barbie-hot mb-4 text-center">
          {isCapturing ? `Capturing Photo ${currentPhotoIndex}/3` : 'Dream Booth Camera'}
        </h2>

        {/* Outer Camera Frame / Dollhouse window */}
        <div className="w-full max-w-sm aspect-[3/4] rounded-3xl relative dollhouse-window overflow-hidden bg-slate-900 shadow-inner border-8 border-barbie-baby">
          {/* Status Overlay */}
          {hasPermission === null && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-800 p-6 text-center">
              <RefreshCw className="animate-spin text-barbie-primary mb-3" size={36} />
              <p className="font-semibold text-lg">Accessing camera...</p>
              <p className="text-sm text-slate-300 mt-1">Please accept camera permissions when prompted.</p>
            </div>
          )}

          {hasPermission === false && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-rose-950/90 p-6 text-center">
              <AlertCircle className="text-barbie-hot mb-3" size={42} />
              <p className="font-bold text-xl text-barbie-baby">Camera Access Blocked</p>
              <p className="text-sm text-rose-200 mt-2 max-w-xs leading-relaxed">
                We need access to your webcam to snap photobooth pictures. Please update your browser settings to allow camera access.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-4 py-2 bg-barbie-hot hover:bg-barbie-primary text-white font-semibold rounded-full text-sm shadow-md transition-colors"
              >
                Reload Page
              </button>
            </div>
          )}

          {/* Live Webcam Stream */}
          {hasPermission && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              className="w-full h-full object-cover scale-x-[-1]" // Mirror view is much more natural
            />
          )}

          {/* Grid Guideline overlays (hidden while capturing to keep screen clean) */}
          {hasPermission && !isCapturing && (
            <div className="absolute inset-0 border-2 border-barbie-baby/30 pointer-events-none flex items-center justify-center">
              <Heart className="text-barbie-baby/20 animate-pulse" size={56} />
            </div>
          )}

          {/* Photo Count Tracker Indicators on top right */}
          {isCapturing && (
            <div className="absolute top-4 right-4 flex gap-2 z-30">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold shadow-md transition-colors ${
                    photos.length >= num
                      ? 'bg-barbie-hot text-white'
                      : currentPhotoIndex === num
                      ? 'bg-barbie-gold text-slate-900 animate-pulse'
                      : 'bg-black/40 text-white/70'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          )}

          {/* Countdown timer overlay */}
          {isCapturing && <Countdown count={countdown} />}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 w-full justify-center">
          {!isCapturing ? (
            <>
              <button
                onClick={onBack}
                className="px-6 py-3 border-2 border-barbie-primary/50 text-barbie-hot font-bold rounded-full hover:bg-barbie-light/50 transition-colors text-sm md:text-base order-2 md:order-1"
              >
                Back to Entrance
              </button>
              <button
                disabled={!hasPermission}
                onClick={startSession}
                className="btn-glossy px-8 py-3 rounded-full text-sm md:text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 order-1 md:order-2"
              >
                <Camera size={18} />
                <span>START SNAPSHOTS</span>
              </button>
            </>
          ) : (
            <div className="text-center text-barbie-hot font-bold animate-pulse py-2 text-lg">
              Get ready, holding pose! ✨
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
