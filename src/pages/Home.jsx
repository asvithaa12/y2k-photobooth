import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

// Components
import LandingScreen from '../components/LandingScreen';
import CameraBooth from '../components/CameraBooth';
import StickerCanvas from '../components/StickerCanvas';
import StickerPanel from '../components/StickerPanel';
import PhotoStrip from '../components/PhotoStrip';
import FinalScreen from '../components/FinalScreen';
import SparkleCursor from '../components/SparkleCursor';
import { Sparkles, Camera, RefreshCw, Heart } from 'lucide-react';

export default function Home() {
  const [appState, setAppState] = useState('LOBBY');
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [footerText,      setFooterText]      = useState('Y2K MEMORIES');
  const [borderStyle,     setBorderStyle]     = useState('vintage-film');
  const [photoFilter,     setPhotoFilter]     = useState('normal');
  const [filterSettings,  setFilterSettings]  = useState({ brightness:100, contrast:100, warmth:0, saturation:100, grain:0, fade:0 });
  const [customization,   setCustomization]   = useState({ spacing:12, corners:0, shadow:true, frameThickness:24, bgColor:'#ffffff' });

  const [isDownloading, setIsDownloading] = useState(false);
  const [savedImageUri, setSavedImageUri] = useState(null);

  const [history, setHistory] = useState([]);
  const [future,  setFuture]  = useState([]);

  const canvasRef = useRef(null);

  // ── History helpers ─────────────────────────────────────────────────────
  const pushHistory = (
    newFooterText        = footerText,
    currentItems         = items,
    currentBorderStyle   = borderStyle,
    currentPhotoFilter   = photoFilter,
    currentFilterSettings= filterSettings,
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
          setFilterSettings(p.filterSettings || { brightness:100, contrast:100, warmth:0, saturation:100, grain:0, fade:0 });
          setCustomization(p.customization || { spacing:12, corners:0, shadow:true, frameThickness:24 });
          setAppState('EDITOR');
        }
      } catch {}
    }
  }, []);

  // ── Event handlers ──────────────────────────────────────────────────────
  const handlePhotosComplete = (photosList) => {
    setCapturedPhotos(photosList);
    setItems([]); setSelectedId(null);
    setBorderStyle('vintage-film'); setPhotoFilter('normal');
    setFilterSettings({ brightness:100, contrast:100, warmth:0, saturation:100, grain:0, fade:0 });
    setCustomization({ spacing:12, corners:0, shadow:true, frameThickness:24 });
    setHistory([]); setFuture([]); setSavedImageUri(null);
    setAppState('EDITOR');
  };

  const handleAddSticker = (stickerTemplateId) => {
    pushHistory(footerText);
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,
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
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,
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
      const canvas = await html2canvas(canvasRef.current, { useCORS:true, scale:3, backgroundColor:null, logging:false });
      setSavedImageUri(canvas.toDataURL('image/png'));
      setAppState('FINAL');
    } catch (err) { console.error(err); }
    finally { setIsDownloading(false); }
  };

  const handleRetake    = () => { setItems([]); setSelectedId(null); setHistory([]); setFuture([]); setSavedImageUri(null); setAppState('CAMERA'); };
  const handleStartOver = () => { setCapturedPhotos([]); setItems([]); setSelectedId(null); setSavedImageUri(null); setHistory([]); setFuture([]); localStorage.removeItem('y2k_memories_editor_state'); setAppState('LOBBY'); };

  // ── Screens ─────────────────────────────────────────────────────────────
  if (appState === 'LOBBY')  return <div className="w-full h-screen overflow-hidden"><SparkleCursor /><LandingScreen onStart={() => setAppState('CAMERA')} /></div>;
  if (appState === 'CAMERA') return <div className="w-full h-screen overflow-hidden"><SparkleCursor /><CameraBooth onPhotoCapture={handlePhotosComplete} onBack={handleStartOver} /></div>;
  if (appState === 'FINAL')  return <FinalScreen savedImageUri={savedImageUri} onEditAgain={() => setAppState('EDITOR')} onStartNew={handleStartOver} footerText={footerText} />;

  // ── EDITOR ──────────────────────────────────────────────────────────────
  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col bg-cover bg-center font-serif select-none"
      style={{ backgroundImage: `url('/bg-scrapbook.png')` }}
    >
      {/* overlay tint */}
      <div className="absolute inset-0 bg-[#f5ebe8]/20 mix-blend-multiply pointer-events-none z-0" />
      <SparkleCursor />

      {/* ambient floaters */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {['💖','✨','🎀','📸','🌸','💫'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30 select-none"
            style={{ left:`${10+(i*15)%80}%`, top:`${5+(i*23)%80}%` }}
            animate={{ y:[0,-18,0], rotate:[0,8,-8,0], opacity:[0.2,0.45,0.2] }}
            transition={{ duration:5+(i%3), repeat:Infinity, ease:'easeInOut', delay:i*0.6 }}
          >{emoji}</motion.div>
        ))}
      </div>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity:0, y:-18 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.45 }}
        className="w-full py-2.5 flex flex-row items-center justify-between px-8 z-20 shrink-0"
        style={{ borderBottom:'1px solid rgba(255,192,203,0.2)' }}
      >
        <div className="flex items-center gap-2">
          <motion.h1
            whileHover={{ scale:1.02, rotate:-1 }}
            className="font-serif italic text-2xl text-[#333] tracking-widest cursor-default"
          >Photostrip Scrapbook</motion.h1>
          <motion.span
            animate={{ rotate:[0,15,-15,0], scale:[1,1.15,1] }}
            transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
          >
            <Sparkles size={18} className="text-yellow-500 fill-yellow-400" />
          </motion.span>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
          <Heart size={11} className="text-rose-400 fill-rose-400 animate-pulse" />
          <span className="hidden md:inline">edit, decorate &amp; save your memories</span>
          <Heart size={11} className="text-rose-400 fill-rose-400 animate-pulse" />
        </div>
      </motion.header>

      {/* ── Main 3-col layout (fills remaining height, no scroll) ────────── */}
      <main className="flex-1 min-h-0 w-full max-w-[1440px] mx-auto px-4 z-10 flex flex-row gap-4 items-start pt-3 pb-3 relative overflow-hidden">

        {/* LEFT COLUMN — mini preview + booth controls */}
        <div className="flex flex-col gap-3 w-[220px] shrink-0 h-full">
          {/* Mini preview */}
          <motion.div
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.45, delay:0.05 }}
            className="flex justify-center"
            style={{ transform:'scale(0.72)', transformOrigin:'top center' }}
          >
            <motion.div
              animate={{ rotate:[-2.5,-1,-3,-2.5] }}
              transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
              className="pointer-events-none"
            >
              <PhotoStrip
                photos={capturedPhotos}
                footerText={footerText}
                borderStyle={borderStyle}
                photoFilter={photoFilter}
                filterSettings={filterSettings}
                customization={customization}
              />
            </motion.div>
          </motion.div>

          {/* Booth controls */}
          <motion.div
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.45, delay:0.12 }}
            className="w-full flex flex-col gap-2 p-4 rounded-3xl"
            style={{
              background:'linear-gradient(145deg,rgba(255,255,255,0.92),rgba(255,240,245,0.88))',
              backdropFilter:'blur(12px)',
              border:'1.5px solid rgba(255,192,203,0.35)',
              boxShadow:'0 6px 24px rgba(255,105,180,0.09)',
            }}
          >
            <label className="text-stone-500 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Camera size={11} className="text-rose-400" /> Booth Controls
            </label>
            <motion.button
              whileHover={{ scale:1.02, y:-1 }}
              whileTap={{ scale:0.97, y:1 }}
              onClick={handleSaveAndExport}
              disabled={isDownloading}
              className="bg-gradient-to-br from-[#222] to-black text-white font-mono font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles size={13} className={isDownloading ? 'animate-spin' : ''} />
              {isDownloading ? 'SAVING…' : 'SAVE STRIP'}
            </motion.button>
            <motion.button
              whileHover={{ scale:1.02, y:-1 }}
              whileTap={{ scale:0.97, y:1 }}
              onClick={handleRetake}
              className="w-full text-[#333] font-mono font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
              style={{
                background:'rgba(255,245,248,0.7)',
                border:'1.5px dashed rgba(255,192,203,0.5)',
              }}
            >
              <RefreshCw size={11} /> RETAKE
            </motion.button>
          </motion.div>
        </div>

        {/* SCRAPBOOK BOOK — two-page layout: left = photostrip, right = toolkit */}
        <motion.div
          initial={{ opacity:0, y:12 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, delay:0.08 }}
          className="flex-1 min-w-0 h-full flex items-center justify-center pt-6"
        >
          <div className="relative w-full max-w-4xl flex items-stretch justify-center">
            {/* Book spine and subtle page shadow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-6 pointer-events-none z-0">
              <div className="w-full h-full bg-gradient-to-b from-[#e6d6c8] via-[#f6efe8] to-[#e9d7cf] rounded-l-2xl shadow-inner opacity-80" />
            </div>

            <motion.div
              initial={{ rotateY: -12, scale: 0.98, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.05 }}
              className="book-pages flex gap-6 z-10"
            >
              {/* LEFT PAGE — Memory page with photostrip (stays editable) */}
              <div className="page-left bg-[#fbf6ef] rounded-2xl shadow-2xl p-6 w-[420px] h-[820px] relative overflow-hidden border border-[#e0cfc2]">
                {/* subtle paper texture and corner fold */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,250,245,0.6))" }} />
                <div className="absolute top-4 left-4 text-[11px] text-stone-500 font-mono">collect beautiful moments</div>

                {/* photostrip area — keep StickerCanvas here so stickers remain attached to the strip */}
                <div className="flex items-center justify-center h-full">
                  <div className="paper-frame relative p-4 bg-transparent pointer-events-auto">
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

                {/* Decorations on left page (paper clips, washi, flowers) */}
                <div className="absolute -top-4 left-6 w-10 h-10 pointer-events-none opacity-90">
                  <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M6 2l10 4v12l-10 4V2z" fill="#f7e9e6" stroke="#d6bfb6"/></svg>
                </div>
                <div className="absolute bottom-6 left-6 text-[11px] text-stone-400 font-mono">{new Date().toLocaleDateString()}</div>
              </div>

              {/* RIGHT PAGE — Toolkit, replaces floating sidebar visually */}
              <div className="page-right bg-[#f6efe8] rounded-2xl shadow-xl p-5 w-[420px] h-[820px] relative overflow-hidden border border-[#e6d0c3]">
                {/* Paper tabs / notebook divider visuals */}
                <div className="absolute right-0 top-20 w-10 h-28 bg-gradient-to-b from-[#fef3f6] to-[#fee4ef] rounded-l-lg pointer-events-none" />
                <div className="absolute right-0 top-80 w-10 h-20 bg-gradient-to-b from-[#fff7ed] to-[#fef3e6] rounded-l-lg pointer-events-none" />

                <div className="h-full overflow-auto pr-2">
                  <div className="mb-3 text-sm font-serif italic text-stone-600">Edit & decorate</div>
                  <StickerPanel
                    onAddSticker={handleAddSticker}
                    onAddText={handleAddText}
                    /* film label */
                    footerText={footerText}
                    setFooterText={setFooterText}
                    pushFooterHistory={(val) => pushHistory(val, items, borderStyle, photoFilter, filterSettings, customization)}
                    /* customization */
                    borderStyle={borderStyle}       setBorderStyle={setBorderStyle}
                    photoFilter={photoFilter}       setPhotoFilter={setPhotoFilter}
                    filterSettings={filterSettings} setFilterSettings={setFilterSettings}
                    customization={customization}   setCustomization={setCustomization}
                    pushHistory={() => pushHistory(footerText, items, borderStyle, photoFilter, filterSettings, customization)}
                    onUndo={handleUndo}  onRedo={handleRedo}
                    canUndo={history.length > 0}    canRedo={future.length > 0}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
