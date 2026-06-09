import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, RotateCw, RotateCcw, Plus, Minus, 
  ArrowUp, ArrowDown, FlipHorizontal, FlipVertical, Copy 
} from 'lucide-react';
import PhotoStrip from './PhotoStrip';
import { stickersList } from '../utils/stickerData';
import { playClickSound } from '../utils/soundSynthesizer';

export default function StickerCanvas({
  photos,
  items = [],
  setItems,
  selectedId,
  setSelectedId,
  canvasRef,
  footerText,
  borderStyle,
  photoFilter,
  filterSettings,
  customization
}) {
  const [isEditingTextId, setIsEditingTextId] = useState(null);

  // Keyboard listener to delete item with Backspace/Delete key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;

      // Don't intercept if user is typing in an input/textarea
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        playClickSound();
        setItems((prev) => prev.filter((item) => item.id !== selectedId));
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, setItems, setSelectedId]);

  const handleDragEnd = (id, event, info) => {
    const container = canvasRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const x = info.point.x - containerRect.left;
    const y = info.point.y - containerRect.top;

    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, x, y } : s))
    );
  };

  // Actions
  const deleteItem = (id, e) => {
    e?.stopPropagation();
    playClickSound();
    setItems((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateItemScale = (id, factor, e) => {
    e?.stopPropagation();
    playClickSound();
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, scale: Math.max(0.3, Math.min(2.5, s.scale + factor)) } : s))
    );
  };

  const updateItemRotate = (id, degrees, e) => {
    e?.stopPropagation();
    playClickSound();
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, rotate: (s.rotate + degrees) % 360 } : s))
    );
  };

  const bringToFront = (id, e) => {
    e?.stopPropagation();
    playClickSound();
    const maxZ = items.reduce((max, s) => Math.max(max, s.zIndex || 50), 50);
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, zIndex: maxZ + 1 } : s))
    );
  };

  const sendToBack = (id, e) => {
    e?.stopPropagation();
    playClickSound();
    const minZ = items.reduce((min, s) => Math.min(min, s.zIndex || 50), 50);
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, zIndex: Math.max(1, minZ - 1) } : s))
    );
  };

  const flipItemH = (id, e) => {
    e?.stopPropagation();
    playClickSound();
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, flipH: !s.flipH } : s))
    );
  };

  const flipItemV = (id, e) => {
    e?.stopPropagation();
    playClickSound();
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, flipV: !s.flipV } : s))
    );
  };

  const duplicateItem = (id, e) => {
    e?.stopPropagation();
    playClickSound();
    const target = items.find((s) => s.id === id);
    if (!target) return;

    const newItem = {
      ...target,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x: target.x + 20, // offset slightly
      y: target.y + 20,
      zIndex: items.length + 50,
    };

    setItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
  };

  const handleUpdateTextContent = (id, newText) => {
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, text: newText } : s))
    );
  };

  const selectedItem = items.find((st) => st.id === selectedId);

  // Custom positioning of the floating toolbar relative to selected item
  const renderFloatingToolbar = (st) => {
    // Determine height offset based on scale to keep toolbar clear of the item content
    const scaleFactor = st.scale || 1.0;
    const baseOffset = st.type === 'text' ? 40 : 65; 
    const finalOffset = scaleFactor * baseOffset + 35;
    
    // Boundary check: if sticker is too close to top edge (y < 100), position toolbar below it
    const isCloseToTop = st.y < 100;
    const toolbarY = isCloseToTop ? st.y + finalOffset : st.y - finalOffset;

    return (
      <div
        className="absolute pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 shadow-xl flex gap-1.5 items-center z-[1000] transition-all"
        style={{
          left: st.x,
          top: toolbarY,
          transform: 'translate(-50%, -50%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rotate Left */}
        <button
          onClick={(e) => updateItemRotate(st.id, -15, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Rotate Left"
        >
          <RotateCcw size={15} />
        </button>
        
        {/* Rotate Right */}
        <button
          onClick={(e) => updateItemRotate(st.id, 15, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Rotate Right"
        >
          <RotateCw size={15} />
        </button>

        <div className="w-px h-4 bg-stone-200 self-center" />

        {/* Zoom In */}
        <button
          onClick={(e) => updateItemScale(st.id, 0.1, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Zoom In"
        >
          <Plus size={15} />
        </button>

        {/* Zoom Out */}
        <button
          onClick={(e) => updateItemScale(st.id, -0.1, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Zoom Out"
        >
          <Minus size={15} />
        </button>

        <div className="w-px h-4 bg-stone-200 self-center" />

        {/* Layering Forward */}
        <button
          onClick={(e) => bringToFront(st.id, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Bring to Front"
        >
          <ArrowUp size={15} />
        </button>

        {/* Layering Backward */}
        <button
          onClick={(e) => sendToBack(st.id, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Send to Back"
        >
          <ArrowDown size={15} />
        </button>

        <div className="w-px h-4 bg-stone-200 self-center" />

        {/* Flip H */}
        <button
          onClick={(e) => flipItemH(st.id, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Flip Horizontal"
        >
          <FlipHorizontal size={15} />
        </button>

        {/* Flip V */}
        <button
          onClick={(e) => flipItemV(st.id, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Flip Vertical"
        >
          <FlipVertical size={15} />
        </button>

        <div className="w-px h-4 bg-stone-200 self-center" />

        {/* Duplicate */}
        <button
          onClick={(e) => duplicateItem(st.id, e)}
          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition"
          title="Duplicate"
        >
          <Copy size={14} />
        </button>

        <div className="w-px h-4 bg-stone-200 self-center" />

        {/* Delete */}
        <button
          onClick={(e) => deleteItem(st.id, e)}
          className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition"
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* CANVAS CONTAINER */}
      <div
        ref={canvasRef}
        className="relative overflow-visible"
        onClick={() => {
          setSelectedId(null);
          setIsEditingTextId(null);
        }}
      >
        <PhotoStrip 
          photos={photos} 
          footerText={footerText} 
          borderStyle={borderStyle}
          photoFilter={photoFilter}
          filterSettings={filterSettings}
          customization={customization}
        />

        {/* Floating elements (Stickers + Texts) */}
        {items.map((st) => {
          const isSelected = selectedId === st.id;
          const isText = st.type === 'text';
          
          let template = null;
          if (!isText) {
            template = stickersList.find((t) => t.id === st.stickerId);
            if (!template) return null;
          }

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
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: st.scale, opacity: st.opacity ?? 1.0 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              style={{
                position: 'absolute',
                left: st.x,
                top: st.y,
                x: '-50%',
                y: '-50%',
                rotate: `${st.rotate}deg`,
                zIndex: st.zIndex || 50,
              }}
              className={`cursor-grab active:cursor-grabbing p-1 flex items-center justify-center rounded-lg transition-shadow ${
                isSelected ? 'ring-2 ring-dashed ring-stone-400 bg-white/5 shadow-md' : ''
              }`}
            >
              {/* Cute visual nodes (dots) on corners for selection frame */}
              {isSelected && (
                <>
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-stone-600 rounded-full -translate-x-[4px] -translate-y-[4px]" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-stone-600 rounded-full translate-x-[4px] -translate-y-[4px]" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-stone-600 rounded-full -translate-x-[4px] translate-y-[4px]" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-stone-600 rounded-full translate-x-[4px] translate-y-[4px]" />
                </>
              )}

              {/* Render item (sticker SVG or custom text) */}
              <div
                style={{
                  transform: `scaleX(${st.flipH ? -1 : 1}) scaleY(${st.flipV ? -1 : 1})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isText ? (
                  isEditingTextId === st.id ? (
                    <input
                      type="text"
                      value={st.text}
                      onChange={(e) => handleUpdateTextContent(st.id, e.target.value)}
                      onBlur={() => setIsEditingTextId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setIsEditingTextId(null);
                      }}
                      autoFocus
                      className="bg-transparent border-none outline-none text-center p-0 m-0 border-b border-stone-300 font-bold focus:ring-0"
                      style={{
                        fontFamily: st.font,
                        color: st.color,
                        fontSize: '24px',
                        width: `${Math.max(60, st.text.length * 14)}px`,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        setIsEditingTextId(st.id);
                      }}
                      style={{
                        fontFamily: st.font,
                        color: st.color,
                        fontSize: '24px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                      }}
                      title="Double click to edit text"
                    >
                      {st.text}
                    </span>
                  )
                ) : (
                  template.render(100)
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Display the Contextual Floating Toolbar for the selected item */}
        {selectedItem && renderFloatingToolbar(selectedItem)}
      </div>
    </div>
  );
}
