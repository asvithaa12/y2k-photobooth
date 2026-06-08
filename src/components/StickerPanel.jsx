import React, { useState } from 'react';
import { stickersList } from '../utils/stickerData';
import { playClickSound } from '../utils/soundSynthesizer';
import { Sparkles } from 'lucide-react';

export default function StickerPanel({ onAddSticker }) {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Cute', 'Logos', 'Slogans', 'Dollhouse'];

  const filteredStickers = activeCategory === 'All'
    ? stickersList
    : stickersList.filter(s => s.category === activeCategory);

  const handleStickerClick = (stickerId) => {
    playClickSound();
    onAddSticker(stickerId);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 border-2 border-barbie-baby/60 shadow-lg select-none">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playClickSound();
              setActiveCategory(cat);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-barbie-hot text-white shadow-md'
                : 'bg-barbie-light text-barbie-hot hover:bg-barbie-baby/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-3 max-h-[200px] overflow-y-auto pr-1">
        {filteredStickers.map((st) => (
          <button
            key={st.id}
            onClick={() => handleStickerClick(st.id)}
            className="aspect-square bg-barbie-light/30 border border-dashed border-barbie-primary/30 hover:border-barbie-hot/60 rounded-2xl flex items-center justify-center p-1.5 transition-all hover:scale-105 hover:bg-barbie-light/70 shadow-sm relative group"
            title={`Add ${st.name}`}
          >
            {/* Display Sticker preview scaled down */}
            <div className="w-full h-full flex items-center justify-center pointer-events-none">
              {st.render(50)}
            </div>
            
            {/* Sparkle badge on hover */}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles size={8} className="text-barbie-gold fill-barbie-gold" />
            </div>
          </button>
        ))}
      </div>
      
      {/* Tip Text */}
      <div className="mt-3 text-[10px] text-center text-slate-400 font-medium italic">
        💡 Click a sticker to add, then drag it, resize it, or rotate it!
      </div>
    </div>
  );
}
