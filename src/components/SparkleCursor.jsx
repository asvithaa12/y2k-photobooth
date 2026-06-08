import React, { useEffect, useRef } from 'react';

export default function SparkleCursor() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastActive = 0;
    const sparkleInterval = 30; // Milliseconds between sparkle spawns

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastActive < sparkleInterval) return;
      lastActive = now;

      // Spawn a sparkle at mouse position
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-particle';
      
      // Random size
      const size = Math.random() * 14 + 6;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      
      // Position center of cursor
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY + window.scrollY}px`;

      // Random horizontal and vertical drift offset
      const driftX = (Math.random() - 0.5) * 50;
      const driftY = (Math.random() - 0.5) * 50;
      sparkle.style.setProperty('--drift-x', `${driftX}px`);
      sparkle.style.setProperty('--drift-y', `${driftY}px`);

      // Append and schedule removal
      container.appendChild(sparkle);
      setTimeout(() => {
        sparkle.remove();
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        .sparkle-particle {
          position: absolute;
          pointer-events: none;
          background: radial-gradient(circle, #FFFFFF 20%, #FF69B4 50%, rgba(255, 215, 0, 0) 90%);
          clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%);
          z-index: 9999;
          transform: translate(-50%, -50%);
          animation: particle-fade-drift 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes particle-fade-drift {
          0% {
            transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(-50% + var(--drift-x)), calc(-50% + var(--drift-y))) scale(1.2) rotate(270deg);
            opacity: 0;
          }
        }
      `}</style>
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[99999]" />
    </>
  );
}
