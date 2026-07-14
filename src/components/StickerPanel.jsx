import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stickersList } from '../utils/stickerData';
import { playClickSound } from '../utils/soundSynthesizer';
import {
  Sparkles, Heart, Type, Edit3, RotateCcw, Undo2, Redo2,
} from 'lucide-react';

// ─── Vintage section divider ─────────────────────────────────────────────────
function VintageDivider({ label }) {
  return (
    <div className="flex items-center gap-2 my-2.5">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,94,60,0.3), transparent)' }} />
      {label && (
        <span className="text-[9px] font-mono uppercase tracking-widest px-2" style={{ color: '#9b7040', opacity: 0.8 }}>{label}</span>
      )}
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,94,60,0.3), transparent)' }} />
    </div>
  );
}

// ─── Notebook folder tab ─────────────────────────────────────────────────────
function NotebookTab({ label, emoji, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="relative cursor-pointer shrink-0 transition-all"
      style={{
        padding: '5px 10px 6px',
        fontSize: '9px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: isActive ? '#3d2008' : '#7a5030',
        background: isActive
          ? 'linear-gradient(180deg, #fdf5e0 0%, #f5e8c8 100%)'
          : 'linear-gradient(180deg, #e8d8b0 0%, #ddc898 100%)',
        border: isActive
          ? '1.5px solid #c8a060'
          : '1px solid #b89050',
        borderBottom: isActive ? '1.5px solid #fdf5e0' : '1px solid #b89050',
        borderRadius: '4px 4px 0 0',
        marginBottom: isActive ? '-1.5px' : '-1px',
        zIndex: isActive ? 10 : 1,
        boxShadow: isActive
          ? '0 -2px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
          : '0 -1px 2px rgba(0,0,0,0.06)',
        transform: isActive ? 'translateY(0)' : 'translateY(1px)',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ marginRight: '3px' }}>{emoji}</span>{label}
    </motion.button>
  );
}

// ─── Polaroid-style sticker frame ─────────────────────────────────────────────
function StickerPolaroid({ sticker, onClick, index }) {
  const tiltAngles = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2];
  const tilt = tiltAngles[index % tiltAngles.length];

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.7, rotate: tilt - 5 }}
      animate={{ opacity: 1, scale: 1, rotate: tilt }}
      transition={{ delay: index * 0.02, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{
        scale: 1.12,
        rotate: tilt + 2,
        y: -4,
        zIndex: 50,
        boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
      }}
      whileTap={{ scale: 0.94 }}
      title={`Add ${sticker.name}`}
      className="relative cursor-pointer flex flex-col items-center"
      style={{
        background: 'linear-gradient(160deg, #fffdf5 0%, #fdf5e0 100%)',
        padding: '6px 6px 14px 6px',
        borderRadius: '1px',
        border: '1px solid rgba(180,140,80,0.4)',
        boxShadow: '0 3px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
        transform: `rotate(${tilt}deg)`,
        transformOrigin: 'center center',
      }}
    >
      {/* Photo area */}
      <div className="flex items-center justify-center"
        style={{
          width: '52px', height: '52px',
          background: 'linear-gradient(135deg, #f5ead0, #efe0ba)',
          border: '0.5px solid rgba(180,140,80,0.2)',
        }}
      >
        <div className="pointer-events-none scale-90">{sticker.render(46)}</div>
      </div>
      {/* Polaroid caption */}
      <div className="mt-1 text-center font-mono truncate max-w-full"
        style={{ fontSize: '6px', color: '#9b7040', letterSpacing: '0.04em' }}
      >
        {sticker.name.slice(0, 10)}
      </div>
      {/* Sparkle on hover */}
      <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 pointer-events-none">
        <Sparkles size={6} className="text-amber-500 fill-amber-400" />
      </div>
    </motion.button>
  );
}

// ─── Vintage paper label button ───────────────────────────────────────────────
function PaperLabelBtn({ children, onClick, disabled, tilt = 0, variant = 'default' }) {
  const variants = {
    default: { bg: 'linear-gradient(135deg, #fef6e4, #f5e8c8)', border: '#c8a060', color: '#5c3d1e' },
    dark:    { bg: 'linear-gradient(135deg, #3d2008, #5a3015)', border: '#8b5e3c', color: '#f5deb3' },
    accent:  { bg: 'linear-gradient(135deg, #fef0d0, #fde0a0)', border: '#d4a040', color: '#5c3000' },
  };
  const v = variants[variant] || variants.default;
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2, scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      className="relative px-3 py-1.5 text-[10px] font-mono cursor-pointer disabled:opacity-30 transition-all flex items-center gap-1.5"
      style={{
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: '1px',
        color: v.color,
        boxShadow: '0 2px 5px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
        transform: `rotate(${tilt}deg)`,
        letterSpacing: '0.06em',
      }}
    >
      {children}
    </motion.button>
  );
}

export default function StickerPanel({
  onAddSticker,
  onAddText,
  footerText,
  setFooterText,
  pushFooterHistory,
  borderStyle, setBorderStyle,
  photoFilter, setPhotoFilter,
  filterSettings, setFilterSettings,
  customization, setCustomization,
  pushHistory,
  onUndo, onRedo, canUndo, canRedo,
}) {
  const [activeCategory, setActiveCategory] = useState('Vintage');
  const [activeTab, setActiveTab]   = useState('stickers');

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
    { id: 'normal',     name: 'Normal',     desc: 'No Filter' },
    { id: 'vintage',    name: 'Vintage',    desc: 'Analog feel' },
    { id: 'warm',       name: 'Warm',       desc: 'Golden glow' },
    { id: 'dreamy',     name: 'Dreamy',     desc: 'Soft & hazy' },
    { id: 'y2k',        name: 'Y2K Pop',    desc: 'High sat.' },
    { id: 'softglow',   name: 'Soft Glow',  desc: 'Diffused' },
    { id: 'film',       name: 'Film',       desc: 'Cinematic' },
    { id: 'bw',         name: 'B&W',        desc: 'Monochrome' },
    { id: 'sepia',      name: 'Sepia',      desc: 'Retro brown' },
    { id: 'disposable', name: 'Disposable', desc: '90s cam' },
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

  // Notebook-style tabs configuration
  const topTabs = [
    { id: 'stickers', label: 'Stickers', emoji: '🎀' },
    { id: 'text',     label: 'Text',     emoji: '✏️' },
    { id: 'label',    label: 'Labels',   emoji: '🎞️' },
    { id: 'borders',  label: 'Borders',  emoji: '⬜' },
    { id: 'filters',  label: 'Filters',  emoji: '📷' },
    { id: 'adjust',   label: 'Adjust',   emoji: '🎛️' },
    { id: 'layout',   label: 'Layout',   emoji: '⚙️' },
  ];

  // Paper styles for each tab content panel
  const panelPaperStyle = {
    background: 'linear-gradient(160deg, #fdfaf0 0%, #f8f0dc 100%)',
    border: '1.5px solid #c8a060',
    borderTop: 'none',
    borderRadius: '0 4px 4px 4px',
    padding: '14px',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full flex flex-col gap-3"
    >
      {/* ── Undo / Redo strip ────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-1 mb-1">
        <div className="flex items-center gap-1.5">
          <Heart size={11} className="text-rose-500 fill-rose-400 animate-pulse" />
          <span className="font-serif italic text-xs" style={{ color: '#7a5030' }}>Studio</span>
        </div>
        <div className="flex gap-1.5">
          <PaperLabelBtn onClick={onUndo} disabled={!canUndo} tilt={-0.5}>
            <Undo2 size={10} /> Undo
          </PaperLabelBtn>
          <PaperLabelBtn onClick={onRedo} disabled={!canRedo} tilt={0.5}>
            <Redo2 size={10} /> Redo
          </PaperLabelBtn>
        </div>
      </div>

      {/* ── Notebook Folder Tabs ─────────────────────────────────────── */}
      <div className="flex gap-0.5 overflow-x-auto scrollbar-none pb-0" style={{ alignItems: 'flex-end' }}>
        {topTabs.map(tab => (
          <NotebookTab
            key={tab.id}
            label={tab.label}
            emoji={tab.emoji}
            isActive={activeTab === tab.id}
            onClick={() => { playClickSound(); setActiveTab(tab.id); }}
          />
        ))}
      </div>

      {/* ── Panel paper ─────────────────────────────────────────────── */}
      <div style={panelPaperStyle}>
        {/* Subtle paper texture overlay */}
        <div className="absolute inset-0 rounded pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
            borderRadius: '4px',
          }}
        />

        {/* Decorative corner stamp */}
        <div className="absolute top-2 right-2 text-xs opacity-20 pointer-events-none select-none" style={{ transform: 'rotate(5deg)' }}>📮</div>

        {/* Content */}
        <div className="relative z-10 overflow-y-auto scrollbar-thin" style={{ maxHeight: '500px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >

              {/* ╔═ STICKERS ══════════════════════════════════════════════╗ */}
              {activeTab === 'stickers' && (
                <div className="flex flex-col gap-3">
                  {/* Category tabs — like sticky notes */}
                  <div className="flex gap-1 overflow-x-auto scrollbar-none pb-0.5">
                    {categories.map((cat, i) => {
                      const catColors = [
                        { bg: '#ffeedd', border: '#d4a060', active: '#f5e0b0' },
                        { bg: '#eef5ff', border: '#90b8e0', active: '#cce0ff' },
                        { bg: '#fff0f5', border: '#e090b0', active: '#ffd0e0' },
                        { bg: '#f0ffe8', border: '#90c870', active: '#c8f0b0' },
                        { bg: '#fff8e8', border: '#d4b060', active: '#ffe8a0' },
                        { bg: '#f8f0ff', border: '#b090d0', active: '#e0c8ff' },
                        { bg: '#f0f8ff', border: '#80b0d0', active: '#c0e0ff' },
                      ];
                      const c = catColors[i % catColors.length];
                      const isActiveCat = activeCategory === cat;
                      return (
                        <motion.button
                          key={cat}
                          onClick={() => { playClickSound(); setActiveCategory(cat); }}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.94 }}
                          className="shrink-0 cursor-pointer font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.5 transition-all"
                          style={{
                            background: isActiveCat ? c.active : c.bg,
                            border: `1px solid ${c.border}`,
                            borderBottom: isActiveCat ? `2px solid ${c.border}` : `1px solid ${c.border}`,
                            borderRadius: '2px',
                            color: '#5c3d1e',
                            boxShadow: isActiveCat
                              ? '0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)'
                              : '0 1px 2px rgba(0,0,0,0.08)',
                            transform: isActiveCat ? 'translateY(-1px)' : 'none',
                            fontWeight: isActiveCat ? 'bold' : 'normal',
                          }}
                        >{cat}</motion.button>
                      );
                    })}
                  </div>

                  {/* Sticker grid — Polaroid frames */}
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-3"
                    style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
                  >
                    {filteredStickers.map((st, idx) => (
                      <div key={st.id} className="flex justify-center">
                        <StickerPolaroid
                          sticker={st}
                          onClick={() => handleStickerClick(st.id)}
                          index={idx}
                        />
                      </div>
                    ))}
                  </motion.div>

                  <VintageDivider />
                  <p className="text-[9px] text-center font-mono italic" style={{ color: '#9b7040', opacity: 0.8 }}>
                    💡 Click a sticker to place it · Drag &amp; resize on the strip
                  </p>
                </div>
              )}

              {/* ╔═ TEXT ══════════════════════════════════════════════════╗ */}
              {activeTab === 'text' && (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter text…"
                      value={textVal}
                      onChange={e => setTextVal(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleAddTextClick(); }}
                      maxLength={30}
                      className="flex-1 px-3 py-2 text-xs font-serif focus:outline-none transition-all"
                      style={{
                        background: 'rgba(253,245,224,0.8)',
                        border: '1px solid #c8a060',
                        borderRadius: '1px',
                        color: '#3d2008',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                        fontFamily: "'Special Elite', monospace",
                      }}
                    />
                    <PaperLabelBtn onClick={handleAddTextClick} variant="dark">
                      <Type size={10} /> ADD
                    </PaperLabelBtn>
                  </div>

                  <VintageDivider label="Font" />
                  <div className="flex gap-1.5 flex-wrap">
                    {fontsList.map(f => (
                      <motion.button
                        key={f.id}
                        onClick={() => { playClickSound(); setTextFont(f.id); }}
                        whileTap={{ scale: 0.93 }}
                        style={{ ...f.style }}
                        className="px-2.5 py-1 text-xs cursor-pointer transition-all"
                        style={{
                          ...f.style,
                          background: textFont === f.id
                            ? 'linear-gradient(135deg, #fde8b0, #f8d880)'
                            : 'linear-gradient(135deg, #fdf8ec, #f5edd8)',
                          border: textFont === f.id ? '1.5px solid #c8a030' : '1px solid #c8a060',
                          borderRadius: '1px',
                          color: '#3d2008',
                          boxShadow: textFont === f.id ? '0 2px 5px rgba(0,0,0,0.12)' : '0 1px 2px rgba(0,0,0,0.08)',
                          fontWeight: textFont === f.id ? 'bold' : 'normal',
                        }}
                      >{f.name}</motion.button>
                    ))}
                  </div>

                  <VintageDivider label="Color" />
                  <div className="flex gap-2 flex-wrap">
                    {textColors.map(code => (
                      <motion.button
                        key={code}
                        onClick={() => { playClickSound(); setTextColor(code); }}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ backgroundColor: code }}
                        className={`w-6 h-6 rounded-full border-2 shrink-0 transition-all cursor-pointer ${
                          textColor === code ? 'ring-2 ring-offset-1 ring-amber-600 scale-110' : ''
                        }`}
                        style={{
                          backgroundColor: code,
                          width: '24px', height: '24px', borderRadius: '50%',
                          border: textColor === code ? '2px solid #8b5e3c' : '2px solid rgba(180,140,80,0.3)',
                          boxShadow: textColor === code ? '0 0 0 3px rgba(200,160,60,0.4)' : '0 1px 3px rgba(0,0,0,0.15)',
                          cursor: 'pointer',
                        }}
                        title={code}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ╔═ FILM LABEL ════════════════════════════════════════════╗ */}
              {activeTab === 'label' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Edit3 size={12} style={{ color: '#9b7040' }} />
                    <span className="text-[10px] font-serif italic" style={{ color: '#7a5030' }}>
                      Caption shown at the bottom of your strip
                    </span>
                  </div>
                  {/* Simulated film strip label */}
                  <div className="relative">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-lg opacity-30 select-none pointer-events-none">🎞</div>
                    <input
                      type="text"
                      value={footerText}
                      onChange={e => { pushFooterHistory(e.target.value); setFooterText(e.target.value); }}
                      maxLength={20}
                      className="w-full px-4 py-2.5 font-mono text-sm focus:outline-none transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #1a1008, #2c1a0c)',
                        border: '1px solid #6b4020',
                        borderRadius: '1px',
                        color: '#f5deb3',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                        letterSpacing: '0.15em',
                        textAlign: 'center',
                      }}
                      placeholder="Y2K MEMORIES"
                    />
                  </div>
                  <p className="text-[9px] font-mono italic text-center" style={{ color: '#9b7040', opacity: 0.7 }}>
                    Max 20 characters · shown on the strip footer
                  </p>
                </div>
              )}

              {/* ╔═ BORDERS ═══════════════════════════════════════════════╗ */}
              {activeTab === 'borders' && (
                <div className="grid grid-cols-3 gap-2">
                  {borderStylesList.map((b, idx) => {
                    const tilt = (idx % 3 - 1) * 0.8;
                    const isActive = borderStyle === b.id;
                    return (
                      <motion.button
                        key={b.id}
                        onClick={() => handleBorderChange(b.id)}
                        whileHover={{ y: -3, scale: 1.05, rotate: tilt + 1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-1 cursor-pointer transition-all py-2 px-1"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, #fde8b0, #f8d480)'
                            : 'linear-gradient(135deg, #fdfaf0, #f5edd8)',
                          border: isActive ? '1.5px solid #c8a030' : '1px dashed rgba(180,140,80,0.5)',
                          borderRadius: '1px',
                          color: isActive ? '#3d2008' : '#7a5030',
                          transform: `rotate(${tilt}deg)`,
                          boxShadow: isActive ? '0 3px 8px rgba(0,0,0,0.18)' : '0 1px 3px rgba(0,0,0,0.08)',
                          fontWeight: isActive ? 'bold' : 'normal',
                        }}
                      >
                        <span className="text-lg">{b.emoji}</span>
                        <span className="text-[9px] font-mono uppercase tracking-wide text-center truncate w-full">{b.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* ╔═ FILTERS ═══════════════════════════════════════════════╗ */}
              {activeTab === 'filters' && (
                <div className="grid grid-cols-2 gap-2">
                  {filtersList.map((f, idx) => {
                    const tilt = (idx % 2 === 0 ? -0.5 : 0.5);
                    const isActive = photoFilter === f.id;
                    return (
                      <motion.button
                        key={f.id}
                        onClick={() => handleFilterChange(f.id)}
                        whileHover={{ y: -2, scale: 1.03, rotate: tilt + 0.5 }}
                        whileTap={{ scale: 0.97 }}
                        className="p-2.5 text-left cursor-pointer transition-all"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, #fde8b0, #f8d480)'
                            : 'linear-gradient(135deg, #fdfaf0, #f5edd8)',
                          border: isActive ? '1.5px solid #c8a030' : '1px dashed rgba(180,140,80,0.4)',
                          borderRadius: '1px',
                          transform: `rotate(${tilt}deg)`,
                          boxShadow: isActive ? '0 3px 8px rgba(0,0,0,0.18)' : '0 1px 3px rgba(0,0,0,0.08)',
                          color: isActive ? '#3d2008' : '#7a5030',
                          fontWeight: isActive ? 'bold' : 'normal',
                        }}
                      >
                        <span className="text-[10px] font-mono uppercase tracking-wide block">{f.name}</span>
                        <span className="text-[8px] font-mono opacity-60">{f.desc}</span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* ╔═ ADJUST ════════════════════════════════════════════════╗ */}
              {activeTab === 'adjust' && (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {[
                      { key: 'brightness', label: 'BRIGHTNESS', min: 50, max: 150, suffix: '%' },
                      { key: 'contrast',   label: 'CONTRAST',   min: 50, max: 150, suffix: '%' },
                      { key: 'warmth',     label: 'WARMTH',     min:-50, max: 50,  suffix: '' },
                      { key: 'saturation', label: 'SATURATION', min: 0,  max: 200, suffix: '%' },
                      { key: 'grain',      label: 'GRAIN',      min: 0,  max: 100, suffix: '%' },
                      { key: 'fade',       label: 'FADE',       min: 0,  max: 100, suffix: '%' },
                    ].map(s => {
                      const val = filterSettings[s.key] ?? (s.key === 'warmth' ? 0 : 100);
                      const disp = s.key === 'warmth' ? (val > 0 ? `+${val}` : val) : `${val}${s.suffix}`;
                      return (
                        <div key={s.key} className="flex flex-col gap-0.5">
                          <div className="flex justify-between text-[9px] font-mono" style={{ color: '#7a5030' }}>
                            <span>{s.label}</span>
                            <span style={{ color: '#c8a030', fontWeight: 'bold' }}>{disp}</span>
                          </div>
                          <input
                            type="range" min={s.min} max={s.max} value={val}
                            onChange={e => handleSliderChange(s.key, e.target.value)}
                            onMouseUp={handleSliderRelease} onTouchEnd={handleSliderRelease}
                            className="w-full h-1.5 rounded cursor-pointer"
                            style={{
                              background: `linear-gradient(90deg, #c8a030 ${((val - s.min) / (s.max - s.min)) * 100}%, rgba(180,140,60,0.2) 0%)`,
                              accentColor: '#c8a030',
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <PaperLabelBtn onClick={resetFilters} tilt={-0.5}>
                      <RotateCcw size={9} /> Reset
                    </PaperLabelBtn>
                  </div>
                </div>
              )}

              {/* ╔═ LAYOUT ════════════════════════════════════════════════╗ */}
              {activeTab === 'layout' && (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {/* spacing */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between text-[9px] font-mono" style={{ color: '#7a5030' }}>
                        <span>SPACING</span>
                        <span style={{ color: '#c8a030', fontWeight: 'bold' }}>{customization.spacing ?? 12}px</span>
                      </div>
                      <input type="range" min="0" max="24" value={customization.spacing ?? 12}
                        onChange={e => handleCustChange('spacing', Number(e.target.value))}
                        onMouseUp={handleCustRelease} onTouchEnd={handleCustRelease}
                        className="w-full h-1.5 rounded cursor-pointer"
                        style={{ accentColor: '#c8a030' }}
                      />
                    </div>
                    {/* corners */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between text-[9px] font-mono" style={{ color: '#7a5030' }}>
                        <span>CORNERS</span>
                        <span style={{ color: '#c8a030', fontWeight: 'bold' }}>{customization.corners ?? 0}px</span>
                      </div>
                      <input type="range" min="0" max="20" value={customization.corners ?? 0}
                        onChange={e => handleCustChange('corners', Number(e.target.value))}
                        onMouseUp={handleCustRelease} onTouchEnd={handleCustRelease}
                        className="w-full h-1.5 rounded cursor-pointer"
                        style={{ accentColor: '#c8a030' }}
                      />
                    </div>
                    {/* frame bar */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between text-[9px] font-mono" style={{ color: '#7a5030' }}>
                        <span>FRAME BAR</span>
                        <span style={{ color: '#c8a030', fontWeight: 'bold' }}>{customization.frameThickness ?? 24}px</span>
                      </div>
                      <input type="range" min="10" max="32" value={customization.frameThickness ?? 24}
                        onChange={e => handleCustChange('frameThickness', Number(e.target.value))}
                        onMouseUp={handleCustRelease} onTouchEnd={handleCustRelease}
                        className="w-full h-1.5 rounded cursor-pointer"
                        style={{ accentColor: '#c8a030' }}
                      />
                    </div>
                    {/* shadow toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono" style={{ color: '#7a5030' }}>SHADOWS</span>
                      <motion.button
                        onClick={() => { pushHistory(); handleCustChange('shadow', !customization.shadow); }}
                        whileTap={{ scale: 0.92 }}
                        className="w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer"
                        style={{
                          background: customization.shadow
                            ? 'linear-gradient(90deg, #8b5e3c, #c8a030)'
                            : 'rgba(180,140,60,0.3)',
                          border: '1px solid #c8a060',
                        }}
                      >
                        <motion.div
                          animate={{ x: customization.shadow ? 16 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="w-4 h-4 rounded-full"
                          style={{ background: 'linear-gradient(135deg, #fffdf0, #f5e8c8)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                        />
                      </motion.button>
                    </div>
                    {/* frame color */}
                    <div className="col-span-2 flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: '#9b7040' }}>Frame Color</span>
                      <div className="flex gap-2 flex-wrap">
                        {frameColors.map(code => (
                          <motion.button
                            key={code}
                            onClick={() => { pushHistory(); handleCustChange('bgColor', code); }}
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              backgroundColor: code,
                              width: '22px', height: '22px', borderRadius: '50%',
                              border: customization.bgColor === code ? '2px solid #8b5e3c' : '1.5px solid rgba(180,140,60,0.4)',
                              boxShadow: customization.bgColor === code ? '0 0 0 3px rgba(200,160,60,0.4)' : '0 1px 3px rgba(0,0,0,0.15)',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                            title={code}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <PaperLabelBtn onClick={resetLayout} tilt={0.5}>
                      <RotateCcw size={9} /> Reset Layout
                    </PaperLabelBtn>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom decorative washi tape strip ───────────────────────── */}
      <div className="flex gap-1 mt-1 pointer-events-none select-none">
        {['🎀','✂️','📮','🌸','⭐','🎞️','💌'].map((icon, i) => (
          <div key={i} className="text-xs opacity-40" style={{ transform: `rotate(${(i % 3 - 1) * 8}deg)` }}>{icon}</div>
        ))}
      </div>
    </motion.div>
  );
}
