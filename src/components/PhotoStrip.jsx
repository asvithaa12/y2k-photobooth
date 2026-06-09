import React from 'react';

// Dynamic filter helper
export const getFilterStyle = (preset, settings = {}) => {
  const s = {
    brightness: 100,
    contrast: 100,
    warmth: 0,
    saturation: 100,
    fade: 0,
    grain: 0,
    ...settings
  };

  // Base adjustments from preset
  let grayscale = 0;
  let sepia = 0;
  let hueRotate = 0;
  let blur = 0;
  let brightnessMult = 1.0;
  let contrastMult = 1.0;
  let saturateMult = 1.0;

  switch (preset) {
    case 'vintage':
      sepia = 30;
      contrastMult = 0.9;
      brightnessMult = 0.95;
      saturateMult = 0.8;
      break;
    case 'warm':
      sepia = 12;
      saturateMult = 1.15;
      brightnessMult = 1.05;
      contrastMult = 0.95;
      break;
    case 'dreamy':
      brightnessMult = 1.15;
      saturateMult = 0.85;
      contrastMult = 0.9;
      blur = 0.6;
      break;
    case 'y2k':
      saturateMult = 1.45;
      contrastMult = 1.25;
      brightnessMult = 1.02;
      break;
    case 'softglow':
      brightnessMult = 1.08;
      contrastMult = 0.92;
      blur = 0.9;
      saturateMult = 1.05;
      break;
    case 'film':
      contrastMult = 1.12;
      saturateMult = 1.1;
      brightnessMult = 0.98;
      sepia = 8;
      break;
    case 'bw':
      grayscale = 100;
      contrastMult = 1.2;
      brightnessMult = 1.0;
      saturateMult = 0;
      break;
    case 'sepia':
      sepia = 80;
      contrastMult = 0.95;
      brightnessMult = 0.98;
      saturateMult = 0.75;
      break;
    case 'disposable':
      contrastMult = 1.18;
      saturateMult = 1.15;
      brightnessMult = 1.03;
      sepia = 6;
      break;
    default: // normal
      break;
  }

  // Combine preset adjustments with user adjustments
  const finalBrightness = (s.brightness / 100) * brightnessMult * 100;
  const finalContrast = (s.contrast / 100) * contrastMult * 100;
  const finalSaturation = (s.saturation / 100) * saturateMult * 100;
  const finalSepia = Math.max(0, Math.min(100, sepia + (s.warmth * 0.75)));

  let filterStr = `brightness(${finalBrightness}%) contrast(${finalContrast}%) saturate(${finalSaturation}%) sepia(${finalSepia}%)`;
  if (grayscale > 0) filterStr += ` grayscale(${grayscale}%)`;
  if (blur > 0) filterStr += ` blur(${blur}px)`;
  if (hueRotate > 0) filterStr += ` hue-rotate(${hueRotate}deg)`;

  return filterStr;
};

const PhotoStrip = React.forwardRef(({ 
  photos, 
  footerText = "", 
  borderStyle = 'classic-white', 
  photoFilter = 'normal', 
  filterSettings = {}, 
  customization = {} 
}, ref) => {
  
  // Customization defaults
  const settings = {
    spacing: 12,
    corners: 0,
    shadow: true,
    frameThickness: 24, // Padding around photos in px
    bgColor: '#ffffff',
    ...customization
  };

  // Determine classes and inline styles based on borderStyle
  let borderClasses = "shadow-2xl flex flex-col items-center relative overflow-hidden select-none mx-auto w-[240px] h-[720px] justify-between py-6 px-4";
  let borderStyles = { 
    backgroundColor: settings.bgColor,
    paddingLeft: `${settings.frameThickness}px`,
    paddingRight: `${settings.frameThickness}px`,
  };
  let containerBorder = "border-[2px] border-[#333]";
  let labelColor = "text-[#333]";
  let labelFont = "font-mono";

  // Deco overlays (e.g. lace, film sprocket holes)
  let decoOverlays = null;

  switch (borderStyle) {
    case 'classic-white':
      borderStyles.backgroundColor = '#ffffff';
      containerBorder = "border-[3px] border-[#222]";
      labelColor = "text-[#111]";
      break;

    case 'vintage-film':
      borderStyles.backgroundColor = '#151515';
      containerBorder = "border-[2px] border-black";
      labelColor = "text-[#EAB308]";
      labelFont = "font-mono";
      decoOverlays = (
        <>
          {/* Edge sprocket holes */}
          <div className="absolute top-0 bottom-0 left-2.5 flex flex-col justify-between py-3 w-[12px] pointer-events-none">
            {[...Array(14)].map((_, i) => <div key={`l-${i}`} className="w-full h-3 bg-[#f5ebe8] rounded-[1.5px] opacity-90 shadow-inner" />)}
          </div>
          <div className="absolute top-0 bottom-0 right-2.5 flex flex-col justify-between py-3 w-[12px] pointer-events-none">
            {[...Array(14)].map((_, i) => <div key={`r-${i}`} className="w-full h-3 bg-[#f5ebe8] rounded-[1.5px] opacity-90 shadow-inner" />)}
          </div>
          {/* Film markings */}
          <div className="absolute top-36 left-7 text-[#EAB308] text-[8px] font-mono font-bold rotate-[-90deg] origin-center opacity-70">3A</div>
          <div className="absolute top-80 left-7 text-[#EAB308] text-[8px] font-mono font-bold rotate-[-90deg] origin-center opacity-70">4</div>
          <div className="absolute top-1/2 -translate-y-1/2 right-7 text-[#EAB308] text-[8px] font-mono font-bold rotate-[90deg] origin-center opacity-70">KODAK 400</div>
        </>
      );
      // Extra padding for sprocket holes
      borderStyles.paddingLeft = `${Math.max(settings.frameThickness, 28)}px`;
      borderStyles.paddingRight = `${Math.max(settings.frameThickness, 28)}px`;
      break;

    case 'pink-glitter':
      borderStyles.background = 'linear-gradient(135deg, #ff8da1 0%, #ff69b4 50%, #db2777 100%)';
      containerBorder = "border-[3px] border-[#fff] shadow-[0_0_15px_rgba(219,39,119,0.5)]";
      labelColor = "text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.4)]";
      labelFont = "font-serif italic";
      decoOverlays = (
        <div 
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.99' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      );
      break;

    case 'coquette-lace':
      borderStyles.backgroundColor = '#fff5f6';
      containerBorder = "border-[2px] border-[#fbcfe8]";
      labelColor = "text-[#db2777]";
      labelFont = "font-serif italic";
      decoOverlays = (
        <>
          {/* Scalloped lace border on the left and right */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-3 bg-repeat-y opacity-80 pointer-events-none" 
            style={{ 
              backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"%3E%3Ccircle cx="0" cy="12" r="6" fill="%23fbcfe8" /%3E%3Ccircle cx="0" cy="12" r="4.2" fill="%23fff5f6" /%3E%3C/svg%3E')` 
            }} 
          />
          <div 
            className="absolute top-0 bottom-0 right-0 w-3 bg-repeat-y opacity-80 pointer-events-none transform scale-x-[-1]" 
            style={{ 
              backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"%3E%3Ccircle cx="0" cy="12" r="6" fill="%23fbcfe8" /%3E%3Ccircle cx="0" cy="12" r="4.2" fill="%23fff5f6" /%3E%3C/svg%3E')` 
            }} 
          />
        </>
      );
      borderStyles.paddingLeft = `${Math.max(settings.frameThickness, 24)}px`;
      borderStyles.paddingRight = `${Math.max(settings.frameThickness, 24)}px`;
      break;

    case 'polaroid':
      borderStyles.backgroundColor = '#fcfaf2';
      containerBorder = "border-[1px] border-[#e2decb] shadow-[0_10px_30px_rgba(0,0,0,0.15)]";
      labelColor = "text-[#5c5645]";
      labelFont = "font-serif italic";
      // polaroids have huge bottom margin
      borderStyles.paddingBottom = '45px';
      borderStyles.paddingTop = '20px';
      break;

    case 'scrapbook-paper':
      borderStyles.backgroundColor = '#fbf8eb';
      containerBorder = "border-[2.5px] border-[#a18c76]";
      labelColor = "text-[#6e5d4f]";
      labelFont = "font-mono";
      decoOverlays = (
        <>
          {/* Lined paper lines */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#4f84c4 1px, transparent 1px)`,
              backgroundSize: '100% 24px',
              paddingTop: '20px'
            }}
          />
          {/* Vertical notebook red line */}
          <div className="absolute top-0 bottom-0 left-[24px] w-[1px] bg-red-400 opacity-30 pointer-events-none" />
        </>
      );
      break;

    case 'y2k-chrome':
      borderStyles.background = 'linear-gradient(135deg, #c7d2fe 0%, #e879f9 25%, #e2e8f0 50%, #38bdf8 75%, #a5f3fc 100%)';
      containerBorder = "border-[3px] border-[#fff] shadow-[0_0_20px_rgba(56,189,248,0.4)]";
      labelColor = "text-slate-800 font-extrabold tracking-wider";
      labelFont = "font-mono";
      decoOverlays = (
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.7) 100%)'
          }}
        />
      );
      break;

    case 'pearl':
      borderStyles.background = 'linear-gradient(135deg, #fff0f6 0%, #ffffff 50%, #f0f3ff 100%)';
      containerBorder = "border-[2px] border-white shadow-[0_0_12px_rgba(222,222,222,0.6)]";
      labelColor = "text-[#71717a]";
      labelFont = "font-serif italic";
      decoOverlays = (
        <>
          {/* Chain of pearls vertical */}
          <div 
            className="absolute top-0 bottom-0 left-1 w-2.5 bg-repeat-y opacity-90 pointer-events-none" 
            style={{ 
              backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"%3E%3Ccircle cx="5" cy="5" r="4" fill="%23ffffff" stroke="%23ebd8d8" stroke-width="0.5"/%3E%3Ccircle cx="4.2" cy="4.2" r="1.2" fill="%23ffffff" opacity="0.9"/%3E%3C/svg%3E')` 
            }} 
          />
          <div 
            className="absolute top-0 bottom-0 right-1 w-2.5 bg-repeat-y opacity-90 pointer-events-none" 
            style={{ 
              backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"%3E%3Ccircle cx="5" cy="5" r="4" fill="%23ffffff" stroke="%23ebd8d8" stroke-width="0.5"/%3E%3Ccircle cx="4.2" cy="4.2" r="1.2" fill="%23ffffff" opacity="0.9"/%3E%3C/svg%3E')` 
            }} 
          />
        </>
      );
      borderStyles.paddingLeft = `${Math.max(settings.frameThickness, 20)}px`;
      borderStyles.paddingRight = `${Math.max(settings.frameThickness, 20)}px`;
      break;

    case 'hearts':
      borderStyles.backgroundColor = '#fff0f6';
      containerBorder = "border-[2.5px] border-[#fbcfe8]";
      labelColor = "text-[#ec4899]";
      labelFont = "font-serif";
      decoOverlays = (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='%23ec4899'/%3E%3C/svg%3E")`,
            backgroundSize: '16px 16px'
          }}
        />
      );
      break;

    case 'ribbon':
      borderStyles.backgroundColor = '#ffeef2';
      containerBorder = "border-[2px] border-[#fda4af]";
      labelColor = "text-[#e11d48]";
      labelFont = "font-serif italic";
      decoOverlays = (
        <>
          {/* Bow icons in the corners */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 20 20'%3E%3Cpath d='M10 8c-2-2-4-2-4 0s2 3 4 1c2 2 4 2 4 0s-2-2-4-1zm-1 2c-1 2-2 4-3 5m5-5c1 2 2 4 3 5' fill='none' stroke='%23e11d48' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px'
            }}
          />
        </>
      );
      break;

    case 'flowers':
      borderStyles.backgroundColor = '#fafaf0';
      containerBorder = "border-[2.5px] border-[#fde047]";
      labelColor = "text-[#b45309]";
      labelFont = "font-serif italic";
      decoOverlays = (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 20 20'%3E%3Ccircle cx='10' cy='10' r='2.5' fill='%23fcd34d'/%3E%3Ccircle cx='10' cy='6.5' r='2.5' fill='%23ffffff' stroke='%23fde047' stroke-width='0.5'/%3E%3Ccircle cx='10' cy='13.5' r='2.5' fill='%23ffffff' stroke='%23fde047' stroke-width='0.5'/%3E%3Ccircle cx='6.5' cy='10' r='2.5' fill='%23ffffff' stroke='%23fde047' stroke-width='0.5'/%3E%3Ccircle cx='13.5' cy='10' r='2.5' fill='%23ffffff' stroke='%23fde047' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
        />
      );
      break;

    case 'film-roll':
      borderStyles.backgroundColor = '#0b0b0b';
      containerBorder = "border-[2px] border-black";
      labelColor = "text-[#fcd34d]";
      labelFont = "font-mono";
      decoOverlays = (
        <>
          {/* Classic vertical film strip negative cutouts on left and right */}
          <div className="absolute top-0 bottom-0 left-2.5 flex flex-col justify-between py-2 w-[10px] pointer-events-none">
            {[...Array(16)].map((_, i) => <div key={`fl-${i}`} className="w-full h-2 bg-transparent border border-white/20 rounded-[1px] opacity-80" style={{ backgroundColor: '#151515' }} />)}
          </div>
          <div className="absolute top-0 bottom-0 right-2.5 flex flex-col justify-between py-2 w-[10px] pointer-events-none">
            {[...Array(16)].map((_, i) => <div key={`fr-${i}`} className="w-full h-2 bg-transparent border border-white/20 rounded-[1px] opacity-80" style={{ backgroundColor: '#151515' }} />)}
          </div>
          <div className="absolute bottom-16 left-6 text-red-500 font-mono text-[7px] uppercase opacity-60">SAFETY FILM</div>
        </>
      );
      borderStyles.paddingLeft = `${Math.max(settings.frameThickness, 24)}px`;
      borderStyles.paddingRight = `${Math.max(settings.frameThickness, 24)}px`;
      break;

    default:
      break;
  }

  // Generate dynamic CSS filter string
  const imgFilter = getFilterStyle(photoFilter, filterSettings);

  return (
    <div
      ref={ref}
      id="y2k-photostrip-element"
      className={`${borderClasses} ${containerBorder}`}
      style={borderStyles}
    >
      {/* Dynamic decoration background overlays */}
      {decoOverlays}

      {/* 3 Photos stacked vertically */}
      <div 
        className="flex flex-col w-full z-20 mt-1 justify-center flex-grow"
        style={{ gap: `${settings.spacing}px` }}
      >
        {photos.map((src, index) => (
          <div
            key={index}
            className={`w-full aspect-[4/3] bg-[#eaeaea] relative overflow-hidden flex items-center justify-center`}
            style={{ 
              borderRadius: `${settings.corners}px`,
              boxShadow: settings.shadow ? '0 3px 8px rgba(0,0,0,0.15)' : 'none',
              border: borderStyle === 'classic-white' || borderStyle === 'polaroid' ? '1px solid rgba(0,0,0,0.12)' : 'none'
            }}
          >
            {src ? (
              <>
                <img 
                  src={src} 
                  alt={`Capture ${index + 1}`} 
                  className="w-full h-full object-cover scale-x-[-1]" 
                  style={{ filter: imgFilter }}
                />
                
                {/* Fade Overlay */}
                {filterSettings.fade > 0 && (
                  <div 
                    className="absolute inset-0 bg-white pointer-events-none" 
                    style={{ opacity: filterSettings.fade / 250 }} // cap fade at 40% maximum wash out
                  />
                )}

                {/* Grain Overlay */}
                {filterSettings.grain > 0 && (
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay bg-repeat"
                    style={{
                      opacity: filterSettings.grain / 100,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      backgroundSize: '150px 150px'
                    }}
                  />
                )}
              </>
            ) : (
              <div className="w-full h-full bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:8px_8px] opacity-25" />
            )}
          </div>
        ))}
      </div>

      {/* Film Label Area */}
      <div className="mt-3 mb-1 flex flex-col items-center text-center z-20 w-full px-2 shrink-0">
        <h3 className={`${labelFont} text-[11px] ${labelColor} tracking-[0.18em] uppercase w-full break-words text-center font-bold opacity-90`}>
          {footerText}
        </h3>
      </div>
    </div>
  );
});

export default PhotoStrip;
