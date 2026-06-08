import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Trash2, RotateCw, Plus, Minus, ArrowUp } from 'lucide-react';
import PhotoStrip from './PhotoStrip';
import { stickersList } from '../utils/stickerData';
import { playClickSound } from '../utils/soundSynthesizer';

export default function StickerCanvas({
  photos,
  stickers,
  setStickers,
  selectedId,
  setSelectedId,
  canvasRef,
}) {

  const handleDragEnd = (id, event, info) => {
    const container = canvasRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    // Calculate position relative to container
    // We adjust for scroll position of viewport
    const x = info.point.x - containerRect.left;
    const y = info.point.y - containerRect.top;

    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, x, y } : s))
    );
  };

  const deleteSticker = (id, e) => {
    e.stopPropagation();
    playClickSound();
    setStickers((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateStickerScale = (id, factor, e) => {
    e.stopPropagation();
    playClickSound();
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, scale: Math.max(0.4, Math.min(2.5, s.scale + factor)) } : s))
    );
  };

  const updateStickerRotate = (id, degrees, e) => {
    e.stopPropagation();
    playClickSound();
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, rotate: (s.rotate + degrees) % 360 } : s))
    );
  };

  const bringToFront = (id, e) => {
    e.stopPropagation();
    playClickSound();
    // Find the highest z-index and increment
    const maxZ = stickers.reduce((max, s) => Math.max(max, s.zIndex || 10), 10);
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, zIndex: maxZ + 1 } : s))
    );
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Scrollable Container wrapper with relative positioning for stickers */}
      <div
        ref={canvasRef}
        className="relative overflow-visible rounded-[2.5rem]"
        onClick={() => setSelectedId(null)}
      >
        <PhotoStrip photos={photos} />

        {/* Sticker instances */}
        {stickers.map((st) => {
          const template = stickersList.find((t) => t.id === st.stickerId);
          if (!template) return null;

          const isSelected = selectedId === st.id;

          return (
            <motion.div
              key={st.id}
              drag
              dragConstraints={canvasRef}
              dragElastic={0}
              dragMomentum={false}
              onDragStart={() => setSelectedId(st.id)}
              onDragEnd={(e, info) => handleDragEnd(st.id, e, info)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(st.id);
              }}
              style={{
                position: 'absolute',
                left: st.x,
                top: st.y,
                x: '-50%',
                y: '-50%',
                scale: st.scale,
                rotate: `${st.rotate}deg`,
                zIndex: st.zIndex || 10,
              }}
              className={`cursor-grab active:cursor-grabbing p-1 flex items-center justify-center rounded-lg ${
                isSelected ? 'border border-dashed border-barbie-hot/80 bg-white/20 shadow-sm' : ''
              }`}
            >
              {/* On-Sticker Action Controls */}
              {isSelected && (
                <div className="absolute -top-7 -right-7 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 shadow-md pointer-events-auto cursor-pointer z-50 transition-colors" onClick={(e) => deleteSticker(st.id, e)}>
                  <Trash2 size={12} />
                </div>
              )}

              {/* Render vector SVG */}
              {template.render(100)}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Sticker Quick Control Panel */}
      {selectedId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-2xl bg-white border border-barbie-baby/80 shadow-md flex flex-col items-center gap-3 w-full max-w-[300px]"
        >
          <div className="text-xs font-extrabold text-barbie-hot tracking-wide uppercase">
            Edit Selected Sticker
          </div>
          
          <div className="flex gap-2 justify-center">
            {/* Scale Down */}
            <button
              onClick={(e) => updateStickerScale(selectedId, -0.15, e)}
              className="w-10 h-10 rounded-full bg-barbie-light border border-barbie-baby text-barbie-hot flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
              title="Scale Down"
            >
              <Minus size={16} />
            </button>

            {/* Scale Up */}
            <button
              onClick={(e) => updateStickerScale(selectedId, 0.15, e)}
              className="w-10 h-10 rounded-full bg-barbie-light border border-barbie-baby text-barbie-hot flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
              title="Scale Up"
            >
              <Plus size={16} />
            </button>

            {/* Rotate Left */}
            <button
              onClick={(e) => updateStickerRotate(selectedId, -15, e)}
              className="w-10 h-10 rounded-full bg-barbie-light border border-barbie-baby text-barbie-hot flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
              title="Rotate Left"
              style={{ transform: 'scaleX(-1)' }}
            >
              <RotateCw size={16} />
            </button>

            {/* Rotate Right */}
            <button
              onClick={(e) => updateStickerRotate(selectedId, 15, e)}
              className="w-10 h-10 rounded-full bg-barbie-light border border-barbie-baby text-barbie-hot flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
              title="Rotate Right"
            >
              <RotateCw size={16} />
            </button>

            {/* Layer to Front */}
            <button
              onClick={(e) => bringToFront(selectedId, e)}
              className="w-10 h-10 rounded-full bg-barbie-light border border-barbie-baby text-barbie-hot flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
              title="Bring to Front"
            >
              <ArrowUp size={16} />
            </button>

            {/* Delete */}
            <button
              onClick={(e) => deleteSticker(selectedId, e)}
              className="w-10 h-10 rounded-full bg-rose-100 border border-rose-300 text-rose-500 flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
