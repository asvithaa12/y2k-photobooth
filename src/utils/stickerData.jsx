import React from 'react';

// Helpers for unified rendering
const EmojiSticker = ({ emoji, size = 80, rotate = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg" style={{ transform: `rotate(${rotate}deg)` }}>
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="70" paintOrder="stroke fill" stroke="#FFF" strokeWidth="3">
      {emoji}
    </text>
  </svg>
);

const TextSticker = ({ text, font, color1, color2, size = 150 }) => (
  <svg width={size} height={size * 0.4} viewBox="0 0 200 80" className="drop-shadow-md">
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily={font} fontSize="32" fill={color1} stroke="#FFF" strokeWidth="6" paintOrder="stroke fill">
      {text}
    </text>
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily={font} fontSize="32" fill={color2}>
      {text}
    </text>
  </svg>
);

export const stickersList = [
  // ===================== SCRAPBOOK / VINTAGE =====================
  { 
    id: 'sb-spotify', 
    name: 'Spotify Card', 
    category: 'Vintage', 
    render: (size) => (
      <svg width={size || 130} height={(size || 130) * 1.25} viewBox="0 0 140 175" className="drop-shadow-lg" style={{ transform: 'rotate(-3deg)' }}>
        <rect x="0" y="0" width="140" height="175" fill="#c4a497" rx="6" stroke="#fff" strokeWidth="2" />
        <rect x="10" y="10" width="120" height="110" fill="#fff" rx="4" />
        <text x="70" y="45" fontFamily="serif" fontSize="10" fill="#444" fontWeight="bold" textAnchor="middle">Oh, darling, all of the</text>
        <text x="70" y="60" fontFamily="serif" fontSize="10" fill="#444" fontWeight="bold" textAnchor="middle">city lights</text>
        <text x="70" y="75" fontFamily="serif" fontSize="10" fill="#444" fontWeight="bold" textAnchor="middle">Never shine as bright</text>
        <text x="70" y="90" fontFamily="serif" fontSize="10" fill="#444" fontWeight="bold" textAnchor="middle">as your eyes ✨</text>
        
        <text x="12" y="138" fontFamily="sans-serif" fontSize="8" fill="#333" fontWeight="bold">Car's Outside</text>
        <text x="12" y="148" fontFamily="sans-serif" fontSize="6.5" fill="#666">James Arthur</text>
        
        <circle cx="120" cy="142" r="7" fill="#1db954" />
        <path d="M 117 142 Q 120 139 123 142 M 117 144 Q 120 141 123 144 M 118 146 Q 120 143 122 146" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  { id: 'sb-tulips', name: 'Tulips', category: 'Vintage', render: (size) => <EmojiSticker emoji="🌷" size={size || 80} /> },
  { id: 'sb-disco', name: 'Disco Ball', category: 'Vintage', render: (size) => <EmojiSticker emoji="🪩" size={size || 80} /> },
  { id: 'sb-envelope', name: 'Love Letter', category: 'Vintage', render: (size) => <EmojiSticker emoji="💌" size={size || 80} rotate={10} /> },
  { id: 'sb-bandaid', name: 'Band-Aid', category: 'Vintage', render: (size) => <EmojiSticker emoji="🩹" size={size || 80} rotate={35} /> },
  { id: 'sb-kiss', name: 'Red Lips', category: 'Vintage', render: (size) => <EmojiSticker emoji="💋" size={size || 80} rotate={-10} /> },
  { id: 'sb-silverstar', name: 'Silver Star', category: 'Vintage', render: (size) => (
      <svg width={size || 80} height={size || 80} viewBox="0 0 100 100" className="drop-shadow-lg">
        <path d="M50 5 L63 35 L95 38 L70 60 L78 90 L50 75 L22 90 L30 60 L5 38 L37 35 Z" fill="url(#silver-grad)" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <defs>
          <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#dcdcdc" />
            <stop offset="70%" stopColor="#a9a9a9" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
    ) 
  },
  { id: 'sb-loveyou', name: 'Love You Text', category: 'Vintage', render: (size) => <TextSticker text="love you..." font="'Pacifico', cursive" color1="#fff" color2="#c4a497" size={size || 130} /> },
  { id: 'sb-flower', name: 'Pink Flower', category: 'Vintage', render: (size) => <EmojiSticker emoji="🌸" size={size || 80} /> },
  { id: 'sb-moon', name: 'Moon', category: 'Vintage', render: (size) => <EmojiSticker emoji="🌕" size={size || 75} /> },
  { id: 'sb-ticket', name: 'Vintage Ticket', category: 'Vintage', render: (size) => (
    <svg width={size || 120} height={(size || 120) * 0.5} viewBox="0 0 120 60" className="drop-shadow-md">
      <path d="M 0 6 L 120 6 A 6 6 0 0 1 120 18 L 120 42 A 6 6 0 0 1 120 54 L 0 54 A 6 6 0 0 1 0 42 L 0 18 A 6 6 0 0 1 0 6" fill="#f4ebe1" stroke="#c8b59e" strokeWidth="1.5" />
      <line x1="28" y1="6" x2="28" y2="54" stroke="#c8b59e" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="14" y="34" fontFamily="serif" fontSize="10" fill="#88725a" transform="rotate(-90 14 34)" textAnchor="middle" letterSpacing="2">ADMIT ONE</text>
      <text x="74" y="35" fontFamily="monospace" fontSize="13" fill="#88725a" textAnchor="middle" fontWeight="bold" letterSpacing="1">★ MEMORIES ★</text>
      <text x="74" y="48" fontFamily="monospace" fontSize="8" fill="#a08a72" textAnchor="middle">Nº 2026-0609</text>
    </svg>
  ) },

  // ===================== Y2K =====================
  { id: 'y2k-cyberstar', name: 'Y2K Cyber Star', category: 'Y2K', render: (size) => (
    <svg width={size || 80} height={size || 80} viewBox="0 0 100 100" className="drop-shadow-lg">
      <path d="M 50 10 C 50 40, 40 50, 10 50 C 40 50, 50 60, 50 90 C 50 60, 60 50, 90 50 C 60 50, 50 40, 50 10 Z" fill="url(#y2k-star-grad)" stroke="#fff" strokeWidth="2" />
      <circle cx="50" cy="50" r="8" fill="#fff" opacity="0.8" />
      <defs>
        <linearGradient id="y2k-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
    </svg>
  ) },
  { id: 'y2k-butterfly', name: 'Cyber Butterfly', category: 'Y2K', render: (size) => <EmojiSticker emoji="🦋" size={size || 80} rotate={-10} /> },
  { id: 'y2k-cd', name: 'Shiny CD', category: 'Y2K', render: (size) => <EmojiSticker emoji="💿" size={size || 80} /> },
  { id: 'y2k-flip', name: 'Y2K Flip Phone', category: 'Y2K', render: (size) => <EmojiSticker emoji="📟" size={size || 80} rotate={15} /> },
  { id: 'y2k-headphones', name: 'Retro Headphones', category: 'Y2K', render: (size) => <EmojiSticker emoji="🎧" size={size || 80} /> },
  { id: 'y2k-fire', name: 'Cyber Flame', category: 'Y2K', render: (size) => <EmojiSticker emoji="🔥" size={size || 80} /> },
  { id: 'y2k-heart', name: 'Metallic Heart', category: 'Y2K', render: (size) => (
    <svg width={size || 80} height={size || 80} viewBox="0 0 100 100" className="drop-shadow-lg">
      <path d="M 50 84 C 50 84, 15 58, 15 35 C 15 18, 32 12, 50 30 C 68 12, 85 18, 85 35 C 85 58, 50 84, 50 84 Z" fill="url(#metal-heart-grad)" stroke="#fff" strokeWidth="2.5" />
      <path d="M 28 32 C 28 26, 38 22, 45 32" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <defs>
        <linearGradient id="metal-heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#c084fc" />
          <stop offset="70%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
    </svg>
  ) },
  { id: 'y2k-alien', name: 'Alien Glow', category: 'Y2K', render: (size) => <EmojiSticker emoji="👽" size={size || 75} /> },
  { id: 'y2k-barcode', name: 'Y2K Barcode', category: 'Y2K', render: (size) => (
    <svg width={size || 100} height={(size || 100) * 0.4} viewBox="0 0 100 40" className="drop-shadow-md">
      <rect x="0" y="0" width="100" height="40" fill="#fff" rx="2" stroke="#bbb" strokeWidth="0.5" />
      <path d="M 8 5 V 30 M 12 5 V 30 M 15 5 V 30 M 20 5 V 30 M 22 5 V 30 M 28 5 V 30 M 34 5 V 30 M 38 5 V 30 M 42 5 V 30 M 48 5 V 30 M 52 5 V 30 M 55 5 V 30 M 60 5 V 30 M 65 5 V 30 M 70 5 V 30 M 74 5 V 30 M 80 5 V 30 M 85 5 V 30 M 88 5 V 30 M 92 5 V 30" stroke="#000" strokeWidth="2.5" />
      <text x="50" y="37" fontFamily="monospace" fontSize="6.5" fill="#000" textAnchor="middle">2000-0609-Y2K</text>
    </svg>
  ) },

  // ===================== COQUETTE =====================
  { id: 'coq-bow-pink', name: 'Pink Bow', category: 'Coquette', render: (size) => (
    <svg width={size || 90} height={(size || 90) * 0.8} viewBox="0 0 100 80" className="drop-shadow-lg">
      <path d="M 50 35 C 32 10, 10 25, 25 50 C 35 60, 48 40, 50 35 Z" fill="#ffb6c1" stroke="#f472b6" strokeWidth="2" />
      <path d="M 50 35 C 68 10, 90 25, 75 50 C 65 60, 52 40, 50 35 Z" fill="#ffb6c1" stroke="#f472b6" strokeWidth="2" />
      {/* Ribbons hanging */}
      <path d="M 48 37 C 40 50, 25 70, 15 75 C 22 75, 38 65, 48 42 Z" fill="#ff9eb5" stroke="#f472b6" strokeWidth="1" />
      <path d="M 52 37 C 60 50, 75 70, 85 75 C 78 75, 62 65, 52 42 Z" fill="#ff9eb5" stroke="#f472b6" strokeWidth="1" />
      <circle cx="50" cy="36" r="6" fill="#ffb6c1" stroke="#f472b6" strokeWidth="2" />
    </svg>
  ) },
  { id: 'coq-cherries', name: 'Cherries', category: 'Coquette', render: (size) => <EmojiSticker emoji="🍒" size={size || 80} /> },
  { id: 'coq-wings', name: 'Angel Wings', category: 'Coquette', render: (size) => (
    <svg width={size || 110} height={(size || 110) * 0.5} viewBox="0 0 110 50" className="drop-shadow-lg">
      <path d="M 50 25 C 40 20, 20 5, 5 22 C -2 30, 8 45, 25 40 C 35 37, 45 30, 50 25 Z" fill="#fffefb" stroke="#fbcfe8" strokeWidth="1.5" />
      <path d="M 50 25 C 60 20, 80 5, 95 22 C 102 30, 92 45, 75 40 C 65 37, 55 30, 50 25 Z" fill="#fffefb" stroke="#fbcfe8" strokeWidth="1.5" />
      <path d="M 25 25 C 18 20, 10 18, 8 26" fill="none" stroke="#fbcfe8" strokeWidth="1" />
      <path d="M 85 25 C 92 20, 90 18, 92 26" fill="none" stroke="#fbcfe8" strokeWidth="1" />
    </svg>
  ) },
  { id: 'coq-rose', name: 'Pink Rosebud', category: 'Coquette', render: (size) => <EmojiSticker emoji="🌹" size={size || 80} /> },
  { id: 'coq-ballet', name: 'Ballet Shoes', category: 'Coquette', render: (size) => <EmojiSticker emoji="🩰" size={size || 80} /> },
  { id: 'coq-pearls', name: 'Pearl Bow', category: 'Coquette', render: (size) => (
    <svg width={size || 95} height={(size || 95) * 0.4} viewBox="0 0 100 42" className="drop-shadow-md">
      <path d="M 10 20 Q 50 35 90 20" fill="none" stroke="url(#pearl-grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="0.1 10" />
      <circle cx="50" cy="12" r="5" fill="#fbcfe8" />
      <path d="M 50 12 C 40 2, 35 15, 50 12 C 60 2, 65 15, 50 12 Z" fill="none" stroke="#f472b6" strokeWidth="2" />
      <defs>
        <radialGradient id="pearl-grad">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#fff5f5" />
          <stop offset="100%" stopColor="#e2d2d2" />
        </radialGradient>
      </defs>
    </svg>
  ) },
  { id: 'coq-corset', name: 'Lace Corset', category: 'Coquette', render: (size) => (
    <svg width={size || 80} height={size || 80} viewBox="0 0 80 80" className="drop-shadow-md">
      <path d="M 15 10 C 22 25, 25 55, 20 70 L 60 70 C 55 55, 58 25, 65 10 Z" fill="#ffe4e1" stroke="#f472b6" strokeWidth="2" />
      <path d="M 15 10 C 25 15, 55 15, 65 10" fill="none" stroke="#fbcfe8" strokeWidth="1.5" />
      {/* Corset Laces */}
      <path d="M 33 20 L 47 30 M 47 20 L 33 30 M 33 35 L 47 45 M 47 35 L 33 45 M 33 50 L 47 60 M 47 50 L 33 60" stroke="#f472b6" strokeWidth="1.5" />
      <circle cx="33" cy="20" r="1.5" fill="#f472b6" />
      <circle cx="47" cy="20" r="1.5" fill="#f472b6" />
      <circle cx="33" cy="30" r="1.5" fill="#f472b6" />
      <circle cx="47" cy="30" r="1.5" fill="#f472b6" />
      <circle cx="33" cy="35" r="1.5" fill="#f472b6" />
      <circle cx="47" cy="35" r="1.5" fill="#f472b6" />
      <circle cx="33" cy="45" r="1.5" fill="#f472b6" />
      <circle cx="47" cy="45" r="1.5" fill="#f472b6" />
      <circle cx="33" cy="50" r="1.5" fill="#f472b6" />
      <circle cx="47" cy="50" r="1.5" fill="#f472b6" />
      <circle cx="33" cy="60" r="1.5" fill="#f472b6" />
      <circle cx="47" cy="60" r="1.5" fill="#f472b6" />
    </svg>
  ) },
  { id: 'coq-mirror', name: 'Ornate Mirror', category: 'Coquette', render: (size) => (
    <svg width={size || 80} height={size || 80} viewBox="0 0 80 80" className="drop-shadow-md">
      <ellipse cx="40" cy="35" rx="20" ry="25" fill="#e0f2fe" stroke="#fbcfe8" strokeWidth="5" />
      <path d="M 40 60 L 40 75 M 30 75 L 50 75" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" />
      {/* Decorative scrolls */}
      <path d="M 40 10 Q 40 5 45 10 Q 50 5 40 10 M 20 35 Q 15 35 20 40 M 60 35 Q 65 35 60 40" fill="none" stroke="#f472b6" strokeWidth="1.5" />
    </svg>
  ) },

  // ===================== BEAUTY =====================
  { id: 'bt-lipstick', name: 'Lipstick', category: 'Beauty', render: (size) => <EmojiSticker emoji="💄" size={size || 80} rotate={10} /> },
  { id: 'bt-mirror', name: 'Hand Mirror', category: 'Beauty', render: (size) => <EmojiSticker emoji="🪞" size={size || 80} /> },
  { id: 'bt-polish', name: 'Nail Polish', category: 'Beauty', render: (size) => <EmojiSticker emoji="💅" size={size || 80} /> },
  { id: 'bt-sunglasses', name: 'Retro Shades', category: 'Beauty', render: (size) => <EmojiSticker emoji="🕶️" size={size || 80} rotate={-5} /> },
  { id: 'bt-comb', name: 'Hair Brush', category: 'Beauty', render: (size) => <EmojiSticker emoji="🪮" size={size || 80} /> },
  { id: 'bt-crown', name: 'Sparkle Crown', category: 'Beauty', render: (size) => <EmojiSticker emoji="👑" size={size || 80} /> },
  { id: 'bt-ring', name: 'Diamond Ring', category: 'Beauty', render: (size) => <EmojiSticker emoji="💍" size={size || 80} /> },
  { id: 'bt-clawclip', name: 'Hair Claw Clip', category: 'Beauty', render: (size) => (
    <svg width={size || 85} height={(size || 85) * 0.5} viewBox="0 0 100 50" className="drop-shadow-md">
      <path d="M 10 35 C 10 35, 12 15, 50 15 C 88 15, 90 35, 90 35 C 90 35, 80 40, 75 35 C 70 30, 60 45, 50 35 C 40 45, 30 30, 25 35 C 20 40, 10 35, 10 35 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
      <circle cx="50" cy="15" r="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
      {/* Clip claws */}
      <path d="M 20 35 L 22 45 M 35 35 L 37 45 M 50 35 L 50 45 M 65 35 L 63 45 M 80 35 L 78 45" stroke="#db2777" strokeWidth="2.5" />
    </svg>
  ) },

  // ===================== CUTE =====================
  { id: 'ct-teddy', name: 'Teddy Bear', category: 'Cute', render: (size) => <EmojiSticker emoji="🧸" size={size || 80} /> },
  { id: 'ct-milk', name: 'Strawberry Milk', category: 'Cute', render: (size) => <EmojiSticker emoji="🥛" size={size || 75} /> },
  { id: 'ct-strawberry', name: 'Cute Strawberry', category: 'Cute', render: (size) => <EmojiSticker emoji="🍓" size={size || 80} /> },
  { id: 'ct-cupcake', name: 'Sweet Cupcake', category: 'Cute', render: (size) => <EmojiSticker emoji="🧁" size={size || 80} /> },
  { id: 'ct-cat', name: 'Cute Kitten', category: 'Cute', render: (size) => <EmojiSticker emoji="🐱" size={size || 80} /> },
  { id: 'ct-bunny', name: 'Cute Bunny', category: 'Cute', render: (size) => <EmojiSticker emoji="🐰" size={size || 80} /> },
  { id: 'ct-sparkles', name: 'Magic Sparkles', category: 'Cute', render: (size) => <EmojiSticker emoji="✨" size={size || 80} /> },
  { id: 'ct-cloud', name: 'Happy Cloud', category: 'Cute', render: (size) => <EmojiSticker emoji="☁️" size={size || 80} /> },

  // ===================== HELLO KITTY =====================
  { id: 'hk-face', name: 'Hello Kitty Face', category: 'Hello Kitty', render: (size) => (
    <svg width={size || 85} height={(size || 85) * 0.85} viewBox="0 0 100 85" className="drop-shadow-lg">
      <ellipse cx="50" cy="45" rx="38" ry="30" fill="#fff" stroke="#000" strokeWidth="3.5" />
      {/* Ears */}
      <path d="M 18 25 C 10 15, 20 2, 32 18" fill="#fff" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M 82 25 C 90 15, 80 2, 68 18" fill="#fff" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Eyes */}
      <ellipse cx="33" cy="45" rx="3.5" ry="5" fill="#000" />
      <ellipse cx="67" cy="45" rx="3.5" ry="5" fill="#000" />
      {/* Nose */}
      <ellipse cx="50" cy="53" rx="4.5" ry="3.5" fill="#ffd700" stroke="#000" strokeWidth="1" />
      {/* Whiskers */}
      <line x1="12" y1="42" x2="24" y2="44" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="10" y1="50" x2="22" y2="50" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="12" y1="58" x2="24" y2="56" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      
      <line x1="88" y1="42" x2="76" y2="44" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="90" y1="50" x2="78" y2="50" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="88" y1="58" x2="76" y2="56" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      {/* Bow */}
      <path d="M 68 28 C 64 20, 56 26, 62 30 C 58 36, 68 40, 72 34 C 76 40, 84 34, 80 30 Z" fill="#ff4d4d" stroke="#000" strokeWidth="2.5" />
      <circle cx="71" cy="30" r="3.5" fill="#ff4d4d" stroke="#000" strokeWidth="2.5" />
    </svg>
  ) },
  { id: 'hk-bow', name: 'Kitty Red Bow', category: 'Hello Kitty', render: (size) => <EmojiSticker emoji="🎀" size={size || 80} rotate={-10} /> },
  { id: 'hk-apple', name: 'Kitty Red Apple', category: 'Hello Kitty', render: (size) => <EmojiSticker emoji="🍎" size={size || 75} /> },
  { id: 'hk-milk', name: 'HK Milk Box', category: 'Hello Kitty', render: (size) => (
    <svg width={size || 75} height={(size || 75) * 1.3} viewBox="0 0 60 78" className="drop-shadow-md">
      <path d="M 5 25 L 30 10 L 55 25 L 55 75 L 5 75 Z" fill="#ffe4e1" stroke="#000" strokeWidth="2" />
      <path d="M 5 25 L 55 25 M 30 10 L 30 25" stroke="#000" strokeWidth="1.5" />
      {/* Hello Kitty head sketch */}
      <ellipse cx="30" cy="48" rx="14" ry="11" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <circle cx="25" cy="48" r="1.5" fill="#000" />
      <circle cx="35" cy="48" r="1.5" fill="#000" />
      <ellipse cx="30" cy="51" rx="2" ry="1.2" fill="#ffeb3b" />
      <path d="M 38 41 C 36 38, 38 39, 41 42" fill="#f44336" />
      <text x="30" y="70" fontFamily="sans-serif" fontSize="7" fill="#db2777" fontWeight="bold" textAnchor="middle">MILK</text>
    </svg>
  ) },
  { id: 'hk-tulip', name: 'Kitty Tulip', category: 'Hello Kitty', render: (size) => <EmojiSticker emoji="🌼" size={size || 80} /> },

  // ===================== DECORATIONS =====================
  { id: 'dec-washi-pink', name: 'Pink Washi Tape', category: 'Decorations', render: (size) => (
    <svg width={size || 120} height={(size || 120) * 0.28} viewBox="0 0 120 34" className="drop-shadow-sm opacity-85">
      <path d="M 4 2 L 116 2 L 118 8 L 115 15 L 117 22 L 114 32 L 6 32 L 3 24 L 5 15 L 2 8 Z" fill="#ffb6c1" stroke="#ffa07a" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="15" y1="2" x2="30" y2="32" stroke="white" strokeWidth="2" opacity="0.4" />
      <line x1="40" y1="2" x2="55" y2="32" stroke="white" strokeWidth="2" opacity="0.4" />
      <line x1="65" y1="2" x2="80" y2="32" stroke="white" strokeWidth="2" opacity="0.4" />
      <line x1="90" y1="2" x2="105" y2="32" stroke="white" strokeWidth="2" opacity="0.4" />
    </svg>
  ) },
  { id: 'dec-washi-blue', name: 'Grid Washi Tape', category: 'Decorations', render: (size) => (
    <svg width={size || 120} height={(size || 120) * 0.28} viewBox="0 0 120 34" className="drop-shadow-sm opacity-85">
      <path d="M 5 3 L 115 3 L 118 10 L 114 17 L 117 24 L 115 31 L 5 31 L 2 24 L 6 17 L 3 10 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.5" />
      <path d="M 0 8 H 120 M 0 16 H 120 M 0 24 H 120" stroke="#bae6fd" strokeWidth="1" opacity="0.6" />
      <path d="M 15 0 V 34 M 35 0 V 34 M 55 0 V 34 M 75 0 V 34 M 95 0 V 34 M 115 0 V 34" stroke="#bae6fd" strokeWidth="1" opacity="0.6" />
    </svg>
  ) },
  { id: 'dec-washi-beige', name: 'Floral Washi Tape', category: 'Decorations', render: (size) => (
    <svg width={size || 120} height={(size || 120) * 0.28} viewBox="0 0 120 34" className="drop-shadow-sm opacity-85">
      <path d="M 4 2 L 116 2 L 119 9 L 114 16 L 118 23 L 114 32 L 4 32 L 2 24 L 5 16 L 2 9 Z" fill="#faf5e6" stroke="#dcd6c5" strokeWidth="0.5" />
      {/* Tiny flower drawings */}
      <circle cx="20" cy="17" r="3" fill="#fbcfe8" /><circle cx="20" cy="17" r="1" fill="#fcd34d" />
      <circle cx="50" cy="17" r="3" fill="#fbcfe8" /><circle cx="50" cy="17" r="1" fill="#fcd34d" />
      <circle cx="80" cy="17" r="3" fill="#fbcfe8" /><circle cx="80" cy="17" r="1" fill="#fcd34d" />
      <circle cx="100" cy="17" r="3" fill="#fbcfe8" /><circle cx="100" cy="17" r="1" fill="#fcd34d" />
    </svg>
  ) },
  { id: 'dec-paperclip-pink', name: 'Pink Paperclip', category: 'Decorations', render: (size) => (
    <svg width={size || 45} height={size || 45} viewBox="0 0 40 40" className="drop-shadow-md" style={{ transform: 'rotate(25deg)' }}>
      <path d="M 10 30 L 10 10 A 8 8 0 0 1 26 10 L 26 26 A 5 5 0 0 1 16 26 L 16 12 A 2 2 0 0 1 20 12 L 20 22 A 2 2 0 0 0 24 22 L 24 10 A 5 5 0 0 0 14 10 L 14 26 A 8 8 0 0 0 30 26 L 30 10" fill="none" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ) },
  { id: 'dec-paperclip-silver', name: 'Silver Paperclip', category: 'Decorations', render: (size) => (
    <svg width={size || 45} height={size || 45} viewBox="0 0 40 40" className="drop-shadow-md" style={{ transform: 'rotate(-15deg)' }}>
      <path d="M 10 30 L 10 10 A 8 8 0 0 1 26 10 L 26 26 A 5 5 0 0 1 16 26 L 16 12 A 2 2 0 0 1 20 12 L 20 22 A 2 2 0 0 0 24 22 L 24 10 A 5 5 0 0 0 14 10 L 14 26 A 8 8 0 0 0 30 26 L 30 10" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ) },
  { id: 'dec-safety-pin', name: 'Safety Pin', category: 'Decorations', render: (size) => (
    <svg width={size || 55} height={size || 55} viewBox="0 0 60 60" className="drop-shadow-md">
      <path d="M 15 45 L 40 15 A 8 8 0 0 1 52 23 L 28 52 A 6 6 0 1 1 15 45 Z" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
      <path d="M 40 10 C 45 8, 55 12, 53 18 C 50 22, 45 20, 38 15 Z" fill="#ffd700" stroke="#94a3b8" strokeWidth="1" />
      <circle cx="20" cy="48" r="4" fill="#94a3b8" />
    </svg>
  ) },
  { id: 'dec-push-pin', name: 'Push Pin', category: 'Decorations', render: (size) => <EmojiSticker emoji="📌" size={size || 60} rotate={15} /> },
  
  // Polaroid Photo Corners (designed as triangles with a slit)
  { id: 'dec-corner-tl', name: 'Photo Corner TL', category: 'Decorations', render: (size) => (
    <svg width={size || 40} height={size || 40} viewBox="0 0 40 40" className="drop-shadow-sm">
      <path d="M 0 0 L 35 0 L 0 35 Z" fill="#faf8f0" stroke="#dbd3be" strokeWidth="1" />
      <line x1="5" y1="25" x2="25" y2="5" stroke="#ccc" strokeWidth="1.5" />
    </svg>
  ) },
  { id: 'dec-corner-tr', name: 'Photo Corner TR', category: 'Decorations', render: (size) => (
    <svg width={size || 40} height={size || 40} viewBox="0 0 40 40" className="drop-shadow-sm">
      <path d="M 40 0 L 5 0 L 40 35 Z" fill="#faf8f0" stroke="#dbd3be" strokeWidth="1" />
      <line x1="35" y1="25" x2="15" y2="5" stroke="#ccc" strokeWidth="1.5" />
    </svg>
  ) },
  { id: 'dec-corner-bl', name: 'Photo Corner BL', category: 'Decorations', render: (size) => (
    <svg width={size || 40} height={size || 40} viewBox="0 0 40 40" className="drop-shadow-sm">
      <path d="M 0 40 L 35 40 L 0 5 Z" fill="#faf8f0" stroke="#dbd3be" strokeWidth="1" />
      <line x1="5" y1="15" x2="25" y2="35" stroke="#ccc" strokeWidth="1.5" />
    </svg>
  ) },
  { id: 'dec-corner-br', name: 'Photo Corner BR', category: 'Decorations', render: (size) => (
    <svg width={size || 40} height={size || 40} viewBox="0 0 40 40" className="drop-shadow-sm">
      <path d="M 40 40 L 5 40 L 40 5 Z" fill="#faf8f0" stroke="#dbd3be" strokeWidth="1" />
      <line x1="35" y1="15" x2="15" y2="35" stroke="#ccc" strokeWidth="1.5" />
    </svg>
  ) },
  
  { id: 'dec-pressed-flower', name: 'Pressed Flower', category: 'Decorations', render: (size) => (
    <svg width={size || 75} height={size || 75} viewBox="0 0 60 60" className="drop-shadow-sm opacity-80" style={{ transform: 'rotate(12deg)' }}>
      {/* 5 Petals of a dried flower */}
      <circle cx="30" cy="22" r="9" fill="#d946ef" opacity="0.6" />
      <circle cx="22" cy="32" r="9" fill="#d946ef" opacity="0.6" />
      <circle cx="38" cy="32" r="9" fill="#d946ef" opacity="0.6" />
      <circle cx="25" cy="42" r="9" fill="#d946ef" opacity="0.6" />
      <circle cx="35" cy="42" r="9" fill="#d946ef" opacity="0.6" />
      {/* Center dry brown disk */}
      <circle cx="30" cy="34" r="5" fill="#854d0e" opacity="0.8" />
      {/* Stem */}
      <path d="M 30 39 Q 28 50 20 56" fill="none" stroke="#713f12" strokeWidth="1.5" opacity="0.7" />
    </svg>
  ) },
  { id: 'dec-leaf', name: 'Dried Leaf', category: 'Decorations', render: (size) => <EmojiSticker emoji="🍁" size={size || 70} rotate={20} /> }
];
