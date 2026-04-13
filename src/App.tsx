import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// Minimal Custom Cursor (Tiny Dot)
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
};

// Subtle Frame with Corner Crosses
const Frame = () => (
  <div className="fixed inset-6 sm:inset-10 border border-black/10 pointer-events-none z-10 flex flex-col justify-between">
    {/* Corner Crosses */}
    <div className="absolute -top-[5px] -left-[5px] w-[10px] h-[10px]">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/30" />
    </div>
    <div className="absolute -top-[5px] -right-[5px] w-[10px] h-[10px]">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/30" />
    </div>
    <div className="absolute -bottom-[5px] -left-[5px] w-[10px] h-[10px]">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/30" />
    </div>
    <div className="absolute -bottom-[5px] -right-[5px] w-[10px] h-[10px]">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/30" />
    </div>
    
    {/* Micro Typography / Grid Labels */}
    <div className="flex justify-between w-full p-4 sm:p-6 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-black/40">
      <span>Index</span>
      <span>{new Date().getFullYear()}</span>
    </div>
    <div className="flex justify-between w-full p-4 sm:p-6 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-black/40">
      <span>Status: In Progress</span>
      <span>Location: Global</span>
    </div>
  </div>
);

export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax effect values
  const translateX = useTransform(mouseX, [-1, 1], [-15, 15]);
  const translateY = useTransform(mouseY, [-1, 1], [-15, 15]);
  const translateXOpposite = useTransform(mouseX, [-1, 1], [10, -10]);
  const translateYOpposite = useTransform(mouseY, [-1, 1], [10, -10]);

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center selection:bg-black selection:text-white overflow-hidden">
      <div className="noise-bg" />
      <CustomCursor />
      <Frame />

      <div className="relative z-20 w-full max-w-6xl px-12 sm:px-20 md:px-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.4 }
            }
          }}
          className="flex flex-col items-start"
        >
          {/* First Line: Medium, Refined */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
            }}
            style={{ x: translateXOpposite, y: translateYOpposite }}
            className="mb-6 sm:mb-8 flex items-center gap-4 sm:gap-6"
          >
            <div className="w-8 sm:w-12 h-[1px] bg-black/30" />
            <p className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-black/70">
              Hi, I’m Awais — Product Designer
            </p>
          </motion.div>
          
          {/* Second Line: Larger, Bold, Dominant */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
            }}
            style={{ x: translateX, y: translateY }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter leading-[1.05] text-black hover:opacity-70 transition-opacity duration-700 cursor-default">
              My Portfolio<br />
              Coming Soon<span className="text-black/20">.</span>
            </h1>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
