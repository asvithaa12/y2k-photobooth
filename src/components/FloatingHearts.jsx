import React, { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate a set of static randomized hearts
    const heartList = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random percentage horizontal positioning
      scale: Math.random() * 0.8 + 0.4, // random scale between 0.4 and 1.2
      duration: Math.random() * 8 + 6, // random drift time (6s - 14s)
      delay: Math.random() * -10, // negative delay so they start scattered
      opacity: Math.random() * 0.4 + 0.2, // random opacity (0.2 - 0.6)
      sway: Math.random() * 30 + 15, // random horizontal sway width in pixels
    }));
    setHearts(heartList);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(105vh) translateX(0);
          }
          50% {
            transform: translateY(50vh) translateX(var(--sway));
          }
          100% {
            transform: translateY(-10vh) translateX(0);
          }
        }
      `}</style>
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="absolute bottom-0"
          style={{
            left: `${heart.left}%`,
            opacity: heart.opacity,
            transform: `scale(${heart.scale})`,
            animation: `float-up ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
            '--sway': `${heart.sway}px`,
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#FF69B4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
