import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stickersList } from '../utils/stickerData';
import { playClickSound } from '../utils/soundSynthesizer';
import {
  Sparkles, Heart, Type, Edit3, Grid, Camera, Sliders, Settings,
  Undo2, Redo2, RotateCcw
} from 'lucide-react';

// ─── tiny section divider ───────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div className="flex items-center gap-2 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
      {label && (
        <span className="text-[9px] text-rose-400 font-bold uppercase tracking-widest">{label}</span>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
    </div>
  );
}

export default function StickerPanel({
  onAddSticker,
  onAddText,
  // film label
  footerText,
  setFooterText,
  pushFooterHistory,
  // customization toolbar
  borderStyle, setBorderStyle,
  photoFilter, setPhotoFilter,
  filterSettings, setFilterSettings,
  customization, setCustomization,
  pushHistory,
  onUndo, onRedo, canUndo, canRedo,
}) {
  const [activeCategory, setActiveCategory] = useState('Vintage');
  const [activeTab, setActiveTab]   = useState('stickers'); // stickers | text | label | borders | filters | adjust | layout

  // Text state
  const [textVal,   setTextVal]   = useState('MEMORIES');
  const [textFont,  setTextFont]  = useState('Typewriter');
  const [textColor, setTextColor] = useState('#333333');

  const categories = ['Vintage', 'Y2K', 'Coquette', 'Beauty', 'Cute', 'Hello Kitty', 'Decorations'];

  const fontsList = [
    { id: 'Typewriter',      name: 'Typewriter',  style: { fontFamily: "'Special Elite', monospace" } },
    { id: 'Handwritten',     name: 'Handwritten', style: { fontFamily: "'Caveat', cursive" } },
    { id: 'Y2K Bubble',      name: 'Bubble',      style: { fontFamily: "'Bubblegum Sans', cursive" } },
    { id: 'Coquette Script', name: 'Coquette',    style: { fontFamily: "'Pinyon Script', cursive" } },
    { id: 'Vintage Serif',   name: 'Serif',       style: { fontFamily: "'Playfair Display', serif" } },
  ];

  const textColors = [
    '#333333','#ffffff','#ffb6c1','#ff4fa3','#bae6fd','#e9d5ff','#fef08a','#a7f3d0','#f59e0b','#991b1b',
  ];

  const borderStylesList = [
    { id: 'classic-white',  name: 'Classic',   emoji: '⬜' },
    { id: 'vintage-film',   name: 'Vintage',   emoji: '🎞️' },
    { id: 'pink-glitter',   name: 'Glitter',   emoji: '✨' },
    { id: 'coquette-lace',  name: 'Lace',      emoji: '🎀' },
    { id: 'polaroid',       name: 'Polaroid',  emoji: '📷' },
    { id: 'scrapbook-paper',name: 'Scrapbook', emoji: '📖' },
    { id: 'y2k-chrome',     name: 'Y2K',       emoji: '💿' },
    { id: 'pearl',          name: 'Pearl',     emoji: '📿' },
    { id: 'hearts',         name: 'Hearts',    emoji: '💖' },
    { id: 'ribbon',         name: 'Ribbons',   emoji: '🎀' },
    { id: 'flowers',        name: 'Daisies',   emoji: '🌼' },
    { id: 'film-roll',      name: 'Film',      emoji: '📼' },
  ];

  const filtersList = [
    { id: 'normal',     name: 'Normal',      desc: 'No Filter' },
    { id: 'vintage',    name: 'Vintage',     desc: 'Analog feel' },
    { id: 'warm',       name: 'Warm',        desc: 'Golden glow' },
    { id: 'dreamy',     name: 'Dreamy',      desc: 'Soft & hazy' },
    { id: 'y2k',        name: 'Y2K Pop',     desc: 'High sat.' },
    { id: 'softglow',   name: 'Soft Glow',   desc: 'Diffused' },
    { id: 'film',       name: 'Film',        desc: 'Cinematic' },
    { id: 'bw',         name: 'B&W',         desc: 'Monochrome' },
    { id: 'sepia',      name: 'Sepia',       desc: 'Retro brown' },
    { id: 'disposable', name: 'Disposable',  desc: '90s cam' },
  ];

  const frameColors = [
    '#ffffff','#ffb6c1','#ff4fa3','#fef08a','#bae6fd','#e9d5ff','#a7f3d0','#f59e0b','#333333','#991b1b',
  ];

  const filteredStickers = stickersList.filter(s => s.category === activeCategory);

  const handleStickerClick = (id) => { playClickSound(); onAddSticker(id); };
  const handleAddTextClick  = () => {
    if (!textVal.trim()) return;
    playClickSound();
    onAddText(textVal, textFont, textColor);
    setTextVal('');
  };

  const handleBorderChange = (id) => { pushHistory(); setBorderStyle(id); };
  const handleFilterChange = (id) => { pushHistory(); setPhotoFilter(id); };
  const handleSliderChange = (key, val) => setFilterSettings(prev => ({ ...prev, [key]: Number(val) }));
  const handleSliderRelease = () => pushHistory();
  const handleCustChange   = (key, val) => setCustomization(prev => ({ ...prev, [key]: val }));
  const handleCustRelease  = () => pushHistory();

  const resetFilters = () => {
    pushHistory();
    setFilterSettings({ brightness: 100, contrast: 100, warmth: 0, saturation: 100, grain: 0, fade: 0 });
    setPhotoFilter('normal');
  };
  const resetLayout = () => {
    pushHistory();
    setCustomization({ spacing: 12, corners: 0, shadow: true, frameThickness: 24, bgColor: '#ffffff' });
  };

  // Top navigation tabs
  const topTabs = [
    { id: 'stickers', label: '🎀 Stickers', short: 'Stickers' },
    { id: 'text',     label: '✏️ Text',     short: 'Text' },
    { id: 'label',    label: '🎞️ Label',    short: 'Label' },
    { id: 'borders',  label: '⬜ Borders',  short: 'Borders' },
    { id: 'filters',  label: '📷 Filters',  short: 'Filters' },
    { id: 'adjust',   label: '🎛️ Adjust',   short: 'Adjust' },
    { id: 'layout',   label: '⚙️ Layout',   short: 'Layout' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full flex flex-col"
    >
      {/* ── Undo / Redo strip ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5">
          <Heart size={13} className="text-rose-400 fill-rose-400 animate-pulse" />
          <span className="font-serif italic text-xs text-stone-500 tracking-wide">Studio</span>
        </div>
        <div className="flex gap-1.5">
          <motion.button
            onClick={onUndo} disabled={!canUndo}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-lg border border-rose-100 bg-white/70 hover:bg-rose-50 disabled:opacity-30 transition cursor-pointer text-stone-500"
            title="Undo (Ctrl+Z)"
          ><Undo2 size={12} /></motion.button>
          <motion.button
            onClick={onRedo} disabled={!canRedo}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-lg border border-rose-100 bg-white/70 hover:bg-rose-50 disabled:opacity-30 transition cursor-pointer text-stone-500"
            title="Redo (Ctrl+Y)"
          ><Redo2 size={12} /></motion.button>
        </div>
      </div>

      {/* ── Main Card ──────────────────────────────────────────────────── */}
      <div
        className="rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.92) 100%)',
          backdropFilter: 'blur(14px)',
          border: '1.5px solid rgba(255,192,203,0.4)',
          boxShadow: '0 8px 32px rgba(255,105,180,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* ── Tab nav ─────────────────────────────────────────────────── */}
        <div
          className="flex gap-0.5 px-3 pt-3 pb-2 overflow-x-auto scrollbar-none"
          style={{ borderBottom: '1px solid rgba(255,192,203,0.25)' }}
        >
          {topTabs.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => { playClickSound(); setActiveTab(tab.id); }}
              whileTap={{ scale: 0.93 }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-sm'
                  : 'text-stone-500 hover:bg-rose-50'
              }`}
            >
              {tab.short}
            </motion.button>
          ))}
        </div>

        {/* ── Panel content ────────────────────────────────────────────── */}
        <div className="overflow-y-auto px-4 py-3 scrollbar-thin" style={{ maxHeight: '420px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >

              {/* ╔═ STICKERS ═════════════════════════════════════════════╗ */}
              {activeTab === 'stickers' && (
                <div className="flex flex-col gap-2.5">
                  {/* category chips */}
                  <div className="flex gap-1 overflow-x-auto scrollbar-none pb-0.5">
                    {categories.map(cat => (
                      <motion.button
                        key={cat}
                        onClick={() => { playClickSound(); setActiveCategory(cat); }}
                        whileTap={{ scale: 0.93 }}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          activeCategory === cat
                            ? 'bg-gradient-to-br from-stone-700 to-stone-800 text-white shadow-sm'
                            : 'bg-rose-50 text-stone-500 hover:bg-rose-100 border border-rose-100'
                        }`}
                      >{cat}</motion.button>
                    ))}
                  </div>

                  {/* sticker grid */}
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-4 gap-2"
                  >
                    {filteredStickers.map((st, idx) => (
                      <motion.button
                        key={st.id}
                        onClick={() => handleStickerClick(st.id)}
                        whileHover={{ scale: 1.1, rotate: 4 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.015, type: 'spring', stiffness: 320, damping: 20 }}
                        title={`Add ${st.name}`}
                        className="aspect-square rounded-2xl flex items-center justify-center p-2 cursor-pointer relative group transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #fff5f8 0%, #fff 100%)',
                          border: '1.5px dashed rgba(255,192,203,0.6)',
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center pointer-events-none">
                          {st.render(48)}
                        </div>
                        <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Sparkles size={7} className="text-rose-400 fill-rose-400" />
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>

                  <p className="text-[9px] text-center text-rose-300 italic mt-1">
                    💡 Drag, resize & rotate stickers on the canvas!
                  </p>
                </div>
              )}

              {/* ╔═ TEXT ═════════════════════════════════════════════════╗ */}
              {activeTab === 'text' && (
                <div className="flex flex-col gap-3">
                  {/* input + add */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter text…"
                      value={textVal}
                      onChange={e => setTextVal(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleAddTextClick(); }}
                      maxLength={30}
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-serif text-stone-700 focus:outline-none transition-all placeholder:text-rose-200"
                      style={{
                        background: 'rgba(255,240,245,0.8)',
                        border: '1.5px solid rgba(255,192,203,0.5)',
                      }}
                    />
                    <motion.button
                      onClick={handleAddTextClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer flex items-center gap-1.5 shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #555 0%, #222 100%)' }}
                    >
                      <Type size={11} /> ADD
                    </motion.button>
                  </div>

                  {/* font picker */}
                  <div>
                    <label className="text-[9px] text-rose-400 font-bold uppercase tracking-wider block mb-1.5">Font Family</label>
                    <div className="flex gap-1 flex-wrap">
                      {fontsList.map(f => (
                        <motion.button
                          key={f.id}
                          onClick={() => { playClickSound(); setTextFont(f.id); }}
                          whileTap={{ scale: 0.93 }}
                          style={{ ...f.style }}
                          className={`px-2.5 py-1 rounded-lg text-xs border transition-all cursor-pointer ${
                            textFont === f.id
                              ? 'border-rose-300 bg-rose-50 text-stone-800 font-bold shadow-sm'
                              : 'border-rose-100 bg-white/60 text-stone-500 hover:border-rose-200'
                          }`}
                        >{f.name}</motion.button>
                      ))}
                    </div>
                  </div>

                  {/* color swatch */}
                  <div>
                    <label className="text-[9px] text-rose-400 font-bold uppercase tracking-wider block mb-1.5">Text Color</label>
                    <div className="flex gap-1.5 flex-wrap">
                      {textColors.map(code => (
                        <motion.button
                          key={code}
                          onClick={() => { playClickSound(); setTextColor(code); }}
                          whileHover={{ scale: 1.18, y: -1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ backgroundColor: code }}
                          className={`w-6 h-6 rounded-full border shrink-0 transition-all cursor-pointer ${
                            textColor === code
                              ? 'ring-2 ring-offset-1 ring-rose-400 scale-110 border-stone-400'
                              : 'border-stone-200'
                          }`}
                          title={code}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ╔═ FILM LABEL ═══════════════════════════════════════════╗ */}
              {activeTab === 'label' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Edit3 size={12} className="text-rose-400" />
                    <span className="text-[10px] text-stone-500 font-serif italic">Caption at the bottom of your strip</span>
                  </div>
                  <input
                    type="text"
                    value={footerText}
                    onChange={e => { pushFooterHistory(e.target.value); setFooterText(e.target.value); }}
                    maxLength={20}
                    className="w-full px-3 py-2.5 rounded-xl font-mono text-sm text-stone-700 focus:outline-none transition-all placeholder:text-rose-200"
                    style={{
                      background: 'rgba(255,240,245,0.8)',
                      border: '1.5px solid rgba(255,192,203,0.5)',
                    }}
                    placeholder="Y2K MEMORIES"
                  />
                  <p className="text-[9px] text-rose-300 italic">Max 20 characters · shown on the strip footer</p>
                </div>
              )}

              {/* ╔═ BORDERS ══════════════════════════════════════════════╗ */}
              {activeTab === 'borders' && (
                <div className="grid grid-cols-3 gap-2">
                  {borderStylesList.map(b => (
                    <motion.button
                      key={b.id}
                      onClick={() => handleBorderChange(b.id)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        borderStyle === b.id
                          ? 'text-stone-900 shadow-sm'
                          : 'text-stone-500'
                      }`}
                      style={{
                        background: borderStyle === b.id
                          ? 'linear-gradient(135deg,#ffe4ef,#fff0f6)'
                          : 'rgba(255,245,248,0.7)',
                        border: borderStyle === b.id
                          ? '1.5px solid rgba(255,150,180,0.6)'
                          : '1.5px dashed rgba(255,192,203,0.4)',
                      }}
                    >
                      <span className="text-lg">{b.emoji}</span>
                      <span className="text-center truncate w-full">{b.name}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* ╔═ FILTERS ══════════════════════════════════════════════╗ */}
              {activeTab === 'filters' && (
                <div className="grid grid-cols-2 gap-2">
                  {filtersList.map(f => (
                    <motion.button
                      key={f.id}
                      onClick={() => handleFilterChange(f.id)}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                        photoFilter === f.id ? 'text-stone-800 font-bold shadow-sm' : 'text-stone-500'
                      }`}
                      style={{
                        background: photoFilter === f.id
                          ? 'linear-gradient(135deg,#ffe4ef,#fff0f6)'
                          : 'rgba(255,245,248,0.7)',
                        border: photoFilter === f.id
                          ? '1.5px solid rgba(255,150,180,0.6)'
                          : '1.5px dashed rgba(255,192,203,0.4)',
                      }}
                    >
                      <span className="text-xs uppercase tracking-wide block">{f.name}</span>
                      <span className="text-[9px] text-stone-400 font-normal">{f.desc}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* ╔═ ADJUST ═══════════════════════════════════════════════╗ */}
              {activeTab === 'adjust' && (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {[
                      { key: 'brightness', label: 'BRIGHTNESS', min: 50, max: 150, suffix: '%' },
                      { key: 'contrast',   label: 'CONTRAST',   min: 50, max: 150, suffix: '%' },
                      { key: 'warmth',     label: 'WARMTH',     min:-50, max: 50,  suffix: '' },
                      { key: 'saturation', label: 'SATURATION', min: 0,  max: 200, suffix: '%' },
                      { key: 'grain',      label: 'GRAIN',      min: 0,  max: 100, suffix: '%' },
                      { key: 'fade',       label: 'FADE',       min: 0,  max: 100, suffix: '%' },
                    ].map(s => {
                      const val = filterSettings[s.key] ?? (s.key === 'warmth' ? 0 : 100);
                      const disp = s.key === 'warmth'
                        ? (val > 0 ? `+${val}` : val)
                        : `${val}${s.suffix}`;
                      return (
                        <div key={s.key} className="flex flex-col gap-0.5">
                          <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                            <span>{s.label}</span>
                            <span className="text-rose-400 font-bold">{disp}</span>
                          </div>
                          <input
                            type="range" min={s.min} max={s.max} value={val}
                            onChange={e => handleSliderChange(s.key, e.target.value)}
                            onMouseUp={handleSliderRelease} onTouchEnd={handleSliderRelease}
                            className="w-full accent-rose-400 h-1.5 rounded-lg cursor-pointer"
                            style={{ background: 'rgba(255,192,203,0.3)' }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <motion.button
                    onClick={resetFilters}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className="self-end flex items-center gap-1 py-1 px-3 rounded-lg text-[10px] text-stone-500 hover:text-rose-500 transition cursor-pointer"
                    style={{ background: 'rgba(255,240,245,0.8)', border: '1px solid rgba(255,192,203,0.4)' }}
                  >
                    <RotateCcw size={9} /> Reset
                  </motion.button>
                </div>
              )}

              {/* ╔═ LAYOUT ═══════════════════════════════════════════════╗ */}
              {activeTab === 'layout' && (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {/* spacing */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                        <span>SPACING</span>
                        <span className="text-rose-400 font-bold">{customization.spacing ?? 12}px</span>
                      </div>
                      <input type="range" min="0" max="24" value={customization.spacing ?? 12}
                        onChange={e => handleCustChange('spacing', Number(e.target.value))}
                        onMouseUp={handleCustRelease} onTouchEnd={handleCustRelease}
                        className="w-full accent-rose-400 h-1.5 rounded-lg cursor-pointer"
                        style={{ background: 'rgba(255,192,203,0.3)' }}
                      />
                    </div>

                    {/* corners */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                        <span>CORNERS</span>
                        <span className="text-rose-400 font-bold">{customization.corners ?? 0}px</span>
                      </div>
                      <input type="range" min="0" max="20" value={customization.corners ?? 0}
                        onChange={e => handleCustChange('corners', Number(e.target.value))}
                        onMouseUp={handleCustRelease} onTouchEnd={handleCustRelease}
                        className="w-full accent-rose-400 h-1.5 rounded-lg cursor-pointer"
                        style={{ background: 'rgba(255,192,203,0.3)' }}
                      />
                    </div>

                    {/* border bars */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                        <span>FRAME BAR</span>
                        <span className="text-rose-400 font-bold">{customization.frameThickness ?? 24}px</span>
                      </div>
                      <input type="range" min="10" max="32" value={customization.frameThickness ?? 24}
                        onChange={e => handleCustChange('frameThickness', Number(e.target.value))}
                        onMouseUp={handleCustRelease} onTouchEnd={handleCustRelease}
                        className="w-full accent-rose-400 h-1.5 rounded-lg cursor-pointer"
                        style={{ background: 'rgba(255,192,203,0.3)' }}
                      />
                    </div>

                    {/* shadow toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 font-mono">SHADOWS</span>
                      <motion.button
                        onClick={() => { pushHistory(); handleCustChange('shadow', !customization.shadow); }}
                        whileTap={{ scale: 0.92 }}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                          customization.shadow
                            ? 'bg-gradient-to-r from-rose-400 to-pink-500'
                            : 'bg-stone-200'
                        }`}
                      >
                        <motion.div
                          animate={{ x: customization.shadow ? 16 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="w-4 h-4 rounded-full bg-white shadow-sm"
                        />
                      </motion.button>
                    </div>

                    {/* frame color */}
                    <div className="col-span-2 flex flex-col gap-1.5">
                      <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider">Frame Color</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {frameColors.map(code => (
                          <motion.button
                            key={code}
                            onClick={() => { pushHistory(); handleCustChange('bgColor', code); }}
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ backgroundColor: code }}
                            className={`w-5 h-5 rounded border shrink-0 transition-all cursor-pointer ${
                              customization.bgColor === code
                                ? 'ring-2 ring-offset-1 ring-rose-400 scale-110'
                                : 'border-stone-200'
                            }`}
                            title={code}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={resetLayout}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className="self-end flex items-center gap-1 py-1 px-3 rounded-lg text-[10px] text-stone-500 hover:text-rose-500 transition cursor-pointer"
                    style={{ background: 'rgba(255,240,245,0.8)', border: '1px solid rgba(255,192,203,0.4)' }}
                  >
                    <RotateCcw size={9} /> Reset Layout
                  </motion.button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
