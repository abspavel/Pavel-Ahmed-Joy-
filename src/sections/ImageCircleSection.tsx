import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useInView, MotionValue } from 'motion/react';

const OUTER_PHOTOS = Array.from({ length: 21 }, (_, i) => `photo${i + 1}.jpg`);
const INNER_PHOTOS = Array.from({ length: 7 }, (_, i) => `photo${i + 22}.jpg`);

export function ImageCircleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  const outerAngle = useMotionValue(0);
  const innerAngle = useMotionValue(0);

  // Outer ring: 60s per rotation (6 degrees per second)
  // Inner ring: 40s per rotation (9 degrees per second, opposite direction)
  useAnimationFrame((t, delta) => {
    if (isInView) {
      outerAngle.set(outerAngle.get() + (delta / 1000) * 6);
      innerAngle.set(innerAngle.get() - (delta / 1000) * 9);
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
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(260px,65vw,700px)] h-[clamp(260px,65vw,700px)] will-change-transform"
          style={{ rotate: outerAngle }}
        >
          {OUTER_PHOTOS.map((photo, i) => (
            <CircleItem 
              key={`outer-${i}`}
              photo={photo}
              angle={i * (360 / OUTER_PHOTOS.length)}
              ringAngle={outerAngle}
              sizeClasses="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24"
            />
          ))}
        </motion.div>

        {/* Inner Ring */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(120px,30vw,320px)] h-[clamp(120px,30vw,320px)] will-change-transform"
          style={{ rotate: innerAngle }}
        >
          {INNER_PHOTOS.map((photo, i) => (
            <CircleItem 
              key={`inner-${i}`}
              photo={photo}
              angle={i * (360 / INNER_PHOTOS.length)}
              ringAngle={innerAngle}
              sizeClasses="w-14 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32"
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function CircleItem({
  photo,
  angle,
  ringAngle,
  sizeClasses
}: {
  photo: string;
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
          src={`/${photo}`}
          alt="Gallery"
          className="w-full h-full object-cover object-center"
          onError={(e) => { 
            // Fallback for missing placeholder images
            e.currentTarget.style.opacity = '0'; 
            e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
            if (e.currentTarget.parentElement) {
                const span = document.createElement('span');
                span.className = 'text-[#D7E2EA]/30 text-[10px] font-medium uppercase absolute';
                span.innerText = photo.split('.')[0];
                e.currentTarget.parentElement.appendChild(span);
            }
          }}
        />
      </motion.div>
    </div>
  );
}
