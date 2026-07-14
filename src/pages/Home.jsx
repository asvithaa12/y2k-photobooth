import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

// Components
import LandingScreen from '../components/LandingScreen';
import CameraBooth from '../components/CameraBooth';
import StickerCanvas from '../components/StickerCanvas';
import StickerPanel from '../components/StickerPanel';
import FinalScreen from '../components/FinalScreen';
import SparkleCursor from '../components/SparkleCursor';
import { Sparkles, Camera, RefreshCw, Heart, Download, RotateCcw, RotateCw } from 'lucide-react';

export default function Home() {
  const [appState, setAppState] = useState('LOBBY');
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [footerText, setFooterText] = useState('Y2K MEMORIES');
  const [borderStyle, setBorderStyle] = useState('vintage-film');
  const [photoFilter, setPhotoFilter] = useState('normal');
  const [filterSettings, setFilterSettings] = useState({ brightness: 100, contrast: 100, warmth: 0, saturation: 100, grain: 0, fade: 0 });
  const [customization, setCustomization] = useState({ spacing: 12, corners: 0, shadow: true, frameThickness: 24, bgColor: '#ffffff' });

  const [isDownloading, setIsDownloading] = useState(false);
  const [savedImageUri, setSavedImageUri] = useState(null);

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const canvasRef = useRef(null);

  // ── History helpers ─────────────────────────────────────────────────────
  const pushHistory = (
    newFooterText = footerText,
    currentItems = items,
    currentBorderStyle = borderStyle,
    currentPhotoFilter = photoFilter,
    currentFilterSettings = filterSettings,
    currentCustomization = customization
  ) => {
    const snapshot = {
      items: JSON.parse(JSON.stringify(currentItems)),
      footerText: newFooterText,
      borderStyle: currentBorderStyle,
      photoFilter: currentPhotoFilter,
      filterSettings: { ...currentFilterSettings },
      customization: { ...currentCustomization },
    };
    setHistory(prev => [...prev, snapshot].slice(-30));
    setFuture([]);
  };

  const handleUndo = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setFuture(f => [{
      items: JSON.parse(JSON.stringify(items)), footerText,
      borderStyle, photoFilter,
      filterSettings: { ...filterSettings },
      customization: { ...customization },
    }, ...f]);
    setItems(prev.items);
    setFooterText(prev.footerText);
    setBorderStyle(prev.borderStyle);
    setPhotoFilter(prev.photoFilter);
    setFilterSettings(prev.filterSettings);
    setCustomization(prev.customization);
    setSelectedId(null);
  };

  const handleRedo = () => {
    if (!future.length) return;
    const next = future[0];
    setFuture(f => f.slice(1));
    setHistory(h => [...h, {
      items: JSON.parse(JSON.stringify(items)), footerText,
      borderStyle, photoFilter,
      filterSettings: { ...filterSettings },
      customization: { ...customization },
    }]);
    setItems(next.items);
    setFooterText(next.footerText);
    setBorderStyle(next.borderStyle);
    setPhotoFilter(next.photoFilter);
    setFilterSettings(next.filterSettings);
    setCustomization(next.customization);
    setSelectedId(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (appState !== 'EDITOR') return;
      const el = document.activeElement;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');
      if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        if (typing && el.value !== footerText) return;
        e.preventDefault(); handleUndo();
      } else if (e.ctrlKey && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
        e.preventDefault(); handleRedo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [appState, history, future, items, footerText, borderStyle, photoFilter, filterSettings, customization]);

  // Autosave
  useEffect(() => {
    if (appState === 'EDITOR' && capturedPhotos.length > 0) {
      localStorage.setItem('y2k_memories_editor_state', JSON.stringify({
        capturedPhotos, items, footerText, borderStyle, photoFilter, filterSettings, customization,
      }));
    }
  }, [items, footerText, borderStyle, photoFilter, filterSettings, customization, capturedPhotos, appState]);

  // Restore autosave
  useEffect(() => {
    const saved = localStorage.getItem('y2k_memories_editor_state');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.capturedPhotos?.length > 0) {
          setCapturedPhotos(p.capturedPhotos);
          setItems(p.items || []);
          setFooterText(p.footerText || 'Y2K MEMORIES');
          setBorderStyle(p.borderStyle || 'vintage-film');
          setPhotoFilter(p.photoFilter || 'normal');
          setFilterSettings(p.filterSettings || { brightness: 100, contrast: 100, warmth: 0, saturation: 100, grain: 0, fade: 0 });
          setCustomization(p.customization || { spacing: 12, corners: 0, shadow: true, frameThickness: 24 });
          setAppState('EDITOR');
        }
      } catch { }
    }
  }, []);

  // ── Event handlers ──────────────────────────────────────────────────────
  const handlePhotosComplete = (photosList) => {
    setCapturedPhotos(photosList);
    setItems([]); setSelectedId(null);
    setBorderStyle('vintage-film'); setPhotoFilter('normal');
    setFilterSettings({ brightness: 100, contrast: 100, warmth: 0, saturation: 100, grain: 0, fade: 0 });
    setCustomization({ spacing: 12, corners: 0, shadow: true, frameThickness: 24 });
    setHistory([]); setFuture([]); setSavedImageUri(null);
    setAppState('EDITOR');
  };

  const handleAddSticker = (stickerTemplateId) => {
    pushHistory(footerText);
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'sticker', stickerId: stickerTemplateId,
      x: 120, y: 360, scale: 1.0, rotate: 0, flipH: false, flipV: false, opacity: 1.0,
      zIndex: 50 + items.length,
    };
    setItems(prev => [...prev, newItem]);
    setSelectedId(newItem.id);
  };

  const handleAddText = (text, font, color) => {
    pushHistory(footerText);
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'text', text, font, color,
      x: 120, y: 360, scale: 1.0, rotate: 0, flipH: false, flipV: false, opacity: 1.0,
      zIndex: 50 + items.length,
    };
    setItems(prev => [...prev, newItem]);
    setSelectedId(newItem.id);
  };

  const handleSaveAndExport = async () => {
    if (!canvasRef.current) return;
    setIsDownloading(true); setSelectedId(null);
    await new Promise(r => setTimeout(r, 150));
    try {
      const canvas = await html2canvas(canvasRef.current, { useCORS: true, scale: 3, backgroundColor: null, logging: false });
      setSavedImageUri(canvas.toDataURL('image/png'));
      setAppState('FINAL');
    } catch (err) { console.error(err); }
    finally { setIsDownloading(false); }
  };

  const handleRetake = () => { setItems([]); setSelectedId(null); setHistory([]); setFuture([]); setSavedImageUri(null); setAppState('CAMERA'); };
  const handleStartOver = () => { setCapturedPhotos([]); setItems([]); setSelectedId(null); setSavedImageUri(null); setHistory([]); setFuture([]); localStorage.removeItem('y2k_memories_editor_state'); setAppState('LOBBY'); };

  // ── Screens ─────────────────────────────────────────────────────────────
  if (appState === 'LOBBY') return <div className="w-full h-screen overflow-hidden"><SparkleCursor /><LandingScreen onStart={() => setAppState('CAMERA')} /></div>;
  if (appState === 'CAMERA') return <div className="w-full h-screen overflow-hidden"><SparkleCursor /><CameraBooth onPhotoCapture={handlePhotosComplete} onBack={handleStartOver} /></div>;
  if (appState === 'FINAL') return <FinalScreen savedImageUri={savedImageUri} onEditAgain={() => setAppState('EDITOR')} onStartNew={handleStartOver} footerText={footerText} />;

  // ── EDITOR ──────────────────────────────────────────────────────────────
  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col font-serif select-none"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, #d4b896 0%, #c9a87c 30%, #b8926a 60%, #a07850 100%)',
        backgroundImage: `
          radial-gradient(ellipse at 30% 20%, #d4b896 0%, #c9a87c 30%, #b8926a 60%, #a07850 100%),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")
        `,
      }}
    >
      {/* Wood grain overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
            92deg,
            transparent 0px, transparent 3px,
            rgba(80,40,10,0.07) 3px, rgba(80,40,10,0.07) 4px,
            transparent 4px, transparent 8px,
            rgba(80,40,10,0.04) 8px, rgba(80,40,10,0.04) 9px
          )`,
        }}
      />

      <SparkleCursor />

      {/* ambient floaters */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {['💖', '✨', '🎀', '📸', '🌸', '💫'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20 select-none"
            style={{ left: `${10 + (i * 15) % 80}%`, top: `${5 + (i * 23) % 80}%` }}
            animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
          >{emoji}</motion.div>
        ))}
      </div>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full py-2 flex flex-row items-center justify-between px-6 z-20 shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(80,45,15,0.6) 0%, rgba(80,45,15,0.2) 100%)',
          borderBottom: '1px solid rgba(180,140,80,0.35)',
        }}
      >
        <div className="flex items-center gap-2.5">
          {/* vintage ribbon label for title */}
          <div className="relative px-4 py-1 flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #f7e8d0, #f0d9b5)',
              border: '1px solid #c8a870',
              borderRadius: '2px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <motion.h1
              whileHover={{ scale: 1.02 }}
              className="font-serif italic text-xl tracking-widest cursor-default"
              style={{ color: '#5c3d1e', textShadow: '0 1px 1px rgba(255,255,255,0.5)' }}
            >✂ Photostrip Scrapbook</motion.h1>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={16} className="text-yellow-600 fill-yellow-500" />
            </motion.span>
            {/* torn left edge */}
            <div className="absolute left-0 top-0 h-full w-2 overflow-hidden" style={{ transform: 'translateX(-100%)' }}>
              <div style={{ width: '8px', height: '100%', background: 'linear-gradient(135deg,#f7e8d0,#f0d9b5)', clipPath: 'polygon(0 0,100% 10%,100% 25%,80% 35%,100% 50%,80% 65%,100% 80%,100% 100%,0 100%)' }} />
            </div>
            <div className="absolute right-0 top-0 h-full w-2 overflow-hidden" style={{ transform: 'translateX(100%)' }}>
              <div style={{ width: '8px', height: '100%', background: 'linear-gradient(135deg,#f0d9b5,#f7e8d0)', clipPath: 'polygon(100% 0,0 10%,0 25%,20% 35%,0 50%,20% 65%,0 80%,0 100%,100% 100%)' }} />
            </div>
          </div>
        </div>

        {/* right header: paper label subtitles */}
        <div className="flex items-center gap-2">
          {/* Undo/Redo as paper labels */}
          {[
            { label: '↩ Undo', onClick: handleUndo, disabled: history.length === 0 },
            { label: 'Redo ↪', onClick: handleRedo, disabled: future.length === 0 },
          ].map((btn, i) => (
            <motion.button
              key={i}
              onClick={btn.onClick}
              disabled={btn.disabled}
              whileHover={!btn.disabled ? { y: -2, rotate: i === 0 ? -1 : 1 } : {}}
              whileTap={!btn.disabled ? { scale: 0.95 } : {}}
              className="relative px-3 py-1 text-[11px] font-mono cursor-pointer disabled:opacity-30 transition-all"
              style={{
                background: 'linear-gradient(135deg, #fef6e4, #fde8c4)',
                border: '1px solid #d4a870',
                borderRadius: '1px',
                color: '#5c3d1e',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
                transform: `rotate(${i === 0 ? '-0.5' : '0.5'}deg)`,
              }}
            >{btn.label}</motion.button>
          ))}

          <div className="w-px h-5 bg-amber-800/30 mx-1" />

          {/* Save strip button */}
          <motion.button
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSaveAndExport}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold cursor-pointer disabled:opacity-50 transition-all"
            style={{
              background: 'linear-gradient(135deg, #2c1810, #4a2418)',
              color: '#f5deb3',
              border: '1px solid #8b5e3c',
              borderRadius: '1px',
              boxShadow: '0 3px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
              letterSpacing: '0.08em',
            }}
          >
            <Sparkles size={11} className={isDownloading ? 'animate-spin' : ''} />
            {isDownloading ? 'SAVING…' : 'SAVE STRIP'}
          </motion.button>

          {/* Retake button */}
          <motion.button
            whileHover={{ y: -2, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRetake}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono cursor-pointer transition-all"
            style={{
              background: 'linear-gradient(135deg, #f0e8d8, #e8dcc8)',
              color: '#5c3d1e',
              border: '1px dashed #c8a870',
              borderRadius: '1px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              transform: 'rotate(0.3deg)',
            }}
          >
            <RefreshCw size={10} /> RETAKE
          </motion.button>

          <motion.button
            whileHover={{ y: -2, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStartOver}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono cursor-pointer transition-all"
            style={{
              background: 'linear-gradient(135deg, #f5f0e8, #ede5d5)',
              color: '#6b4c2a',
              border: '1px solid #c8a870',
              borderRadius: '1px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transform: 'rotate(-0.3deg)',
            }}
          >
            <Camera size={10} /> NEW
          </motion.button>
        </div>
      </motion.header>

      {/* ── Main — two-page scrapbook book ────────────────────────────────── */}
      <main className="flex-1 min-h-0 w-full flex items-center justify-center px-4 py-3 z-10 relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative flex items-stretch justify-center"
          style={{ maxHeight: 'calc(100vh - 80px)' }}
        >
          {/* Book outer shadow */}
          <div className="absolute inset-0 rounded-lg pointer-events-none z-0"
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 10px 30px rgba(0,0,0,0.35)' }}
          />

          {/* Book spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-5 z-30 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, #7a5030 0%, #9b6840 30%, #b07848 50%, #9b6840 70%, #7a5030 100%)',
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)',
            }}
          />

          {/* ══ LEFT PAGE — memory page with single photostrip ══ */}
          <motion.div
            initial={{ rotateY: -8, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.1 }}
            className="relative overflow-hidden z-10"
            style={{
              width: '400px',
              background: 'linear-gradient(160deg, #fdf5e8 0%, #f7ead6 40%, #f0e0c4 100%)',
              borderRight: '2px solid #c8a060',
              boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.12)',
              minHeight: '0',
              alignSelf: 'stretch',
            }}
          >
            {/* Paper grain texture overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Coffee stain decorations */}
            <div className="absolute top-12 right-4 w-16 h-16 rounded-full pointer-events-none opacity-10"
              style={{ background: 'radial-gradient(circle, #8b6030 0%, #6b4010 60%, transparent 100%)', transform: 'rotate(15deg) scale(1, 0.6)' }}
            />
            <div className="absolute bottom-20 left-2 w-10 h-10 rounded-full pointer-events-none opacity-8"
              style={{ background: 'radial-gradient(circle, #7a5020 0%, transparent 70%)', transform: 'rotate(-20deg) scale(1.2, 0.5)' }}
            />

            {/* Torn top edge decoration */}
            <div className="absolute top-0 left-0 right-0 h-3 pointer-events-none z-10 overflow-hidden">
              <svg viewBox="0 0 400 12" className="w-full h-full" preserveAspectRatio="none">
                <path d="M0,0 Q20,8 40,3 Q60,0 80,6 Q100,10 120,4 Q140,0 160,7 Q180,12 200,5 Q220,0 240,8 Q260,12 280,4 Q300,0 320,7 Q340,11 360,4 Q380,0 400,6 L400,0 Z" fill="#fdf5e8" />
              </svg>
            </div>

            {/* Page header label */}
            <div className="absolute top-3 left-0 right-0 flex justify-center pointer-events-none z-20">
              <div className="px-3 py-0.5 text-[9px] font-mono tracking-widest uppercase"
                style={{ color: '#9b6840', opacity: 0.7 }}
              >✦ collect beautiful moments ✦</div>
            </div>

            {/* Washi tape decoration top-left */}
            <div className="absolute top-14 -left-1 w-20 h-5 z-20 pointer-events-none opacity-80"
              style={{
                background: 'repeating-linear-gradient(90deg, rgba(255,182,193,0.6) 0px, rgba(255,182,193,0.6) 6px, rgba(255,218,225,0.6) 6px, rgba(255,218,225,0.6) 12px)',
                transform: 'rotate(-2deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
            />

            {/* Paper clip top-right */}
            <div className="absolute top-4 right-8 z-20 pointer-events-none">
              <svg viewBox="0 0 24 60" width="14" height="35" className="opacity-60">
                <path d="M12,2 C7,2 4,5 4,10 L4,45 C4,50 7,54 12,54 C17,54 20,50 20,45 L20,15 C20,11 17,8 13,8 C9,8 7,11 7,15 L7,42 C7,45 9,47 12,47 C15,47 17,45 17,42 L17,18" stroke="#8b7355" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Main content: single editable photostrip, centered */}
            <div className="flex items-center justify-center h-full py-10 px-4">
              <div className="paper-frame relative pointer-events-auto">
                {/* Decorative photo corners — top left */}
                <div className="absolute -top-2 -left-2 w-5 h-5 z-10 pointer-events-none opacity-70">
                  <svg viewBox="0 0 20 20"><path d="M0,0 L8,0 L8,2 L2,2 L2,8 L0,8 Z" fill="#8b7355" /></svg>
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 z-10 pointer-events-none opacity-70">
                  <svg viewBox="0 0 20 20"><path d="M20,0 L12,0 L12,2 L18,2 L18,8 L20,8 Z" fill="#8b7355" /></svg>
                </div>
                <div className="absolute -bottom-2 -left-2 w-5 h-5 z-10 pointer-events-none opacity-70">
                  <svg viewBox="0 0 20 20"><path d="M0,20 L8,20 L8,18 L2,18 L2,12 L0,12 Z" fill="#8b7355" /></svg>
                </div>
                <div className="absolute -bottom-2 -right-2 w-5 h-5 z-10 pointer-events-none opacity-70">
                  <svg viewBox="0 0 20 20"><path d="M20,20 L12,20 L12,18 L18,18 L18,12 L20,12 Z" fill="#8b7355" /></svg>
                </div>

                <StickerCanvas
                  photos={capturedPhotos}
                  items={items}
                  setItems={setItems}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  canvasRef={canvasRef}
                  footerText={footerText}
                  borderStyle={borderStyle}
                  photoFilter={photoFilter}
                  filterSettings={filterSettings}
                  customization={customization}
                />
              </div>
            </div>

            {/* Bottom date label */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
              <div className="px-2 py-0.5 text-[9px] font-mono"
                style={{ color: '#9b6840', opacity: 0.6 }}
              >{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>

            {/* Flower press decoration bottom right */}
            <div className="absolute bottom-12 right-3 text-2xl pointer-events-none opacity-25 select-none"
              style={{ transform: 'rotate(15deg)' }}
            >🌸</div>
          </motion.div>

          {/* ══ RIGHT PAGE — vintage notebook toolkit ══ */}
          <motion.div
            initial={{ rotateY: 8, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.15 }}
            className="relative overflow-hidden z-10"
            style={{
              width: '440px',
              background: 'linear-gradient(160deg, #f7ead0 0%, #f0e0b8 35%, #e8d4a0 100%)',
              minHeight: '0',
              alignSelf: 'stretch',
            }}
          >
            {/* Paper grain */}
            <div className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Lined notebook faint lines */}
            <div className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage: 'repeating-linear-gradient(180deg, transparent 0px, transparent 23px, #8b6030 23px, #8b6030 24px)',
                backgroundPosition: '0 36px',
              }}
            />

            {/* Coffee stain top-right corner */}
            <div className="absolute top-3 right-10 w-20 h-16 rounded-full pointer-events-none opacity-12"
              style={{ background: 'radial-gradient(ellipse, #7a5020 0%, #5a3810 50%, transparent 100%)', transform: 'rotate(25deg) scale(1.3, 0.5)' }}
            />

            {/* Washi tape top decorations */}
            <div className="absolute top-0 right-24 w-28 h-6 z-20 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(90deg, rgba(100,180,120,0.5) 0px, rgba(100,180,120,0.5) 5px, rgba(140,210,160,0.5) 5px, rgba(140,210,160,0.5) 10px)',
                transform: 'rotate(0.5deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              }}
            />
            <div className="absolute top-0 right-2 w-16 h-6 z-20 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(90deg, rgba(220,160,100,0.5) 0px, rgba(220,160,100,0.5) 4px, rgba(240,190,130,0.5) 4px, rgba(240,190,130,0.5) 8px)',
                transform: 'rotate(-0.5deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              }}
            />

            {/* Binder holes (left margin) */}
            <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10"
              style={{ borderRight: '2px solid rgba(180,130,70,0.3)', background: 'rgba(180,140,60,0.05)' }}
            >
              {[20, 15, 15, 15, 15].map((_, i) => (
                <div key={i} className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{
                    top: `${12 + i * 20}%`,
                    background: 'rgba(100,70,30,0.2)',
                    border: '1.5px solid rgba(100,70,30,0.35)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Vintage stamp decoration top-right */}
            <div className="absolute top-8 right-4 z-20 pointer-events-none"
              style={{ transform: 'rotate(8deg)', opacity: 0.5 }}
            >
              <div style={{
                width: '38px', height: '46px',
                border: '2px solid #8b5e3c',
                padding: '2px',
                background: '#faf0dc',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}>
                <div style={{ width: '100%', height: '100%', border: '1px solid #8b5e3c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📮</div>
              </div>
            </div>

            {/* "edit & decorate" hand-written label */}
            <div className="absolute top-7 left-10 z-20 pointer-events-none">
              <div className="font-serif italic text-sm" style={{ color: '#7a5030', opacity: 0.7, transform: 'rotate(-1deg)' }}>
                ✏ edit &amp; decorate
              </div>
            </div>

            {/* Torn right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-3 pointer-events-none z-20 overflow-hidden">
              <svg viewBox="0 0 12 800" className="h-full w-full" preserveAspectRatio="none">
                <path d="M12,0 Q6,15 10,30 Q14,45 8,60 Q4,75 11,90 Q14,105 7,120 Q3,135 10,150 Q13,165 6,180 Q2,195 9,210 Q12,225 5,240 Q1,255 8,270 Q11,285 4,300 Q0,315 7,330 Q10,345 3,360 Q-1,375 6,390 Q9,405 2,420 Q-2,435 5,450 Q8,465 1,480 Q-3,495 4,510 Q7,525 0,540 Q-4,555 3,570 Q6,585 -1,600 Q-5,615 2,630 Q5,645 -2,660 Q-6,675 1,690 Q4,705 -3,720 Q-7,735 0,750 Q3,765 -4,780 Q12,800 12,800 Z" fill="#f7ead0" />
              </svg>
            </div>

            {/* Panel content */}
            <div className="h-full overflow-auto pl-9 pr-4 py-14 scrollbar-thin" style={{ scrollbarColor: 'rgba(139,94,60,0.3) transparent' }}>
              <StickerPanel
                onAddSticker={handleAddSticker}
                onAddText={handleAddText}
                footerText={footerText}
                setFooterText={setFooterText}
                pushFooterHistory={(val) => pushHistory(val, items, borderStyle, photoFilter, filterSettings, customization)}
                borderStyle={borderStyle} setBorderStyle={setBorderStyle}
                photoFilter={photoFilter} setPhotoFilter={setPhotoFilter}
                filterSettings={filterSettings} setFilterSettings={setFilterSettings}
                customization={customization} setCustomization={setCustomization}
                pushHistory={() => pushHistory(footerText, items, borderStyle, photoFilter, filterSettings, customization)}
                onUndo={handleUndo} onRedo={handleRedo}
                canUndo={history.length > 0} canRedo={future.length > 0}
              />
            </div>

            {/* Flower press decoration bottom-left */}
            <div className="absolute bottom-6 left-12 text-2xl pointer-events-none opacity-20 select-none" style={{ transform: 'rotate(-10deg)' }}>🌼</div>
            <div className="absolute bottom-16 right-6 text-xl pointer-events-none opacity-20 select-none" style={{ transform: 'rotate(20deg)' }}>🍃</div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
