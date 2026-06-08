import React from 'react';

export const stickersList = [
  {
    id: 'barbie-logo-1',
    name: 'Barbie Cursive',
    category: 'Logos',
    render: (size = 120) => (
      <svg width={size} height={size * 0.6} viewBox="0 0 200 120" className="drop-shadow-md">
        <text
          x="50%"
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Pacifico', cursive"
          fontSize="48"
          fill="#FF4FA3"
          stroke="#FFFFFF"
          strokeWidth="6"
          paintOrder="stroke fill"
        >
          Barbie
        </text>
      </svg>
    )
  },
  {
    id: 'barbie-logo-classic',
    name: 'Barbie Script',
    category: 'Logos',
    render: (size = 120) => (
      <svg width={size} height={size * 0.6} viewBox="0 0 200 120" className="drop-shadow-md">
        <text
          x="52%"
          y="67%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Pacifico', cursive"
          fontSize="46"
          fill="#FFD6EC"
          stroke="#FF4FA3"
          strokeWidth="6"
          paintOrder="stroke fill"
        >
          Barbie
        </text>
        <text
          x="50%"
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Pacifico', cursive"
          fontSize="46"
          fill="#FF4FA3"
          stroke="#FFFFFF"
          strokeWidth="2"
          paintOrder="stroke fill"
        >
          Barbie
        </text>
      </svg>
    )
  },
  {
    id: 'pink-bow',
    name: 'Pink Bow',
    category: 'Cute',
    render: (size = 80) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
        {/* Left Loop */}
        <path d="M 50 50 C 35 30, 15 35, 20 50 C 25 65, 35 70, 50 50" fill="#FF4FA3" stroke="#FFF" strokeWidth="2.5" />
        <path d="M 50 50 C 40 40, 25 42, 28 50 C 31 58, 40 60, 50 50" fill="#FFD6EC" />
        {/* Right Loop */}
        <path d="M 50 50 C 65 30, 85 35, 80 50 C 75 65, 65 70, 50 50" fill="#FF4FA3" stroke="#FFF" strokeWidth="2.5" />
        <path d="M 50 50 C 60 40, 75 42, 72 50 C 69 58, 60 60, 50 50" fill="#FFD6EC" />
        {/* Left Tail */}
        <path d="M 45 53 C 35 60, 25 75, 22 85 C 28 85, 38 80, 48 57 Z" fill="#FF4FA3" stroke="#FFF" strokeWidth="2.5" />
        {/* Right Tail */}
        <path d="M 55 53 C 65 60, 75 75, 78 85 C 72 85, 62 80, 52 57 Z" fill="#FF4FA3" stroke="#FFF" strokeWidth="2.5" />
        {/* Center Knot */}
        <circle cx="50" cy="50" r="11" fill="#FF69B4" stroke="#FFF" strokeWidth="2.5" />
        <circle cx="48" cy="48" r="4" fill="#FFF" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 'hello-kitty-bow',
    name: 'HK Style Bow',
    category: 'Cute',
    render: (size = 80) => (
      <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none" className="drop-shadow-md" style={{ transform: 'rotate(-15deg)' }}>
        {/* Left Loop */}
        <path d="M 50 40 C 20 20, 10 40, 30 60 C 45 70, 48 55, 50 40" fill="#FF4FA3" stroke="#111" strokeWidth="3" />
        <path d="M 40 43 C 25 32, 20 40, 32 50" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
        {/* Right Loop */}
        <path d="M 50 40 C 80 20, 90 40, 70 60 C 55 70, 52 55, 50 40" fill="#FF4FA3" stroke="#111" strokeWidth="3" />
        <path d="M 60 43 C 75 32, 80 40, 68 50" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
        {/* Center Knot */}
        <circle cx="50" cy="42" r="12" fill="#FFD6EC" stroke="#111" strokeWidth="3" />
        <circle cx="47" cy="39" r="4" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'heart-sticker',
    name: 'Sparkle Heart',
    category: 'Cute',
    render: (size = 80) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
        <path
          d="M 50 85 C 50 85, 15 55, 15 35 C 15 20, 28 10, 42 18 C 50 25, 50 25, 50 25 C 50 25, 50 25, 58 18 C 72 10, 85 20, 85 35 C 85 55, 50 85, 50 85 Z"
          fill="#FF4FA3"
          stroke="#FFF"
          strokeWidth="3"
        />
        <path
          d="M 50 75 C 50 75, 22 50, 22 35 C 22 24, 30 18, 40 24 C 47 28, 50 31, 50 31 C 50 31, 53 28, 60 24 C 70 18, 78 24, 78 35 C 78 50, 50 75, 50 75 Z"
          fill="#FF69B4"
        />
        {/* Sparkle lines */}
        <circle cx="32" cy="30" r="3" fill="#FFF" />
        <circle cx="38" cy="38" r="1.5" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'sparkle-sticker',
    name: 'Sparkle',
    category: 'Cute',
    render: (size = 60) => (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="drop-shadow-md">
        <path d="M 40 5 C 40 30, 30 40, 5 40 C 30 40, 40 50, 40 75 C 40 50, 50 40, 75 40 C 50 40, 40 30, 40 5 Z" fill="#FFD700" stroke="#FFF" strokeWidth="2" />
        <circle cx="40" cy="40" r="8" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'star-sticker',
    name: 'Gold Star',
    category: 'Cute',
    render: (size = 60) => (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="drop-shadow-md">
        <path
          d="M 40 10 L 49 28 L 69 31 L 54 45 L 58 65 L 40 55 L 22 65 L 26 45 L 11 31 L 31 28 Z"
          fill="#FFD700"
          stroke="#FFF"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="35" r="2" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'princess-crown',
    name: 'Crown',
    category: 'Cute',
    render: (size = 90) => (
      <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none" className="drop-shadow-md">
        {/* Crown Body */}
        <path
          d="M 10 65 L 20 30 L 40 45 L 50 20 L 60 45 L 80 30 L 90 65 Z"
          fill="#FFD700"
          stroke="#FFF"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Base Rim */}
        <rect x="8" y="62" width="84" height="8" rx="4" fill="#FF4FA3" stroke="#FFF" strokeWidth="2" />
        {/* Gems */}
        <circle cx="50" cy="20" r="5" fill="#FF4FA3" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="20" cy="30" r="4" fill="#FF69B4" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="80" cy="30" r="4" fill="#FF69B4" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="35" cy="66" r="2" fill="#FFF" />
        <circle cx="50" cy="66" r="2" fill="#FFF" />
        <circle cx="65" cy="66" r="2" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    category: 'Cute',
    render: (size = 80) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
        {/* Left Wings */}
        <path d="M 50 50 C 40 20, 15 15, 20 40 C 22 52, 35 55, 50 50" fill="#FFD6EC" stroke="#FF4FA3" strokeWidth="2.5" />
        <path d="M 50 50 C 40 70, 20 75, 25 85 C 32 85, 45 70, 50 50" fill="#FF69B4" stroke="#FF4FA3" strokeWidth="2.5" />
        {/* Right Wings */}
        <path d="M 50 50 C 60 20, 85 15, 80 40 C 78 52, 65 55, 50 50" fill="#FFD6EC" stroke="#FF4FA3" strokeWidth="2.5" />
        <path d="M 50 50 C 60 70, 80 75, 75 85 C 68 85, 55 70, 50 50" fill="#FF69B4" stroke="#FF4FA3" strokeWidth="2.5" />
        {/* Antennas */}
        <path d="M 47 40 C 42 25, 35 22, 36 18" stroke="#FF4FA3" strokeWidth="2" strokeLinecap="round" />
        <path d="M 53 40 C 58 25, 65 22, 64 18" stroke="#FF4FA3" strokeWidth="2" strokeLinecap="round" />
        {/* Body */}
        <rect x="47" y="38" width="6" height="28" rx="3" fill="#FF4FA3" />
      </svg>
    )
  },
  {
    id: 'diamond',
    name: 'Diamond',
    category: 'Cute',
    render: (size = 80) => (
      <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none" className="drop-shadow-md">
        {/* Outer path */}
        <path d="M 50 75 L 15 35 L 30 10 L 70 10 L 85 35 Z" fill="#FFEAF5" stroke="#FF4FA3" strokeWidth="3" strokeLinejoin="round" />
        {/* Facet segments */}
        <path d="M 30 10 L 50 35 L 70 10" stroke="#FF4FA3" strokeWidth="2" fill="none" />
        <path d="M 15 35 L 50 35 L 85 35" stroke="#FF4FA3" strokeWidth="2" fill="none" />
        <path d="M 50 35 L 50 75" stroke="#FF4FA3" strokeWidth="2" fill="none" />
        {/* Gloss highlight */}
        <path d="M 35 15 L 45 15 L 35 30 Z" fill="#FFF" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 'lipstick-kiss',
    name: 'Kiss Mark',
    category: 'Cute',
    render: (size = 80) => (
      <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" className="drop-shadow-md">
        {/* Upper Lip */}
        <path d="M 10 30 C 25 10, 42 12, 50 24 C 58 12, 75 10, 90 30 C 75 22, 60 26, 50 28 C 40 26, 25 22, 10 30 Z" fill="#FF4FA3" />
        {/* Lower Lip */}
        <path d="M 12 32 C 25 38, 40 48, 50 48 C 60 48, 75 38, 88 32 C 75 42, 60 40, 50 40 C 40 40, 25 42, 12 32 Z" fill="#FF69B4" />
      </svg>
    )
  },
  {
    id: 'dollhouse-window-sticker',
    name: 'Window',
    category: 'Dollhouse',
    render: (size = 80) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
        {/* Outer Frame */}
        <rect x="10" y="10" width="80" height="80" rx="8" fill="#FFF" stroke="#FF69B4" strokeWidth="6" />
        {/* Window Panes */}
        <rect x="18" y="18" width="28" height="28" rx="2" fill="#FFEAF5" />
        <rect x="54" y="18" width="28" height="28" rx="2" fill="#FFEAF5" />
        <rect x="18" y="54" width="28" height="28" rx="2" fill="#FFEAF5" />
        <rect x="54" y="54" width="28" height="28" rx="2" fill="#FFEAF5" />
        {/* Heart details at the bottom frame */}
        <path d="M 50 82 C 50 82, 47 79, 47 77 C 47 75, 49 75, 50 76 C 51 75, 53 75, 53 77 C 53 79, 50 82, 50 82 Z" fill="#FF4FA3" />
      </svg>
    )
  },
  {
    id: 'slogan-dreamgirl',
    name: 'Dream Girl',
    category: 'Slogans',
    render: (size = 130) => (
      <svg width={size} height={size * 0.5} viewBox="0 0 200 100" className="drop-shadow-md">
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Bubblegum Sans', cursive"
          fontSize="36"
          fill="#FF4FA3"
          stroke="#FFFFFF"
          strokeWidth="6"
          paintOrder="stroke fill"
        >
          Dream Girl
        </text>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Bubblegum Sans', cursive"
          fontSize="36"
          fill="#FFD6EC"
          stroke="#FFD700"
          strokeWidth="1.5"
          paintOrder="stroke fill"
        >
          Dream Girl
        </text>
      </svg>
    )
  },
  {
    id: 'slogan-princess',
    name: 'Princess',
    category: 'Slogans',
    render: (size = 120) => (
      <svg width={size} height={size * 0.5} viewBox="0 0 200 100" className="drop-shadow-md">
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Pacifico', cursive"
          fontSize="38"
          fill="#FF69B4"
          stroke="#FFFFFF"
          strokeWidth="6"
          paintOrder="stroke fill"
        >
          Princess
        </text>
        <circle cx="100" cy="18" r="3" fill="#FFD700" />
      </svg>
    )
  },
  {
    id: 'slogan-slay',
    name: 'Slay',
    category: 'Slogans',
    render: (size = 100) => (
      <svg width={size} height={size * 0.5} viewBox="0 0 150 75" className="drop-shadow-md">
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="44"
          fill="#FF4FA3"
          stroke="#FFFFFF"
          strokeWidth="8"
          paintOrder="stroke fill"
        >
          SLAY!
        </text>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="44"
          fill="#FFD700"
          stroke="#FF4FA3"
          strokeWidth="1.5"
          paintOrder="stroke fill"
        >
          SLAY!
        </text>
      </svg>
    )
  },
  {
    id: 'slogan-pinkera',
    name: 'Pink Era',
    category: 'Slogans',
    render: (size = 120) => (
      <svg width={size} height={size * 0.5} viewBox="0 0 180 90" className="drop-shadow-md">
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          fontSize="36"
          fill="#FF69B4"
          stroke="#FFFFFF"
          strokeWidth="8"
          paintOrder="stroke fill"
        >
          Pink Era
        </text>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontWeight="800"
          fontSize="36"
          fill="#FFEAF5"
          stroke="#FF4FA3"
          strokeWidth="2"
          paintOrder="stroke fill"
        >
          Pink Era
        </text>
      </svg>
    )
  },
  {
    id: 'slogan-besties',
    name: 'Besties',
    category: 'Slogans',
    render: (size = 120) => (
      <svg width={size} height={size * 0.5} viewBox="0 0 180 90" className="drop-shadow-md">
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Pacifico', cursive"
          fontSize="38"
          fill="#FF4FA3"
          stroke="#FFFFFF"
          strokeWidth="6"
          paintOrder="stroke fill"
        >
          Besties
        </text>
      </svg>
    )
  }
];
