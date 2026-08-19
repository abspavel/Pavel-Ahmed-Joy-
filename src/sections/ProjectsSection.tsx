import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'motion/react';
import { LiveProjectButton } from '../components/LiveProjectButton';

const projects = [
  {
    num: "01",
    category: "Client",
    name: "Nextlevel Studio",
    techStack: "Cinema4D, Octane, React",
    role: "Lead 3D Designer",
    year: "2025",
    images: {
      leftTop: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      leftBottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      right: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    }
  },
  {
    num: "02",
    category: "Personal",
    name: "Aura Brand Identity",
    techStack: "Blender, Figma, WebGL",
    role: "Art Director",
    year: "2024",
    images: {
      leftTop: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      leftBottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      right: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    }
  },
  {
    num: "03",
    category: "Client",
    name: "Solaris Digital",
    techStack: "Maya, Unreal Engine 5",
    role: "Motion Designer",
    year: "2025",
    images: {
      leftTop: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      leftBottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      right: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative pt-20 sm:pt-24 md:pt-32 pb-40">
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28 leading-none">
        Project
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col">
        {projects.map((project, i) => {
          return (
            <ProjectCard 
              key={project.num} 
              project={project} 
              index={i} 
              totalCards={projects.length} 
            />
          );
        })}
      </div>
    </section>
  );
}

const ProjectCard: React.FC<{ project: typeof projects[0], index: number, totalCards: number }> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const { scrollYProgress: scrollYProgressLeave } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const { scrollYProgress: cardScroll } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Stacking Depth & Scale
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgressLeave, [0, 1], [1, targetScale]);
  const rotateXStack = useTransform(scrollYProgressLeave, [0, 1], [0, index * -1.5]);

  // Parallax Layering
  const y1 = useTransform(cardScroll, [0, 1], [20, -20]);
  const y2 = useTransform(cardScroll, [0, 1], [30, -30]);
  const y3 = useTransform(cardScroll, [0, 1], [15, -15]);

  // Tilt & Spotlight Dynamics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const tiltRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const tiltRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  const spotlightX = useTransform(smoothMouseX, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(smoothMouseY, [-0.5, 0.5], [0, 100]);
  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(215,226,234,0.15) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={containerRef} className="h-[85vh] flex items-start justify-center perspective-[1500px]" style={{ marginTop: index === 0 ? 0 : '10vh' }}>
      <motion.div 
        style={{ 
          scale, 
          rotateX: rotateXStack,
          top: `calc(6rem + ${index * 28}px)`,
          transformOrigin: 'top center'
        }} 
        className="sticky w-full"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: tiltRotateX,
            rotateY: tiltRotateY,
            transformPerspective: 1000
          }}
          className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8 relative overflow-hidden group will-change-transform"
        >
          {/* Spotlight Layer */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: spotlightBackground }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-6 md:gap-10">
              <span className="font-black text-[#D7E2EA] text-[clamp(2.5rem,6vw,80px)] leading-none">{project.num}</span>
              <div className="flex flex-col gap-1">
                <span className="text-[#D7E2EA]/60 uppercase tracking-wider text-sm font-medium">{project.category}</span>
                <h3 className="text-[#D7E2EA] text-[clamp(1.5rem,3vw,2.5rem)] uppercase font-medium leading-none">{project.name}</h3>
              </div>
            </div>
            
            {/* Live Project Flip Button */}
            <div 
              className="shrink-0 perspective-[1000px] cursor-pointer" 
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative"
              >
                <div className="relative z-10" style={{ backfaceVisibility: 'hidden' }}>
                  <LiveProjectButton />
                </div>
                <div
                  className="absolute inset-0 bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-full flex flex-col items-center justify-center text-[#D7E2EA] uppercase tracking-widest leading-tight z-0"
                  style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <span className="text-[10px] sm:text-xs font-bold px-2">{project.year} | {project.role}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Project Images */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 flex-1 min-h-0 relative z-0">
            <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-6">
              
              <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden relative" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
                <motion.div
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.img style={{ y: y1, scale: 1.15 }} src={project.images.leftTop} alt={`${project.name} preview 1`} className="w-full h-full object-cover" />
                </motion.div>
              </div>

              <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex-1 relative" style={{ minHeight: 'clamp(160px, 22vw, 340px)' }}>
                <motion.div
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.img style={{ y: y2, scale: 1.15 }} src={project.images.leftBottom} alt={`${project.name} preview 2`} className="w-full h-full object-cover" />
                </motion.div>
              </div>

            </div>

            <div className="w-full md:w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden h-[300px] md:h-auto relative">
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                className="absolute inset-0 w-full h-full"
              >
                <motion.img style={{ y: y3, scale: 1.1 }} src={project.images.right} alt={`${project.name} preview 3`} className="w-full h-full object-cover" />
              </motion.div>
            </div>
            
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
