import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useInView, MotionValue } from 'motion/react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const FALLBACK_OUTER = Array.from({ length: 21 }, (_, i) => ({ id: `outer-${i}`, image_url: `/photo${i + 1}.jpg`, ring: 'outer' }));
const FALLBACK_INNER = Array.from({ length: 7 }, (_, i) => ({ id: `inner-${i}`, image_url: `/photo${i + 22}.jpg`, ring: 'inner' }));

export function ImageCircleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const { data, loading } = usePortfolioData('circle_photos');

  const outerPhotos = data ? data.filter(p => p.ring === 'outer') : [];
  const innerPhotos = data ? data.filter(p => p.ring === 'inner') : [];

  const outerAngle = useMotionValue(0);
  const innerAngle = useMotionValue(0);

  // Outer ring: 60s per rotation (6 degrees per second)
  // Inner ring: 40s per rotation (9 degrees per second, opposite direction)
  useAnimationFrame((t, delta) => {
    if (isInView) {
      if (outerPhotos.length > 0) outerAngle.set(outerAngle.get() + (delta / 1000) * 6);
      if (innerPhotos.length > 0) innerAngle.set(innerAngle.get() - (delta / 1000) * 9);
    }
  });

  return (
    <section 
      id="image-circle" 
      ref={containerRef}
      className="bg-[#0C0C0C] py-20 sm:py-28 md:py-36 relative flex flex-col items-center justify-center overflow-hidden z-10"
    >
      <div className="relative flex justify-center items-center w-full max-w-7xl mx-auto min-h-[clamp(320px,80vw,860px)]">
        
        {/* Outer Ring */}
        {outerPhotos.length > 0 && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(260px,65vw,700px)] h-[clamp(260px,65vw,700px)] will-change-transform"
            style={{ rotate: outerAngle }}
          >
            {outerPhotos.map((photo, i) => (
              <CircleItem 
                key={photo.id || `outer-${i}`}
                photoUrl={photo.image_url}
                angle={i * (360 / outerPhotos.length)}
                ringAngle={outerAngle}
                sizeClasses="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24"
              />
            ))}
          </motion.div>
        )}

        {/* Inner Ring */}
        {innerPhotos.length > 0 && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(120px,30vw,320px)] h-[clamp(120px,30vw,320px)] will-change-transform"
            style={{ rotate: innerAngle }}
          >
            {innerPhotos.map((photo, i) => (
              <CircleItem 
                key={photo.id || `inner-${i}`}
                photoUrl={photo.image_url}
                angle={i * (360 / innerPhotos.length)}
                ringAngle={innerAngle}
                sizeClasses="w-14 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32"
              />
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}

function CircleItem({
  photoUrl,
  angle,
  ringAngle,
  sizeClasses
}: {
  photoUrl: string;
  angle: number;
  ringAngle: MotionValue<number>;
  sizeClasses: string;
}) {
  // Counter-rotate the item to keep the photo completely upright at all times.
  // It counteracts its fixed angle position and the dynamic rotation of its parent ring.
  const counterRotation = useTransform(ringAngle, (v) => -v - angle);

  return (
    <div
      className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg)`
      }}
    >
      <motion.div
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#181818] border-2 border-[#D7E2EA]/30 rounded-xl will-change-transform pointer-events-auto shadow-xl ${sizeClasses}`}
        style={{ rotate: counterRotation }}
      >
        <img
          src={photoUrl}
          alt="Gallery"
          className="w-full h-full object-cover object-center"
          onError={(e) => { 
            // Fallback for missing placeholder images
            e.currentTarget.style.opacity = '0'; 
            e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
            if (e.currentTarget.parentElement) {
                const span = document.createElement('span');
                span.className = 'text-[#D7E2EA]/30 text-[10px] font-medium uppercase absolute';
                span.innerText = 'IMG';
                e.currentTarget.parentElement.appendChild(span);
            }
          }}
        />
      </motion.div>
    </div>
  );
}
