import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Heart, ArrowLeft, BatteryFull, Video, Plus, Minus, RefreshCw, AlertTriangle } from 'lucide-react';
import { playShutterSound } from '../utils/soundSynthesizer';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const CameraBooth = ({ onPhotoCapture, onBack }) => {
  const webcamRef = useRef(null);
  
  // State
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState([]); 
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isFlash, setIsFlash] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const requestCameraAccess = useCallback(async () => {
    setHasPermission(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      // Release stream so Webcam component can acquire it
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error('Camera permission error:', err);
      setHasPermission(false);
    }
  }, []);

  useEffect(() => {
    requestCameraAccess();
  }, [requestCameraAccess]);

  const handleUserMedia = useCallback(() => setHasPermission(true), []);
  const handleUserMediaError = useCallback((err) => {
    console.error('Webcam component camera error:', err);
    setHasPermission(false);
  }, []);

  useEffect(() => {
    if (hasPermission && !sessionStarted) {
      setSessionStarted(true);
      startCaptureSequence();
    }
  }, [hasPermission, sessionStarted]);

  const startCaptureSequence = async () => {
    setIsCapturing(true);
    setPhotos([]); 
    await takePhotoSequence(0, []);
  };

  const takePhotoSequence = async (index, currentPhotos) => {
    if (index >= 3) {
      setIsCapturing(false);
      setTimeout(() => onPhotoCapture(currentPhotos), 1000);
      return;
    }

    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setCountdown(null);
    setIsFlash(true);
    
    // Play the upgraded smooth chime sound
    playShutterSound();
    
    let imageSrc = null;
    if (webcamRef.current) {
      imageSrc = webcamRef.current.getScreenshot();
    }
    const newPhotos = [...currentPhotos, imageSrc];
    setPhotos(newPhotos);

    setTimeout(() => setIsFlash(false), 150);
    await new Promise(resolve => setTimeout(resolve, 1500));
    takePhotoSequence(index + 1, newPhotos);
  };

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });


  return (
    <div 
      className="w-full h-screen bg-cover bg-center flex flex-col md:flex-row relative overflow-hidden"
      style={{ backgroundImage: `url('/bg-scrapbook.png')` }}
    >
      {/* Dark overlay to make the scattered desk feel moody */}
      <div className="absolute inset-0 bg-[#eaddd8]/30 mix-blend-multiply pointer-events-none" />

      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={onBack}
          className="bg-[#f5f5f5] text-[#333] font-bold px-4 py-2 rounded-md shadow-md border border-[#ccc] hover:bg-white transition flex items-center gap-2 font-mono uppercase text-xs"
        >
          <ArrowLeft size={16} /> Exit
        </button>
      </div>

      {isFlash && <div className="absolute inset-0 bg-white z-[100] animate-flash pointer-events-none" />}

      {/* LEFT SIDEBAR: Photo Previews on a "Polaroid Stack" style */}
      <div className="md:w-[280px] w-full h-[150px] md:h-full p-6 flex flex-row md:flex-col items-center justify-center z-20 shrink-0 gap-4 overflow-y-auto">
        <div className="w-full text-center hidden md:block mb-4">
          <p className="text-[#333] font-mono font-bold tracking-widest text-sm bg-white/60 p-2 rounded transform -rotate-2 border border-white">
            {photos.length}/3 CAPTURED
          </p>
        </div>

        {[0, 1, 2].map((slotIndex) => {
          const hasPhoto = photos.length > slotIndex;
          return (
            <div key={slotIndex} className={`w-[100px] md:w-full aspect-[4/3] bg-[#f0f0f0] border-[2px] border-black/80 shadow-[4px_4px_0_rgba(0,0,0,0.2)] overflow-hidden relative flex flex-col items-center justify-center transition-all duration-500 transform ${slotIndex === 1 ? 'rotate-2' : '-rotate-1'} `}>
              {hasPhoto ? (
                <img src={photos[slotIndex]} alt={`Snap ${slotIndex + 1}`} className="w-full h-full object-cover scale-x-[-1] contrast-125 sepia-[0.1]" />
              ) : (
                <div className="opacity-40 flex flex-col items-center">
                  <span className="text-[#333] font-mono font-bold text-xs">{slotIndex + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CENTER: Silver Digicam */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10 h-full">
        
        {/* Silver Y2K Camera Body */}
        <div className="relative w-full max-w-4xl aspect-[16/10] rounded-[2rem] p-6 md:p-12 shadow-[10px_20px_50px_rgba(0,0,0,0.5),inset_2px_5px_15px_rgba(255,255,255,0.9)] border border-[#ccc] flex flex-row gap-6 items-center"
             style={{
               background: 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 20%, #c0c0c0 50%, #909090 80%, #ffffff 100%)',
             }}
        >
          {/* Top Camera Detail */}
          <div className="absolute top-4 left-8 text-[#555] font-serif italic text-2xl tracking-widest opacity-80 mix-blend-multiply">Canon</div>
          <div className="absolute top-4 right-20 w-12 h-4 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] bg-[#888]" />

          {/* Digicam Screen (Inner Bezel) */}
          <div className="relative flex-1 h-full bg-[#111] rounded-[4px] overflow-hidden border-[4px] border-[#888] shadow-[0_0_0_2px_#555,inset_0_0_20px_rgba(0,0,0,1)]">
            
            {hasPermission === true && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                className="w-full h-full object-cover scale-x-[-1]"
              />
            )}

            {hasPermission === null && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111] text-white p-4 font-mono text-center">
                <RefreshCw className="animate-spin text-green-400 mb-3" size={32} />
                <p className="text-xs text-green-400 font-bold uppercase tracking-widest">AWAITING CAMERA...</p>
                <p className="text-[10px] text-slate-400 mt-2">Please click 'Allow' in your browser's prompt.</p>
              </div>
            )}

            {hasPermission === false && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#221111] text-white p-6 font-mono text-center z-50">
                <AlertTriangle className="text-rose-500 mb-3 animate-bounce" size={36} />
                <p className="text-xs text-rose-400 font-bold uppercase tracking-widest">CAMERA DENIED</p>
                <p className="text-[9px] text-slate-400 mt-2 max-w-[90%]">
                  Please enable camera access in your browser settings to take photobooth snaps.
                </p>
                <button
                  onClick={requestCameraAccess}
                  className="mt-4 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-1.5 rounded text-[10px] border border-rose-400 shadow-[2px_2px_0_rgba(0,0,0,0.3)] transition active:translate-y-[1px]"
                >
                  RETRY CAMERA
                </button>
              </div>
            )}

            {/* Digicam UI Overlay - Retro Green/White font */}
            {hasPermission === true && (
              <div className="absolute inset-0 pointer-events-none z-30 p-4 md:p-6 flex flex-col justify-between font-mono text-green-400 text-xs md:text-sm drop-shadow-[0_0_2px_rgba(0,255,0,0.8)]">
                
                {/* Top Row UI */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_4px_red]" />
                      <span className="font-bold tracking-widest text-white">REC</span>
                    </div>
                    <span>HQ</span>
                  </div>
                  <div className="flex items-center gap-2 border border-green-400/50 px-1">
                    <BatteryFull size={16} />
                  </div>
                </div>

                {/* Center Focus Brackets */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                  <div className="w-[30%] h-[40%] border border-green-400 relative">
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-green-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-green-400" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-green-400" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-green-400" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-green-400 rounded-full" />
                  </div>
                </div>

                {/* Bottom Row UI */}
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-0 text-[10px] md:text-xs text-white opacity-80">
                    <span>{dateString.toUpperCase()}</span>
                    <span>{timeString.toUpperCase()}</span>
                  </div>
                  
                  {/* Zoom Indicator */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">W</span>
                    <div className="w-16 h-1 border border-green-400 relative">
                      <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-green-400" />
                    </div>
                    <span className="text-[10px]">T</span>
                  </div>
                </div>
              </div>
            )}


            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/30">
                <span className="text-[8rem] md:text-[12rem] font-mono font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,1)]">
                  {countdown}
                </span>
              </div>
            )}
          </div>

          {/* Right Side Camera Buttons Panel */}
          <div className="w-[80px] md:w-[120px] h-full flex flex-col items-center justify-center gap-6 relative">
            {/* D-Pad */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#ddd] to-[#999] shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-[#aaa] flex items-center justify-center relative">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#bbb] to-[#eee] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] border border-[#999]" />
               {/* Arrows */}
               <div className="absolute top-1 text-[8px] text-[#555] font-bold">▲</div>
               <div className="absolute bottom-1 text-[8px] text-[#555] font-bold">▼</div>
               <div className="absolute left-1 text-[8px] text-[#555] font-bold">◀</div>
               <div className="absolute right-1 text-[8px] text-[#555] font-bold">▶</div>
            </div>

            {/* Menu Buttons */}
            <div className="flex gap-2">
              <div className="w-6 h-4 rounded-sm bg-gradient-to-b from-[#ccc] to-[#aaa] shadow-[0_2px_2px_rgba(0,0,0,0.3)] border border-[#888]" />
              <div className="w-6 h-4 rounded-sm bg-gradient-to-b from-[#ccc] to-[#aaa] shadow-[0_2px_2px_rgba(0,0,0,0.3)] border border-[#888]" />
            </div>
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ccc] to-[#999] shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-[#aaa] flex items-center justify-center text-[8px] font-bold text-[#555]">
              DISP
            </div>
          </div>
        </div>

        {/* Retake Button */}
        {hasPermission && !isCapturing && (
          <div className="mt-8 text-center z-50">
            <button
              onClick={startCaptureSequence}
              className="bg-[#333] hover:bg-[#111] text-white px-8 py-3 rounded text-sm font-mono font-bold tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0_rgba(0,0,0,0.3)] transition-transform active:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0)]"
            >
              <Camera size={18} />
              RESTART SEQUENCE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraBooth;
