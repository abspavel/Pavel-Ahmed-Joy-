import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'motion/react';

const CARDS = [
  "photo1.jpg", 
  "photo2.jpg", 
  "photo3.jpg", 
  "photo4.jpg", 
  "photo5.jpg", 
  "photo6.jpg"
];

export function RoundCarousel() {
  const rotation = useMotionValue(0);
  const isInteracting = useRef(false);
  const currentVelocity = useRef(15); // degrees per second
  const autoSpinVelocity = 15;

  useAnimationFrame((t, delta) => {
    if (!isInteracting.current) {
      // Smoothly damp current velocity towards autoSpinVelocity
      currentVelocity.current += (autoSpinVelocity - currentVelocity.current) * (delta / 1000) * 2;
      rotation.set(rotation.get() + currentVelocity.current * (delta / 1000));
    }
  });

  const handlePanStart = () => {
    isInteracting.current = true;
    currentVelocity.current = 0;
  };

  const handlePan = (e: any, info: any) => {
    // 1 pixel drag = ~0.5 degree rotation
    rotation.set(rotation.get() + info.delta.x * 0.5);
  };

  const handlePanEnd = (e: any, info: any) => {
    isInteracting.current = false;
    // Impart momentum from pan release
    currentVelocity.current = info.velocity.x * 0.05; 
  };

  return (
    <div 
      className="relative w-full flex justify-center items-center perspective-[1200px] py-20 sm:py-28"
      onMouseEnter={() => { isInteracting.current = true; }}
      onMouseLeave={() => { isInteracting.current = false; }}
    >
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ rotateY: rotation, transformStyle: "preserve-3d" }}
        className="relative flex justify-center items-center cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Placeholder container to give the group height/width */}
        <div className="w-[140px] h-[180px] sm:w-[180px] sm:h-[240px] md:w-[220px] md:h-[300px] pointer-events-none" />
        
        {CARDS.map((src, i) => {
          const angle = (360 / CARDS.length) * i;
          return (
            <motion.div
              key={i}
              className="absolute w-[140px] h-[180px] sm:w-[180px] sm:h-[240px] md:w-[220px] md:h-[300px] rounded-2xl shadow-2xl will-change-transform"
              style={{
                transform: `rotateY(${angle}deg) translateZ(clamp(140px, 30vw, 260px))`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Front Face */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden bg-[#181818] border border-[rgba(215,226,234,0.1)] flex items-center justify-center text-gray-600" 
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span className="absolute text-xs opacity-50">{src}</span>
              </div>
              
              {/* Back Face */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#18011F] to-[#7621B0] border border-[rgba(215,226,234,0.15)] flex items-center justify-center"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <span className="text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm">Joy {i + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
